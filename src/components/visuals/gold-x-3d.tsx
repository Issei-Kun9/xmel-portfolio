"use client";

import { useEffect, useRef, useState } from "react";
import GoldX from "./gold-x";

/*
 * The XMEL emblem as real 3D geometry, rendered with three.js.
 *
 * Geometry comes straight from the logo SVG (logo-mark.tsx): two strokes of
 * width 19.1, clipped to the band y ∈ [-61.8, 61.8], with the ivory stroke's
 * 33.7-wide dark "gap" knocking out the gold where they cross. Each stroke is
 * a parallelogram in that band; the gold one is split in two by the gap.
 */
type P = [number, number];

const STROKE = 19.1;
const GAP = 33.7;
const BAND = 61.8;
const GOLD_LINE: [P, P] = [[-47.4, -99.6], [71, 99.6]];
const IVORY_LINE: [P, P] = [[47.4, -99.6], [-71, 99.6]];

/** The stroke of `line` (given width) clipped to the horizontal band, as a parallelogram. */
function bandStroke([a, b]: [P, P], width: number): P[] {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const half = (width / 2) * (Math.hypot(dx, dy) / Math.abs(dy)); // horizontal half-width
  const xAt = (y: number) => a[0] + (dx * (y - a[1])) / dy;
  return [
    [xAt(-BAND) - half, -BAND], [xAt(-BAND) + half, -BAND],
    [xAt(BAND) + half, BAND], [xAt(BAND) - half, BAND],
  ];
}

/** Sutherland–Hodgman: keep the part of `poly` where side(p) >= 0. */
function clipHalf(poly: P[], side: (p: P) => number): P[] {
  const out: P[] = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i], prev = poly[(i + poly.length - 1) % poly.length];
    const sc = side(cur), sp = side(prev);
    if (sc >= 0) {
      if (sp < 0) out.push(lerpAt(prev, cur, sp / (sp - sc)));
      out.push(cur);
    } else if (sp >= 0) {
      out.push(lerpAt(prev, cur, sp / (sp - sc)));
    }
  }
  return out;
}
const lerpAt = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

function emblemPolygons() {
  const gold = bandStroke(GOLD_LINE, STROKE);
  const ivory = bandStroke(IVORY_LINE, STROKE);
  // Signed horizontal distance from the ivory centreline, used to cut the gap out of the gold.
  const [a, b] = IVORY_LINE;
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const halfGap = (GAP / 2) * (Math.hypot(dx, dy) / Math.abs(dy));
  const off = (p: P) => p[0] - (a[0] + (dx * (p[1] - a[1])) / dy);
  const goldLeft = clipHalf(gold, (p) => -off(p) - halfGap);
  const goldRight = clipHalf(gold, (p) => off(p) - halfGap);
  return { goldParts: [goldLeft, goldRight].filter((p) => p.length >= 3), ivory };
}

export default function GoldX3D({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; // keep the static CSS emblem
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.95;
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
      renderer.domElement.setAttribute("aria-hidden", "true");
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(30, 1, 1, 2000);
      camera.position.set(0, 0, 330);

      const key = new THREE.DirectionalLight(0xfff1d6, 2.2);
      key.position.set(-120, 160, 220);
      scene.add(key, new THREE.AmbientLight(0xffffff, 0.25));

      const goldMat = new THREE.MeshPhysicalMaterial({ color: 0xc9a86a, metalness: 1, roughness: 0.24, clearcoat: 0.6, clearcoatRoughness: 0.2 });
      const ivoryMat = new THREE.MeshPhysicalMaterial({ color: 0xe6dccb, metalness: 0.25, roughness: 0.38, clearcoat: 0.8, clearcoatRoughness: 0.18 });

      const extrude = (poly: P[], depth: number) => {
        // SVG y points down; flip to three's y-up.
        const shape = new THREE.Shape(poly.map(([x, y]) => new THREE.Vector2(x, -y)));
        const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 1.6, bevelSize: 1.2, bevelSegments: 4, curveSegments: 1 });
        g.translate(0, 0, -depth / 2);
        return g;
      };

      const { goldParts, ivory } = emblemPolygons();
      const group = new THREE.Group();
      for (const part of goldParts) group.add(new THREE.Mesh(extrude(part, 16), goldMat));
      const ivoryMesh = new THREE.Mesh(extrude(ivory, 16), ivoryMat);
      ivoryMesh.position.z = 4; // ivory stroke sits proud of the gold, like the logo's overlap
      group.add(ivoryMesh);
      group.scale.setScalar(0.8);
      scene.add(group);

      const resize = () => {
        const { width, height } = el.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      // Pointer tilt, eased; plus a slow idle turn.
      const target = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        target.y = ((e.clientX - (r.left + r.width / 2)) / r.width) * 0.9;
        target.x = ((e.clientY - (r.top + r.height / 2)) / r.height) * 0.6;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      io.observe(el);

      const clock = new THREE.Clock();
      let raf = 0;
      let shown = false;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const t = clock.getElapsedTime();
        group.rotation.y += (target.y + Math.sin(t * 0.55) * 0.42 - group.rotation.y) * 0.06;
        group.rotation.x += (target.x + Math.sin(t * 0.4) * 0.08 - group.rotation.x) * 0.06;
        renderer.render(scene, camera);
        if (!shown) { shown = true; setReady(true); }
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        group.traverse((o) => { if (o instanceof THREE.Mesh) o.geometry.dispose(); });
        goldMat.dispose();
        ivoryMat.dispose();
        scene.environment?.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* CSS emblem: shown until WebGL paints, and kept for reduced motion / no WebGL.
          Its halo and orbit rings stay either way. */}
      <GoldX hideEmblem={ready} />
      <div ref={host} className={`pointer-events-none absolute inset-[4%] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
