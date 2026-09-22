"use client";

import { useEffect, useRef, useState } from "react";
import { CALENDLY_URL } from "@/lib/market";

const CALENDLY_WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

export default function Booking({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Only start loading the Calendly widget once the section is near the viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRequested(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!requested) return;
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = CALENDLY_WIDGET_SRC;
    script.async = true;
    document.head.appendChild(script);

    const checkIframe = () => {
      if (container.querySelector("iframe")) {
        setLoaded(true);
        return true;
      }
      return false;
    };

    if (checkIframe()) return;

    const observer = new MutationObserver(() => {
      if (checkIframe()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });

    const fallback = setTimeout(() => setLoaded(true), 12000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [requested]);

  return (
    <section id="book" className="scroll-mt-20 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
        <div>
          <p className="text-[14px] font-semibold text-[var(--accent)]">Book a demo</p>
          <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
            See it answer your leads. 15 minutes, no hard sell.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Pick a time that suits you — the calendar shows slots in your own
            timezone. I&apos;ll walk through how the AI would handle leads from your
            sources and what it would cost for your volume.
          </p>
          {children}
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-primary)] shadow-[var(--shadow-card)]">
          <div
            ref={containerRef}
            className="calendly-inline-widget relative w-full min-w-0 h-[640px] sm:h-[700px]"
            data-url={CALENDLY_URL}
          >
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--bg-primary)] z-10">
                <div className="w-8 h-8 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent)] animate-spin" />
                <span className="text-[14px] text-[var(--text-tertiary)]">Loading available times…</span>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-[var(--accent)] underline underline-offset-4">
                  Open the calendar in a new tab
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
