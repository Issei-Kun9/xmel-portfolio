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

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const isInteractive = (el: Element | null) =>
      !!el?.closest(
        "a, button, [data-cursor='pointer'], input, textarea, select, [role='button']"
      );

    let tx = 0;
    let ty = 0;
    let x = -100;
    let y = -100;
    let size = 8;
    let tSize = 8;
    let opacity = 1;
    let tOpacity = 1;
    let bg = "var(--text-primary)";
    let running = false;

    const setStyle = () => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.opacity = `${opacity}`;
      dot.style.backgroundColor = bg;
    };

    const tick = () => {
      const ease = 0.2;
      const dx = tx - x;
      const dy = ty - y;
      x += dx * ease;
      y += dy * ease;
      size += (tSize - size) * ease;
      opacity += (tOpacity - opacity) * ease;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        x = tx;
        y = ty;
      }
      if (Math.abs(tSize - size) < 0.1) size = tSize;
      if (Math.abs(tOpacity - opacity) < 0.01) opacity = tOpacity;

      setStyle();

      if (x === tx && y === ty && size === tSize && opacity === tOpacity) {
        running = false;
        return;
      }
      requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    };

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hovering = isInteractive(e.target as Element);
      tSize = hovering ? 48 : 8;
      tOpacity = hovering ? 0.8 : 1;
      bg = hovering ? "var(--accent)" : "var(--text-primary)";
      start();
    };

    const leave = () => {
      tOpacity = 0;
      start();
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    setStyle();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkMobile);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference will-change-transform"
    >
      <div
        ref={dotRef}
        className="rounded-full -translate-x-1/2 -translate-y-1/2 will-change-[width,height]"
        style={{ width: 8, height: 8, opacity: 1, backgroundColor: "var(--text-primary)" }}
      />
    </div>
  );
}
