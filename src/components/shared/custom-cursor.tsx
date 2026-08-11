"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-cursor='pointer']");

    const move = (e: MouseEvent) => {
      if (!cursorRef.current || !dotRef.current) return;
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      const hovering = isInteractive(e.target as Element);
      dotRef.current.style.width = hovering ? "48px" : "8px";
      dotRef.current.style.height = hovering ? "48px" : "8px";
      dotRef.current.style.backgroundColor = hovering
        ? "var(--accent)"
        : "var(--text-primary)";
      dotRef.current.style.opacity = hovering ? "0.8" : "1";
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
    >
      <div
        ref={dotRef}
        className="rounded-full transition-all duration-200 ease-out"
        style={{ width: 8, height: 8 }}
      />
    </div>
  );
}
