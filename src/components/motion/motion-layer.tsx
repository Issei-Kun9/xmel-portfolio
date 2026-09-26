"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Site-wide motion, mounted once in the root layout so every page gets it
 * without per-page wiring:
 *  - Lenis smooth scrolling
 *  - a scroll progress bar
 *  - scroll reveal: content below the fold rises in as it enters view
 *  - magnetic pull on [data-magnetic] and a cursor spotlight on .spotlight
 * All of it is skipped for prefers-reduced-motion.
 */

const REVEAL_SELECTOR = [
  "main section:not(:first-of-type) :is(h2, h3, p, figure, img, video, svg[role=img], blockquote, table, pre)",
  "main section:not(:first-of-type) :is(ol, ul, .grid) > *",
  "main article :is(h2, h3, p, ul, ol, figure, blockquote, table, pre)",
].join(",");

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, anchors: true });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

function useScrollReveal(pathname: string) {
  useEffect(() => {
    if (reducedMotion()) return;

    let io: IntersectionObserver | undefined;
    const seen = new Set<Element>();

    const setup = () => {
      const fold = window.innerHeight;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("rv-in");
            io!.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      // Two passes — read every layout value first, then write every class
      // and style change — so the browser isn't forced to recompute layout
      // once per element. Interleaving read (getBoundingClientRect) and
      // write (classList.add) in one loop was the single biggest
      // main-thread cost on this page: each write invalidated layout right
      // before the next element's read needed it.
      const candidates = Array.from(document.querySelectorAll(REVEAL_SELECTOR)).filter(
        (el) => !el.closest(".rv")
      );
      const toReveal = candidates
        .map((el) => ({ el, top: el.getBoundingClientRect().top }))
        .filter(({ top }) => top >= fold);
      toReveal.forEach(({ el }) => {
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const i = Math.min(siblings.indexOf(el), 6);
        (el as HTMLElement).style.setProperty("--rv-i", String(Math.max(i, 0)));
        el.classList.add("rv");
        seen.add(el);
        io!.observe(el);
      });
    };

    // Scanning and tagging every below-the-fold heading/paragraph on the
    // page is real work; running it in the browser's idle time instead of
    // synchronously on mount keeps it from competing with the initial
    // paint for the largest-contentful-paint element.
    const ric = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline), 1));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = ric(setup, { timeout: 1000 });

    return () => {
      cic(handle);
      io?.disconnect();
      seen.forEach((el) => el.classList.remove("rv", "rv-in"));
    };
  }, [pathname]);
}

function usePointerEffects() {
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
    let active: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const spot = target?.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      const mag = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (active && active !== mag) {
        active.style.transform = "";
        active = null;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        mag.style.transform = `translate(${x}px, ${y}px)`;
        active = mag;
      }
    };
    const onLeave = () => {
      if (active) active.style.transform = "";
      active = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);
}

export default function MotionLayer() {
  const pathname = usePathname();
  useSmoothScroll();
  useScrollReveal(pathname);
  usePointerEffects();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-bright))]"
      style={{ scaleX }}
    />
  );
}
