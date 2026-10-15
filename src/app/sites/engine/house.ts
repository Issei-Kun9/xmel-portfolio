import * as THREE from "three";
import { box, loadModel, pbr, slab } from "./materials";
import { heightAt, rand } from "./landscape";

/**
 * The Larch House. A glass pavilion on a concrete plinth at the water's edge,
 * a timber volume cantilevered over the lake above it, an infinity pool on
 * the east terrace and a freestanding concrete monolith on the entry path.
 * Everything is in metres; the lake surface is y = 0, floors are y = 0.6.
 */
export const H = {
  floor: 0.6,
  ceil: 3.98,
  roof: 4.35,
  upperTop: 7.7,
  pavilion: { x0: -9, x1: 9, z0: 3, z1: 12 },
  corridor: { x0: 9, x1: 15, z0: 8, z1: 12 },
  upper: { x0: -5, x1: 15.5, z0: -7, z1: 11 },
  pool: { x0: 16, x1: 26, z0: 2, z1: 10, floor: -0.6, water: 0.5 },
  monolith: { x: -14, z: 24, w: 6.4, h: 3.2, t: 0.5 },
  gobo: { x0: -8.6, x1: -1.6 }, // plaster wall that catches the projected sunlight
  gallery: { x0: 3, x1: 9 },
};

export type HouseParts = Awaited<ReturnType<typeof buildHouse>>;

export async function buildHouse(scene: THREE.Scene) {
  const g = new THREE.Group();
  g.name = "house";
  scene.add(g);

  const [concrete, floorConcrete, cladding, oak, slate, plaster] = await Promise.all([
    pbr("brushed_concrete", { tile: 3, color: 0xd8d2c8 }),
    pbr("concrete_floor_01", { tile: 3, color: 0xcfc8bd }),
    pbr("hinoki_planks", { tile: 2.2, color: 0xa99d92 }),
    pbr("oak_wood_planks", { tile: 2.4, color: 0xd9c3a5 }),
    pbr("castle_wall_slates", { tile: 2.2, color: 0x9a948c }),
    pbr("grey_plaster_02", { tile: 3, color: 0xefeae2 }),
  ]);
  const steel = new THREE.MeshStandardMaterial({ color: 0x15161a, metalness: 0.7, roughness: 0.38 });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x9fb2b4, metalness: 0, roughness: 0.03, transparent: true, opacity: 0.16,
    envMapIntensity: 2.2, side: THREE.DoubleSide, depthWrite: false, specularIntensity: 1, ior: 1.5,
  });
  const darkGlass = new THREE.MeshPhysicalMaterial({ color: 0x1b2226, metalness: 0.1, roughness: 0.05, envMapIntensity: 1.6 });

  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, opts: { cast?: boolean; receive?: boolean; name?: string } = {}) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = opts.cast ?? true;
    m.receiveShadow = opts.receive ?? true;
    if (opts.name) m.name = opts.name;
    g.add(m);
    return m;
  };
  /** Axis-aligned box from min/max corners. */
  const block = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, mat: THREE.Material, tile = 3, rot = false) =>
    add(box(x1 - x0, y1 - y0, z1 - z0, tile, rot), mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);

  const { floor: F, ceil: C, roof: R, upperTop: U, pavilion: P, corridor: K, upper: V, pool: PL } = H;

  // ── Plinth / terrace (with the pool cut out) ─────────────────────────
  block(-16, PL.x0, -2.2, F, 1, 16, floorConcrete, 3);
  block(PL.x0, 28, -2.2, F, PL.z1, 16, floorConcrete, 3);
  block(PL.x1, 28, -2.2, F, 1, PL.z1, floorConcrete, 3);
  block(PL.x0, PL.x1, -2.2, PL.water - 0.02, 1, PL.z0, floorConcrete, 3); // infinity lip, just under the water line
  // Steps from the terrace down to the jetty.
  for (let i = 0; i < 2; i++) block(-13.6, -10.4, -0.6, F - 0.12 * (i + 1), 0.2 - i * 0.4, 1 - i * 0.4, floorConcrete, 3);

  // ── Interior floor + ceiling ─────────────────────────────────────────
  add(slab(P.x1 - P.x0, P.z1 - P.z0, 2.4), oak, (P.x0 + P.x1) / 2, F + 0.012, (P.z0 + P.z1) / 2, { cast: false, name: "interior-floor" });
  add(slab(K.x1 - K.x0, K.z1 - K.z0, 2.4), oak, (K.x0 + K.x1) / 2, F + 0.012, (K.z0 + K.z1) / 2, { cast: false });
  const ceiling = add(slab(K.x1 - P.x0, P.z1 - P.z0 + 0.4, 3), plaster, (P.x0 + K.x1) / 2, C, (P.z0 + P.z1) / 2, { cast: false });
  ceiling.rotation.x = Math.PI;

  // ── Roof slab + upper timber volume (cantilever over the water) ──────
  block(P.x0 - 0.3, K.x1 + 0.3, C, R, P.z0 - 0.4, P.z1 + 0.4, concrete, 3);
  block(V.x0, V.x1, R, R + 0.32, V.z0, V.z1, concrete, 3); // soffit / floor plate of the upper volume
  const top = R + 0.32;
  // Timber cladding, vertical boards.
  block(V.x0, V.x1, top, U, V.z1 - 0.3, V.z1, cladding, 2.2, true); // south
  block(V.x0, V.x0 + 0.3, top, U, V.z0, V.z1, cladding, 2.2, true); // west
  block(V.x1 - 0.3, V.x1, top, U, V.z0, V.z1, cladding, 2.2, true); // east
  // North face: timber with a long ribbon window looking over the lake.
  const winY0 = top + 0.75, winY1 = U - 0.55, winX0 = V.x0 + 1.6, winX1 = V.x1 - 1.6;
  block(V.x0, V.x1, top, winY0, V.z0, V.z0 + 0.3, cladding, 2.2, true);
  block(V.x0, V.x1, winY1, U, V.z0, V.z0 + 0.3, cladding, 2.2, true);
  block(V.x0, winX0, winY0, winY1, V.z0, V.z0 + 0.3, cladding, 2.2, true);
  block(winX1, V.x1, winY0, winY1, V.z0, V.z0 + 0.3, cladding, 2.2, true);
  add(new THREE.PlaneGeometry(winX1 - winX0, winY1 - winY0), darkGlass, (winX0 + winX1) / 2, (winY0 + winY1) / 2, V.z0 + 0.22, { cast: false }).rotation.y = Math.PI;
  for (let x = winX0; x <= winX1 + 0.01; x += (winX1 - winX0) / 9) block(x - 0.04, x + 0.04, winY0, winY1, V.z0 + 0.12, V.z0 + 0.2, steel);
  block(V.x0 - 0.05, V.x1 + 0.05, U, U + 0.22, V.z0 - 0.05, V.z1 + 0.05, concrete, 3); // roof fascia
  // A warm glow inside the upper volume, seen through the ribbon window at dusk.
  const upperGlow = new THREE.Mesh(new THREE.PlaneGeometry(winX1 - winX0 - 0.4, winY1 - winY0 - 0.2), new THREE.MeshBasicMaterial({ color: 0xffb46b, transparent: true, opacity: 0 }));
  upperGlow.position.set((winX0 + winX1) / 2, (winY0 + winY1) / 2, V.z0 + 0.4);
  upperGlow.rotation.y = Math.PI;
  g.add(upperGlow);

  // ── Pavilion walls ───────────────────────────────────────────────────
  // South: concrete outside, plaster inside, slate fireplace wall.
  block(P.x0 - 0.3, K.x1 + 0.3, F, C, P.z1 + 0.05, P.z1 + 0.45, concrete, 3);
  block(P.x0, K.x1, F, C, P.z1 - 0.12, P.z1 + 0.05, plaster, 3);
  block(-1.2, 3.4, F, C, P.z1 - 0.42, P.z1 - 0.12, slate, 2.2); // fireplace chimney breast
  // Firebox: dark opening with an emissive ember bed.
  block(-0.1, 2.3, F + 0.32, F + 1.15, P.z1 - 0.44, P.z1 - 0.3, new THREE.MeshStandardMaterial({ color: 0x0b0a09, roughness: 1 }));
  const embers = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.6), new THREE.MeshBasicMaterial({ color: 0xff7a2e, transparent: true, opacity: 0.0 }));
  embers.position.set(1.1, F + 0.62, P.z1 - 0.45);
  embers.rotation.y = Math.PI;
  g.add(embers);
  block(-1.5, 3.7, F, F + 0.32, P.z1 - 0.7, P.z1 - 0.12, concrete, 3); // hearth bench

  // East end of the pavilion (solid) and the corridor walls.
  block(P.x1, P.x1 + 0.35, F, C, P.z0, K.z0, concrete, 3);
  block(K.x0, K.x1, F, C, K.z0 - 0.35, K.z0, concrete, 3);
  block(K.x0, K.x1, F, C, K.z0, K.z0 + 0.12, plaster, 3);
  // Corridor end: a framed glass door out to the pool terrace.
  block(K.x1, K.x1 + 0.3, F, C, K.z0, K.z0 + 1.1, concrete, 3);
  block(K.x1, K.x1 + 0.3, F, C, K.z1 - 1.1, K.z1, concrete, 3);
  block(K.x1, K.x1 + 0.3, F + 2.6, C, K.z0 + 1.1, K.z1 - 1.1, concrete, 3);

  // Glazing: north + west of the pavilion, black steel mullions every 2.25 m.
  const glassWall = (axis: "x" | "z", fixed: number, a0: number, a1: number, gaps: [number, number][] = []) => {
    const n = Math.round((a1 - a0) / 2.25);
    for (let i = 0; i < n; i++) {
      const s0 = a0 + ((a1 - a0) * i) / n, s1 = a0 + ((a1 - a0) * (i + 1)) / n;
      const mid = (s0 + s1) / 2;
      const isGap = gaps.some(([g0, g1]) => mid > g0 && mid < g1);
      if (!isGap) {
        const pane = add(new THREE.PlaneGeometry(s1 - s0 - 0.04, C - F - 0.1), glass, axis === "z" ? mid : fixed, (F + C) / 2, axis === "z" ? fixed : mid, { cast: false, receive: false });
        if (axis === "x") pane.rotation.y = Math.PI / 2;
        pane.renderOrder = 2;
      }
      // Mullions don't cast: their shadows would stripe the projected services text.
      const at = (v: number) => ((axis === "z" ? block(v - 0.03, v + 0.03, F, C, fixed - 0.06, fixed + 0.06, steel) : block(fixed - 0.06, fixed + 0.06, F, C, v - 0.03, v + 0.03, steel)).castShadow = false);
      at(s0);
      if (i === n - 1) at(s1);
    }
    // Head + sill.
    if (axis === "z") { block(a0, a1, C - 0.08, C, fixed - 0.07, fixed + 0.07, steel); block(a0, a1, F, F + 0.05, fixed - 0.07, fixed + 0.07, steel); }
    else { block(fixed - 0.07, fixed + 0.07, C - 0.08, C, a0, a1, steel); block(fixed - 0.07, fixed + 0.07, F, F + 0.05, a0, a1, steel); }
  };
  glassWall("z", P.z0, P.x0, P.x1, [[-4.6, -2.2]]); // north, with the sliding door left open
  glassWall("x", P.x0, P.z0, P.z1); // west
  // The open sliding door panel, parked behind the next pane.
  add(new THREE.PlaneGeometry(2.2, C - F - 0.1), glass, -5.4, (F + C) / 2, P.z0 + 0.14, { cast: false, receive: false }).renderOrder = 2;

  // ── Infinity pool ────────────────────────────────────────────────────
  const tiles = new THREE.MeshStandardMaterial({ color: 0xa9c7c9, roughness: 0.35 });
  block(PL.x0, PL.x1, PL.floor - 0.3, PL.floor, PL.z0, PL.z1, tiles); // base under the mosaic
  block(PL.x0 - 0.01, PL.x0, PL.floor, F, PL.z0, PL.z1, tiles);
  block(PL.x1, PL.x1 + 0.01, PL.floor, F, PL.z0, PL.z1, tiles);
  block(PL.x0, PL.x1, PL.floor, F, PL.z1, PL.z1 + 0.01, tiles);

  // ── Entry: monolith + stepping-stone path ────────────────────────────
  const M = H.monolith;
  const mono = block(M.x - M.w / 2, M.x + M.w / 2, heightAt(M.x, M.z) - 0.4, F + M.h, M.z - M.t / 2, M.z + M.t / 2, concrete, 3);
  mono.name = "monolith";
  const pr = rand(5);
  const paverGeo = box(1.3, 0.12, 0.62, 1.4);
  for (let z = 17.2; z < 62; z += 1.05) {
    const x = -14 + Math.sin(z * 0.11) * 1.8 + (pr() - 0.5) * 0.25;
    const p = add(paverGeo, floorConcrete, x, heightAt(x, z) + 0.04, z);
    p.rotation.y = (pr() - 0.5) * 0.12;
  }

  // ── Interior furniture (Poly Haven models) ───────────────────────────
  const furn = new THREE.Group();
  g.add(furn);
  const place = async (name: string, x: number, z: number, ry = 0, s = 1, y = F) => {
    const m = (await loadModel(name)).clone();
    m.position.set(x, y, z);
    m.rotation.y = ry;
    m.scale.setScalar(s);
    furn.add(m);
    return m;
  };
  const coffee = await place("coffee_table", 1.1, 8.1, Math.PI / 2);
  await place("lounge_chair", -1.4, 9.4, Math.PI * 0.62);
  await place("lounge_chair", 3.6, 9.5, -Math.PI * 0.62);
  await place("arm_chair", 1.1, 5.7, Math.PI);
  await place("side_table", -2.6, 7.9, 0.2);
  await place("vase_a", -2.6, 7.9, 0, 1, F + 0.55);
  await place("aloe", -8.3, 11.3, 0.4);
  await place("aloe", 8.4, 3.6, 1.2);
  await place("pendant", 1.1, 8.1, 0, 1.15, C - 0.02).then((m) => {
    // The model hangs from its origin; flip it to hang from the ceiling.
    const b = new THREE.Box3().setFromObject(m);
    m.position.y -= b.max.y - C;
  });
  // Gallery: a bust on a concrete plinth.
  block(7.95, 8.65, F, F + 1.05, 5.65, 6.35, concrete, 3);
  await place("marble_bust", 8.3, 6.0, -Math.PI / 2, 1, F + 1.05);
  await place("vase_b", 4.2, 3.7, 0);
  // Terrace: fire pit.
  await place("fire_pit", 21, 13.4, 0, 1.2);

  const coffeeBox = new THREE.Box3().setFromObject(coffee);

  // ── Lights that belong to the house ──────────────────────────────────
  const warm = 0xffb877;
  const interiorLights: THREE.Light[] = [];
  const pl = (x: number, y: number, z: number, intensity: number, dist: number) => {
    const l = new THREE.PointLight(warm, 0, dist, 2);
    l.position.set(x, y, z);
    l.userData.base = intensity;
    g.add(l);
    interiorLights.push(l);
    return l;
  };
  pl(1.1, 2.7, 8.1, 9, 9); // pendant
  pl(-5, 3.4, 7.5, 6, 10);
  pl(6, 3.4, 7, 5, 9);
  pl(12, 3.3, 10, 4, 7); // corridor
  const fireLight = pl(1.1, F + 0.9, P.z1 - 1.0, 10, 7);
  pl(21, 1.4, 13.4, 14, 9); // fire pit

  return {
    group: g,
    glass,
    embers,
    upperGlow,
    interiorLights,
    fireLight,
    coffeeTop: coffeeBox.max.y,
    coffeeCenter: coffeeBox.getCenter(new THREE.Vector3()),
    materials: { concrete, plaster, oak, steel },
  };
}
