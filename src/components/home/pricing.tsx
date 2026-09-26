import { Check } from "lucide-react";
import type { MarketConfig } from "@/lib/market";
import MarketSwitch from "@/components/site/market-switch";
import CtaButton from "./cta-button";
import Lottie from "@/components/motion/lottie";

export default function Pricing({ cfg }: { cfg: MarketConfig }) {
  return (
    <section id="pricing" className="scroll-mt-20 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[14px] font-semibold text-[var(--accent)]">Pricing</p>
            <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
              Simple pricing. Less than the cost of one lost deal.
            </h2>
          </div>
          <MarketSwitch current={cfg.market} />
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-4 items-stretch">
          {cfg.tiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex flex-col rounded-2xl p-7 ${
                tier.featured
                  ? "ring-glow lift shadow-[0_20px_50px_-24px_rgba(58,125,14,0.45)] lg:-translate-y-3"
                  : "spotlight lift border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-[var(--shadow-card)]"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-[var(--accent)] px-3 py-1 text-[12px] font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">{tier.name}</h3>
              <p className="text-[14px] text-[var(--text-tertiary)]">{tier.tagline}</p>

              <div className="mt-6 min-h-[76px]">
                {tier.setup ? (
                  <>
                    <p className="text-[13px] text-[var(--text-tertiary)]">Setup from</p>
                    <p className="font-display text-[40px] leading-none font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                      {tier.setup}
                    </p>
                    {tier.monthly && (
                      <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
                        + <span className="font-semibold text-[var(--text-primary)]">{tier.monthly}</span>/month
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-[13px] text-[var(--text-tertiary)]">Priced for your setup</p>
                    <p className="font-display text-[40px] leading-none font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                      Let&apos;s talk
                    </p>
                  </>
                )}
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[15px] leading-snug text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" strokeWidth={2.5} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <CtaButton
                cta={tier.setup ? cfg.primaryCta : { ...cfg.primaryCta, label: cfg.primaryCta.kind === "book" ? "Book a call" : "Talk to us on WhatsApp" }}
                variant={tier.featured ? "primary" : "secondary"}
                location={`pricing-${tier.name.toLowerCase()}`}
                className="mt-8 w-full"
              />
            </article>
          ))}
        </div>

        <p className="mt-5 text-[13px] text-[var(--text-tertiary)]">{cfg.pricingNote}</p>

        <div className="mt-10 rounded-2xl border border-[var(--accent-line)] bg-[var(--accent-dim)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5">
          <span className="w-16 h-16 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center shrink-0">
            <Lottie name="success" className="w-14 h-14" />
          </span>
          <div className="flex-1">
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">
              Start with a 14-day pilot on your real leads
            </h3>
            <p className="mt-1 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              I set the system up on your actual lead flow and run it for two weeks. If it doesn&apos;t
              outperform your current process, you owe nothing.
            </p>
          </div>
          <CtaButton cta={cfg.primaryCta} location="pilot" className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
