"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

// Code-split: the dotLottie player (plus its WASM decoder) is real weight.
// With 8 players on the homepage alone, importing it eagerly on every page
// load was the main cause of a ~800ms main-thread stall — split it out so
// only the render, not the whole page, waits on it.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false }
);

/**
 * Self-hosted dotLottie from /public/lottie. Doesn't mount the player (or
 * fetch its JS/WASM) until the animation is about to scroll into view — the
 * same reasoning as LazyVideo: eight autoplaying players all decoding at
 * once on load is expensive, and most start off-screen anyway. Reduced-
 * motion visitors never mount the player at all; they keep the static icon.
 */
export default function Lottie({
  name,
  className = "w-16 h-16",
  loop = true,
  speed = 1,
}: {
  name: string;
  className?: string;
  loop?: boolean;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {visible && (
        <DotLottieReact
          src={`/lottie/${name}.lottie`}
          autoplay
          loop={loop}
          speed={speed}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
