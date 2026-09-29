// ACTS V–VI (18.0–30.0): the same night, answered. Every failure beat from
// Act I plays again, resolved in gold, then the threads become the mark.
import * as THREE from "three";
import { C, clamp, ease, seg, lerp, between, counterAt } from "./util.js";
import * as UI from "./ui.js";
import * as T from "./type.js";
import { makeCard, makeGrid, makePhone, makeThread, makeLogo, makeText3D, lineX, GOLD_LINE, IVORY_LINE, MAT, aim } from "./world.js";

const kick = (lt, amp) => (lt < 0 ? 0 : amp * Math.exp(-lt * 14) * Math.sin(lt * 60));
const screenMask = (ctx, w, h) => {
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillStyle = "#000";
  UI.rr(ctx, 0, 0, w, h, 120);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
};

export async function buildResolve({ engine, env, cam, W, H, lead, IN }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0b0e);
  scene.environment = env;
  scene.fog = new THREE.FogExp2(0x0b0b0e, 0.03);
  const grid = makeGrid({ y: -3.2, cell: 0.5 });
  grid.material.uniforms.uGold.value = 0.55;
  grid.material.uniforms.uAmount.value = 0.07;
  grid.material.uniforms.uMajor.value = 4;
  scene.add(grid);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xfff1d6, 1.8);
  key.position.set(-3, 6, 8);
  scene.add(key);

  const first = lead.name.split(" ")[0];
  const aiText = IN ? `Hi ${first}! Yes, it's available. Can I book you a site visit Saturday at 11?` : `Hi ${first}! Yes, it's available. Want a showing Saturday at 11?`;
  const msgs = [
    { from: "lead", text: lead.ask, time: "2:14 AM" },
    { from: "ai", text: aiText, time: "2:14 AM" },
    { from: "lead", text: "Yes! Saturday works.", time: "2:15 AM" },
  ];

  // ── 1. Chat, answered (x = 0) ──
  const phone = makePhone({
    draw: (ctx, w, h, s) => {
      UI.chat(ctx, w, h, { contact: lead.name, channel: IN ? "WhatsApp" : "Text message", messages: msgs, shown: s.shown, typing: s.typing, typePhase: s.tp, gold: true, wa: IN });
      screenMask(ctx, w, h);
    },
  });
  scene.add(phone.group);
  const gold42 = await makeText3D("/fonts/fraunces-900.ttf", "42s", { size: 0.55, depth: 0.22, material: MAT.gold() });
  gold42.material.emissive = new THREE.Color(0x5a4420);
  gold42.material.emissiveIntensity = 0.4;
  scene.add(gold42);
  const chips = makeCard({ w: 3.4, h: 0.34, ppu: 300, shadow: false, draw: (ctx, w, h, s) => UI.chips(ctx, w, h, { items: IN ? ["₹1.2 Cr budget", "Loan ready", "This week"] : ["Pre-approved", "$640k", "This week"], p: s.p }) });
  chips.group.position.set(0.1, -1.3, 0.7);
  chips.group.scale.setScalar(0.56);
  scene.add(chips.group);

  // ── 2. Calendar locks (x = 12) ──
  const cal = makeCard({ w: 3.2, h: 2.4, ppu: 300, draw: (ctx, w, h, s) => UI.calendar(ctx, w, h, s) });
  cal.group.position.set(12, 0, 0);
  scene.add(cal.group);

  // ── 3. The row returns to the sheet (x = 24) ──
  const rows = [
    ["Mike R.", "Website", "Leak repair", "Called"],
    ["Jen L.", "Google", "EV charger", "Quoted"],
    lead.row,
    ["Tom B.", "Facebook", "New patient", "Replied"],
    ["Dana W.", "Referral", "Roof inspect", "Booked"],
    ["Aisha T.", "Instagram", "Balayage", "Replied"],
  ];
  const booked = rows.map((r, i) => (i === 2 ? [...r.slice(0, 3), "Booked"] : r));
  const sheet = makeCard({ w: 4.2, h: 0.46 * 7, ppu: 300, draw: (ctx, w, h, s) => UI.sheet(ctx, w, h, { rows: s.done ? booked : rows, hideRow: s.done ? -1 : 2, gold: true, highlight: s.done ? 2 : -1, rowH: h / 7 }) });
  sheet.group.position.set(24, 0, 0);
  scene.add(sheet.group);
  const row = makeCard({ w: 4.2, h: 0.46, ppu: 300, draw: (ctx, w, h, s) => UI.rowCard(ctx, w, h, { cells: lead.row, gold: true, status: "Booked" }) });
  row.set({});
  scene.add(row.group);

  // ── 4. Morning (x = 36) ──
  const morning = makePhone({
    draw: (ctx, w, h) => {
      UI.lockScreen(ctx, w, h, { time: "7:02", date: IN ? "Monday, 15 September" : "Monday, September 15", morning: 1 });
      screenMask(ctx, w, h);
    },
  });
  morning.screen.set({});
  morning.group.position.set(36, 0, 0);
  scene.add(morning.group);
  const mNotif = makeCard({ w: 1.62, h: 0.56, ppu: 620, shadow: false, draw: (ctx, w, h) => UI.notification(ctx, w, h, { app: "XMEL", title: IN ? "Site visit booked · Sat 11:00" : "Showing booked · Sat 11:00", body: `${lead.name} · handled at 2:15 AM`, time: "now", gold: true, iconName: "check" }) });
  mNotif.set({});
  mNotif.group.position.set(0, 0.1, 0.02);
  morning.group.add(mNotif.group);

  // ── 5. Pipeline board (x = 50) ──
  const others = IN ? ["Rahul M.", "Sneha K.", "Arjun P.", "Neha G.", "Vikram S.", "Ananya R.", "Karan D."] : ["Mike R.", "Jen L.", "Tom B.", "Dana W.", "Aisha T.", "Chris P.", "Olivia K."];
  const srcs = IN ? ["Website", "99acres", "Instagram", "Referral", "Google", "WhatsApp", "Facebook"] : ["Website", "Google", "Facebook", "Referral", "Instagram", "Yelp", "Zillow"];
  const colNames = ["New", "Replied", "Qualified", "Booked"];
  const BX = 50, CW = 1.75, CG = 0.2;
  const colX = (c) => BX + (c - 1.5) * (CW + CG);
  const cols = colNames.map((name, c) => {
    const k = makeCard({ w: CW, h: 4.6, ppu: 240, shadow: false, draw: (ctx, w, h, s) => UI.column(ctx, w, h, { name, count: s.n, gold: c === 3 }) });
    k.group.position.set(colX(c), 0, -0.02);
    scene.add(k.group);
    return k;
  });
  const people = [{ name: lead.name, src: lead.src, gold: true, final: 3 }, ...others.map((n, i) => ({ name: n, src: srcs[i], gold: false, final: [2, 3, 1, 3, 2, 3, 1][i] }))];
  const cards = people.map((p, i) => {
    const k = makeCard({ w: CW - 0.2, h: 0.42, ppu: 260, draw: (ctx, w, h, s) => UI.leadCard(ctx, w, h, { name: p.name, meta: `${p.src} · replied 0:${String(38 + ((i * 7) % 20)).padStart(2, "0")}`, gold: p.gold }) });
    k.set({});
    scene.add(k.group);
    return { ...p, k, i };
  });
  // Stage of card i at time t; each advance lands on the beat (0.25s at 120 BPM).
  const stageAt = (c, t) => {
    let s = 0;
    for (let st = 1; st <= c.final; st++) if (t >= 23.25 + c.i * 0.125 + (st - 1) * 0.5) s = st;
    return s;
  };
  const layout = (t) => {
    const pos = [];
    const count = [0, 0, 0, 0];
    cards.forEach((c) => {
      const s = stageAt(c, t);
      const slot = count[s]++;
      pos.push([colX(s), 2.3 - 0.62 - slot * 0.5]);
    });
    return { pos, count };
  };

  // ── 6. The mark (x = 100) ──
  const LX = 100;
  const logo = makeLogo({ size: 3.2, depth: 16 });
  logo.group.position.set(LX, 0, 0);
  logo.goldMat.envMapIntensity = 0.75;
  logo.ivoryMat.envMapIntensity = 0.45;
  logo.ivoryMat.color.set(0xcdc2ae);
  scene.add(logo.group);
  const ls = logo.scale;
  const gTop = new THREE.Vector3(LX + lineX(GOLD_LINE, -61.8) * ls, 61.8 * ls, 0.3);
  const gBot = new THREE.Vector3(LX + lineX(GOLD_LINE, 61.8) * ls, -61.8 * ls, 0.3);
  const iTop = new THREE.Vector3(LX + lineX(IVORY_LINE, -61.8) * ls, 61.8 * ls, 0.36);
  const iBot = new THREE.Vector3(LX + lineX(IVORY_LINE, 61.8) * ls, -61.8 * ls, 0.36);
  const gDir = gBot.clone().sub(gTop).normalize();
  const iDir = iBot.clone().sub(iTop).normalize();
  const iUp = iDir.clone().negate(); // the ivory stroke is drawn bottom → top
  const gClip = new THREE.Plane(gDir.clone().negate(), 0);
  const iClip = new THREE.Plane(iUp.clone().negate(), 0);
  logo.goldMat.clippingPlanes = [gClip];
  logo.ivoryMat.clippingPlanes = [iClip];
  const wipe = (plane, dir, a, b, p) => (plane.constant = lerp(dir.dot(a) - 0.4, dir.dot(b) + 0.4, p));
  // The two threads sweep in from the dark and run the strokes.
  const along = (a, b, k) => a.clone().lerp(b, k);
  const gT = makeThread([new THREE.Vector3(LX - 1.8, 3.5, -16), new THREE.Vector3(LX - 2.4, 2.6, -5), gTop.clone().add(new THREE.Vector3(-0.8, 1.2, 0)), gTop, along(gTop, gBot, 0.5), gBot, gBot.clone().add(gDir.clone().multiplyScalar(0.5))], { radius: 0.04, segments: 500, tension: 0.5 });
  const iT = makeThread([new THREE.Vector3(LX + 1.8, -3.5, -16), new THREE.Vector3(LX + 2.4, -2.6, -5), iBot.clone().add(new THREE.Vector3(-0.9, -1.2, 0)), iBot, along(iBot, iTop, 0.5), iTop, iTop.clone().add(iDir.clone().multiplyScalar(-0.5))], { radius: 0.03, color: "ivory", segments: 500, tension: 0.5 });
  scene.add(gT.group, iT.group);
  const sweep = new THREE.PointLight(0xfff0d0, 0, 12, 1.4);
  scene.add(sweep);

  const ov = engine.ovCtx;
  const u = T.U(W, H);
  const hideAll = (t) => {
    gold42.visible = false;
    chips.group.visible = false;
    row.group.visible = false;
    cards.forEach((c) => (c.k.group.visible = t >= 22.95 && t < 25.0));
  };

  return (t) => {
    hideAll(t);
    const v = counterAt(t);
    let bloom = 0.55;
    sweep.intensity = 0;
    logo.group.visible = gT.group.visible = iT.group.visible = t >= 24.9;

    if (t < 20.6) {
      // Chat: the same message, answered. The counter stops at 42 seconds.
      const shown = t < 19.2 ? 1 : t < 19.75 ? 2 : 3;
      const typing = between(t, 18.25, 19.2);
      phone.screen.set({ shown, typing, tp: typing ? Math.round(((t * 1.6) % 1) * 20) / 20 : 0 });
      if (t < 18.8) {
        const p = ease.outCubic(seg(t, 18.0, 18.8));
        aim(cam, [lerp(0.5, 0.25, p), lerp(1.0, 0.75, p), lerp(1.7, 3.4, p)], [lerp(0.45, 0.25, p), lerp(1.0, 0.7, p), 0], 30, lerp(0.02, -0.01, p));
      } else if (t < 19.6) {
        const p = ease.inOutCubic(seg(t, 18.8, 19.4));
        const k = kick(t - 19.2, 0.05);
        aim(cam, [lerp(0.25, -0.9, p) + k, lerp(0.75, 0.15, p) + k, lerp(3.4, 7.0, p)], [lerp(0.25, 0.25, p), lerp(0.7, -0.1, p), 0], 30, lerp(-0.01, 0.03, p));
      } else {
        const p = ease.inOutCubic(seg(t, 19.6, 20.6));
        aim(cam, [lerp(-0.9, 1.3, p), lerp(0.15, -0.3, p), lerp(7.0, 6.2, p)], [0.1, -0.4, 0], 30, lerp(0.03, -0.02, p));
      }
      if (t >= 19.2) {
        gold42.visible = true;
        const k = ease.outBack(seg(t, 19.2, 19.42), 2.4);
        gold42.scale.setScalar(Math.max(0.001, lerp(1.9, 1, k)));
        gold42.position.set(0.15, -0.5, lerp(2.2, 0.9, ease.outExpo(seg(t, 19.2, 19.4))));
        gold42.rotation.set(0.05, -0.35 + (t - 19.2) * 0.25, 0);
        bloom = 0.55 + 0.6 * Math.exp(-(t - 19.2) * 5);
      }
      if (t >= 19.7) {
        chips.group.visible = true;
        chips.set({ p: Math.round(ease.outCubic(seg(t, 19.7, 20.2)) * 30) / 30 });
      }
      if (between(t, 19.62, 20.6)) T.scrim(ov, W, H, 850, 0, 0.6);
      if (between(t, 19.62, 20.6)) T.slam(ov, W, H, ["Qualified."], t - 19.62, { size: 176, y: 560 });
      T.scrim(ov, W, H, 340, 0, 0.75);
      T.counter(ov, W, H, v, { gold: true });
      if (t >= 19.2 && t < 19.6) T.label(ov, W, H, "FIRST REPLY", 64, 270, { size: 24, color: C.gold, track: 6 });
      return { scene, camera: cam, bloom };
    }

    if (t < 21.4) {
      // BOOKED. The slot slides in and locks.
      cal.set({ p: Math.round(seg(t, 20.68, 21.0) * 30) / 30, locked: t >= 21.02 });
      const p = ease.outCubic(seg(t, 20.6, 21.4));
      const k = kick(t - 21.02, 0.04);
      aim(cam, [12 + lerp(1.6, 1.1, p) + k, lerp(0.6, 0.35, p), lerp(4.2, 3.6, p)], [12 + 0.75, 0.1 + k, 0], 32, -0.04);
      if (t >= 20.98) T.slam(ov, W, H, ["Booked."], t - 20.98, { size: 196, y: 1520, color: C.gold });
      T.counter(ov, W, H, v, { gold: true });
      return { scene, camera: cam, bloom: 0.6 };
    }

    if (t < 22.2) {
      // The row that fell through in Act I comes back up and locks in, gold.
      const done = t >= 21.82;
      sheet.set({ done });
      if (!done) {
        row.group.visible = true;
        const r = ease.outExpo(seg(t, 21.4, 21.82));
        row.group.position.set(24 + (1 - r) * 0.6, lerp(-3.2, 0, r), lerp(1.6, 0.02, r));
        row.group.rotation.set(-(1 - r) * 0.9, 0, -(1 - r) * 0.35);
      }
      const p = ease.outCubic(seg(t, 21.4, 22.2));
      const k = kick(t - 21.82, 0.03);
      aim(cam, [lerp(23.0, 23.4, p) + k, lerp(-0.5, 0.35, p), lerp(3.4, 3.0, p)], [lerp(23.6, 24.3, p), lerp(-0.8, 0, p), 0], 34, 0.04);
      T.scrim(ov, W, H, 1100, 1920);
      T.slam(ov, W, H, ["Never"], t - 21.45, { size: 150, y: 1480 });
      T.slam(ov, W, H, ["forgotten."], t - 21.82, { size: 150, y: 1480 + 138, color: C.gold });
      T.counter(ov, W, H, v, { gold: true });
      return { scene, camera: cam, bloom: 0.6 };
    }

    if (t < 23.0) {
      // Morning. The showing is already on the calendar.
      const p = ease.outCubic(seg(t, 22.2, 23.0));
      aim(cam, [36 + lerp(-0.6, -0.2, p), lerp(0.6, 0.35, p), lerp(6.4, 5.0, p)], [36, 0.1, 0], 30, lerp(-0.03, 0, p));
      T.slam(ov, W, H, ["While you", "slept."], t - 22.28, { size: 170, y: 1500, fam: "Fraunces", weight: 400, style: "italic", upper: false, track: -0.02, lh: 1.0 });
      T.counter(ov, W, H, v, { gold: true });
      return { scene, camera: cam, bloom: 0.5 };
    }

    if (t < 25.0) {
      // EVERY LEAD. EVERY TIME. The board fills on the beat.
      // Box-filter the stepped layout over 0.16s in fine steps: moves glide, no ghosting.
      const smooth = Array.from({ length: 17 }, (_, k) => layout(t - k * 0.01).pos);
      const now = layout(t);
      cards.forEach((c, i) => {
        let x = 0, y = 0;
        smooth.forEach((P) => { x += P[i][0]; y += P[i][1]; });
        x /= smooth.length;
        y /= smooth.length;
        const moving = Math.abs(x - now.pos[i][0]) > 0.01;
        c.k.group.position.set(x, y, moving ? 0.25 : 0.02);
        c.k.group.rotation.z = moving ? -0.06 : 0;
      });
      cols.forEach((k, c) => k.set({ n: now.count[c] }));
      const p = ease.inOutCubic(seg(t, 23.0, 25.0));
      aim(cam, [lerp(BX - 4.6, BX + 4.2, p), lerp(0.9, 1.4, p), lerp(6.0, 7.2, p)], [lerp(BX - 1.2, BX + 1.6, p), lerp(0.4, 0.2, p), 0], 36, lerp(0.05, -0.04, p));
      T.scrim(ov, W, H, 1200, 1920, 0.7);
      T.slam(ov, W, H, ["Every lead."], t - 23.05, { size: 150, y: 1520 });
      if (t >= 24.0) T.slam(ov, W, H, ["Every time."], t - 24.0, { size: 150, y: 1520 + 140, color: C.gold });
      return { scene, camera: cam, bloom: 0.55 };
    }

    // ── The mark ──
    const gp = ease.inOutCubic(seg(t, 25.0, 26.6));
    const ip = ease.inOutCubic(seg(t, 25.1, 26.6));
    gT.setProgress(gp);
    iT.setProgress(ip);
    const wg = ease.outExpo(seg(t, 26.45, 26.85));
    const wi = ease.outExpo(seg(t, 26.55, 26.95));
    wipe(gClip, gDir, gTop, gBot, wg);
    wipe(iClip, iUp, iBot, iTop, wi);
    gT.group.visible = iT.group.visible = t < 27.0;
    const impact = t - 26.6;
    if (t >= 26.6) {
      sweep.intensity = 22 * ease.inOutCubic(seg(t, 26.9, 27.4)) * (1 - ease.inOutCubic(seg(t, 27.9, 28.4)));
      sweep.position.set(LX + lerp(-3.5, 3.5, ease.inOutCubic(seg(t, 26.9, 28.3))), lerp(1.6, -0.8, seg(t, 26.9, 28.3)), 2.2);
      bloom = 0.5 + 0.7 * Math.exp(-impact * 6);
    }

    if (t < 28.4) {
      const p = seg(t, 25.0, 28.4);
      const k = kick(impact, 0.08);
      const orbit = lerp(-0.5, 0.18, ease.outCubic(p));
      const d = lerp(11.5, 9.2, ease.outCubic(p));
      aim(cam, [LX + Math.sin(orbit) * d + k, lerp(-0.8, 0.1, ease.outCubic(p)) + k, Math.cos(orbit) * d], [LX, lerp(-0.2, -0.45, p), 0], 30, lerp(0.05, 0, ease.outCubic(p)));
      if (t < 26.5) {
        T.serifSweep(ov, W, H, "Answered first.", t - 25.05, { size: 150, y: 1560, sweep: 0.9 });
      }
      if (t >= 27.2) T.wordmark(ov, W, H, t - 27.2, { y: 1520, size: 92 });
      if (impact >= 0 && impact < 0.12) {
        ov.fillStyle = `rgba(245,240,230,${0.5 * (1 - impact / 0.12)})`;
        ov.fillRect(0, 0, W, H);
      }
      return { scene, camera: cam, bloom };
    }

    // CLOSE THE GAP. The end card.
    const p = ease.outExpo(seg(t, 28.4, 28.9));
    aim(cam, [LX + Math.sin(0.18) * lerp(9.2, 13, p), lerp(0.1, -1.0, p), Math.cos(0.18) * lerp(9.2, 13, p)], [LX, lerp(-0.45, -1.35, p), 0], 30, 0);
    sweep.intensity = 0;
    T.slam(ov, W, H, ["Close", "the gap."], t - 28.45, { size: 200, y: 1330, align: "center", x: W / 2 / u, stagger: 0.12 });
    T.label(ov, W, H, "xmelautomations.xyz", W / 2 / u, 1800, { size: 34, color: C.gold, align: "center", track: 3, alpha: t >= 28.75 ? 1 : 0 });
    T.counter(ov, W, H, 42, { gold: true, alpha: t >= 28.9 ? 1 : 0, x: W / 2 - 150 * u, y: 1620 * u });
    return { scene, camera: cam, bloom: 0.6 };
  };
}
