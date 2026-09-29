// Kinetic typography, drawn on the 2D overlay. Type is treated as an object:
// it stamps, windows, falls and fills; it never fades or slides in.
import { C, clamp, ease, seg, fmtClock, lerp, rng } from "./util.js";

const U = (W, H) => Math.min(W, H) / 1080;

function setFont(ctx, weight, size, fam, style = "") {
  ctx.font = `${style} ${weight} ${size}px ${fam}`.trim();
}

/** The response-time counter: the film's spine. */
export function counter(ctx, W, H, value, { gold = false, alpha = 1, label = "RESPONSE TIME", big = false, x, y } = {}) {
  if (value == null || alpha <= 0) return;
  const u = U(W, H);
  const px = x ?? 64 * u, py = y ?? 150 * u;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.letterSpacing = `${4 * u}px`;
  setFont(ctx, 700, 22 * u, "Mono");
  ctx.fillStyle = gold ? C.gold : C.ivory3;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, px, py);
  ctx.letterSpacing = "0px";
  setFont(ctx, 700, (big ? 96 : 54) * u, "Mono");
  ctx.fillStyle = gold ? C.gold : C.ivory;
  ctx.fillText(fmtClock(value), px - 2 * u, py + (big ? 100 : 62) * u);
  // live dot
  ctx.beginPath();
  ctx.arc(px + (big ? 560 : 312) * u, py + (big ? 66 : 44) * u, 7 * u, 0, Math.PI * 2);
  ctx.fillStyle = gold ? C.gold : "rgba(245,240,230,0.8)";
  ctx.fill();
  ctx.restore();
}

/**
 * Stamp a block of lines. lt = seconds since the stamp began. Impact takes
 * ~0.1s: scale 1.32 → 1 with a slight overshoot; optional registration error
 * (misreg) on the first frames, an editorial cue that something is wrong.
 */
export function slam(ctx, W, H, lines, lt, { size = 150, x = 64, y = 1480, weight = 900, fam = "Inter", color = C.ivory, lh = 0.9, track = -0.045, misreg = false, align = "left", upper = true, style = "", stagger = 0.05 } = {}) {
  if (lt < 0) return;
  const u = U(W, H);
  const s = size * u;
  ctx.save();
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  lines.forEach((ln, i) => {
    const li = lt - i * stagger;
    if (li < 0) return;
    const k = clamp(li / 0.12);
    const sc = lerp(1.32, 1, ease.stamp(k));
    const txt = upper ? ln.toUpperCase() : ln;
    setFont(ctx, weight, s, fam, style);
    ctx.letterSpacing = `${track * s}px`;
    const ly = y * u + i * s * lh;
    const lx = x * u;
    ctx.save();
    ctx.translate(lx, ly);
    ctx.scale(sc, sc);
    if (misreg && li < 0.1) {
      const o = 7 * u * (1 - li / 0.1);
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = "rgba(255,70,60,0.55)";
      ctx.fillText(txt, -o, 0);
      ctx.fillStyle = "rgba(60,200,255,0.5)";
      ctx.fillText(txt, o, o * 0.3);
      ctx.globalCompositeOperation = "source-over";
    }
    ctx.globalAlpha = k < 0.05 ? 0.6 : 1;
    ctx.fillStyle = color;
    ctx.fillText(txt, 0, 0);
    ctx.restore();
  });
  ctx.restore();
}

/**
 * Type as a window: everything is ink except the letterforms, through which
 * the world shows. `outside` = opacity of the ink around the letters.
 */
export function windowWord(ctx, W, H, word, lt, { size = 300, y = 1060, outside = 1, fam = "Inter", weight = 900 } = {}) {
  const u = U(W, H);
  const k = clamp(lt / 0.1);
  const sc = lerp(1.25, 1, ease.stamp(k));
  ctx.save();
  ctx.fillStyle = `rgba(11,11,14,${outside})`;
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "destination-out";
  setFont(ctx, weight, size * u * sc, fam);
  ctx.letterSpacing = `${-0.05 * size * u}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText(word, W / 2, y * u);
  ctx.restore();
  // hairline outline to keep the word legible over busy footage
  ctx.save();
  setFont(ctx, weight, size * u * sc, fam);
  ctx.letterSpacing = `${-0.05 * size * u}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 2 * u;
  ctx.strokeStyle = `rgba(245,240,230,${0.55 * outside})`;
  ctx.strokeText(word, W / 2, y * u);
  ctx.restore();
}

/** A word whose letters drop out of place one by one (the lead falling through the cracks). */
export function fallingWord(ctx, W, H, word, lt, { size = 170, x = 64, y = 1500, fall = 0.25, seed = 7 } = {}) {
  const u = U(W, H);
  const s = size * u;
  const r = rng(seed);
  setFont(ctx, 900, s, "Inter");
  ctx.letterSpacing = "0px";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const k = clamp(lt / 0.12);
  let cx = x * u;
  const order = word.split("").map((_, i) => ({ i, d: r() * 0.25 }));
  word.split("").forEach((ch, i) => {
    const w = ctx.measureText(ch).width - 0.04 * s;
    const start = fall + order[i].d;
    const ft = Math.max(0, lt - start);
    const dy = 0.5 * 9000 * u * ft * ft;
    const rot = ft * (r() - 0.5) * 3;
    ctx.save();
    ctx.translate(cx + w / 2, y * u + dy);
    ctx.rotate(rot);
    ctx.scale(lerp(1.32, 1, ease.stamp(k)), lerp(1.32, 1, ease.stamp(k)));
    ctx.fillStyle = C.ivory;
    ctx.globalAlpha = clamp(1 - ft * 1.2);
    ctx.fillText(ch, -w / 2, 0);
    ctx.restore();
    cx += w;
  });
}

/** Mono label (system voice). */
export function label(ctx, W, H, s, x, y, { size = 26, color = C.ivory3, align = "left", alpha = 1, track = 6 } = {}) {
  const u = U(W, H);
  ctx.save();
  ctx.globalAlpha = alpha;
  setFont(ctx, 700, size * u, "Mono");
  ctx.letterSpacing = `${track * u}px`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(s, x * u, y * u);
  ctx.restore();
}

/** Big serif italic line with a gold fill sweeping through it (the brand voice). */
export function serifSweep(ctx, W, H, s, lt, { size = 170, y = 1000, sweep = 0.9, align = "center", x } = {}) {
  const u = U(W, H);
  const fs = size * u;
  setFont(ctx, 400, fs, "Fraunces", "italic");
  ctx.letterSpacing = `${-0.02 * fs}px`;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  const tw = ctx.measureText(s).width;
  const px = x != null ? x * u : W / 2;
  const left = align === "center" ? px - tw / 2 : px;
  // Reveal: the line rises out of a mask (clip), not a fade.
  const k = ease.outExpo(clamp(lt / 0.55));
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, y * u - fs * 1.05, W, fs * 1.35);
  ctx.clip();
  const dy = (1 - k) * fs * 1.1;
  const p = clamp((lt - 0.25) / sweep);
  const g = ctx.createLinearGradient(left - 200 * u, 0, left + tw + 200 * u, 0);
  const e = ease.inOutCubic(p);
  g.addColorStop(0, C.gold);
  g.addColorStop(clamp(e * 1.0), C.goldHi);
  g.addColorStop(clamp(e * 1.0 + 0.001), C.ivory);
  g.addColorStop(1, C.ivory);
  ctx.fillStyle = p > 0 ? g : C.ivory;
  ctx.fillText(s, px, y * u + dy);
  ctx.restore();
}

/** Wordmark: "XMEL" in Fraunces + "Automations" in gold italic, as on the site. */
export function wordmark(ctx, W, H, lt, { y = 1420, size = 96, alpha = 1 } = {}) {
  const u = U(W, H);
  const fs = size * u;
  const k = ease.outExpo(clamp(lt / 0.6));
  ctx.save();
  ctx.globalAlpha = alpha;
  setFont(ctx, 600, fs, "Fraunces");
  ctx.letterSpacing = `${0.01 * fs}px`;
  const a = "XMEL";
  const aw = ctx.measureText(a).width;
  setFont(ctx, 400, fs, "Fraunces", "italic");
  const b = "Automations";
  const bw = ctx.measureText(b).width;
  const gap = 0.28 * fs;
  const x0 = W / 2 - (aw + gap + bw) / 2;
  ctx.beginPath();
  ctx.rect(0, y * u - fs, W, fs * 1.3);
  ctx.clip();
  const dy = (1 - k) * fs;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  setFont(ctx, 600, fs, "Fraunces");
  ctx.fillStyle = C.ivory;
  ctx.fillText(a, x0, y * u + dy);
  setFont(ctx, 400, fs, "Fraunces", "italic");
  ctx.fillStyle = C.gold;
  ctx.fillText(b, x0 + aw + gap, y * u + dy * 1.15);
  ctx.restore();
}

/** Soft ink gradient behind a type zone (design units), so type reads over busy UI. */
export function scrim(ctx, W, H, y0, y1, a = 0.82) {
  const u = U(W, H);
  const g = ctx.createLinearGradient(0, y0 * u, 0, y1 * u);
  g.addColorStop(0, "rgba(11,11,14,0)");
  g.addColorStop(0.45, `rgba(11,11,14,${a})`);
  g.addColorStop(1, `rgba(11,11,14,${a})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, Math.min(y0, y1) * u, W, Math.abs(y1 - y0) * u);
}

export { U };
