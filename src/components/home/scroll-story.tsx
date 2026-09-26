"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import type { MarketConfig } from "@/lib/market";
import { DEFAULT_SAMPLES } from "@/lib/industries";
import PhoneMock from "@/components/visuals/phone-mock";
import { SerpMockup, SiteMockup } from "@/components/visuals/mockups";

const CHAPTERS = [
  { kicker: "01 · SEO", title: "They search. You're the first name they see.", body: "Local SEO and pages written for the exact searches your buyers make put you at the top, above the competitors they'd have called.", href: "/seo", link: "SEO plans" },
  { kicker: "02 · Website", title: "They land on a site that makes them trust you.", body: "Fast, mobile-first and written around your business, with one clear next step on every page. Live in about a week.", href: "/website-development", link: "Website plans" },
  { kicker: "03 · AI lead response", title: "They enquire. The AI replies in under a minute.", body: "At 2 AM, on a Sunday, mid-job: every lead is answered, qualified and booked into your calendar while you work.", href: "/ai-automation-real-estate", link: "AI plans" },
];

/**
 * The homepage's centrepiece: one customer's journey (found on Google →
 * lands on the site → gets an instant reply) told as a pinned, scroll-driven
 * story on desktop, and as a simple stacked sequence on phones.
 */
export default function ScrollStory({ cfg }: { cfg: MarketConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(2, Math.floor(v * 3))));
  const sample = DEFAULT_SAMPLES[cfg.market];

  const frames = [
    <SerpMockup key="serp" s={sample} />,
    <SiteMockup key="site" s={sample} />,
    <PhoneMock key={`phone-${active === 2}`} cfg={cfg} />,
  ];

  return (
    <section aria-label="How we bring you customers" className="bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">From search to booked</p>
        <h2 className="mt-3 font-display text-[clamp(32px,4.8vw,56px)] font-medium leading-[1.04] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl">
          How a stranger becomes <span className="italic text-[var(--accent)]">your customer.</span>
        </h2>
      </div>

      {/* Desktop: pinned stage, chapters advance with scroll. */}
      <div ref={ref} className="hidden lg:block relative h-[300vh]">
        <div className="sticky top-16 h-[calc(100vh-4rem)] max-w-[1200px] mx-auto px-6 grid grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <ol className="space-y-8">
            {CHAPTERS.map((c, i) => (
              <li key={c.kicker} className={`border-l-2 pl-6 transition-all duration-500 ${active === i ? "border-[var(--gold)] opacity-100" : "border-[var(--border-subtle)] opacity-35"}`}>
                <p className="text-[13px] font-semibold tracking-[0.08em] text-[var(--accent)]">{c.kicker}</p>
                <h3 className="mt-2 font-display text-[26px] leading-tight text-[var(--text-primary)]">{c.title}</h3>
                <div className={`grid transition-all duration-500 ${active === i ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[16px] leading-relaxed text-[var(--text-secondary)]">{c.body}</p>
                    <a href={c.href} className="link-grow mt-3 inline-block text-[15px] font-semibold text-[var(--accent)]">{c.link} →</a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="relative h-[600px]">
            {frames.map((f, i) => (
              <div
                key={i}
                aria-hidden={active !== i}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${active === i ? "opacity-100 translate-y-0 scale-100" : active > i ? "opacity-0 -translate-y-10 scale-95 pointer-events-none" : "opacity-0 translate-y-10 scale-95 pointer-events-none"}`}
              >
                <div className="w-full">{f}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phones: the same story, stacked. */}
      <div className="lg:hidden max-w-[1200px] mx-auto px-4 sm:px-6 py-12 space-y-16">
        {CHAPTERS.map((c, i) => (
          <div key={c.kicker}>
            <p className="text-[13px] font-semibold tracking-[0.08em] text-[var(--accent)]">{c.kicker}</p>
            <h3 className="mt-2 font-display text-[26px] leading-tight text-[var(--text-primary)]">{c.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--text-secondary)]">{c.body}</p>
            <div className="mt-8">{i === 2 ? <PhoneMock cfg={cfg} /> : frames[i]}</div>
          </div>
        ))}
      </div>
      <p className="pb-10 text-center text-[12px] text-[var(--text-tertiary)]">Illustrations with sample businesses, not clients.</p>
    </section>
  );
}
