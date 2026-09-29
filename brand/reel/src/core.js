import * as THREE from "three";
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ToneMappingEffect, ToneMappingMode } from "postprocessing";
import { rng } from "./util.js";

// Halton(2,3) sub-pixel offsets, centred on 0.
const JITTER = Array.from({ length: 8 }, (_, i) => {
  const h = (n, b) => { let f = 1, r = 0; while (n > 0) { f /= b; r += f * (n % b); n = Math.floor(n / b); } return r; };
  return [h(i + 1, 2) - 0.5, h(i + 1, 3) - 0.5];
});

/**
 * The render engine. Per output frame it renders N sub-frames spread across
 * a 180° shutter and averages them (true motion blur), compositing the WebGL
 * world with the 2D type layer on every sub-frame, then adds grain and a
 * vignette once. The result is read out as a JPEG for ffmpeg.
 */
export function createEngine({ width, height, fps = 30 }) {
  const glCanvas = document.createElement("canvas");
  glCanvas.width = width;
  glCanvas.height = height;
  const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: false, preserveDrawingBuffer: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setClearColor(0x0b0b0e, 1);

  const composer = new EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType, multisampling: 0 });
  const blank = new THREE.Scene();
  const blankCam = new THREE.PerspectiveCamera();
  const renderPass = new RenderPass(blank, blankCam);
  const bloom = new BloomEffect({ luminanceThreshold: 0.72, luminanceSmoothing: 0.18, intensity: 0.55, mipmapBlur: true, radius: 0.72 });
  const tone = new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC });
  const fx = new EffectPass(blankCam, bloom, tone);
  composer.addPass(renderPass);
  composer.addPass(fx);

  const ov = document.createElement("canvas");
  ov.width = width;
  ov.height = height;
  const ovCtx = ov.getContext("2d");

  const tmp = document.createElement("canvas");
  tmp.width = width;
  tmp.height = height;
  const tmpCtx = tmp.getContext("2d", { willReadFrequently: true });

  // Kept off the page: an on-screen 1080×1920 canvas forces a repaint per frame.
  const out = document.createElement("canvas");
  out.width = width;
  out.height = height;
  const outCtx = out.getContext("2d", { willReadFrequently: true });

  // Pre-baked full-frame plates (pattern fills and gradient fills are very
  // slow on the CPU canvas; a plain drawImage of a plate is ~3ms).
  const plate = () => {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    return [c, c.getContext("2d", { willReadFrequently: true })];
  };
  const grains = Array.from({ length: 8 }, (_, k) => {
    const [c, g] = plate();
    const img = g.createImageData(width, height);
    const r = rng(1000 + k);
    // Signed luminance noise baked into alpha: lighter or darker specks drawn
    // with a plain source-over blend.
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (r() + r() + r()) / 3 - 0.5;
      const white = v > 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = white ? 255 : 0;
      img.data[i + 3] = Math.min(255, Math.abs(v) * 2 * 255);
    }
    g.putImageData(img, 0, 0);
    return c;
  });
  const [vig, vg] = plate();
  {
    const g = vg.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.35, width / 2, height / 2, Math.hypot(width, height) * 0.62);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,1)");
    vg.fillStyle = g;
    vg.fillRect(0, 0, width, height);
  }

  const engine = {
    THREE,
    width,
    height,
    fps,
    renderer,
    composer,
    bloom,
    ov,
    ovCtx,
    /** Filled by the director: (t) => { scene, camera } after setting state + drawing the overlay. */
    director: null,
    /** Extra per-frame post: grain amount etc. */
    // Grain and vignette are applied by ffmpeg (noise + vignette filters): far
    // cheaper there, and grain would make every JPEG hand-off heavy.
    post: { grain: 0, vignette: 0 },

    renderSub(t, s = 0) {
      ovCtx.setTransform(1, 0, 0, 1, 0, 0);
      ovCtx.clearRect(0, 0, width, height);
      const { scene, camera, bloom: b } = engine.director(t);
      // Sub-pixel jitter per sample: the motion-blur average doubles as AA.
      const [jx, jy] = JITTER[s % JITTER.length];
      camera.setViewOffset(width, height, jx, jy, width, height);
      renderPass.mainScene = scene;
      renderPass.mainCamera = camera;
      fx.mainCamera = camera;
      bloom.intensity = b ?? 0.55;
      composer.render();
      camera.clearViewOffset();
      tmpCtx.globalAlpha = 1;
      tmpCtx.globalCompositeOperation = "source-over";
      tmpCtx.drawImage(glCanvas, 0, 0);
      tmpCtx.drawImage(ov, 0, 0);
    },

    /** Render output frame n with `samples` motion-blur sub-frames. */
    frame(n, samples = 1) {
      const t0 = n / fps;
      const shutter = 0.5 / fps; // 180°
      outCtx.globalCompositeOperation = "source-over";
      for (let s = 0; s < samples; s++) {
        const t = samples === 1 ? t0 : t0 - shutter / 2 + (shutter * s) / (samples - 1);
        engine.renderSub(t, s);
        outCtx.globalAlpha = 1 / (s + 1);
        outCtx.drawImage(tmp, 0, 0);
      }
      outCtx.globalAlpha = 1;
      // Vignette + film grain, from the pre-baked plates.
      if (engine.post.vignette > 0) {
        outCtx.globalAlpha = engine.post.vignette;
        outCtx.drawImage(vig, 0, 0);
      }
      if (engine.post.grain > 0) {
        outCtx.globalAlpha = engine.post.grain;
        outCtx.drawImage(grains[n % grains.length], 0, 0);
      }
      outCtx.globalAlpha = 1;
      return out.toDataURL("image/jpeg", 0.96);
    },
  };
  return engine;
}

/** Load the brand fonts into the document for Canvas2D. */
export async function loadFonts() {
  const faces = [
    ["Fraunces", "fraunces-900.ttf", { weight: "900" }],
    ["Fraunces", "fraunces-600.ttf", { weight: "600" }],
    ["Fraunces", "fraunces-400i.ttf", { weight: "400", style: "italic" }],
    ["Fraunces", "fraunces-600i.ttf", { weight: "600", style: "italic" }],
    ["Inter", "inter-900.ttf", { weight: "900" }],
    ["Inter", "inter-700.ttf", { weight: "700" }],
    ["Inter", "inter-500.ttf", { weight: "500" }],
    ["Mono", "mono-500.ttf", { weight: "500" }],
    ["Mono", "mono-700.ttf", { weight: "700" }],
  ];
  await Promise.all(
    faces.map(async ([fam, file, desc]) => {
      const f = new FontFace(fam, `url(/fonts/${file})`, desc);
      await f.load();
      document.fonts.add(f);
    })
  );
}
