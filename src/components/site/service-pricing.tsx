"use client";

import { useState } from "react";
import Flag from "@/components/shared/flag";
import { ArrowRight, Check } from "lucide-react";
import type { Market } from "@/lib/market";
import type { ServiceMarketConfig } from "@/lib/services";
import { useClientValue } from "@/lib/use-client-value";

/**
 * Pricing cards for the service pages (AI, websites, SEO), in the same
 * language as the homepage plan builder: the featured plan is an ink card
 * with a gold edge, the others are light cards. Currency is a client-side
 * toggle that starts on the visitor's region cookie.
 */
export default function ServicePricing({
  configs,
  idPrefix,
}: {
  configs: Record<Market, ServiceMarketConfig>;
  idPrefix: string;
}) {
  const fromCookie = useClientValue<Market>(() => (document.cookie.includes("market=in") ? "in" : "us"), "us");
  const [picked, setMarket] = useState<Market | null>(null);
  const market = picked ?? fromCookie;
  const cfg = configs[market];

  return (
    <div>
      <div role="group" aria-label="Choose your region" className="mt-8 inline-flex rounded-full border border-[var(--border-strong)] bg-[var(--bg-primary)] p-1 text-[13px] font-semibold">
        {(["us", "in"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMarket(m)}
            aria-pressed={market === m}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
              market === m ? "bg-[var(--ink)] text-[var(--gold)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Flag market={m} />
            {m === "us" ? "United States" : "India"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4 items-stretch">
        {cfg.tiers.map((tier) => {
          const dark = tier.featured;
          return (
            <article
              key={`${idPrefix}-${market}-${tier.name}`}
              className={`lift relative flex flex-col rounded-2xl p-7 ${
                dark
                  ? "ink border border-[var(--gold)] shadow-[0_30px_60px_-30px_rgba(15,15,18,0.7)]"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-[var(--shadow-card)]"
              }`}
            >
              {dark && (
                <span className="absolute -top-3 left-7 rounded-full bg-[var(--gold)] px-3 py-1 text-[12px] font-semibold text-[var(--ink)]">
                  Most popular
                </span>
              )}
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">{tier.name}</h3>
              <p className="text-[14px] text-[var(--text-tertiary)]">{tier.tagline}</p>

              <div className="mt-6 border-t border-[var(--border-subtle)] pt-6">
                {tier.priceAmount > 0 && <p className="text-[12px] font-medium text-[var(--text-tertiary)]">{tier.period === "setup" ? "Setup from" : "From"}</p>}
                <p className={`font-display text-[40px] leading-none font-medium tracking-[-0.02em] ${dark ? "text-[var(--ivory)]" : "text-[var(--text-primary)]"}`}>
                  {tier.price}
                </p>
                {tier.extra && <p className="mt-2 text-[15px] font-medium text-[var(--gold)]">{tier.extra}</p>}
                {tier.priceAmount > 0 && !tier.extra && (
                  <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">{tier.period === "month" ? "per month" : "one-time"}</p>
                )}
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-[var(--text-secondary)]">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${dark ? "text-[var(--gold)]" : "text-[var(--accent)]"}`} strokeWidth={2.5} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={tier.cta.href}
                {...(tier.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-cta={tier.cta.href.includes("wa.me") ? "whatsapp" : "book"}
                data-cta-location={`pricing-${idPrefix}`}
                className={`mt-7 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[14px] font-semibold transition-[filter,border-color,color] ${
                  dark
                    ? "bg-[var(--gold)] text-[var(--ink)] hover:brightness-110"
                    : "border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--gold)] hover:text-[var(--accent)]"
                }`}
              >
                {tier.cta.label}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-[13px] leading-relaxed text-[var(--text-tertiary)] max-w-3xl">{cfg.note}</p>
    </div>
  );
}
