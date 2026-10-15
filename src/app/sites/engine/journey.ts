import * as THREE from "three";
import { CHAPTERS, type ChapterId } from "../content";
import { ANAMORPHIC_EYE, ANAMORPHIC_LOOK } from "./reveals";

type V = [number, number, number];
type Stop = { id: ChapterId; pos: V; look: V; fov: number; tod: number; hold: number };
/** Waypoints between consecutive stops: camera position and look-at pairs. */
type Leg = { via: { p: V; l: V }[]; length: number };

const v = (a: V) => new THREE.Vector3(...a);
const E = ANAMORPHIC_EYE.toArray() as V;
const L = ANAMORPHIC_LOOK.toArray() as V;

export const STOPS: Stop[] = [
  { id: "lake", pos: [4, 2.6, -62], look: [4, 3.2, 6], fov: 34, tod: 0, hold: 1.4 },
  { id: "about", pos: [-14.6, 1.78, 30.6], look: [-14, 1.95, 24.2], fov: 42, tod: 0.05, hold: 1.2 },
  { id: "services", pos: [-5.0, 1.66, 6.2], look: [-5.1, 2.25, 11.8], fov: 50, tod: 0.12, hold: 1.2 },
  { id: "testimonial", pos: [0.98, 1.62, 7.45], look: [1.02, 1.0, 8.1], fov: 30, tod: 0.17, hold: 1.1 },
  { id: "listings", pos: [5.95, 1.72, 6.3], look: [5.95, 2.25, 11.8], fov: 52, tod: 0.22, hold: 1.2 },
  { id: "process", pos: E, look: L, fov: 58, tod: 0.27, hold: 1.2 },
  { id: "numbers", pos: [21.0, 7.5, 3.5], look: [21.0, 0, 6.1], fov: 52, tod: 0.48, hold: 1.1 },
  { id: "contact", pos: [21.6, 1.8, 17.2], look: [6, 62, -70], fov: 46, tod: 0.9, hold: 1.3 },
  { id: "footer", pos: [-12, 2.35, -30.2], look: [-12, 0.35, -21.6], fov: 46, tod: 1, hold: 1.4 },
];

const LEGS: Leg[] = [
  // lake → about: rise over the roof, crane west over the trees, settle on the path.
  { length: 2.2, via: [{ p: [0, 9, -40], l: [-2, 4, 0] }, { p: [-14, 16, -6], l: [-14, 3, 20] }, { p: [-19, 6, 40], l: [-14, 2.2, 24] }] },
  // about → services: walk the west side to the water and in through the open door.
  { length: 2.0, via: [{ p: [-21, 2.0, 22], l: [-16, 1.9, 10] }, { p: [-17.5, 1.9, 0.6], l: [-6, 1.8, 2] }, { p: [-3.4, 1.7, -0.6], l: [-3.4, 1.8, 6] }, { p: [-3.5, 1.68, 4.2], l: [-4.8, 2.1, 10] }] },
  // services → testimonial: turn to the lounge, lower over the coffee table.
  { length: 1.1, via: [{ p: [-2.4, 1.7, 6.6], l: [0.8, 1.0, 8.4] }] },
  // testimonial → listings: rise and turn to the gallery wall.
  { length: 1.1, via: [{ p: [3.0, 1.7, 6.4], l: [5.0, 2.0, 11] }] },
  // listings → process: step into the corridor mouth.
  { length: 1.0, via: [{ p: [7.4, 1.66, 8.6], l: [12, 1.8, 10.2] }] },
  // process → numbers: down the corridor, out the door, lift over the pool.
  { length: 1.6, via: [{ p: [13.6, 1.7, 10.05], l: [18, 1.6, 10] }, { p: [17.4, 2.4, 11.6], l: [21, 0.4, 7.5] }] },
  // numbers → contact: swing around the fire pit and tilt up into the night.
  { length: 1.6, via: [{ p: [24.5, 4.2, 12.5], l: [20, 2, 4] }, { p: [22.6, 2.2, 17.4], l: [14, 20, -20] }] },
  // contact → footer: lift over the roof under the stars, glide out over the lake, come back to the jetty.
  { length: 2.4, via: [{ p: [8, 26, 6], l: [-6, 10, -40] }, { p: [-20, 12, -48], l: [-12, 1, -24] }, { p: [-13.5, 3.4, -36], l: [-12, 0.4, -22] }] },
];

/** Normalised scroll layout: [hold0, leg0, hold1, leg1, …, holdN]. */
const segs: { kind: "hold" | "leg"; i: number; a: number; b: number }[] = [];
{
  let t = 0;
  STOPS.forEach((s, i) => {
    segs.push({ kind: "hold", i, a: t, b: (t += s.hold) });
    if (i < LEGS.length) segs.push({ kind: "leg", i, a: t, b: (t += LEGS[i].length) });
  });
  for (const s of segs) { s.a /= t; s.b /= t; }
}

const curves = LEGS.map((leg, i) => {
  const a = STOPS[i], b = STOPS[i + 1];
  const pos = new THREE.CatmullRomCurve3([v(a.pos), ...leg.via.map((w) => v(w.p)), v(b.pos)], false, "centripetal");
  const look = new THREE.CatmullRomCurve3([v(a.look), ...leg.via.map((w) => v(w.l)), v(b.look)], false, "centripetal");
  return { pos, look };
});

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const smooth = (x: number) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };

export type Shot = {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
  tod: number;
  /** Index of the nearest chapter. */
  chapter: number;
  /** Per-chapter reveal amount, 0..1 (rises on arrival, falls on departure). */
  reveal: number[];
};

/** Scroll position (0..1) at the centre of each chapter's hold, for the jump navigation. */
export const CHAPTER_AT = STOPS.map((_, i) => {
  const s = segs.find((x) => x.kind === "hold" && x.i === i)!;
  return (s.a + s.b) / 2;
});

export function sample(p: number, snap = false): Shot {
  const x = Math.min(1, Math.max(0, p));
  const seg = segs.find((s) => x >= s.a && x <= s.b) ?? segs[segs.length - 1];
  const local = (x - seg.a) / Math.max(1e-6, seg.b - seg.a);
  const reveal = STOPS.map(() => 0);
  let pos: THREE.Vector3, look: THREE.Vector3, fov: number, tod: number, chapter: number;

  if (seg.kind === "hold" || snap) {
    const i = seg.kind === "hold" ? seg.i : local < 0.5 ? seg.i : seg.i + 1;
    const s = STOPS[i];
    pos = v(s.pos);
    look = v(s.look);
    // A slow push-in during the hold keeps the frame alive.
    if (seg.kind === "hold" && !snap) pos.lerp(look, 0.018 * (local - 0.5));
    fov = s.fov;
    tod = s.tod;
    chapter = i;
    reveal[i] = 1;
  } else {
    const a = STOPS[seg.i], b = STOPS[seg.i + 1];
    const e = easeInOut(local);
    pos = curves[seg.i].pos.getPointAt(e);
    look = curves[seg.i].look.getPointAt(e);
    fov = THREE.MathUtils.lerp(a.fov, b.fov, e);
    tod = THREE.MathUtils.lerp(a.tod, b.tod, smooth(local));
    chapter = local < 0.5 ? seg.i : seg.i + 1;
    reveal[seg.i] = 1 - smooth(local / 0.35);
    reveal[seg.i + 1] = smooth((local - 0.6) / 0.4);
  }
  return { pos, look, fov, tod, chapter, reveal };
}

export const CHAPTER_IDS = CHAPTERS.map((c) => c.id);
