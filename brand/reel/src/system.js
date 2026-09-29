// ACT IV (12.0–18.0): the system builds itself. A gold thread ignites at the
// lead and runs the pipeline; each step rises as a node when the thread
// reaches it. The crane-up reveals the network is the XMEL mark, then the
// camera dives into the REPLY node and match-cuts to the phone (Act V).
import * as THREE from "three";
import { C, clamp, ease, seg, lerp, between } from "./util.js";
import * as UI from "./ui.js";
import * as T from "./type.js";
import { makeCard, makeGrid, makeThread, makeLogo, lineX, GOLD_LINE, IVORY_LINE, aim } from "./world.js";

// Logo space → world floor: svg x/10 → x, svg y/10 → z (svg y points down = toward camera).
const S = 0.1;
const onGold = (y) => new THREE.Vector3(lineX(GOLD_LINE, y) * S, 0, y * S);
const onIvory = (y) => new THREE.Vector3(lineX(IVORY_LINE, y) * S, 0, y * S);
const CROSS_Y = -19.85;

export async function buildSystem({ engine, env, cam, W, H, lead, IN }) {
  engine.renderer.localClippingEnabled = true;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0b0e);
  scene.environment = env;
  scene.fog = new THREE.FogExp2(0x0b0b0e, 0.022);
  const grid = makeGrid({ y: -0.01, cell: 0.5 });
  grid.material.uniforms.uMajor.value = 4;
  scene.add(grid);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const key = new THREE.DirectionalLight(0xfff1d6, 2.2);
  key.position.set(-6, 10, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc9a86a, 1.2);
  rim.position.set(8, 3, -8);
  scene.add(rim);

  // The two strokes, as the pipeline runs them.
  const gA = onGold(-61.8), gB = onGold(61.8);
  const cross = onGold(CROSS_Y);
  const goldDir = gB.clone().sub(gA).normalize();
  const ivTop = onIvory(-61.8), ivBot = onIvory(61.8);
  const lift = (v) => v.clone().setY(0.045);

  const goldThread = makeThread([lift(gA), lift(gA.clone().lerp(gB, 0.5)), lift(gB)], { radius: 0.045, segments: 300 });
  const fuThread = makeThread([lift(cross), lift(cross.clone().lerp(ivTop, 0.5)), lift(ivTop)], { radius: 0.03, color: "ivory", segments: 120 });
  const crmThread = makeThread([lift(cross), lift(cross.clone().lerp(ivBot, 0.5)), lift(ivBot)], { radius: 0.03, color: "ivory", segments: 200 });
  scene.add(goldThread.group, fuThread.group, crmThread.group);

  // Head position along the gold stroke, as a fraction of LEAD→BOOK, over time.
  const fracOf = (y) => (y + 61.8) / 123.6;
  const keys = [[12.0, 0], [12.9, fracOf(-40)], [13.6, fracOf(CROSS_Y)], [14.6, fracOf(20)], [15.3, 1]];
  const headFrac = (t) => {
    if (t <= keys[0][0]) return 0;
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const [t0, f0] = keys[i - 1], [t1, f1] = keys[i];
        return lerp(f0, f1, ease.inOutCubic((t - t0) / (t1 - t0)));
      }
    }
    return 1;
  };

  // Nodes: [label, kind, position, time the thread arrives]
  const who = { name: lead.name, meta: `${lead.row[2]} · ${lead.src}` };
  const nodeDefs = [
    ["LEAD", "lead", onGold(-61.8), 12.0],
    ["READ", "read", onGold(-40), 12.9],
    ["QUALIFY", "qualify", cross, 13.6],
    ["FOLLOW-UP", "followup", onIvory(-61.8), 14.2],
    ["REPLY", "reply", onGold(20), 14.6],
    ["CRM", "crm", onIvory(20), 14.3],
    ["BOOK", "book", onGold(61.8), 15.3],
    ["PIPELINE", "pipeline", onIvory(61.8), 14.9],
  ];
  const NW = 1.6, NH = 1.05;
  // Cards face the tracking camera, which runs along the left of the gold stroke.
  const side = new THREE.Vector3(-goldDir.z, 0, goldDir.x).multiplyScalar(-1); // left of travel
  const faceN = side.clone().multiplyScalar(0.45).add(goldDir).normalize(); // toward the leading camera
  const faceY = Math.atan2(faceN.x, faceN.z);
  const nodes = nodeDefs.map(([label, kind, pos, at], i) => {
    const card = makeCard({ w: NW, h: NH, ppu: 340, shadow: false, draw: (ctx, w, h, s) => UI.nodeFace(ctx, w, h, { label, kind, p: s.p, who }) });
    const outer = new THREE.Group();
    const pivot = new THREE.Group();
    card.group.position.y = NH / 2;
    pivot.add(card.group);
    outer.add(pivot);
    outer.position.copy(pos);
    scene.add(outer);
    // Plinth: a thin gold hairline where the node meets the floor.
    const base = new THREE.Mesh(new THREE.BoxGeometry(NW, 0.012, 0.012), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.25, 0.7) }));
    base.position.y = 0.006;
    pivot.add(base);
    return { label, kind, pos, at, card, outer, pivot, i };
  });
  const byLabel = Object.fromEntries(nodes.map((n) => [n.label, n]));

  // The mark itself, lying on the floor, wiped in stroke by stroke at the crane top.
  const logo = makeLogo({ size: 12.36, depth: 3 });
  logo.group.rotation.x = -Math.PI / 2;
  logo.group.position.y = -0.1;
  logo.goldMat.envMapIntensity = 0.55;
  logo.goldMat.roughness = 0.34;
  logo.ivoryMat.envMapIntensity = 0.4;
  logo.ivoryMat.color.set(0xcdc2ae);
  scene.add(logo.group);
  const goldClip = new THREE.Plane(goldDir.clone().negate(), 0);
  const ivDir = ivBot.clone().sub(ivTop).normalize();
  const ivClip = new THREE.Plane(ivDir.clone().negate(), 0);
  logo.goldMat.clippingPlanes = [goldClip];
  logo.ivoryMat.clippingPlanes = [ivClip];
  const setWipe = (plane, dir, a, b, p) => {
    // keep points with dir·x <= s  →  (-dir)·x + s >= 0
    plane.constant = lerp(dir.dot(a) - 0.3, dir.dot(b) + 0.3, p);
  };

  const ov = engine.ovCtx;
  const u = T.U(W, H);

  // System log (the machine's voice): each line stamps in when its step fires.
  const log = [
    [12.05, `lead.received    ${lead.src.toLowerCase()} · 02:14:00`],
    [12.9, "read.intent      budget ✓ timeline ✓"],
    [13.6, "qualify.score    92 · hot"],
    [14.2, "followup.queue   3 steps"],
    [14.3, "crm.sync         ✓"],
    [14.6, "reply.sent       00:00:42"],
    [14.9, "pipeline.stage   → booked"],
    [15.3, "book.slot        sat 11:00"],
  ];

  return (t) => {
    const f = headFrac(t);
    goldThread.setProgress(f);
    fuThread.setProgress(ease.outCubic(seg(t, 13.6, 14.2)));
    crmThread.setProgress(ease.inOutCubic(seg(t, 13.7, 14.9)));
    goldThread.mesh.material.emissiveIntensity = 0.35 + 0.6 * Math.exp(-(t - 12.0) * 3);

    const g = grid.material.uniforms;
    g.uGold.value = ease.outCubic(seg(t, 12.0, 15.5)) * 0.7;
    g.uAmount.value = lerp(0.04, 0.11, seg(t, 12.0, 14.0));
    const head = goldThread.head.position;
    g.uOrigin.value.set(head.x, head.z);
    g.uFade.value = lerp(6, 30, ease.outCubic(seg(t, 12.0, 15.6)));

    // Nodes rise when reached, activate, then fold flat for the reveal.
    nodes.forEach((n) => {
      const rise = ease.outBack(seg(t, n.at, n.at + 0.3), 2.0);
      const fold = ease.inOutCubic(seg(t, 15.45 + n.i * 0.05, 15.95 + n.i * 0.05));
      n.outer.visible = t >= n.at;
      n.pivot.scale.set(1, Math.max(0.001, rise), 1);
      n.pivot.rotation.x = -fold * Math.PI / 2;
      n.outer.rotation.y = lerp(faceY, 0, fold);
      n.outer.position.set(n.pos.x, 0.22 * fold, n.pos.z + fold * NH * 0.5 * 0.78);
      n.outer.scale.setScalar(lerp(1, 0.78, fold));
      n.card.set({ p: Math.round(clamp(seg(t, n.at + 0.1, n.at + 0.7)) * 30) / 30 });
    });

    // The strokes fill in under the nodes as the camera tops out.
    const wg = ease.inOutCubic(seg(t, 15.6, 16.3));
    const wi = ease.inOutCubic(seg(t, 15.75, 16.4));
    logo.group.visible = wg > 0;
    setWipe(goldClip, goldDir, gA, gB, wg);
    setWipe(ivClip, ivDir, ivTop, ivBot, wi);
    goldThread.group.visible = fuThread.group.visible = crmThread.group.visible = t < 16.35;

    let bloom = 0.6;
    key.intensity = lerp(2.2, 0.8, ease.inOutCubic(seg(t, 15.4, 16.2)));
    if (t < 12.6) {
      // Ignition: macro at the LEAD node, the thread strikes like a match.
      const p = ease.outCubic(seg(t, 12.0, 12.6));
      const L = byLabel.LEAD.pos;
      aim(cam, [L.x + side.x * lerp(1.4, 2.4, p) - goldDir.x * 0.8, lerp(0.35, 0.7, p), L.z + side.z * lerp(1.4, 2.4, p) - goldDir.z * 0.8], [L.x + goldDir.x * 0.6, 0.45, L.z + goldDir.z * 0.6], 34, 0.03);
      bloom = 0.9;
    } else if (t < 15.4) {
      // Tracking: ride alongside the thread head, low, with a slow push.
      const hp = goldThread.curve.getPointAt(clamp(f));
      const p = seg(t, 12.6, 15.4);
      // Look down the stroke: in portrait the pipeline stacks up the frame in depth.
      // The camera leads the thread, looking back: every node it has built
      // stacks up behind the head, and the head races toward the lens.
      const ahead = lerp(3.0, 3.8, p), off = lerp(1.2, 1.7, p);
      aim(cam, [hp.x + side.x * off + goldDir.x * ahead, lerp(1.1, 1.8, p), hp.z + side.z * off + goldDir.z * ahead], [hp.x - goldDir.x * 1.6, 0.35, hp.z - goldDir.z * 1.6], lerp(40, 44, p), lerp(-0.03, 0.02, p));
    } else if (t < 16.4) {
      // Crane-up: from the tracking position to straight down over the mark.
      const p = ease.inOutCubic(seg(t, 15.4, 16.4));
      const hp = gB;
      const from = new THREE.Vector3(hp.x + side.x * 1.7 + goldDir.x * 3.8, 1.8, hp.z + side.z * 1.7 + goldDir.z * 3.8);
      const to = new THREE.Vector3(0.0, 30, 0.2);
      const pos = from.clone().lerp(to, p);
      pos.y = lerp(1.8, 30, ease.inOutCubic(p));
      const look = new THREE.Vector3(hp.x - goldDir.x * 1.6, 0.35, hp.z - goldDir.z * 1.6).lerp(new THREE.Vector3(0, 0, 0.2), ease.outCubic(p));
      // Blend the up vector from world-up to screen-up = -z for the top-down.
      const up = new THREE.Vector3(0, 1, 0).lerp(new THREE.Vector3(0, 0, -1), ease.inOutCubic(seg(p, 0.35, 1))).normalize();
      aim(cam, pos.toArray(), look.toArray(), lerp(44, 38, p), 0, up.toArray());
      bloom = 0.45;
    } else {
      // Dive into the REPLY node (flat on the floor) → match cut to the phone.
      const R = byLabel.REPLY;
      const c = new THREE.Vector3(R.pos.x, 0.25, R.pos.z - 0.08);
      const p = ease.inOutCubic(seg(t, 16.55, 18.0));
      const hold = ease.outCubic(seg(t, 16.4, 16.55));
      const top = new THREE.Vector3(0.0, 30 - hold * 1.2, 0.2);
      const pos = top.clone().lerp(new THREE.Vector3(c.x, 1.3, c.z), p);
      const look = new THREE.Vector3(0, 0, 0.2).lerp(c, ease.outCubic(seg(t, 16.4, 17.4)));
      aim(cam, pos.toArray(), look.toArray(), lerp(38, 30, p), 0, [0, 0, -1]);
      bloom = lerp(0.45, 0.6, p);
    }

    // ── Overlay ──
    if (between(t, 12.05, 12.95)) {
      T.slam(ov, W, H, ["Now it"], t - 12.1, { size: 176, y: 1440 });
      T.slam(ov, W, H, ["answers."], t - 12.2, { size: 176, y: 1440 + 176 * 0.92, color: C.gold });
    }
    if (between(t, 12.95, 15.5)) {
      const shown = log.filter(([at]) => t >= at);
      shown.forEach(([at, s], i) => {
        const fresh = t - at < 0.12;
        T.label(ov, W, H, s, 64, 170 + i * 44, { size: 25, color: fresh ? C.goldHi : i === shown.length - 1 ? C.gold : C.ivory3, track: 1.5 });
      });
      T.label(ov, W, H, "XMEL · LEAD SYSTEM · LIVE", 64, 120, { size: 22, color: C.ivory3, track: 5 });
    }
    if (between(t, 15.95, 16.7)) {
      T.label(ov, W, H, "ONE SYSTEM · EVERY STEP · NO GAPS", W / 2 / u, 1760, { size: 26, color: C.gold, align: "center", track: 6 });
    }
    return { scene, camera: cam, bloom };
  };
}
