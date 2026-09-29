// Canvas2D interface kit. Every screen in the film is drawn here, in one
// visual language: near-black surfaces, hairline ivory borders, Inter for UI,
// JetBrains Mono for system labels, Fraunces for the brand. Gold only appears
// when `gold` is passed (i.e. once XMEL is in control).
import { C, clamp, ease } from "./util.js";

export function rr(ctx, x, y, w, h, r) {
  const k = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + k, y);
  ctx.arcTo(x + w, y, x + w, y + h, k);
  ctx.arcTo(x + w, y + h, x, y + h, k);
  ctx.arcTo(x, y + h, x, y, k);
  ctx.arcTo(x, y, x + w, y, k);
  ctx.closePath();
}

export function font(ctx, weight, size, fam = "Inter", style = "") {
  ctx.font = `${style} ${weight} ${size}px ${fam}`.trim();
}

export function text(ctx, s, x, y, { w = 500, size = 32, fam = "Inter", color = C.ivory, align = "left", base = "alphabetic", style = "", track = 0 } = {}) {
  font(ctx, w, size, fam, style);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = base;
  if (track) ctx.letterSpacing = `${track}px`;
  ctx.fillText(s, x, y);
  if (track) ctx.letterSpacing = "0px";
}

/** Glass/ink surface with hairline border and a faint top highlight. */
export function surface(ctx, x, y, w, h, r, { fill = "rgba(24,24,30,0.96)", border = "rgba(245,240,230,0.12)", gold = false, glow = 0 } = {}) {
  ctx.save();
  if (glow > 0) {
    ctx.shadowColor = `rgba(201,168,106,${0.45 * glow})`;
    ctx.shadowBlur = 60 * glow;
  }
  rr(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.shadowBlur = 0;
  const hl = ctx.createLinearGradient(0, y, 0, y + h * 0.5);
  hl.addColorStop(0, "rgba(255,255,255,0.06)");
  hl.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hl;
  ctx.fill();
  ctx.lineWidth = gold ? 3 : 2;
  ctx.strokeStyle = gold ? C.gold : border;
  ctx.stroke();
  ctx.restore();
}

export function dot(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// ── Icons (simple strokes, drawn not imported) ────────────────────────────
export function icon(ctx, name, x, y, s, color, lw = 3) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 24, s / 24);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = (lw * 24) / s;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const P = (d) => ctx.stroke(new Path2D(d));
  if (name === "phone") P("M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2");
  if (name === "missed") { P("M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"); P("M15 3l6 6M21 3l-6 6"); }
  if (name === "chat") P("M4 5h16v11H9l-5 4z");
  if (name === "check") P("M5 12l5 5L20 7");
  if (name === "cal") { P("M4 6h16v14H4z"); P("M4 10h16M8 3v5M16 3v5"); }
  if (name === "home") { P("M3 11l9-8 9 8"); P("M5 10v10h14V10"); }
  if (name === "bolt") P("M13 2L4 14h7l-1 8 9-12h-7z");
  if (name === "user") { P("M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8"); P("M4 21a8 8 0 0 1 16 0"); }
  if (name === "mail") { P("M3 5h18v14H3z"); P("M3 6l9 7 9-7"); }
  if (name === "grid") { P("M3 3h18v18H3z"); P("M3 9h18M3 15h18M9 3v18M15 3v18"); }
  if (name === "wave") P("M2 12h2l2-6 3 12 3-15 3 18 3-12 2 6h2");
  if (name === "note") { P("M5 3h10l4 4v14H5z"); P("M9 11h6M9 15h4"); }
  if (name === "spark") P("M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z");
  ctx.restore();
}

// ── Screens ────────────────────────────────────────────────────────────────

/** Lock-screen notification. `gold` = the resolved, XMEL-era version. */
export function notification(ctx, W, H, { app = "LEADS", title, body, time = "now", gold = false, iconName = "home" }) {
  ctx.clearRect(0, 0, W, H);
  surface(ctx, 4, 4, W - 8, H - 8, 46, { fill: "rgba(38,38,44,0.92)", border: gold ? C.gold : "rgba(245,240,230,0.16)", gold });
  const ix = 44, iy = 44, is = 84;
  rr(ctx, ix, iy, is, is, 22);
  ctx.fillStyle = gold ? C.gold : "#2E2E36";
  ctx.fill();
  icon(ctx, iconName, ix + 18, iy + 18, 48, gold ? C.ink : C.ivory, 2.4);
  text(ctx, app, ix + is + 26, iy + 32, { w: 700, size: 27, color: C.ivory3, track: 2 });
  text(ctx, time, W - 44, iy + 32, { w: 500, size: 27, color: C.ivory3, align: "right" });
  text(ctx, title, ix + is + 26, iy + 78, { w: 700, size: 38, color: C.ivory });
  if (body) text(ctx, body, ix, iy + is + 62, { w: 500, size: 34, color: C.ivory2 });
}

/** Big lock-screen clock + date, drawn directly on a phone screen canvas. */
export function lockScreen(ctx, W, H, { time = "2:14", date = "Sunday, 14 September", morning = 0 }) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, morning ? `rgb(${Math.round(20 + 40 * morning)},${Math.round(18 + 30 * morning)},${Math.round(22 + 14 * morning)})` : "#101014");
  g.addColorStop(1, "#08080A");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  if (morning > 0) {
    const s = ctx.createRadialGradient(W * 0.9, H * 0.05, 10, W * 0.9, H * 0.05, W * 1.3);
    s.addColorStop(0, `rgba(255,214,150,${0.35 * morning})`);
    s.addColorStop(1, "rgba(255,214,150,0)");
    ctx.fillStyle = s;
    ctx.fillRect(0, 0, W, H);
  }
  text(ctx, date, W / 2, H * 0.12, { w: 500, size: 40, color: C.ivory2, align: "center" });
  text(ctx, time, W / 2, H * 0.27, { w: 600, size: 250, fam: "Fraunces", color: C.ivory, align: "center" });
}

/** Incoming / missed call screen. phase = 0..1 ring animation. */
export function callScreen(ctx, W, H, { name = "Unknown · Zillow lead", state = "ringing", phase = 0 }) {
  ctx.fillStyle = "#0C0C10";
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H * 0.36;
  if (state === "ringing") {
    for (let i = 0; i < 3; i++) {
      const p = (phase + i / 3) % 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 110 + p * 330, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245,240,230,${0.28 * (1 - p)})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
  dot(ctx, cx, cy, 110, "#24242B");
  icon(ctx, "user", cx - 52, cy - 52, 104, C.ivory2, 2);
  text(ctx, name, cx, cy + 230, { w: 700, size: 54, color: C.ivory, align: "center" });
  text(ctx, state === "ringing" ? "Incoming call…" : "Missed call", cx, cy + 300, { w: 500, size: 38, color: state === "ringing" ? C.ivory3 : "#C8B8A0", align: "center" });
  if (state === "ringing") {
    dot(ctx, W * 0.28, H * 0.82, 78, "#3A3A42");
    icon(ctx, "phone", W * 0.28 - 34, H * 0.82 - 34, 68, C.ivory2, 2.6);
    dot(ctx, W * 0.72, H * 0.82, 78, "#3A3A42");
    icon(ctx, "phone", W * 0.72 - 34, H * 0.82 - 34, 68, C.ivory, 2.6);
  } else {
    surface(ctx, W * 0.14, H * 0.74, W * 0.72, 120, 60, { fill: "#1C1C22" });
    icon(ctx, "missed", W * 0.14 + 50, H * 0.74 + 30, 60, "#C8B8A0", 2.6);
    text(ctx, "Missed · 2:14 AM", W * 0.14 + 136, H * 0.74 + 76, { w: 700, size: 38, color: C.ivory2 });
  }
}

/**
 * Messaging thread. messages: [{from:'lead'|'ai', text, time}]. Shows `shown`
 * messages; `typing` adds dots; `seen` adds a stale read receipt.
 */
export function chat(ctx, W, H, { contact = "Priya S.", channel = "Text message", messages = [], shown = 99, typing = false, seen = null, gold = false, wa = false, typePhase = 0, scroll = 0 }) {
  ctx.fillStyle = wa ? "#0B1411" : "#0C0C10";
  ctx.fillRect(0, 0, W, H);
  // header
  ctx.fillStyle = wa ? "#12211C" : "#141418";
  ctx.fillRect(0, 0, W, 190);
  dot(ctx, 110, 118, 46, wa ? "#1F3A31" : "#2A2A31");
  text(ctx, contact[0], 110, 134, { w: 700, size: 44, align: "center", color: C.ivory });
  text(ctx, contact, 180, 112, { w: 700, size: 40, color: C.ivory });
  text(ctx, typing ? "typing…" : channel, 180, 158, { w: 500, size: 30, color: typing ? (gold ? C.gold : C.ivory3) : C.ivory3 });
  ctx.fillStyle = "rgba(245,240,230,0.08)";
  ctx.fillRect(0, 190, W, 2);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 192, W, H - 192);
  ctx.clip();
  let y = 250 - scroll;
  const maxW = W * 0.74;
  const lh = 46, fs = 36;
  const wrap = (s) => {
    font(ctx, 500, fs);
    const words = s.split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (ctx.measureText(test).width > maxW - 64) {
        lines.push(cur);
        cur = w;
      } else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  };
  messages.slice(0, shown).forEach((m) => {
    const lines = wrap(m.text);
    font(ctx, 500, fs);
    const tw = Math.max(...lines.map((l) => ctx.measureText(l).width), 120);
    const bw = tw + 64, bh = lines.length * lh + 70;
    const mine = m.from === "ai";
    const x = mine ? W - 40 - bw : 40;
    rr(ctx, x, y, bw, bh, 34);
    ctx.fillStyle = mine ? (gold ? "rgba(201,168,106,0.16)" : "#26262E") : "#1C1C22";
    ctx.fill();
    if (mine && gold) {
      ctx.strokeStyle = "rgba(201,168,106,0.55)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    lines.forEach((l, i) => text(ctx, l, x + 32, y + 52 + i * lh, { w: 500, size: fs, color: C.ivory }));
    text(ctx, m.time || "", x + bw - 28, y + bh - 18, { w: 500, size: 24, color: C.ivory3, align: "right" });
    y += bh + 22;
  });
  if (typing) {
    const bw = 150, bh = 84;
    const x = gold ? W - 40 - bw : 40;
    rr(ctx, x, y, bw, bh, 34);
    ctx.fillStyle = gold ? "rgba(201,168,106,0.16)" : "#1C1C22";
    ctx.fill();
    for (let i = 0; i < 3; i++) {
      const a = 0.35 + 0.65 * Math.max(0, Math.sin((typePhase * 2 - i * 0.25) * Math.PI));
      dot(ctx, x + 45 + i * 30, y + bh / 2, 9, gold ? `rgba(201,168,106,${a})` : `rgba(245,240,230,${a * 0.7})`);
    }
    y += bh + 22;
  }
  if (seen) text(ctx, seen, W - 44, y + 20, { w: 500, size: 28, color: C.ivory3, align: "right" });
  ctx.restore();
}

/** Spreadsheet grid. rows: arrays of cells. `edit` = {row, col, text, caret}. */
export function sheet(ctx, W, H, { rows, cols = [0.34, 0.2, 0.22, 0.24], head = ["Name", "Source", "Need", "Status"], edit = null, hideRow = -1, gold = false, highlight = -1, rowH = 92 }) {
  ctx.fillStyle = "#0E0E12";
  ctx.fillRect(0, 0, W, H);
  const xs = [];
  let acc = 0;
  cols.forEach((c) => { xs.push(acc * W); acc += c; });
  ctx.fillStyle = "#16161C";
  ctx.fillRect(0, 0, W, rowH);
  head.forEach((h, i) => text(ctx, h.toUpperCase(), xs[i] + 28, rowH / 2 + 12, { w: 700, size: 26, fam: "Mono", color: C.ivory3, track: 2 }));
  rows.forEach((r, ri) => {
    const y = rowH * (ri + 1);
    if (ri === hideRow) return;
    if (ri === highlight) {
      ctx.fillStyle = gold ? "rgba(201,168,106,0.12)" : "rgba(245,240,230,0.05)";
      ctx.fillRect(0, y, W, rowH);
    }
    r.forEach((cell, ci) => {
      const isGoldStatus = gold && ri === highlight && ci === r.length - 1;
      text(ctx, cell, xs[ci] + 28, y + rowH / 2 + 12, { w: ci === 0 ? 700 : 500, size: 32, color: isGoldStatus ? C.gold : ci === 0 ? C.ivory : C.ivory2 });
    });
  });
  ctx.strokeStyle = "rgba(245,240,230,0.08)";
  ctx.lineWidth = 2;
  for (let i = 1; i <= rows.length + 1; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * rowH);
    ctx.lineTo(W, i * rowH);
    ctx.stroke();
  }
  xs.slice(1).forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  });
  if (edit) {
    const y = rowH * (edit.row + 1);
    ctx.strokeStyle = C.ivory;
    ctx.lineWidth = 3;
    ctx.strokeRect(xs[edit.col] + 2, y + 2, W * cols[edit.col] - 4, rowH - 4);
    text(ctx, edit.text, xs[edit.col] + 28, y + rowH / 2 + 12, { w: 500, size: 32, color: C.ivory });
    if (edit.caret) {
      font(ctx, 500, 32);
      const cw = ctx.measureText(edit.text).width;
      ctx.fillStyle = C.ivory;
      ctx.fillRect(xs[edit.col] + 30 + cw, y + 24, 3, rowH - 48);
    }
  }
}

/** A single spreadsheet/CRM row as its own card (the one that falls through). */
export function rowCard(ctx, W, H, { cells, gold = false, status }) {
  ctx.clearRect(0, 0, W, H);
  rr(ctx, 2, 2, W - 4, H - 4, 10);
  ctx.fillStyle = gold ? "#1B1812" : "#15151A";
  ctx.fill();
  ctx.strokeStyle = gold ? C.gold : "rgba(245,240,230,0.2)";
  ctx.lineWidth = gold ? 3 : 2;
  ctx.stroke();
  const cols = [0.34, 0.2, 0.22, 0.24];
  let x = 0;
  cells.forEach((c, i) => {
    const last = i === cells.length - 1;
    const s = last && status ? status : c;
    text(ctx, s, x * W + 28, H / 2 + 12, { w: i === 0 ? 700 : 500, size: 32, color: last && gold ? C.gold : i === 0 ? C.ivory : C.ivory2 });
    x += cols[i];
  });
}

/** Cold, neutral confirmation (the competitor's). */
export function confirmCard(ctx, W, H, { title = "Showing booked", sub = "with another agent", time = "Sat 11:00 AM" }) {
  ctx.clearRect(0, 0, W, H);
  surface(ctx, 4, 4, W - 8, H - 8, 40, { fill: "rgba(28,30,34,0.97)", border: "rgba(157,163,171,0.35)" });
  dot(ctx, 90, 90, 40, "#2B2F35");
  icon(ctx, "check", 66, 66, 48, C.cold, 3);
  text(ctx, title, 156, 84, { w: 700, size: 40, color: "#D5D9DE" });
  text(ctx, sub, 156, 128, { w: 500, size: 32, color: C.cold });
  text(ctx, time, W - 44, 84, { w: 500, size: 30, color: C.cold, align: "right" });
}

/** Generic app window tile for the overload montage. */
export function appTile(ctx, W, H, { name, iconName = "grid", badge, lines = 5, kind = "list", r = 1 }) {
  ctx.clearRect(0, 0, W, H);
  surface(ctx, 3, 3, W - 6, H - 6, 30, { fill: "rgba(22,22,27,0.97)" });
  ctx.fillStyle = "#1C1C22";
  rr(ctx, 3, 3, W - 6, 96, 30);
  ctx.fill();
  icon(ctx, iconName, 34, 26, 44, C.ivory2, 2.4);
  text(ctx, name, 98, 64, { w: 700, size: 34, color: C.ivory });
  if (badge) {
    font(ctx, 700, 28);
    const bw = ctx.measureText(badge).width + 32;
    rr(ctx, W - bw - 30, 30, bw, 44, 22);
    ctx.fillStyle = "#EDE6D8";
    ctx.fill();
    text(ctx, badge, W - bw / 2 - 30, 62, { w: 700, size: 28, color: C.ink, align: "center" });
  }
  for (let i = 0; i < lines; i++) {
    const y = 140 + i * 74;
    if (y > H - 40) break;
    if (kind === "list") {
      dot(ctx, 50, y + 14, 14, "#2C2C34");
      ctx.fillStyle = "rgba(245,240,230,0.22)";
      rr(ctx, 80, y, W * (0.45 + 0.35 * ((i * 37 * r) % 1)), 14, 7);
      ctx.fill();
      ctx.fillStyle = "rgba(245,240,230,0.1)";
      rr(ctx, 80, y + 26, W * (0.3 + 0.3 * ((i * 53 * r) % 1)), 12, 6);
      ctx.fill();
    } else {
      ctx.fillStyle = i % 2 ? "rgba(245,240,230,0.05)" : "rgba(245,240,230,0.02)";
      ctx.fillRect(20, y - 10, W - 40, 60);
      for (let c = 0; c < 4; c++) {
        ctx.fillStyle = "rgba(245,240,230,0.16)";
        rr(ctx, 36 + c * (W - 60) / 4, y + 12, ((W - 60) / 4) * (0.5 + 0.35 * (((i + c) * 29 * r) % 1)), 12, 6);
        ctx.fill();
      }
    }
  }
}

/** XMEL system node face. kind: lead|read|qualify|reply|followup|book|crm|pipeline. p = activation 0..1. */
export function nodeFace(ctx, W, H, { label, kind, p = 1, who = { name: "Priya S.", meta: "3BHK · Baner · MagicBricks" } }) {
  ctx.clearRect(0, 0, W, H);
  surface(ctx, 4, 4, W - 8, H - 8, 34, { fill: "rgba(20,19,17,0.92)", border: "rgba(201,168,106,0.4)", gold: p > 0.98, glow: 0 });
  text(ctx, label, 34, 64, { w: 700, size: 30, fam: "Mono", color: p > 0.5 ? C.gold : C.ivory3, track: 4 });
  dot(ctx, W - 44, 54, 10, p > 0.5 ? C.gold : "rgba(245,240,230,0.25)");
  const k = ease.outCubic(clamp(p));
  const bx = 34, by = 100, bw = W - 68, bh = H - 134;
  ctx.save();
  ctx.globalAlpha = k;
  if (kind === "lead") {
    text(ctx, who.name, bx, by + 54, { w: 700, size: 40, color: C.ivory });
    text(ctx, who.meta, bx, by + 104, { w: 500, size: 28, color: C.ivory2 });
    text(ctx, "2:14 AM", bx, by + 148, { w: 500, size: 26, fam: "Mono", color: C.ivory3 });
  } else if (kind === "read") {
    ["budget", "timeline", "location", "intent"].forEach((s, i) => {
      const on = k * 4 > i + 0.3;
      text(ctx, (on ? "● " : "○ ") + s, bx, by + 44 + i * 42, { w: 500, size: 28, fam: "Mono", color: on ? C.ivory : C.ivory3 });
    });
  } else if (kind === "qualify") {
    const cx = bx + bw / 2, cy = by + bh / 2 + 6, r = Math.min(bw, bh) * 0.4;
    ctx.lineWidth = 12;
    ctx.strokeStyle = "rgba(245,240,230,0.1)";
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25);
    ctx.stroke();
    ctx.strokeStyle = C.gold;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * 0.92 * k);
    ctx.stroke();
    text(ctx, String(Math.round(92 * k)), cx, cy + 22, { w: 600, size: 72, fam: "Fraunces", color: C.ivory, align: "center" });
    text(ctx, "HOT", cx, cy + 70, { w: 700, size: 22, fam: "Mono", color: C.gold, align: "center", track: 4 });
  } else if (kind === "reply") {
    rr(ctx, bx, by + 10, bw, 90, 26);
    ctx.fillStyle = "rgba(201,168,106,0.16)";
    ctx.fill();
    text(ctx, `Hi ${who.name.split(" ")[0]}! Yes, it's available…`, bx + 24, by + 66, { w: 500, size: 28, color: C.ivory });
    text(ctx, "0:42", bx, by + 150, { w: 700, size: 30, fam: "Mono", color: C.gold });
  } else if (kind === "followup") {
    ["Day 1 · floor plan", "Day 3 · price sheet", "Day 6 · visit invite"].forEach((s, i) => {
      const on = k * 3 > i + 0.2;
      text(ctx, (on ? "✓ " : "· ") + s, bx, by + 50 + i * 46, { w: 500, size: 28, color: on ? C.ivory : C.ivory3 });
    });
  } else if (kind === "book") {
    for (let i = 0; i < 7; i++) {
      const x = bx + i * (bw / 7);
      const sel = i === 5;
      rr(ctx, x + 4, by + 20, bw / 7 - 8, 110, 12);
      ctx.fillStyle = sel && k > 0.6 ? C.gold : "rgba(245,240,230,0.07)";
      ctx.fill();
      text(ctx, "MTWTFSS"[i], x + bw / 14, by + 86, { w: 700, size: 26, fam: "Mono", color: sel && k > 0.6 ? C.ink : C.ivory3, align: "center" });
    }
    text(ctx, "Sat · 11:00 AM", bx, by + 178, { w: 700, size: 30, color: k > 0.6 ? C.gold : C.ivory3 });
  } else if (kind === "crm") {
    ["Stage", "Score", "Next"].forEach((s, i) => {
      text(ctx, s.toUpperCase(), bx, by + 44 + i * 50, { w: 700, size: 22, fam: "Mono", color: C.ivory3, track: 2 });
      text(ctx, ["Booked", "92 · hot", "Showing"][i], bx + bw, by + 44 + i * 50, { w: 700, size: 28, color: i === 0 ? C.gold : C.ivory, align: "right" });
    });
  } else if (kind === "pipeline") {
    for (let i = 0; i < 5; i++) {
      const hgt = (40 + i * 26) * k;
      rr(ctx, bx + i * (bw / 5) + 8, by + bh - hgt, bw / 5 - 16, hgt, 8);
      ctx.fillStyle = i === 4 ? C.gold : "rgba(245,240,230,0.2)";
      ctx.fill();
    }
  }
  ctx.restore();
}

/** Qualification chips row. */
export function chips(ctx, W, H, { items, p = 1 }) {
  ctx.clearRect(0, 0, W, H);
  font(ctx, 700, 34);
  const total = items.reduce((a, s) => a + ctx.measureText(s).width + 110, 0) + 18 * (items.length - 1);
  let x = Math.max(10, (W - total) / 2);
  items.forEach((s, i) => {
    const k = clamp(p * items.length - i);
    if (k <= 0) return;
    font(ctx, 700, 34);
    const w = ctx.measureText(s).width + 110;
    ctx.save();
    ctx.globalAlpha = k;
    rr(ctx, x, 10, w, 80, 40);
    ctx.fillStyle = "rgba(201,168,106,0.14)";
    ctx.fill();
    ctx.strokeStyle = C.gold;
    ctx.lineWidth = 2;
    ctx.stroke();
    dot(ctx, x + 42, 50, 18, C.gold);
    icon(ctx, "check", x + 30, 38, 24, C.ink, 3.4);
    text(ctx, s, x + 76, 62, { w: 700, size: 34, color: C.ivory });
    ctx.restore();
    x += w + 18;
  });
}

/** Week calendar with a slot that slides into place and locks. */
export function calendar(ctx, W, H, { p = 1, locked = false }) {
  ctx.clearRect(0, 0, W, H);
  surface(ctx, 4, 4, W - 8, H - 8, 36, { fill: "rgba(20,20,24,0.97)" });
  text(ctx, "SEPTEMBER", 44, 78, { w: 700, size: 28, fam: "Mono", color: C.ivory3, track: 4 });
  text(ctx, "Week 38", W - 44, 78, { w: 500, size: 28, color: C.ivory3, align: "right" });
  const gx = 44, gy = 120, gw = W - 88, gh = H - 170;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cw = gw / 7;
  days.forEach((d, i) => text(ctx, d, gx + i * cw + cw / 2, gy + 20, { w: 700, size: 26, color: i === 5 ? C.ivory : C.ivory3, align: "center" }));
  ctx.strokeStyle = "rgba(245,240,230,0.07)";
  ctx.lineWidth = 2;
  for (let r = 0; r <= 6; r++) {
    ctx.beginPath();
    ctx.moveTo(gx, gy + 50 + (r * (gh - 50)) / 6);
    ctx.lineTo(gx + gw, gy + 50 + (r * (gh - 50)) / 6);
    ctx.stroke();
  }
  // a few existing appointments, muted
  [[0, 1], [2, 3], [3, 0], [4, 4], [1, 5]].forEach(([d, r]) => {
    rr(ctx, gx + d * cw + 6, gy + 50 + (r * (gh - 50)) / 6 + 6, cw - 12, (gh - 50) / 6 - 12, 10);
    ctx.fillStyle = "rgba(245,240,230,0.08)";
    ctx.fill();
  });
  // the booked slot: Sat, row 2
  const tx = gx + 5 * cw + 6, ty = gy + 50 + (2 * (gh - 50)) / 6 + 6;
  const k = ease.outExpo(clamp(p));
  const sx = tx + (1 - k) * 260, sy = ty - (1 - k) * 120;
  ctx.save();
  ctx.shadowColor = "rgba(201,168,106,0.5)";
  ctx.shadowBlur = 40 * k;
  rr(ctx, sx, sy, cw - 12, (gh - 50) / 6 - 12, 10);
  ctx.fillStyle = C.gold;
  ctx.globalAlpha = clamp(p * 3);
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.globalAlpha = clamp(p * 3);
  text(ctx, "11:00", sx + (cw - 12) / 2, sy + 48, { w: 700, size: 26, color: C.ink, align: "center" });
  if (locked) icon(ctx, "check", sx + (cw - 12) / 2 - 14, sy + 62, 28, C.ink, 3.4);
  ctx.restore();
}

/** Pipeline column header card. */
export function column(ctx, W, H, { name, count = 0, gold = false }) {
  ctx.clearRect(0, 0, W, H);
  rr(ctx, 2, 2, W - 4, H - 4, 26);
  ctx.fillStyle = "rgba(245,240,230,0.03)";
  ctx.fill();
  ctx.strokeStyle = gold ? "rgba(201,168,106,0.5)" : "rgba(245,240,230,0.1)";
  ctx.lineWidth = 2;
  ctx.stroke();
  text(ctx, name.toUpperCase(), 30, 58, { w: 700, size: 26, fam: "Mono", color: gold ? C.gold : C.ivory3, track: 3 });
  text(ctx, String(count), W - 30, 58, { w: 700, size: 26, fam: "Mono", color: gold ? C.gold : C.ivory3, align: "right" });
}

/** A lead card in the pipeline. */
export function leadCard(ctx, W, H, { name, meta, gold = false }) {
  ctx.clearRect(0, 0, W, H);
  surface(ctx, 3, 3, W - 6, H - 6, 20, { fill: gold ? "rgba(30,26,18,0.98)" : "rgba(26,26,31,0.98)", border: gold ? C.gold : "rgba(245,240,230,0.14)", gold });
  text(ctx, name, 26, 52, { w: 700, size: 30, color: C.ivory });
  text(ctx, meta, 26, 92, { w: 500, size: 24, color: gold ? C.gold : C.ivory3 });
}
