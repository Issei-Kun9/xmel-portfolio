import * as THREE from "three";
import { buildSky } from "./sky";
import { buildLandscape, populateNature } from "./landscape";
import { buildHouse, H } from "./house";
import { sample, STOPS } from "./journey";
import {
  LAYER_MAIN, aboutEngraving, anamorphic, galleryFrames, jettyEngraving, lakeReflectionText, openBook, poolMosaic, servicesProjection, skyWords,
} from "./reveals";
import { ASSET, loadTex } from "./materials";

export type Quality = "high" | "low";
export type Estate = Awaited<ReturnType<typeof createEstate>>;

async function loadFonts() {
  const faces = [
    new FontFace("Instrument Serif", `url(${ASSET}/fonts/InstrumentSerif-Regular.ttf)`, { weight: "400" }),
    new FontFace("Instrument Serif", `url(${ASSET}/fonts/InstrumentSerif-Italic.ttf)`, { weight: "400", style: "italic" }),
    new FontFace("Schibsted Grotesk", `url(${ASSET}/fonts/SchibstedGrotesk-Variable.ttf)`, { weight: "400 900" }),
  ];
  await Promise.all(faces.map(async (f) => { await f.load(); document.fonts.add(f); }));
}

const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);

export async function createEstate(canvas: HTMLCanvasElement, opts: { quality: Quality; onProgress?: (p: number, label: string) => void }) {
  const { quality } = opts;
  const report = (p: number, label: string) => opts.onProgress?.(p, label);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance", alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === "high" ? 1.75 : 1.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(0xc7b49b, 0.0019);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(40, 1, 0.08, 3200);
  camera.layers.set(LAYER_MAIN);

  report(0.04, "Typefaces");
  await loadFonts();
  report(0.12, "Sky and light");
  const sky = await buildSky(renderer, scene);
  report(0.3, "Lake and land");
  const land = await buildLandscape(scene, quality);
  report(0.5, "The house");
  const house = await buildHouse(scene);
  report(0.72, "Words");

  // ── Sun + moon ──────────────────────────────────────────────────────
  const sun = new THREE.DirectionalLight(0xffcf9a, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(quality === "high" ? 4096 : 2048, quality === "high" ? 4096 : 2048);
  const sc = sun.shadow.camera;
  sc.left = -46; sc.right = 46; sc.top = 42; sc.bottom = -42; sc.near = 1; sc.far = 260;
  sun.shadow.bias = -0.00025;
  sun.shadow.normalBias = 0.03;
  sun.target.position.set(4, 0, 4);
  scene.add(sun, sun.target);
  const moon = new THREE.DirectionalLight(0x8fa6d6, 0);
  moon.position.set(60, 90, 40);
  scene.add(moon);

  // ── Reveals ─────────────────────────────────────────────────────────
  const waterNormals = await loadTex(`${ASSET}/tex/waternormals.jpg`);
  const contactStop = STOPS.find((s) => s.id === "contact")!;
  const rv = {
    lake: lakeReflectionText(scene),
    about: aboutEngraving(scene),
    services: servicesProjection(scene),
    testimonial: openBook(scene, house.coffeeCenter, house.coffeeTop),
    listings: galleryFrames(scene),
    process: anamorphic(scene),
    numbers: poolMosaic(scene, waterNormals),
    contact: skyWords(scene, new THREE.Vector3(...contactStop.pos), new THREE.Vector3(...contactStop.look)),
    footer: jettyEngraving(scene, land.jetty),
  };

  /** Everything except the reflection-only title is visible to the main camera. */
  const exposeToMain = () => scene.traverse((o) => { if (o.name !== "reflection-only-title") o.layers.enable(LAYER_MAIN); });
  exposeToMain();

  // ── State ───────────────────────────────────────────────────────────
  let progress = 0;
  let snap = false;
  const pointer = new THREE.Vector2();
  const pointerSmooth = new THREE.Vector2();
  let width = 1, height = 1;
  let running = true;
  let last = performance.now();
  const delta = () => { const n = performance.now(); const d = (n - last) / 1000; last = n; return d; };
  let time = 0;
  let night = 0;
  const lookTmp = new THREE.Vector3();
  const sunDir = sky.sunWorld(0);
  const warmFog = new THREE.Color(0xc7b49b), duskFog = new THREE.Color(0x6e6476), nightFog = new THREE.Color(0x0b1019);

  function frame() {
    if (!running) return;
    step(Math.min(0.05, delta()));
    raf = requestAnimationFrame(frame);
  }

  function step(dt: number) {
    time += dt;
    const shot = sample(progress, snap);
    pointerSmooth.lerp(pointer, 1 - Math.pow(0.002, dt));

    // Camera, with a little pointer parallax (strongest on the lake).
    const parallax = shot.chapter === 0 ? 1 : 0.18;
    camera.position.copy(shot.pos);
    camera.position.x += pointerSmooth.x * 0.9 * parallax;
    camera.position.y += -pointerSmooth.y * 0.35 * parallax;
    lookTmp.copy(shot.look);
    camera.lookAt(lookTmp);
    if (camera.fov !== shot.fov) { camera.fov = shot.fov; camera.updateProjectionMatrix(); }

    // Time of day: golden hour → dusk → night.
    const t = shot.tod;
    sky.setTime(t);
    night = smooth(0.7, 0.95, t);
    const sunUp = 1 - smooth(0.42, 0.66, t);
    if (t < 0.5) sunDir.copy(sky.sunWorld(0)); else sunDir.copy(sky.sunWorld(1));
    sunDir.y = Math.max(0.05, sunDir.y - 0.12 * smooth(0.3, 0.66, t));
    sunDir.normalize();
    sun.position.copy(sun.target.position).addScaledVector(sunDir, 120);
    sun.intensity = 3.4 * sunUp;
    sun.color.setHSL(0.08, 0.9, 0.62 + 0.18 * (1 - t));
    moon.intensity = 0.32 * night;
    const fc = fog.color;
    if (t < 0.55) fc.lerpColors(warmFog, duskFog, smooth(0.3, 0.55, t)); else fc.lerpColors(duskFog, nightFog, smooth(0.55, 0.92, t));
    fog.density = 0.0019 - 0.0006 * night;
    renderer.toneMappingExposure = 0.95 + 0.25 * smooth(0.5, 0.9, t);

    // House lights warm up as the day goes.
    const interior = Math.max(smooth(0.25, 0.75, t), 0.42);
    for (const l of house.interiorLights) l.intensity = (l.userData.base as number) * interior;
    house.fireLight.intensity = (house.fireLight.userData.base as number) * interior * (0.85 + 0.15 * Math.sin(time * 9) * Math.sin(time * 5.3));
    (house.embers.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.65 * interior;
    (house.upperGlow.material as THREE.MeshBasicMaterial).opacity = 0.9 * smooth(0.35, 0.85, t);

    // Lake.
    const wu = (land.water.material as THREE.ShaderMaterial).uniforms;
    wu.time.value = time * 0.6;
    wu.sunDirection.value.copy(sunDir);
    wu.sunColor.value.setRGB(1, 0.85, 0.66).multiplyScalar(0.25 + 0.75 * sunUp);
    wu.waterColor.value.setRGB(0.05, 0.13, 0.16).multiplyScalar(1 - 0.75 * night);
    // The lake stills as you arrive, and the reflected title sharpens with it.
    wu.distortionScale.value = 0.25 + (1 - shot.reveal[0]) * 1.95;

    // Reveals.
    const r = shot.reveal;
    rv.lake.update(Math.max(r[0], 0));
    rv.about.update(r[1]);
    rv.services.update(r[2]);
    rv.testimonial.update(r[3]);
    rv.listings.update(r[4]);
    rv.process.update(r[5], interior);
    rv.numbers.update(r[6], time);
    rv.contact.update(Math.max(r[7], r[8] * 0.85), night, time, renderer.getPixelRatio() * 1.6);
    rv.footer.update(r[8], night);

    renderer.render(scene, camera);
  }

  // ── Listing photographs, rendered from the scene itself ─────────────
  async function renderListingPhotos() {
    const shots: { pos: [number, number, number]; look: [number, number, number]; tod: number; fov: number }[] = [
      { pos: [-30, 3.2, -34], look: [4, 3.6, 6], tod: 0.04, fov: 36 },
      { pos: [-60, 22, -70], look: [20, 2, 20], tod: 0.3, fov: 40 },
      { pos: [34, 1.6, -2], look: [8, 1.5, -8], tod: 0.5, fov: 44 },
    ];
    const cam = camera.clone();
    cam.layers.set(LAYER_MAIN);
    for (let i = 0; i < shots.length; i++) {
      const s = shots[i];
      const rt = new THREE.WebGLRenderTarget(1024, 640, { samples: 4, type: THREE.HalfFloatType });
      cam.aspect = 1024 / 640;
      cam.fov = s.fov;
      cam.position.set(...s.pos);
      cam.lookAt(...s.look);
      cam.updateProjectionMatrix();
      sky.setTime(s.tod);
      renderer.setRenderTarget(rt);
      renderer.render(scene, cam);
      renderer.setRenderTarget(null);
      const f = rv.listings.frames[i];
      f.photo.map = rt.texture;
      f.photo.color.set(0xffffff);
      f.photo.needsUpdate = true;
    }
  }

  function resize(w: number, h: number) {
    width = w; height = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  /** Screen position (CSS px) of a world point, or null when behind the camera. */
  const tmp = new THREE.Vector3();
  function project(p: THREE.Vector3) {
    tmp.copy(p).project(camera);
    if (tmp.z > 1) return null;
    return { x: (tmp.x * 0.5 + 0.5) * width, y: (-tmp.y * 0.5 + 0.5) * height };
  }

  let raf = 0;
  report(0.82, "First light");
  resize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
  renderer.compile(scene, camera);
  raf = requestAnimationFrame(frame);

  // Stream the forest, rocks and furniture-heavy extras after the first frame.
  const ready = (async () => {
    report(0.9, "The forest");
    await populateNature(scene, quality);
    exposeToMain();
    await renderListingPhotos();
    report(1, "");
  })();

  return {
    ready,
    resize,
    project,
    anchors: { contact: rv.contact.anchor, footer: rv.footer.anchor },
    setProgress(p: number) { progress = p; },
    setSnap(s: boolean) { snap = s; },
    setPointer(x: number, y: number) { pointer.set(x, y); },
    current() { return sample(progress, snap); },
    /** Pause the loop and render one frame at progress p (used for stills). */
    still(p: number) {
      running = false;
      cancelAnimationFrame(raf);
      progress = p;
      step(0.016);
      step(0.016);
    },
    pause(p: boolean) {
      if (p && running) { running = false; cancelAnimationFrame(raf); }
      else if (!p && !running) { running = true; delta(); raf = requestAnimationFrame(frame); }
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
      });
    },
    debug: { scene, camera, renderer, H },
  };
}
