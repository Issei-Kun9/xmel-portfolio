// Timing, easing and deterministic randomness. Every frame of the film is a
// pure function of time, so nothing here may read the clock or Math.random.

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const invLerp = (a, b, x) => clamp((x - a) / (b - a));
/** Progress of time t through [a, b], clamped 0..1. */
export const seg = (t, a, b) => invLerp(a, b, t);
export const between = (t, a, b) => t >= a && t < b;

export const ease = {
  linear: (x) => x,
  inCubic: (x) => x * x * x,
  outCubic: (x) => 1 - Math.pow(1 - x, 3),
  inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outQuart: (x) => 1 - Math.pow(1 - x, 4),
  inQuart: (x) => x * x * x * x,
  outExpo: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inExpo: (x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
  inOutExpo: (x) =>
    x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
  outBack: (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
  /** A hard "stamp": overshoots to 1+k then settles, used for type impacts. */
  stamp: (x) => (x >= 1 ? 1 : 1 - Math.pow(1 - x, 3) * Math.cos(x * Math.PI * 1.6)),
};

/** Deterministic PRNG. */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth value noise in 1D, for camera shake. */
export function noise1(x, seed = 1) {
  const i = Math.floor(x);
  const f = x - i;
  const h = (n) => {
    const s = Math.sin((n + seed * 97.13) * 127.1) * 43758.5453;
    return s - Math.floor(s);
  };
  const u = f * f * (3 - 2 * f);
  return lerp(h(i), h(i + 1), u) * 2 - 1;
}

/** Camera/handheld shake offset for time t at a given amplitude and frequency. */
export function shake(t, amp, freq = 9, seed = 1) {
  return {
    x: noise1(t * freq, seed) * amp,
    y: noise1(t * freq + 31.7, seed + 3) * amp,
    r: noise1(t * freq * 0.7 + 71.3, seed + 7) * amp * 0.004,
  };
}

export const C = {
  ink: "#0F0F12",
  ink2: "#16161B",
  ink3: "#1E1E24",
  gold: "#C9A86A",
  goldHi: "#E3C88F",
  goldLo: "#8A6A2F",
  ivory: "#F5F0E6",
  ivory2: "rgba(245,240,230,0.72)",
  ivory3: "rgba(245,240,230,0.45)",
  line: "rgba(245,240,230,0.12)",
  grey: "#8C8A86",
  cold: "#9DA3AB",
};

/** The response-time counter value (seconds) at film time t — the film's spine. */
export function counterAt(t) {
  if (t < 0.1) return null;
  if (t < 2.0) return ease.inCubic(seg(t, 0.1, 2.0)) * 252; // 0 → 4:12
  if (t < 3.8) return 252 + seg(t, 2.0, 3.8) * 1500;
  if (t < 4.4) return lerp(1752, 24480, ease.inOutExpo(seg(t, 3.8, 4.4))); // → 6:48:00
  if (t < 7.0) return lerp(24480, 42129, ease.inOutCubic(seg(t, 4.4, 7.0))); // → 11:42:09
  if (t < 10.4) return 42129 + Math.pow(seg(t, 7.0, 10.4), 2) * 190000; // spinning
  if (t < 11.4) return 42129; // frozen (shown at the hard stop)
  if (t < 12.0) return lerp(42129, 0, ease.inOutExpo(seg(t, 11.4, 12.0))); // rewind
  if (t < 18.0) return null; // hidden while the system builds
  if (t < 18.8) return seg(t, 18.0, 18.8) * 30;
  if (t < 19.2) return lerp(30, 42, ease.outCubic(seg(t, 18.8, 19.2)));
  return 42;
}

export function fmtClock(sec) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600) % 100;
  const m = Math.floor(s / 60) % 60;
  const ss = s % 60;
  const p = (n) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(ss)}`;
}
