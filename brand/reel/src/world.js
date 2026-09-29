import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import opentype from "opentype.js";

/** Environment map for metals (same idea as the website's 3D emblem). */
export function makeEnv(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04, 0.1, 100, { size: 256 }).texture;
  return env;
}

export const MAT = {
  gold: () => new THREE.MeshPhysicalMaterial({ color: 0xc9a86a, metalness: 1, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
  ivory: () => new THREE.MeshPhysicalMaterial({ color: 0xe6dccb, metalness: 0.25, roughness: 0.36, clearcoat: 0.8, clearcoatRoughness: 0.18 }),
  inkMetal: () => new THREE.MeshPhysicalMaterial({ color: 0x141418, metalness: 0.7, roughness: 0.35, clearcoat: 0.4 }),
};

/**
 * A flat interface card in 3D: a plane textured with a Canvas2D drawing, plus
 * a soft contact shadow. `draw(ctx, W, H, state)` repaints only when the state
 * key changes.
 */
export function makeCard({ w, h, ppu = 420, draw, shadow = true, opacity = 1 }) {
  const W = Math.round(w * ppu), H = Math.round(h * ppu);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity, depthWrite: false, toneMapped: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  const group = new THREE.Group();
  group.add(mesh);
  if (shadow) {
    const s = makeShadow(w * 1.12, h * 1.2);
    s.position.set(0.04, -0.08, -0.04);
    group.add(s);
    group.userData.shadow = s;
  }
  let key = null;
  const card = {
    group,
    mesh,
    mat,
    ctx,
    W,
    H,
    set(state) {
      const k = JSON.stringify(state);
      if (k === key) return;
      key = k;
      draw(ctx, W, H, state);
      tex.needsUpdate = true;
    },
  };
  return card;
}

let shadowTex;
export function makeShadow(w, h) {
  if (!shadowTex) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(128, 128, 10, 128, 128, 128);
    grd.addColorStop(0, "rgba(0,0,0,0.75)");
    grd.addColorStop(0.55, "rgba(0,0,0,0.35)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    shadowTex = new THREE.CanvasTexture(c);
  }
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, toneMapped: false }));
}

/** The "ledger": an infinite ink floor with a hairline grid that fades with distance. */
export function makeGrid({ size = 400, cell = 1, y = 0 } = {}) {
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uCell: { value: cell }, uAmount: { value: 0.07 }, uGold: { value: 0 }, uFade: { value: 38 }, uOrigin: { value: new THREE.Vector2() }, uMajor: { value: 8 } },
    vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `
      varying vec3 vW; uniform float uCell,uAmount,uGold,uFade,uMajor; uniform vec2 uOrigin;
      float line(vec2 p, float c){ vec2 g = abs(fract(p/c - .5) - .5) / fwidth(p/c); return 1. - min(min(g.x,g.y),1.); }
      void main(){
        vec2 p = vW.xz;
        float l = line(p, uCell) * 0.55 + line(p, uCell*uMajor) * 0.9;
        float d = length(p - uOrigin);
        float fade = exp(-d*d/(uFade*uFade));
        vec3 col = mix(vec3(0.96,0.94,0.90), vec3(0.79,0.66,0.42), uGold);
        gl_FragColor = vec4(col, l * uAmount * fade);
      }`,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  return m;
}

/**
 * A thread (tube) along points; `setProgress(p)` reveals it from the start and
 * moves a glowing head to the tip.
 */
export function makeThread(points, { radius = 0.035, color = "gold", segments = 400, tension = 0.3 } = {}) {
  const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", tension);
  const geo = new THREE.TubeGeometry(curve, segments, radius, 10, false);
  const mat = color === "gold" ? MAT.gold() : MAT.ivory();
  if (color === "gold") {
    mat.emissive = new THREE.Color(0x8a6a2f);
    mat.emissiveIntensity = 0.35;
  }
  const mesh = new THREE.Mesh(geo, mat);
  const total = geo.index.count;
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 2.2, 20, 14),
    new THREE.MeshBasicMaterial({ color: color === "gold" ? new THREE.Color(3.2, 2.5, 1.3) : new THREE.Color(2.4, 2.3, 2.1), toneMapped: true })
  );
  const group = new THREE.Group();
  group.add(mesh, head);
  const perSeg = total / segments;
  return {
    group,
    curve,
    mesh,
    head,
    setProgress(p) {
      const k = Math.max(0, Math.min(1, p));
      geo.setDrawRange(0, Math.floor((k * segments)) * perSeg);
      mesh.visible = k > 0.001;
      head.visible = k > 0.001 && k < 0.999;
      head.position.copy(curve.getPointAt(Math.min(0.999, k)));
    },
  };
}

// ── Logo geometry (straight from the site's golden-section mark) ───────────
const STROKE = 19.1, GAP = 33.7, BAND = 61.8;
export const GOLD_LINE = [[-47.4, -99.6], [71, 99.6]];
export const IVORY_LINE = [[47.4, -99.6], [-71, 99.6]];
function bandStroke([a, b], width, band = BAND) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const half = (width / 2) * (Math.hypot(dx, dy) / Math.abs(dy));
  const xAt = (y) => a[0] + (dx * (y - a[1])) / dy;
  return [[xAt(-band) - half, -band], [xAt(-band) + half, -band], [xAt(band) + half, band], [xAt(band) - half, band]];
}
function clipHalf(poly, side) {
  const out = [];
  const L = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i], prev = poly[(i + poly.length - 1) % poly.length];
    const sc = side(cur), sp = side(prev);
    if (sc >= 0) {
      if (sp < 0) out.push(L(prev, cur, sp / (sp - sc)));
      out.push(cur);
    } else if (sp >= 0) out.push(L(prev, cur, sp / (sp - sc)));
  }
  return out;
}
/** x of a logo line at a given (svg) y. */
export function lineX([a, b], y) {
  return a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]);
}
export function logoPolys() {
  const gold = bandStroke(GOLD_LINE, STROKE);
  const ivory = bandStroke(IVORY_LINE, STROKE);
  const [a, b] = IVORY_LINE;
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const halfGap = (GAP / 2) * (Math.hypot(dx, dy) / Math.abs(dy));
  const off = (p) => p[0] - (a[0] + (dx * (p[1] - a[1])) / dy);
  return {
    goldParts: [clipHalf(gold, (p) => -off(p) - halfGap), clipHalf(gold, (p) => off(p) - halfGap)].filter((p) => p.length >= 3),
    ivory,
  };
}

/** The XMEL mark as extruded metal, lying in the XY plane (y up), scaled to `size` units tall. */
export function makeLogo({ size = 4, depth = 16 } = {}) {
  const { goldParts, ivory } = logoPolys();
  const s = size / (BAND * 2);
  const ex = (poly, d) => {
    const shape = new THREE.Shape(poly.map(([x, y]) => new THREE.Vector2(x * s, -y * s)));
    const g = new THREE.ExtrudeGeometry(shape, { depth: d * s, bevelEnabled: true, bevelThickness: 1.6 * s, bevelSize: 1.2 * s, bevelSegments: 4, curveSegments: 1 });
    g.translate(0, 0, (-d * s) / 2);
    return g;
  };
  const group = new THREE.Group();
  const goldMat = MAT.gold();
  const ivoryMat = MAT.ivory();
  const golds = goldParts.map((p) => new THREE.Mesh(ex(p, depth), goldMat));
  const iv = new THREE.Mesh(ex(ivory, depth), ivoryMat);
  iv.position.z = 4 * s;
  group.add(...golds, iv);
  return { group, golds, ivory: iv, goldMat, ivoryMat, scale: s };
}

/** Rounded phone body with a screen card. Screen is w×h units. */
export function makePhone({ w = 1.8, h = 3.9, draw, ppu = 520 }) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(w + 0.16, h + 0.16, 0.18, 6, 0.26), MAT.inkMetal());
  body.position.z = -0.1;
  group.add(body);
  const screen = makeCard({ w, h, ppu, draw, shadow: false });
  screen.group.position.z = 0.0;
  group.add(screen.group);
  // rounded screen mask via the card canvas corners (drawn by the screen draw fn)
  return { group, screen, body };
}

/** Extruded 3D text from a TTF (used for the gold "42s"). */
export async function makeText3D(url, str, { size = 1, depth = 0.25, material }) {
  const buf = await (await fetch(url)).arrayBuffer();
  const f = opentype.parse(buf);
  const path = f.getPath(str, 0, 0, 100);
  const sp = new THREE.ShapePath();
  for (const c of path.commands) {
    if (c.type === "M") sp.moveTo(c.x, -c.y);
    else if (c.type === "L") sp.lineTo(c.x, -c.y);
    else if (c.type === "Q") sp.quadraticCurveTo(c.x1, -c.y1, c.x, -c.y);
    else if (c.type === "C") sp.bezierCurveTo(c.x1, -c.y1, c.x2, -c.y2, c.x, -c.y);
  }
  const shapes = sp.toShapes(false);
  const g = new THREE.ExtrudeGeometry(shapes, { depth: 18, bevelEnabled: true, bevelThickness: 2.4, bevelSize: 1.6, bevelSegments: 4, curveSegments: 10 });
  g.computeBoundingBox();
  const bb = g.boundingBox;
  g.translate(-(bb.max.x + bb.min.x) / 2, -(bb.max.y + bb.min.y) / 2, -9);
  const k = size / (bb.max.y - bb.min.y);
  g.scale(k, k, (depth / 18) * 1);
  return new THREE.Mesh(g, material);
}

/** Point the camera from `pos` at `look`, with fov and roll (radians). */
export function aim(cam, pos, look, fov, roll = 0, up = null) {
  cam.position.set(pos[0], pos[1], pos[2]);
  // Top-down shots need an explicit up vector (world-up is degenerate there).
  if (up) cam.up.set(up[0], up[1], up[2]).normalize();
  else cam.up.set(Math.sin(roll), Math.cos(roll), 0);
  cam.lookAt(look[0], look[1], look[2]);
  if (fov && cam.fov !== fov) {
    cam.fov = fov;
    cam.updateProjectionMatrix();
  }
}
