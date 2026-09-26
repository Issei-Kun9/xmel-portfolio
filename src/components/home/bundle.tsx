import { Check } from "lucide-react";
import { MARKET_CONFIG, type Market } from "@/lib/market";
import { BUNDLE } from "@/lib/services";
import CtaButton from "./cta-button";

const INCLUDED = [
  "A multi-page website built around your business",
  "AI that answers every new lead in under 60 seconds",
  "Monthly SEO so the website actually gets found",
  "One team, one invoice, one number to message",
];

export default function Bundle({ market }: { market: Market }) {
  const b = BUNDLE[market];
  const cfg = MARKET_CONFIG[market];
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="ring-glow relative overflow-hidden rounded-3xl p-8 sm:p-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div>
            <span className="inline-block rounded-full bg-[var(--ink)] px-3 py-1 text-[12px] font-semibold text-[var(--gold)]">
              Save about 20%
            </span>
            <h2 className="mt-4 font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)]">
              The Growth Bundle: website, SEO and AI, working together.
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
              A website brings people in, SEO brings more of them, and the AI makes
              sure not one enquiry goes unanswered. Buy them together and pay less.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-2.5 text-[15px] text-[var(--text-secondary)]">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" strokeWidth={2.5} aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="ink rounded-2xl overflow-hidden p-7">
            <p className="text-[13px] text-[rgba(245,240,230,0.6)]">Setup</p>
            <p className="font-display text-[44px] leading-none font-semibold">
              {b.setup} <span className="text-[18px] font-normal text-[rgba(245,240,230,0.5)] line-through">{b.setupWas}</span>
            </p>
            <p className="mt-3 text-[16px]">
              + <span className="font-semibold text-[var(--gold)]">{b.monthly}/month</span>{" "}
              <span className="text-[rgba(245,240,230,0.5)] line-through">{b.monthlyWas}</span>
            </p>
            <CtaButton cta={{ ...cfg.primaryCta, label: cfg.primaryCta.kind === "book" ? "Book a call" : "Ask on WhatsApp" }} location="bundle" className="mt-7 w-full" />
            <p className="mt-3 text-[12px] text-[rgba(245,240,230,0.55)]">No long-term contract. Cancel the monthly part any time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
