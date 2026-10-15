import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { ASSET, box, loadTex, modelParts, pbr, loadModel } from "./materials";

/** Deterministic value noise / fbm for the terrain. */
function hash(x: number, z: number) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x: number, z: number) {
  const xi = Math.floor(x), zi = Math.floor(z);
  const xf = x - xi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x: number, z: number) {
  let s = 0, a = 0.5, f = 1;
  for (let i = 0; i < 5; i++) { s += a * vnoise(x * f, z * f); f *= 2; a *= 0.5; }
  return s;
}
export function rand(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Shoreline: land is z > shore(x). The house pad sits at y = 0.6. */
export const shore = (x: number) => 1.5 + 3.2 * Math.sin(x * 0.045 + 0.6) + 1.6 * Math.sin(x * 0.12 + 2.1);
export const PAD = { x0: -26, x1: 30, z0: -1, z1: 22, y: 0.6 };

export function heightAt(x: number, z: number) {
  const d = z - shore(x);
  if (d < 0) return -0.35 - 3.5 * smooth(0, 16, -d) + 0.3 * fbm(x * 0.08, z * 0.08);
  const n = fbm(x * 0.03 + 4, z * 0.03 + 9);
  let h = 0.45 + 0.9 * smooth(0, 10, d) + Math.min(60, Math.pow(Math.max(0, d - 18), 1.22) * 0.05) + (n - 0.5) * 3.2 * smooth(6, 40, d);
  // Hills wrap the lake to the east and west.
  h += Math.min(45, Math.max(0, Math.abs(x) - 70) * 0.12) * smooth(-20, 40, d + 30) * (0.7 + 0.6 * n);
  // Flatten a building pad around the house and the entry path.
  const inPad = smooth(PAD.x0 - 8, PAD.x0, x) * (1 - smooth(PAD.x1, PAD.x1 + 8, x)) * smooth(PAD.z0 - 1, PAD.z0 + 2, z) * (1 - smooth(PAD.z1, PAD.z1 + 14, z));
  h = h * (1 - inPad) + (PAD.y - 0.05) * inPad;
  // The entry path climbs gently from the terrace, never above eye level.
  const onPath = smooth(-30, -24, x) * (1 - smooth(-4, 2, x)) * smooth(14, 20, z) * (1 - smooth(64, 76, z));
  const pathY = PAD.y - 0.05 + Math.max(0, z - 22) * 0.025;
  h = h * (1 - onPath) + Math.min(h, pathY) * onPath;
  return h;
}

export async function buildLandscape(scene: THREE.Scene, quality: "high" | "low") {
  const group = new THREE.Group();
  scene.add(group);

  // ── Terrain ───────────────────────────────────────────────────────────
  const size = 760, seg = quality === "high" ? 300 : 180;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, 0, 120);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const blend = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    pos.setY(i, heightAt(x, z));
    // 0 = forest ground, 1 = grass-rock (steeper / shore / noise)
    const d = z - shore(x);
    blend[i] = Math.min(1, Math.max(0, (fbm(x * 0.05, z * 0.05) - 0.45) * 2.4 + (d < 3 ? 0.8 : 0)));
  }
  geo.setAttribute("aBlend", new THREE.BufferAttribute(blend, 1));
  geo.computeVertexNormals();
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i)) / 7, (pos.getZ(i)) / 7);

  const ground = await pbr("forrest_ground_01", { tile: 7 });
  const rockTex = await Promise.all([loadTex(`${ASSET}/tex/aerial_grass_rock/diff.webp`, true), loadTex(`${ASSET}/tex/aerial_grass_rock/nor.webp`)]);
  ground.onBeforeCompile = (sh) => {
    sh.uniforms.map2 = { value: rockTex[0] };
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nattribute float aBlend;\nvarying float vBlend;\nvarying vec2 vUvW;\nvarying vec2 vWXZ;")
      .replace("#include <uv_vertex>", "#include <uv_vertex>\nvBlend = aBlend;\nvUvW = uv;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWXZ = (modelMatrix * vec4(transformed, 1.0)).xz;");
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform sampler2D map2;\nvarying float vBlend;\nvarying vec2 vUvW;\nvarying vec2 vWXZ;")
      // Cut the ground away inside the pool basin (H.pool in house.ts).
      .replace("void main() {", "void main() {\n  if (vWXZ.x > 16.0 && vWXZ.x < 26.0 && vWXZ.y > 2.0 && vWXZ.y < 10.0) discard;")
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
         vec4 c2 = texture2D(map2, vUvW * 0.6);
         vec4 c1b = texture2D(map, vUvW * 0.137 + 0.31);
         diffuseColor.rgb = mix(diffuseColor.rgb, c1b.rgb, 0.35);
         diffuseColor.rgb = mix(diffuseColor.rgb, c2.rgb, smoothstep(0.3, 0.8, vBlend));
         float lum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
         diffuseColor.rgb = mix(diffuseColor.rgb, lum * vec3(0.78, 0.98, 0.58), 0.55) * 0.82;`,
      );
  };
  const terrain = new THREE.Mesh(geo, ground);
  terrain.receiveShadow = true;
  terrain.name = "terrain";
  group.add(terrain);

  // ── Lake ──────────────────────────────────────────────────────────────
  const waterNormals = await loadTex(`${ASSET}/tex/waternormals.jpg`);
  const water = new Water(new THREE.PlaneGeometry(4000, 4000), {
    textureWidth: quality === "high" ? 1024 : 512,
    textureHeight: quality === "high" ? 1024 : 512,
    waterNormals,
    sunDirection: new THREE.Vector3(0.5, 0.2, -0.5).normalize(),
    sunColor: 0xffd9a8,
    waterColor: 0x0d2329,
    distortionScale: 0.75,
    fog: true,
    alpha: 1,
  });
  // The pool basin (H.pool in house.ts) sits below lake level: keep the lake out of it.
  const wm = water.material as THREE.ShaderMaterial;
  wm.fragmentShader = wm.fragmentShader.replace(
    "void main() {",
    "void main() {\n  if (worldPosition.x > 16.0 && worldPosition.x < 26.0 && worldPosition.z > 2.0 && worldPosition.z < 10.0) discard;",
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0;
  water.name = "lake";
  group.add(water);

  // ── Far shore: mountains across the lake ─────────────────────────────
  const mountain = await loadModel("mountainside");
  const mr = rand(11);
  for (let i = 0; i < 9; i++) {
    const m = mountain.clone();
    const a = -Math.PI * 0.42 + (i / 8) * Math.PI * 0.84 + (mr() - 0.5) * 0.08;
    const r = 560 + mr() * 180;
    const s = 26 + mr() * 18;
    m.position.set(Math.sin(a) * r * 1.2, -6 - mr() * 8, -Math.cos(a) * r - 60);
    m.scale.set(s, s * (0.55 + mr() * 0.4), s);
    m.rotation.y = mr() * Math.PI * 2;
    m.traverse((o) => { (o as THREE.Mesh).castShadow = false; });
    group.add(m);
  }

  // ── Jetty ─────────────────────────────────────────────────────────────
  const planks = await pbr("brown_planks_07", { tile: 2.4, color: 0xbab2a6 });
  const jetty = new THREE.Group();
  jetty.name = "jetty";
  const JX = -12, JZ0 = 0, JZ1 = -26, JY = 0.35, JW = 2.8;
  const deck = new THREE.Mesh(box(JW, 0.12, JZ0 - JZ1, 2.4, false), planks);
  deck.position.set(JX, JY - 0.06, (JZ0 + JZ1) / 2);
  deck.castShadow = deck.receiveShadow = true;
  jetty.add(deck);
  const postMat = await pbr("brown_planks_07", { tile: 1.5, color: 0x6f665c });
  for (let z = JZ0 - 1; z > JZ1; z -= 3.2) {
    for (const sx of [-1, 1]) {
      const p = new THREE.Mesh(box(0.22, 2.4, 0.22, 1.5, true), postMat);
      p.position.set(JX + sx * (JW / 2 - 0.12), JY - 1.25, z);
      p.castShadow = true;
      jetty.add(p);
    }
  }
  group.add(jetty);

  return { group, water, terrain, jetty: { x: JX, z0: JZ0, z1: JZ1, y: JY, w: JW } };
}

/** Rocks, trees, shrubs, grass: streamed in after the first frame. */
export async function populateNature(scene: THREE.Scene, quality: "high" | "low") {
  const group = new THREE.Group();
  scene.add(group);
  const r = rand(42);
  const dummy = new THREE.Object3D();

  async function scatter(model: string, count: number, place: () => { x: number; z: number; s: number; ry?: number; y?: number } | null, castShadow = true) {
    const parts = await modelParts(model);
    const mats: THREE.Matrix4[] = [];
    for (let i = 0, tries = 0; i < count && tries < count * 30; tries++) {
      const p = place();
      if (!p) continue;
      dummy.position.set(p.x, p.y ?? heightAt(p.x, p.z) - 0.05, p.z);
      dummy.rotation.set(0, p.ry ?? r() * Math.PI * 2, 0);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      mats.push(dummy.matrix.clone());
      i++;
    }
    for (const part of parts) {
      const im = new THREE.InstancedMesh(part.geometry, part.material, mats.length);
      mats.forEach((m, i) => im.setMatrixAt(i, m));
      im.castShadow = castShadow;
      im.receiveShadow = true;
      im.frustumCulled = false;
      group.add(im);
    }
  }

  const avoidHouse = (x: number, z: number) => x > -26 && x < 34 && z > -3 && z < 26;
  const onPath = (x: number, z: number) => x > -22 && x < -8 && z > 14 && z < 60;

  // Shore rocks (granite + moss), hugging the waterline.
  await scatter("boulder_granite", quality === "high" ? 26 : 14, () => {
    const x = (r() - 0.5) * 300;
    const z = shore(x) + (r() - 0.6) * 4;
    if (avoidHouse(x, z) && !(x < -14 || x > 28)) return null;
    return { x, z, s: 0.5 + r() * 1.3, y: heightAt(x, z) - 0.3 };
  });
  await scatter("rock_moss", quality === "high" ? 40 : 20, () => {
    const x = (r() - 0.5) * 260, z = shore(x) + 2 + r() * 40;
    if (avoidHouse(x, z) || onPath(x, z)) return null;
    return { x, z, s: 0.8 + r() * 1.6 };
  });
  await scatter("boulder", 10, () => {
    const x = (r() - 0.5) * 220, z = shore(x) + 6 + r() * 60;
    if (avoidHouse(x, z) || onPath(x, z)) return null;
    return { x, z, s: 0.6 + r() * 0.9 };
  });

  // Forest: near firs around the clearing, far firs on the hills.
  await scatter("fir_near", quality === "high" ? 46 : 22, () => {
    const a = r() * Math.PI * 2, d = 34 + r() * 50;
    const x = 4 + Math.cos(a) * d * 1.3, z = 18 + Math.sin(a) * d;
    if (z < shore(x) + 3 || avoidHouse(x, z) || onPath(x, z)) return null;
    return { x, z, s: 2.2 + r() * 1.6 };
  });
  await scatter("fir_far", quality === "high" ? 420 : 200, () => {
    const x = (r() - 0.5) * 680, z = shore(x) + 30 + r() * 260;
    if (Math.abs(x - 4) < 70 && z < 90) return null;
    return { x, z, s: 2.4 + r() * 2.6 };
  }, false);
  // Fir line along the far east/west shores, framing the hero view.
  await scatter("fir_far", quality === "high" ? 160 : 80, () => {
    const side = r() < 0.5 ? -1 : 1;
    const x = side * (90 + r() * 200), z = shore(x) + 2 + r() * 40 - Math.max(0, Math.abs(x) - 120) * 0.6;
    if (heightAt(x, z) < 0.3) return null;
    return { x, z, s: 2.6 + r() * 2.4 };
  }, false);

  // Hero trees beside the house.
  const island = await loadModel("island_tree");
  for (const [x, z, s, ry] of [[-19, 6, 1.25, 0.4], [27, 17, 1.1, 2.2], [-24, 24, 1.35, 4.1]] as const) {
    const t = island.clone();
    t.position.set(x, heightAt(x, z) - 0.1, z);
    t.scale.setScalar(s);
    t.rotation.y = ry;
    group.add(t);
  }

  // Understorey.
  await scatter("shrub_a", quality === "high" ? 70 : 30, () => {
    const x = (r() - 0.5) * 140, z = shore(x) + 2 + r() * 70;
    if (avoidHouse(x, z) || onPath(x, z)) return null;
    return { x, z, s: 0.9 + r() * 0.8 };
  });
  await scatter("shrub_b", quality === "high" ? 50 : 20, () => {
    const x = (r() - 0.5) * 120, z = shore(x) + 1 + r() * 50;
    if (avoidHouse(x, z) || onPath(x, z)) return null;
    return { x, z, s: 1 + r() * 0.8 };
  });
  await scatter("fern", quality === "high" ? 90 : 40, () => {
    const x = (r() - 0.5) * 120, z = shore(x) + 3 + r() * 60;
    if (avoidHouse(x, z) || onPath(x, z)) return null;
    return { x, z, s: 0.8 + r() * 0.7 };
  }, false);
  await scatter("grass", quality === "high" ? 420 : 160, () => {
    const x = -40 + r() * 90, z = shore(x) + 0.5 + r() * 50;
    if ((x > -18 && x < 31 && z > 0 && z < 17) || (x > -15 && x < -11 && z > 14)) return null;
    return { x, z, s: 0.8 + r() * 0.9 };
  }, false);

  return group;
}
