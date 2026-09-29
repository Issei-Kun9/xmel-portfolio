import * as THREE from "three";
import { C, clamp, ease, seg, lerp, rng, shake, counterAt, between } from "./util.js";
import * as UI from "./ui.js";
import * as T from "./type.js";
import { makeEnv, makeCard, makeGrid, makePhone, aim } from "./world.js";
import { buildSystem } from "./system.js";
import { buildResolve } from "./resolve.js";

/** Impact kick: a decaying jolt after a stamp. */
const kick = (lt, amp) => (lt < 0 ? 0 : amp * Math.exp(-lt * 16) * Math.sin(lt * 70));

export async function buildDirector(engine, { variant = "us" } = {}) {
  const { width: W, height: H } = engine;
  const env = makeEnv(engine.renderer);
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.01, 500);
  const black = new THREE.Scene();
  black.background = new THREE.Color(0x000000);

  const IN = variant === "in";
  const lead = IN
    ? { name: "Priya S.", src: "MagicBricks", ask: "Hi, is the 3BHK in Baner still available?", app: "MAGICBRICKS", title: "New lead · Priya S.", body: "3BHK in Baner · ₹1.2 Cr · wants a site visit", row: ["Priya S.", "MagicBricks", "3BHK · ₹1.2 Cr", "New"] }
    : { name: "Sarah M.", src: "Zillow", ask: "Hi, is the 3-bed on Oak Street still available?", app: "ZILLOW", title: "New lead · Sarah M.", body: "3-bed on Oak St · pre-approved · wants a showing", row: ["Sarah M.", "Zillow", "3-bed · $640k", "New"] };

  // ── Scene A: the night ledger, where things go wrong ───────────────────
  const A = new THREE.Scene();
  A.background = new THREE.Color(0x0b0b0e);
  A.environment = env;
  A.fog = new THREE.FogExp2(0x0b0b0e, 0.045);
  const gridA = makeGrid({ y: -3.2 });
  gridA.material.uniforms.uAmount.value = 0.05;
  A.add(gridA);
  A.add(new THREE.AmbientLight(0xffffff, 0.35));
  const keyA = new THREE.DirectionalLight(0xfff1d6, 1.6);
  keyA.position.set(-3, 6, 8);
  A.add(keyA);

  // Hook phone: lock screen with the lead notification.
  const phoneLock = makePhone({
    draw: (ctx, w, h, s) => {
      UI.lockScreen(ctx, w, h, { time: "2:14", date: IN ? "Sunday, 14 September" : "Sunday, September 14", morning: s.morning || 0 });
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = "#000";
      UI.rr(ctx, 0, 0, w, h, 120);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    },
  });
  phoneLock.group.position.set(0, 0, 0);
  A.add(phoneLock.group);
  const notif = makeCard({ w: 1.62, h: 0.56, ppu: 620, shadow: false, draw: (ctx, w, h, s) => UI.notification(ctx, w, h, { app: lead.app, title: lead.title, body: lead.body, time: "now", gold: s.gold, iconName: "home" }) });
  notif.group.position.set(0, 0.18, 0.02);
  phoneLock.group.add(notif.group);

  // Wall of notifications for the pull-back (one tall texture, drawn once).
  const wall = makeCard({
    w: 1.62,
    h: 1.62 * 11,
    ppu: 300,
    shadow: false,
    draw: (ctx, w, h) => {
      const r = rng(4);
      const titles = ["New lead", "Missed call", "New message", "Portal enquiry", "Voicemail (0:42)", "Form submission", "New lead", "Missed call", "WhatsApp message", "Reminder: call back"];
      const each = w * 0.36;
      for (let i = 0; i * (each + 18) < h; i++) {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = Math.round(each);
        UI.notification(c.getContext("2d"), c.width, c.height, { app: ["ZILLOW", "WEBSITE", "FACEBOOK", "PHONE", "WHATSAPP"][Math.floor(r() * 5)], title: titles[i % titles.length], body: "", time: `${Math.floor(r() * 59) + 1}m ago`, iconName: ["home", "missed", "chat", "mail", "phone"][i % 5] });
        ctx.globalAlpha = 0.9;
        ctx.drawImage(c, 0, i * (each + 18));
      }
    },
  });
  wall.set({});
  wall.group.position.set(0, -6, -0.05);
  A.add(wall.group);
  const wall2 = makeCard({ w: 1.62, h: 1.62 * 11, ppu: 300, shadow: false, draw: (ctx, w, h) => { ctx.drawImage(wall.ctx.canvas, 0, 0, w, h); } });
  const wall3 = makeCard({ w: 1.62, h: 1.62 * 11, ppu: 300, shadow: false, draw: (ctx, w, h) => { ctx.drawImage(wall.ctx.canvas, 0, 0, w, h); } });
  wall2.set({});
  wall3.set({});
  wall2.group.position.set(-1.9, -3, -0.6);
  wall3.group.position.set(1.9, -8, -0.6);
  A.add(wall2.group, wall3.group);

  // Call phone.
  const phoneCall = makePhone({
    draw: (ctx, w, h, s) => {
      UI.callScreen(ctx, w, h, { name: `${lead.name} · ${lead.src} lead`, state: s.state, phase: s.phase });
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = "#000";
      UI.rr(ctx, 0, 0, w, h, 120);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    },
  });
  phoneCall.group.position.set(20, 0, 0);
  A.add(phoneCall.group);

  // Chat phone (unanswered).
  const msgsNo = [{ from: "lead", text: lead.ask, time: "2:16 AM" }];
  const phoneChat = makePhone({
    draw: (ctx, w, h, s) => {
      UI.chat(ctx, w, h, { contact: lead.name, channel: IN ? "WhatsApp" : "Text message", messages: msgsNo, shown: s.shown, seen: s.seen, wa: IN });
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = "#000";
      UI.rr(ctx, 0, 0, w, h, 120);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    },
  });
  phoneChat.group.position.set(40, 0, 0);
  A.add(phoneChat.group);

  // Spreadsheet + the row that falls through.
  const rows = [
    ["Mike R.", "Website", "Leak repair", "Called"],
    ["Jen L.", "Google", "EV charger", "Quoted"],
    lead.row,
    ["Tom B.", "Facebook", "New patient", "No reply"],
    ["Dana W.", "Referral", "Roof inspect", "?"],
    ["Aisha T.", "Instagram", "Balayage", "Missed"],
  ];
  const sheetCard = makeCard({ w: 4.2, h: 0.46 * 7, ppu: 300, draw: (ctx, w, h, s) => UI.sheet(ctx, w, h, { rows, edit: s.edit, hideRow: s.hideRow ?? -1, rowH: h / 7 }) });
  sheetCard.group.position.set(60, 0, 0);
  A.add(sheetCard.group);
  const rowFall = makeCard({ w: 4.2, h: 0.46, ppu: 300, draw: (ctx, w, h, s) => UI.rowCard(ctx, w, h, { cells: lead.row, gold: s.gold, status: s.status }) });
  A.add(rowFall.group);

  // The competitor's confirmation + the gold thread that snaps.
  const confirm = makeCard({ w: 2.6, h: 0.62, ppu: 380, draw: (ctx, w, h) => UI.confirmCard(ctx, w, h, { title: IN ? "Site visit booked" : "Showing booked", sub: IN ? "with another broker" : "with another agent", time: "Sat 11:00 AM" }) });
  confirm.set({});
  confirm.group.position.set(80, 0.3, 0);
  A.add(confirm.group);
  const threadMat = new THREE.MeshPhysicalMaterial({ color: 0xc9a86a, metalness: 1, roughness: 0.25, emissive: 0x8a6a2f, emissiveIntensity: 0.6 });
  const threadL = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 3, 12), threadMat);
  const threadR = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 3, 12), threadMat);
  threadL.rotation.z = Math.PI / 2;
  threadR.rotation.z = Math.PI / 2;
  A.add(threadL, threadR);

  // Overload deck: app tiles.
  const apps = [
    { name: IN ? "WhatsApp" : "Messages", iconName: "chat", badge: "37", kind: "list" },
    { name: "Leads.xlsx", iconName: "grid", kind: "table" },
    { name: "Inbox", iconName: "mail", badge: "112", kind: "list" },
    { name: "CRM", iconName: "user", badge: "Last contact: never", kind: "table" },
    { name: "Voicemail", iconName: "wave", badge: "9", kind: "list" },
    { name: "Calendar", iconName: "cal", badge: "2 conflicts", kind: "table" },
    { name: IN ? "99acres" : "Zillow", iconName: "home", badge: "14 new", kind: "list" },
    { name: "Notes", iconName: "note", badge: "call back??", kind: "list" },
  ];
  const tiles = apps.map((a, i) => {
    const c = makeCard({ w: 2.2, h: 1.55, ppu: 320, draw: (ctx, w, h) => UI.appTile(ctx, w, h, { ...a, r: 0.37 + i * 0.11 }) });
    c.set({});
    A.add(c.group);
    return c;
  });
  const deckCenter = new THREE.Vector3(120, 0, 0);

  // ── Acts IV–VI live in their own modules ───────────────────────────────
  const sys = await buildSystem({ engine, env, cam, W, H, lead, IN });
  const res = await buildResolve({ engine, env, cam, W, H, lead, IN });

  const ov = engine.ovCtx;
  const hideAllA = () => {
    rowFall.group.visible = false;
    threadL.visible = threadR.visible = false;
    tiles.forEach((c) => (c.group.visible = false));
  };

  // ── The timeline ───────────────────────────────────────────────────────
  return (t) => {
    const v = counterAt(t);

    // 0.00–0.10: black, the buzz plays before the picture.
    if (t < 0.1) return { scene: black, camera: cam };

    // ACT I–III (0.1–10.6) happen in scene A.
    if (t < 10.6) {
      hideAllA();
      let bloom = 0.35;
      const u = T.U(W, H);

      if (t < 2.0) {
        // Hook: macro on the notification → MISSED. → pull back to the wall.
        notif.set({ gold: false });
        phoneLock.screen.set({ morning: 0 });
        const land = ease.outBack(clamp(seg(t, 0.1, 0.3)), 2.2);
        notif.group.position.y = 0.18 + (1 - land) * 0.5;
        notif.mat.opacity = clamp(seg(t, 0.1, 0.16));
        const wallScroll = seg(t, 0.9, 2.0);
        [wall, wall2, wall3].forEach((w, i) => {
          w.group.visible = t > 0.95;
          w.group.position.y = [-6, -3, -8][i] + ease.inCubic(wallScroll) * [9, 12, 10][i];
        });
        if (t < 1.0) {
          const p = seg(t, 0.1, 1.0);
          const k = kick(t - 0.35, 0.012);
          aim(cam, [0.35 - p * 0.06 + k, 0.2 + k, 1.25 - p * 0.18], [0.05, 0.16, 0], 30, -0.03);
        } else {
          const p = ease.inOutExpo(seg(t, 1.0, 2.0));
          aim(cam, [lerp(0.29, 0.6, p), lerp(0.2, -0.2, p), lerp(1.07, 9.5, p)], [0, lerp(0.16, -0.4, p), 0], lerp(30, 38, p), lerp(-0.03, 0.05, p));
        }
        if (between(t, 0.35, 1.0)) {
          T.windowWord(ov, W, H, "MISSED.", t - 0.35, { size: 300, y: 1000, outside: t < 0.72 ? 1 : lerp(1, 0.55, seg(t, 0.72, 0.9)) });
        }
        T.counter(ov, W, H, v);
        return { scene: A, camera: cam, bloom };
      }

      if (t < 3.2) {
        // THE LEAD CALLED. → NO ANSWER.
        const ringing = t < 2.6;
        phoneCall.screen.set({ state: ringing ? "ringing" : "missed", phase: ringing ? Math.round(((t - 2.0) * 2.2 % 1) * 30) / 30 : 0 });
        if (ringing) {
          const p = seg(t, 2.0, 2.6);
          const orb = lerp(-0.26, 0.0, ease.outCubic(p));
          const k = kick(t - 2.0, 0.02);
          aim(cam, [20 + Math.sin(orb) * 6.2 + k, 0.4, Math.cos(orb) * 6.2], [20, 0.3, 0], 32, 0.02);
          T.slam(ov, W, H, ["The lead", "called."], t - 2.0, { size: 176, y: 1500 });
        } else {
          const p = ease.outExpo(seg(t, 2.6, 2.75));
          const k = kick(t - 2.6, 0.03);
          aim(cam, [20 + k, lerp(0.4, -0.95, p), lerp(6.2, 2.4, p)], [20, lerp(0.3, -0.98, p), 0], 32, 0);
          T.slam(ov, W, H, ["No", "answer."], t - 2.6, { size: 196, y: 560, misreg: true });
        }
        T.counter(ov, W, H, v);
        return { scene: A, camera: cam, bloom };
      }

      if (t < 4.4) {
        // THEY MESSAGED. → NO REPLY.
        const seen = t >= 3.8;
        phoneChat.screen.set({ shown: t > 3.32 ? 1 : 0, seen: seen && t > 3.95 ? `Seen 9:02 AM` : null });
        if (!seen) {
          const p = seg(t, 3.2, 3.8);
          aim(cam, [40.3, lerp(1.25, 0.95, ease.outCubic(p)), 3.1], [40, lerp(1.1, 0.8, ease.outCubic(p)), 0], 30, -0.02);
          T.slam(ov, W, H, ["They", "messaged."], t - 3.2, { size: 176, y: 1500 });
        } else {
          const p = seg(t, 3.8, 4.4);
          const sh = shake(t, 0.006, 14, 3);
          aim(cam, [40.2 + sh.x, 0.85 + sh.y, lerp(3.1, 2.7, p)], [40.2, 0.75, 0], 30, sh.r);
          T.slam(ov, W, H, ["No", "reply."], t - 3.8, { size: 196, y: 1480, misreg: true });
        }
        T.counter(ov, W, H, v);
        return { scene: A, camera: cam, bloom };
      }

      if (t < 5.6) {
        // FOLLOW-UP? → FORGOTTEN. (the row falls through the cracks)
        const typed = "call back??";
        let edit = null;
        if (t < 5.0) {
          const tp = seg(t, 4.45, 4.8);
          const del = seg(t, 4.82, 4.98);
          const n = Math.round(typed.length * tp * (1 - del));
          edit = { row: 2, col: 3, text: typed.slice(0, n), caret: Math.floor(t * 6) % 2 === 0 };
        }
        sheetCard.set({ edit, hideRow: t >= 5.0 ? 2 : -1 });
        if (t < 5.0) {
          const p = seg(t, 4.4, 5.0);
          aim(cam, [lerp(59.2, 60.6, p), 0.35, 2.3], [lerp(59.6, 61.0, p), 0.1, 0], 34, -0.05);
          T.scrim(ov, W, H, 800, 0);
          T.slam(ov, W, H, ["Follow-up?"], t - 4.4, { size: 168, y: 560 });
        } else {
          const lt = t - 5.0;
          rowFall.group.visible = true;
          rowFall.set({ gold: false });
          const f = Math.max(0, lt - 0.05);
          rowFall.group.position.set(60 + f * 0.4, 0.46 * 7 * 0.5 - 0.46 * 3.5 - 4.2 * f * f, 0.02 + f * 0.8);
          rowFall.group.rotation.set(-f * 0.9, 0, -f * 0.35);
          const p = ease.inCubic(seg(t, 5.0, 5.6));
          aim(cam, [60.4, lerp(0.2, -0.6, p), 3.2], [60.2, lerp(-0.2, -1.4, p), 0], 34, 0);
          T.scrim(ov, W, H, 1150, 1920);
          T.fallingWord(ov, W, H, "FORGOTTEN.", lt, { size: 158, y: 1500, fall: 0.22 });
        }
        T.counter(ov, W, H, v);
        return { scene: A, camera: cam, bloom };
      }

      if (t < 7.0) {
        // THEY MOVED ON. The only gold in the act — the thread — snaps.
        const lt = t - 5.6;
        threadL.visible = threadR.visible = true;
        const snap = seg(t, 6.25, 6.9);
        const rec = ease.outExpo(snap);
        threadL.position.set(80 - 2.6 - rec * 1.2, -0.08 - rec * 0.35 - snap * snap * 1.2, 0.05);
        threadR.position.set(80 + 0.4 + rec * 1.0, -0.08 + rec * 0.1 - snap * snap * 1.4, 0.05);
        threadL.rotation.z = Math.PI / 2 + rec * 0.35;
        threadR.rotation.z = Math.PI / 2 - rec * 0.5;
        threadMat.emissiveIntensity = snap > 0 ? lerp(0.6, 0, snap) : 0.6;
        threadMat.opacity = 1 - snap * 0.8;
        threadMat.transparent = true;
        const p = seg(t, 5.6, 7.0);
        aim(cam, [80 - 0.3 + p * 0.2, 0.55, lerp(4.6, 3.6, p)], [80 - 0.4, 0.3, 0], 30, 0);
        T.slam(ov, W, H, ["They", "moved on."], lt - 0.15, { size: 176, y: 1480 });
        T.counter(ov, W, H, v);
        return { scene: A, camera: cam, bloom: 0.5 };
      }

      // 7.0–10.4 overload montage; 10.4–10.6 implosion.
      const cut = Math.min(11, Math.floor((t - 7.0) / 0.283));
      const lt = t - 7.0 - cut * 0.283;
      const r = rng(50 + cut);
      const implode = seg(t, 10.4, 10.6);
      const intensity = seg(t, 7.0, 10.4);
      tiles.forEach((c, i) => {
        c.group.visible = true;
        const mode = cut % 4;
        const ri = rng(cut * 31 + i * 7);
        let x, y, z, rx, ry, rz;
        if (mode === 0) { x = (i % 4 - 1.5) * 2.4; y = (Math.floor(i / 4) - 0.5) * 1.8; z = -ri() * 1.5; rx = 0; ry = (ri() - 0.5) * 0.4; rz = (ri() - 0.5) * 0.2; }
        else if (mode === 1) { x = (ri() - 0.5) * 1.4; y = (ri() - 0.5) * 1.0; z = -i * 0.55; rx = 0; ry = 0.35; rz = (ri() - 0.5) * 0.5; }
        else if (mode === 2) { const a = (i / 8) * Math.PI * 2 + cut; x = Math.cos(a) * 3.2; y = Math.sin(a) * 2.2; z = -1 - ri() * 2; rx = (ri() - 0.5) * 0.7; ry = (ri() - 0.5) * 0.7; rz = (ri() - 0.5) * 0.8; }
        else { x = (i - 3.5) * 1.3; y = (ri() - 0.5) * 0.6; z = -Math.abs(i - 3.5) * 0.8; rx = 0; ry = (i - 3.5) * -0.22; rz = 0; }
        const drift = lt * (ri() - 0.5) * 1.4;
        const im = ease.inExpo(implode);
        c.group.position.set(deckCenter.x + lerp(x + drift, 0, im), deckCenter.y + lerp(y, 0, im), deckCenter.z + lerp(z, 0, im));
        c.group.rotation.set(rx * (1 - im), ry * (1 - im), rz * (1 - im) + im * 2);
        c.group.scale.setScalar(lerp(1, 0.01, im));
      });
      const sh = shake(t, 0.03 + 0.14 * intensity, 11, 9);
      const camD = [7.5, 5.2, 9, 6.5][cut % 4] - lt * 1.4;
      const ang = (r() - 0.5) * 0.9;
      const crash = ease.inExpo(implode);
      aim(cam, [deckCenter.x + Math.sin(ang) * camD + sh.x, deckCenter.y + (r() - 0.5) * 1.5 + sh.y, deckCenter.z + Math.cos(ang) * camD * lerp(1, 0.25, crash)], [deckCenter.x, deckCenter.y, deckCenter.z], lerp(34, 18, crash), sh.r * 3 + (r() - 0.5) * 0.08);
      const words = { 2: "Who replied?", 5: "Which tab?", 8: "Call back?", 10: "Lost." };
      if (words[cut] && implode === 0) T.slam(ov, W, H, [words[cut]], lt, { size: cut === 10 ? 240 : 150, y: cut % 2 ? 560 : 1500, misreg: lt < 0.07 });
      if (implode > 0) {
        ov.fillStyle = `rgba(245,240,230,${ease.inExpo(implode) * 0.9})`;
        ov.fillRect(0, 0, W, H);
      }
      T.counter(ov, W, H, v, { alpha: implode > 0 ? 1 - implode : 1 });
      return { scene: A, camera: cam, bloom: 0.35 };
    }

    // 10.6–12.0: HARD STOP. Black; the frozen counter, then it rewinds.
    if (t < 12.0) {
      const u = T.U(W, H);
      T.counter(ov, W, H, v, { big: true, x: W / 2 - 290 * u, y: H / 2 - 40 * u, label: t < 11.4 ? "RESPONSE TIME · LEAD LOST" : "RESPONSE TIME" });
      return { scene: black, camera: cam };
    }

    // 12.0–18.0: the system builds itself.
    if (t < 18.0) return sys(t);
    // 18.0–30.0: the transformation and the brand.
    return res(t);
  };
}
