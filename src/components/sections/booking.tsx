"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function Booking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
  }, []);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
              BOOK A CALL
            </span>
            <h2 className="font-display text-[clamp(28px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-4">
              See it in action. 15 minutes, no pitch.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Book a free 15-minute call and I&apos;ll show you exactly what an AI
              inside sales agent could recover for your business.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-secondary)] p-2">
            <div
              ref={containerRef}
              className="calendly-inline-widget relative w-full"
              data-url="https://calendly.com/yashwwardhanx/15-min-meeting"
              style={{ minWidth: "320px", height: "630px" }}
            >
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--bg-secondary)] z-10">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent)] animate-spin" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                    LOADING AVAILABILITY...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
