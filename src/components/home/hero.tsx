import { Check } from "lucide-react";
import type { MarketConfig } from "@/lib/market";
import CtaButton from "./cta-button";
import Words from "@/components/motion/words";
import GoldX from "@/components/visuals/gold-x";

const TRUST = ["AI replies in under 60 seconds", "Websites live in about a week", "No long-term contracts"];

export default function Hero({ cfg }: { cfg: MarketConfig }) {
  return (
    <section className="ink relative overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-14 sm:pb-24 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,106,0.35)] px-3 py-1.5 text-[13px] font-medium tracking-wide text-[var(--gold)]">
            <span className="live-dot w-2 h-2 rounded-full bg-[var(--gold)]" aria-hidden="true" />
            AI automation · Websites · SEO
          </p>

          <h1 className="mt-5 font-display text-[clamp(44px,7.4vw,92px)] font-medium leading-[0.98] tracking-[-0.03em] text-balance">
            <Words text="More customers." />
            <br />
            <span className="gold-italic">
              <Words text="Less chasing." start={2} />
            </span>
          </h1>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[rgba(245,240,230,0.75)] max-w-[560px]">
            AI that answers every new lead from {cfg.leadSources} in under a
            minute, a website that turns visitors into enquiries, and SEO that
            gets you found — built and run by one team.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <CtaButton cta={cfg.primaryCta} location="hero" />
            <CtaButton cta={cfg.secondaryCta} variant="secondary" location="hero" />
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[rgba(245,240,230,0.7)]">
            {TRUST.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--gold)]" strokeWidth={2.5} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <GoldX className="hidden sm:block" />
      </div>
    </section>
  );
}
