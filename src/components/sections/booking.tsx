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
    <section id="book" className="paper scroll-mt-20 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Book a call</p>
          <h2 className="mt-3 font-display text-[clamp(32px,4.4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
            Tell us what you need. <span className="italic text-[var(--accent)]">15 minutes, no hard sell.</span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Pick a time that suits you — the calendar shows slots in your own
            timezone. Tell us about your business and we&apos;ll tell you exactly what
            we&apos;d build — website, SEO, AI or all three — and what it costs.
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
              <div className="absolute inset-0 z-10 flex flex-col bg-[var(--bg-primary)]">
                <div className="ink flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">XMEL Automations</p>
                    <p className="mt-1 font-display text-[22px]">15-minute call</p>
                  </div>
                  <span className="rounded-full border border-[rgba(201,168,106,0.4)] px-3 py-1 text-[12px] text-[var(--gold)]">Free · no hard sell</span>
                </div>
                <div className="flex-1 px-6 py-8">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">On the call</p>
                  <ul className="mt-4 space-y-4">
                    {[
                      ["Where your customers come from", "Portals, Google, ads, WhatsApp, walk-ins: where enquiries start today."],
                      ["What's getting missed", "Slow replies, missed calls, a site that doesn't convert. We find the leak."],
                      ["What I'd build, and the price", "A plain recommendation and a fixed price. No slides, no pressure."],
                    ].map(([t, d], i) => (
                      <li key={t} className="flex gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--ink)] font-display text-[13px] text-[var(--gold)]">{i + 1}</span>
                        <span>
                          <span className="block text-[15px] font-semibold text-[var(--text-primary)]">{t}</span>
                          <span className="block text-[14px] leading-snug text-[var(--text-secondary)]">{d}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center gap-2 pb-6">
                <span className="inline-flex items-center gap-2 text-[14px] text-[var(--text-tertiary)]" role="status">
                  <span aria-hidden="true" className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <i key={d} className="block h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--gold)]" style={{ animationDelay: `${d * 120}ms` }} />
                    ))}
                  </span>
                  Loading available times…
                </span>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-[14px] font-semibold text-[var(--accent)] underline underline-offset-4">
                  Open the calendar in a new tab
                </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
