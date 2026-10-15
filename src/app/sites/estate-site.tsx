"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND, CHAPTERS, CONCEPT_NOTE, XMEL_WHATSAPP } from "./content";
import "./estate.css";

type Mode = "checking" | "3d" | "lite";
type Engine = import("./engine").Estate;

/** Can this device carry the full scene? */
function capability(): { ok: boolean; quality: "high" | "low"; reason?: string } {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    if (!gl) return { ok: false, quality: "low", reason: "no-webgl2" };
  } catch {
    return { ok: false, quality: "low", reason: "no-webgl2" };
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return { ok: false, quality: "low", reason: "save-data" };
  if ((nav.deviceMemory ?? 8) < 3 || (navigator.hardwareConcurrency ?? 8) <= 2) return { ok: false, quality: "low", reason: "low-end" };
  const small = Math.min(window.innerWidth, window.innerHeight) < 700 || matchMedia("(pointer: coarse)").matches;
  return { ok: true, quality: small ? "low" : "high" };
}

export default function EstateSite({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("checking");
  const [loading, setLoading] = useState({ p: 0, label: "" });
  const [loaded, setLoaded] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [menu, setMenu] = useState(false);
  const [veil, setVeil] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const chapterAt = useRef<number[]>([]);
  const reduced = useRef(false);

  // Decide 3D vs lite once, on the client.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cap = capability();
    reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next: Mode = params.has("lite") || !cap.ok ? "lite" : "3d";
    queueMicrotask(() => setMode(next));
  }, []);

  // Boot the engine.
  useEffect(() => {
    if (mode !== "3d" || !canvasRef.current) return;
    let disposed = false;
    const canvas = canvasRef.current;
    (async () => {
      const [{ createEstate }, { CHAPTER_AT }] = await Promise.all([import("./engine"), import("./engine/journey")]);
      chapterAt.current = CHAPTER_AT;
      const quality = capability().quality;
      try {
        const engine = await createEstate(canvas, {
          quality,
          onProgress: (p, label) => { if (!disposed) setLoading({ p, label }); },
        });
        if (disposed) { engine.dispose(); return; }
        engineRef.current = engine;
        engine.setSnap(reduced.current);
        // Inspection hook for automated screenshots (harmless in production).
        (window as unknown as { __estate?: unknown }).__estate = { engine, chapterAt: CHAPTER_AT };
        setLoaded(true);
        engine.ready.catch(() => {});
      } catch (e) {
        console.error(e);
        if (!disposed) setMode("lite");
      }
    })();
    return () => {
      disposed = true;
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [mode]);

  // Scroll → progress, resize, pointer, visibility, overlays.
  useEffect(() => {
    if (mode !== "3d") return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let lastChapter = -1;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      engineRef.current?.setProgress(p);
    };
    const onResize = () => {
      const c = canvasRef.current;
      if (c) engineRef.current?.resize(c.clientWidth, c.clientHeight);
      onScroll();
    };
    const onPointer = (e: PointerEvent) => engineRef.current?.setPointer((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    const onVis = () => engineRef.current?.pause(document.hidden);
    const tick = (t: number) => {
      lenis?.raf(t);
      const e = engineRef.current;
      if (e) {
        const shot = e.current();
        if (shot.chapter !== lastChapter) {
          if (reduced.current && lastChapter !== -1) { setVeil(true); setTimeout(() => setVeil(false), 220); }
          lastChapter = shot.chapter;
          setChapter(shot.chapter);
        }
        place(contactRef.current, e.project(e.anchors.contact), shot.reveal[7]);
        place(footerRef.current, e.project(e.anchors.footer), shot.reveal[8]);
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduced.current) {
      import("lenis").then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.35, smoothWheel: true, wheelMultiplier: 0.8, touchMultiplier: 1.4 });
      });
    }
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    onResize();
    raf = requestAnimationFrame(tick);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [mode, loaded]);

  const jump = useCallback((i: number) => {
    setMenu(false);
    const max = document.documentElement.scrollHeight - innerHeight;
    const target = (chapterAt.current[i] ?? 0) * max;
    window.scrollTo({ top: target, behavior: reduced.current ? "auto" : "smooth" });
  }, []);

  if (mode === "lite" || mode === "checking") {
    return (
      <div className={mode === "lite" ? "estate-lite" : "estate-lite estate-lite--pending"}>
        <div className="estate-lite-bar">
          <span className="estate-mark">{BRAND.name}</span>
          <a href="?" className="estate-lite-switch">Open the 3D version</a>
        </div>
        <main className="estate-content estate-content--visible">{children}</main>
      </div>
    );
  }

  const label = CHAPTERS[chapter]?.label ?? "";
  return (
    <div className="estate-3d">
      <canvas ref={canvasRef} className="estate-canvas" aria-hidden="true" />
      <div ref={trackRef} className="estate-track" aria-hidden="true" />

      {/* The full content, for screen readers and search engines. */}
      <main className="estate-content estate-sr">{children}</main>

      {/* Chrome */}
      <nav className="estate-nav" aria-label="Journey">
        <button className="estate-mark" onClick={() => jump(0)} aria-label={`${BRAND.name}, back to the lake`}>{BRAND.name}</button>
        <div className="estate-nav-r">
          <span className="estate-where" aria-live="polite">
            <span className="estate-where-n">{String(chapter + 1).padStart(2, "0")}</span> {label}
          </span>
          <button className="estate-menu-btn" aria-expanded={menu} aria-controls="estate-menu" onClick={() => setMenu((m) => !m)}>
            {menu ? "Close" : "Chapters"}
          </button>
        </div>
      </nav>
      {menu && (
        <div id="estate-menu" className="estate-menu" role="dialog" aria-label="Chapters">
          <ol>
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <button onClick={() => jump(i)} aria-current={i === chapter ? "step" : undefined}>
                  <span>{String(i + 1).padStart(2, "0")}</span> {c.label}
                </button>
              </li>
            ))}
          </ol>
          <a href="?lite" className="estate-menu-lite">Read the lite version</a>
        </div>
      )}

      <div className="estate-progress" aria-hidden="true">
        {CHAPTERS.map((c, i) => <span key={c.id} className={i <= chapter ? "on" : ""} />)}
      </div>

      <a className="estate-concept" href={XMEL_WHATSAPP} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="concept-badge" title={CONCEPT_NOTE}>
        Concept by <strong>XMEL</strong>
      </a>

      {/* Links that belong to the world: under the star-written words, and on the jetty. */}
      <div ref={contactRef} className="estate-anchor estate-anchor--contact">
        <a href={XMEL_WHATSAPP} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="sky-contact">
          Enquire about a site like this
        </a>
        <span>Vantmere is a concept. XMEL builds the real thing.</span>
      </div>
      <div ref={footerRef} className="estate-anchor estate-anchor--footer">
        <button onClick={() => jump(1)}>About</button>
        <button onClick={() => jump(4)}>Homes</button>
        <button onClick={() => jump(5)}>Process</button>
        <button onClick={() => jump(7)}>Contact</button>
        <a href="https://xmelautomations.xyz/privacy">Privacy</a>
        <a href="https://xmelautomations.xyz">Built by XMEL Automations</a>
        <button onClick={() => jump(0)}>Back to the lake ↑</button>
      </div>

      {!loaded && (
        <div className="estate-loader" role="status" aria-live="polite">
          <p className="estate-loader-name">{BRAND.name}</p>
          <div className="estate-loader-bar"><span style={{ transform: `scaleX(${loading.p})` }} /></div>
          <p className="estate-loader-label">{loading.label || "Preparing the lake"}</p>
          <a href="?lite" className="estate-loader-lite">Skip to the lite version</a>
        </div>
      )}
      <div className={`estate-veil${veil ? " on" : ""}`} aria-hidden="true" />
    </div>
  );
}

/** Pin an HTML overlay to a projected world point; visible only while its chapter holds. */
function place(el: HTMLElement | null, pt: { x: number; y: number } | null, k: number) {
  if (!el) return;
  const on = !!pt && k > 0.6;
  el.style.opacity = on ? String(Math.min(1, (k - 0.6) / 0.3)) : "0";
  el.style.pointerEvents = on ? "auto" : "none";
  el.toggleAttribute("inert", !on);
  if (pt) el.style.transform = `translate3d(${Math.round(pt.x)}px, ${Math.round(pt.y)}px, 0) translate(-50%, 0)`;
}
