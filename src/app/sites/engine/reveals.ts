import * as THREE from "three";
import { ABOUT, BRAND, EXPERTISE, LISTINGS, PROCESS, SERVICES, TESTIMONIAL, CONTACT } from "../content";
import { H } from "./house";
import { box } from "./materials";

export const SERIF = '"Instrument Serif", Georgia, serif';
export const SANS = '"Schibsted Grotesk", system-ui, sans-serif';

/** Layer 0 = what the lake's mirror camera sees; layer 1 = what the main camera sees. */
export const LAYER_MAIN = 1;

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d", { willReadFrequently: true })!] as const;
}
const tex = (c: HTMLCanvasElement, srgb = true) => {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => { const t = clamp01(x); return t * t * (3 - 2 * t); };

// ── 1. Hero: the name exists only in the lake's reflection ────────────────
export function lakeReflectionText(scene: THREE.Scene) {
  const [c, g] = canvas(2048, 760);
  g.translate(0, c.height);
  g.scale(1, -1); // a floor mirror flips vertically, so author it upside down
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "alphabetic";
  g.font = `400 360px ${SERIF}`;
  g.fillText(BRAND.name, c.width / 2, 400);
  g.font = `italic 400 112px ${SERIF}`;
  g.fillText(BRAND.tagline.toLowerCase(), c.width / 2, 590);
  const mat = new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false, color: new THREE.Color(1.6, 1.38, 1.05), fog: false });
  // Sized and placed so its mirror image lands 4–13° below the horizon from the hero camera.
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(18.6, 6.9), mat);
  mesh.position.set(4, 4.05, -17);
  mesh.rotation.y = Math.PI; // face the camera out on the lake
  mesh.layers.set(0); // the mirror camera sees it; the main camera (layer 1) does not
  mesh.name = "reflection-only-title";
  scene.add(mesh);
  return {
    update(k: number) { mat.opacity = ease(k); },
  };
}

// ── 2/9. Engraving: grooves cut into concrete or timber ───────────────────
function engraved(widthM: number, heightM: number, px: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, groove = 0x3d3934) {
  const w = Math.round(widthM * px), h = Math.round(heightM * px);
  const [mc, mg] = canvas(w, h);
  mg.fillStyle = "#000";
  mg.fillRect(0, 0, w, h);
  mg.fillStyle = "#fff";
  draw(mg, w, h);
  // Height: a softened copy of the letters, so the groove walls bevel.
  const [, bg] = canvas(w, h);
  bg.filter = `blur(${Math.max(1, px / 220)}px)`;
  bg.drawImage(mc, 0, 0);
  const hd = bg.getImageData(0, 0, w, h).data;
  const md = mg.getImageData(0, 0, w, h).data;
  const [nc, ng] = canvas(w, h);
  const [ac, ag] = canvas(w, h);
  const nImg = ng.createImageData(w, h);
  const aImg = ag.createImageData(w, h);
  const H = (x: number, y: number) => 1 - hd[(Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))) * 4] / 255;
  const k = 6;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const dx = (H(x - 1, y) - H(x + 1, y)) * k;
      const dy = (H(x, y + 1) - H(x, y - 1)) * k; // canvas y is down; OpenGL normal maps are y-up
      const l = Math.hypot(dx, dy, 1);
      nImg.data[i] = (dx / l * 0.5 + 0.5) * 255;
      nImg.data[i + 1] = (dy / l * 0.5 + 0.5) * 255;
      nImg.data[i + 2] = (1 / l * 0.5 + 0.5) * 255;
      nImg.data[i + 3] = 255;
      const a = Math.max(md[i], hd[i] * 0.9);
      aImg.data[i] = aImg.data[i + 1] = aImg.data[i + 2] = a;
      aImg.data[i + 3] = 255;
    }
  }
  ng.putImageData(nImg, 0, 0);
  ag.putImageData(aImg, 0, 0);
  const mat = new THREE.MeshStandardMaterial({
    color: groove,
    roughness: 0.95,
    metalness: 0,
    normalMap: tex(nc, false),
    normalScale: new THREE.Vector2(2.2, 2.2),
    alphaMap: tex(ac, false),
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthM, heightM), mat);
  mesh.receiveShadow = true;
  return mesh;
}

export function aboutEngraving(scene: THREE.Scene) {
  const M = H.monolith;
  const mesh = engraved(M.w - 0.6, M.h - 0.5, 300, (g, w, h) => {
    g.textAlign = "left";
    g.textBaseline = "alphabetic";
    g.font = `400 ${h * 0.06}px ${SANS}`;
    g.letterSpacing = `${h * 0.012}px`;
    g.fillText(ABOUT.title.toUpperCase(), w * 0.06, h * 0.14);
    g.letterSpacing = "0px";
    g.font = `400 ${h * 0.155}px ${SERIF}`;
    ABOUT.lines.forEach((ln, i) => g.fillText(ln, w * 0.06, h * 0.32 + i * h * 0.155));
  });
  mesh.position.set(M.x, 0.6 + 0.25 + (M.h - 0.5) / 2, M.z + M.t / 2 + 0.003);
  scene.add(mesh);
  // A raking light sweeps across the face when the camera arrives, so the cuts catch it.
  const rake = new THREE.SpotLight(0xffd6a6, 0, 14, 0.42, 0.6, 1.4);
  rake.position.set(M.x - 6, 2.6, M.z + 2.4);
  rake.target.position.set(M.x, 2.1, M.z);
  scene.add(rake, rake.target);
  return {
    update(k: number) {
      rake.intensity = 70 * ease(k);
      rake.position.x = M.x - 6 + 2.2 * ease(k);
    },
  };
}

// ── 3. Services: sunlight through the glass carries the words onto the wall ─
export function servicesProjection(scene: THREE.Scene) {
  const [c, g] = canvas(1400, 1400);
  g.fillStyle = "#000";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#fff";
  g.filter = "blur(1.4px)";
  // The text block keeps the wall's proportions (≈7 m × 3.3 m) inside the square map.
  g.font = `400 40px ${SANS}`;
  g.letterSpacing = "10px";
  g.fillText(SERVICES.title.toUpperCase(), 190, 480);
  g.letterSpacing = "0px";
  g.font = `400 96px ${SERIF}`;
  SERVICES.items.forEach((it, i) => g.fillText(it.name, 190, 610 + i * 112));
  // Soft window edge, so it reads as a patch of sun.
  g.filter = "blur(26px)";
  g.globalCompositeOperation = "destination-in";
  g.fillRect(110, 390, c.width - 220, 660);
  const map = tex(c);
  const W = H.gobo, z = H.pavilion.z1 - 0.12;
  const spot = new THREE.SpotLight(0xffd3a1, 0, 60, 0.13, 0.2, 1);
  spot.map = map;
  spot.castShadow = true;
  spot.shadow.mapSize.set(1024, 1024);
  spot.shadow.bias = -0.0004;
  spot.shadow.camera.near = 4;
  spot.shadow.camera.far = 60;
  const cx = (W.x0 + W.x1) / 2;
  spot.position.set(cx - 0.6, 3.4, -18);
  spot.target.position.set(cx, 2.35, z);
  scene.add(spot, spot.target);
  return {
    light: spot,
    update(k: number) {
      // The patch of sun slides into place and settles as the camera holds.
      spot.intensity = 3200 * ease(k);
      spot.position.x = cx - 0.6 - (1 - ease(k)) * 3;
      spot.target.position.y = 2.35 + (1 - ease(k)) * 0.5;
    },
  };
}

// ── 4. Testimonial: printed in an open book on the coffee table ──────────
export function openBook(scene: THREE.Scene, center: THREE.Vector3, top: number) {
  const group = new THREE.Group();
  const pageW = 0.215, pageD = 0.29;
  const [lc, lg] = canvas(860, 1160);
  const [rc, rg] = canvas(860, 1160);
  for (const g of [lg, rg]) {
    const grd = g.createLinearGradient(0, 0, 860, 0);
    grd.addColorStop(0, "#efe7d6");
    grd.addColorStop(1, "#f6f0e2");
    g.fillStyle = grd;
    g.fillRect(0, 0, 860, 1160);
    g.fillStyle = "#2a2622";
  }
  // Left page: the quote. Right page: who said it.
  lg.font = `italic 400 64px ${SERIF}`;
  const words = `“${TESTIMONIAL.quote}”`.split(" ");
  let line = "", y = 230;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (lg.measureText(test).width > 660) { lg.fillText(line, 100, y); y += 84; line = w; } else line = test;
  }
  lg.fillText(line, 100, y);
  lg.font = `400 26px ${SANS}`;
  lg.letterSpacing = "6px";
  lg.fillText("VANTMERE · LETTERS", 100, 1060);
  rg.font = `400 30px ${SANS}`;
  rg.letterSpacing = "8px";
  rg.fillText("FROM", 120, 260);
  rg.letterSpacing = "0px";
  rg.font = `400 92px ${SERIF}`;
  rg.fillText(TESTIMONIAL.by, 120, 380);
  rg.font = `italic 400 54px ${SERIF}`;
  rg.fillText(TESTIMONIAL.where, 120, 460);
  rg.font = `400 26px ${SANS}`;
  rg.letterSpacing = "6px";
  rg.fillText("CLIENTS SINCE 2016", 120, 1060);

  const pageGeo = () => {
    const geo = new THREE.PlaneGeometry(pageW, pageD, 16, 1);
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i) + pageW / 2; // 0 at the spine
      p.setZ(i, Math.sin((x / pageW) * Math.PI) * 0.012 + Math.sqrt(Math.max(0, x / pageW)) * 0.006);
    }
    geo.computeVertexNormals();
    return geo;
  };
  const paper = (c: HTMLCanvasElement) => new THREE.MeshStandardMaterial({ map: tex(c), roughness: 0.9 });
  const left = new THREE.Mesh(pageGeo(), paper(lc));
  left.scale.x = -1; // curve away from the spine to the left
  left.position.x = -pageW / 2;
  const leftPivot = new THREE.Group();
  leftPivot.add(left);
  const right = new THREE.Mesh(pageGeo(), paper(rc));
  right.position.x = pageW / 2;
  const rightPivot = new THREE.Group();
  rightPivot.add(right);
  const pages = new THREE.Group();
  pages.add(leftPivot, rightPivot);
  pages.rotation.x = -Math.PI / 2;
  pages.position.y = 0.024;
  // Linen boards under the block.
  const cover = new THREE.Mesh(box(pageW * 2 + 0.02, 0.022, pageD + 0.02, 0.5), new THREE.MeshStandardMaterial({ color: 0x2f3a36, roughness: 0.85 }));
  cover.position.y = 0.011;
  group.add(cover, pages);
  group.position.set(center.x - 0.1, top + 0.001, center.z - 0.05);
  group.rotation.y = 0.12;
  group.traverse((o) => { (o as THREE.Mesh).castShadow = true; (o as THREE.Mesh).receiveShadow = true; });
  scene.add(group);
  return {
    group,
    update(k: number) {
      // The right page settles from mid-turn to flat as the camera arrives.
      rightPivot.rotation.y = -(1 - ease(k)) * 2.2;
    },
  };
}

// ── 5. Listings: framed photographs on the gallery wall ───────────────────
export function galleryFrames(scene: THREE.Scene) {
  const z = H.pavilion.z1 - 0.13;
  const frames: { photo: THREE.MeshBasicMaterial; light: THREE.SpotLight; x: number }[] = [];
  const oak = new THREE.MeshStandardMaterial({ color: 0x2b2420, roughness: 0.55 });
  const xs = [4.0, 5.95, 7.9];
  LISTINGS.forEach((l, i) => {
    const x = xs[i];
    const fw = 1.5, fh = 1.1;
    const frame = new THREE.Mesh(box(fw, fh, 0.06, 1), oak);
    frame.position.set(x, 2.35, z - 0.03);
    frame.castShadow = true;
    const mat = new THREE.Mesh(new THREE.PlaneGeometry(fw - 0.1, fh - 0.1), new THREE.MeshStandardMaterial({ color: 0xf2eee6, roughness: 0.95 }));
    mat.position.set(x, 2.35, z - 0.061);
    mat.rotation.y = Math.PI;
    const photoMat = new THREE.MeshBasicMaterial({ color: 0x777777 });
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(fw - 0.42, (fw - 0.42) * 0.62), photoMat);
    photo.position.set(x, 2.38, z - 0.063);
    photo.rotation.y = Math.PI;
    // Caption plaque in the passe-partout margin.
    const [c, g] = canvas(1024, 160);
    g.fillStyle = "#f2eee6";
    g.fillRect(0, 0, 1024, 160);
    g.fillStyle = "#2a2622";
    g.font = `400 58px ${SERIF}`;
    g.fillText(l.name, 0, 62);
    g.font = `400 26px ${SANS}`;
    g.letterSpacing = "3px";
    g.fillText(`${l.where.toUpperCase()}  ·  ${l.spec.toUpperCase()}  ·  ${l.price.toUpperCase()}`, 0, 120);
    const cap = new THREE.Mesh(new THREE.PlaneGeometry(fw - 0.42, ((fw - 0.42) * 160) / 1024), new THREE.MeshStandardMaterial({ map: tex(c), roughness: 0.95 }));
    cap.position.set(x, 2.35 - (fh - 0.1) / 2 + 0.1, z - 0.063);
    cap.rotation.y = Math.PI;
    const light = new THREE.SpotLight(0xffe2bd, 0, 5, 0.42, 0.7, 1.5);
    light.position.set(x, H.ceil - 0.05, z - 1.3);
    light.target.position.set(x, 2.3, z);
    scene.add(frame, mat, photo, cap, light, light.target);
    frames.push({ photo: photoMat, light, x });
  });
  return {
    frames,
    update(k: number) {
      frames.forEach((f, i) => { f.light.intensity = 30 * ease(k * 3 - i * 0.7); });
    },
  };
}

// ── 6. Process: anamorphic paint, readable from exactly one place ─────────
export const ANAMORPHIC_EYE = new THREE.Vector3(9.35, 1.62, 10.05);
export const ANAMORPHIC_LOOK = new THREE.Vector3(15.3, 1.85, 10.05);
export function anamorphic(scene: THREE.Scene) {
  const [c, g] = canvas(2048, 1152);
  g.fillStyle = "#fff";
  g.textBaseline = "alphabetic";
  const cols = [0.07, 0.53];
  PROCESS.steps.forEach((s, i) => {
    const x = c.width * cols[i % 2], y = c.height * (i < 2 ? 0.34 : 0.78);
    g.font = `400 70px ${SANS}`;
    g.fillText(s.n, x, y - 170);
    g.font = `400 210px ${SERIF}`;
    g.fillText(s.name, x, y);
  });
  const map = tex(c, false);
  const proj = new THREE.PerspectiveCamera(56, c.width / c.height, 0.1, 50);
  proj.position.copy(ANAMORPHIC_EYE);
  proj.lookAt(ANAMORPHIC_LOOK);
  proj.updateMatrixWorld();
  proj.updateProjectionMatrix();
  const m = new THREE.Matrix4().multiplyMatrices(proj.projectionMatrix, proj.matrixWorldInverse);
  const uniforms = { uTex: { value: map }, uProj: { value: m }, uLight: { value: 0.0 }, uColor: { value: new THREE.Color(0xb88b4a) } };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `
      uniform sampler2D uTex; uniform mat4 uProj; uniform float uLight; uniform vec3 uColor; varying vec3 vW;
      void main(){
        vec4 c = uProj * vec4(vW, 1.0);
        if (c.w <= 0.0) discard;
        vec2 uv = c.xy / c.w * 0.5 + 0.5;
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
        float a = texture2D(uTex, uv).r;
        if (a < 0.02) discard;
        gl_FragColor = vec4(uColor * uLight, a * 0.94);
        #include <colorspace_fragment>
      }`,
  });
  const K = H.corridor, F = H.floor, C = H.ceil;
  const e = 0.004;
  const planes: [THREE.PlaneGeometry, THREE.Vector3, THREE.Euler][] = [
    [new THREE.PlaneGeometry(K.x1 - K.x0, K.z1 - K.z0), new THREE.Vector3((K.x0 + K.x1) / 2, F + 0.02, (K.z0 + K.z1) / 2), new THREE.Euler(-Math.PI / 2, 0, 0)], // floor
    [new THREE.PlaneGeometry(K.x1 - K.x0, K.z1 - K.z0), new THREE.Vector3((K.x0 + K.x1) / 2, C - e, (K.z0 + K.z1) / 2), new THREE.Euler(Math.PI / 2, 0, 0)], // ceiling
    [new THREE.PlaneGeometry(K.x1 - K.x0, C - F), new THREE.Vector3((K.x0 + K.x1) / 2, (F + C) / 2, K.z0 + 0.12 + e), new THREE.Euler(0, 0, 0)], // north wall
    [new THREE.PlaneGeometry(K.x1 - K.x0, C - F), new THREE.Vector3((K.x0 + K.x1) / 2, (F + C) / 2, K.z1 - 0.12 - e), new THREE.Euler(0, Math.PI, 0)], // south wall
    [new THREE.PlaneGeometry(K.z1 - K.z0, C - F), new THREE.Vector3(K.x1 - e, (F + C) / 2, (K.z0 + K.z1) / 2), new THREE.Euler(0, -Math.PI / 2, 0)], // end wall + door
  ];
  for (const [geo, p, r] of planes) {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(p);
    mesh.rotation.copy(r);
    mesh.renderOrder = 3;
    scene.add(mesh);
  }
  return {
    update(k: number, interior: number) { uniforms.uLight.value = (0.55 + 0.45 * interior) * (0.6 + 0.4 * ease(k)); },
  };
}

// ── 7. In numbers: inlaid in the pool floor as mosaic ─────────────────────
export function poolMosaic(scene: THREE.Scene, waterNormals: THREE.Texture) {
  const P = H.pool;
  const W = P.x1 - P.x0, D = P.z1 - P.z0;
  const tile = 0.05;
  const cols = Math.round(W / tile), rows = Math.round(D / tile);
  // Text mask at one pixel per tile.
  const [, mg] = canvas(cols, rows);
  mg.fillStyle = "#000";
  mg.fillRect(0, 0, cols, rows);
  mg.fillStyle = "#fff";
  mg.textBaseline = "alphabetic";
  const colW = cols / 3;
  EXPERTISE.stats.forEach((s, i) => {
    const cx = colW * i + colW * 0.12;
    mg.font = `400 ${rows * 0.42}px ${SERIF}`;
    mg.fillText(s.value, cx, rows * 0.55);
    mg.font = `500 ${rows * 0.085}px ${SANS}`;
    mg.fillText(s.label.toUpperCase(), cx + 2, rows * 0.74);
  });
  const mask = mg.getImageData(0, 0, cols, rows).data;
  const px = 10;
  const [c, g] = canvas(cols * px, rows * px);
  g.fillStyle = "#c9d9d6"; // grout
  g.fillRect(0, 0, c.width, c.height);
  let seed = 3;
  const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const m = mask[(y * cols + x) * 4] / 255;
      const v = r();
      // Pale glass tiles; the numbers in deep brass-gold.
      const base = [182 + v * 22, 214 + v * 16, 214 + v * 14];
      const ink = [150 + v * 30, 112 + v * 20, 58 + v * 16];
      const t = m > 0.45 ? 1 : 0;
      g.fillStyle = `rgb(${base.map((b, k) => Math.round(b * (1 - t) + ink[k] * t)).join(",")})`;
      g.fillRect(x * px + 1, y * px + 1, px - 2, px - 2);
    }
  }
  const floorMat = new THREE.MeshStandardMaterial({ map: tex(c), roughness: 0.25, metalness: 0 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.rotation.z = Math.PI; // reads upright from above, facing south (away from the lake)
  floor.position.set((P.x0 + P.x1) / 2, P.floor + 0.005, (P.z0 + P.z1) / 2);
  floor.receiveShadow = true;
  scene.add(floor);

  const wn = waterNormals.clone();
  wn.wrapS = wn.wrapT = THREE.RepeatWrapping;
  wn.repeat.set(2, 1.6);
  const surf = new THREE.MeshPhysicalMaterial({
    color: 0x7fb3b4, transparent: true, opacity: 0.32, roughness: 0.04, metalness: 0,
    normalMap: wn, normalScale: new THREE.Vector2(0.6, 0.6), envMapIntensity: 1.4, depthWrite: false,
  });
  const water = new THREE.Mesh(new THREE.PlaneGeometry(W, D), surf);
  water.rotation.x = -Math.PI / 2;
  water.position.set((P.x0 + P.x1) / 2, P.water, (P.z0 + P.z1) / 2);
  water.renderOrder = 4;
  scene.add(water);
  return {
    update(k: number, time: number) {
      wn.offset.set(time * 0.012, time * 0.008);
      const calm = 1 - 0.9 * ease(k);
      surf.normalScale.set(0.6 * calm, 0.6 * calm);
      surf.opacity = 0.32 - 0.14 * ease(k);
    },
  };
}

// ── 8. Contact: stars gather into words in the night sky ──────────────────
export function skyWords(scene: THREE.Scene, eye: THREE.Vector3, look: THREE.Vector3) {
  const [c, g] = canvas(1400, 420);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.font = `400 190px ${SERIF}`;
  g.fillText(CONTACT.title.split(" ").slice(0, 1).join(" "), 700, 190);
  g.font = `italic 400 150px ${SERIF}`;
  g.fillText(CONTACT.title.split(" ").slice(1).join(" "), 700, 360);
  const data = g.getImageData(0, 0, c.width, c.height).data;
  const dir = look.clone().sub(eye).normalize();
  const dist = 320;
  const centre = eye.clone().addScaledVector(dir, dist);
  const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize();
  const up = new THREE.Vector3().crossVectors(right, dir).normalize();
  const widthM = 2 * dist * Math.tan(THREE.MathUtils.degToRad(46) / 2) * 0.82;
  const scale = widthM / c.width;
  const targets: number[] = [];
  const step = 4;
  for (let y = 0; y < c.height; y += step) {
    for (let x = 0; x < c.width; x += step) {
      if (data[(y * c.width + x) * 4 + 3] > 140) {
        const jx = (Math.random() - 0.5) * step, jy = (Math.random() - 0.5) * step;
        const p = centre.clone().addScaledVector(right, (x + jx - c.width / 2) * scale).addScaledVector(up, (c.height / 2 - y - jy) * scale);
        targets.push(p.x, p.y, p.z);
      }
    }
  }
  const nWord = targets.length / 3;
  const nField = 2600;
  const n = nWord + nField;
  const pos = new Float32Array(n * 3), start = new Float32Array(n * 3), size = new Float32Array(n), phase = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    // Background stars on a high dome.
    const a = Math.random() * Math.PI * 2, b = Math.acos(1 - Math.random() * 0.92);
    const R = 1800;
    const sx = Math.sin(b) * Math.cos(a) * R, sy = Math.cos(b) * R * 0.9 + 40, sz = Math.sin(b) * Math.sin(a) * R;
    start.set([sx, sy, sz], i * 3);
    if (i < nWord) pos.set(targets.slice(i * 3, i * 3 + 3), i * 3); else pos.set([sx, sy, sz], i * 3);
    size[i] = i < nWord ? 1.6 + Math.random() * 1.2 : 0.6 + Math.pow(Math.random(), 3) * 2.2;
    phase[i] = Math.random() * 6.28;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aStart", new THREE.BufferAttribute(start, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  geo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
  const uniforms = { uForm: { value: 0 }, uNight: { value: 0 }, uTime: { value: 0 }, uPx: { value: 1 } };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
    vertexShader: `
      attribute vec3 aStart; attribute float aSize; attribute float aPhase;
      uniform float uForm, uTime, uPx; varying float vTw;
      void main(){
        float f = smoothstep(0.0, 1.0, clamp(uForm * 1.25 - fract(aPhase * 0.159) * 0.25, 0.0, 1.0));
        vec3 p = mix(aStart, position, f);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        vTw = 0.65 + 0.35 * sin(uTime * 1.7 + aPhase * 7.0);
        gl_PointSize = aSize * uPx * (1.0 + f * 0.4);
      }`,
    fragmentShader: `
      uniform float uNight; varying float vTw;
      void main(){
        vec2 d = gl_PointCoord - 0.5; float r = length(d);
        float a = smoothstep(0.5, 0.0, r);
        gl_FragColor = vec4(vec3(1.0, 0.95, 0.86) * a * vTw * uNight, a * uNight);
      }`,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  pts.renderOrder = -5;
  scene.add(pts);
  return {
    anchor: centre.clone().addScaledVector(up, -(c.height / 2 + 30) * scale),
    update(k: number, night: number, time: number, px: number) {
      uniforms.uForm.value = ease(k);
      uniforms.uNight.value = night;
      uniforms.uTime.value = time;
      uniforms.uPx.value = px;
    },
  };
}

// ── 9. Footer: carved into the jetty, lanterns at the end ─────────────────
export function jettyEngraving(scene: THREE.Scene, jetty: { x: number; z1: number; y: number; w: number }) {
  const len = 6.2;
  const mesh = engraved(jetty.w - 0.5, len, 220, (g, w, h) => {
    g.textAlign = "center";
    g.font = `400 ${w * 0.21}px ${SERIF}`;
    g.fillText(BRAND.name, w / 2, h * 0.36);
    g.font = `400 ${w * 0.048}px ${SANS}`;
    g.letterSpacing = `${w * 0.012}px`;
    g.fillText(`${BRAND.place.toUpperCase()}  ·  ${BRAND.founded.toUpperCase()}`, w / 2, h * 0.47);
  }, 0xd9cdb5);
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = Math.PI; // read from the lake end, looking back at the house
  const cz = jetty.z1 + len / 2 + 0.6;
  mesh.position.set(jetty.x, jetty.y + 0.004, cz);
  scene.add(mesh);
  // The letters are inlaid with pale lime, so they read under lantern light at night.
  const inlay = mesh.material as THREE.MeshStandardMaterial;
  inlay.emissive.set(0x6b5233);
  inlay.emissiveIntensity = 0;
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffc27a, transparent: true, opacity: 0 });
  const postMat = new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.5, metalness: 0.6 });
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(box(0.14, 0.7, 0.14, 1), postMat);
    post.position.set(jetty.x + sx * (jetty.w / 2 - 0.18), jetty.y + 0.35, cz);
    const glow = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.1), glowMat);
    glow.position.set(post.position.x, jetty.y + 0.6, post.position.z);
    scene.add(post, glow);
  }
  // One light between the two lanterns stands in for both.
  const lantern = new THREE.PointLight(0xffb873, 0, 10, 1.6);
  lantern.position.set(jetty.x, jetty.y + 0.9, cz);
  scene.add(lantern);
  return {
    // Links sit on the near end of the jetty, below the lettering.
    anchor: new THREE.Vector3(jetty.x, jetty.y, cz - len * 0.62),
    update(k: number, night: number) {
      const on = ease(k) * (0.4 + 0.6 * night);
      lantern.intensity = 16 * on;
      inlay.emissiveIntensity = 0.9 * on;
      glowMat.opacity = on;
    },
  };
}
