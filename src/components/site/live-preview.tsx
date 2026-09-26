"use client";

import { useEffect, useRef, useState } from "react";

const VIEW_W = 1440;
const VIEW_H = 900;

/**
 * The real website, running live inside the card: rendered at desktop width
 * and scaled down to fit. It only loads once the card scrolls near the
 * viewport, and it's inert (no clicks, no scroll capture) — the card's own
 * link opens the site. Sandboxed so an embedded page can't navigate ours.
 */
export default function LivePreview({ url, title }: { url: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / VIEW_W));
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden">
      {visible && (
        <iframe
          src={url}
          title={`Live preview of ${title}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          tabIndex={-1}
          aria-hidden="true"
          onLoad={() => setLoaded(true)}
          className={`pointer-events-none origin-top-left border-0 bg-white transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ width: VIEW_W, height: VIEW_H, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
