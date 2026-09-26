"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Market } from "@/lib/market";
import type { ServiceMarketConfig } from "@/lib/services";

/**
 * Pricing cards for a standalone service page (Website Development, SEO).
 * These pages aren't per-market routes like the homepage, so currency is a
 * plain client-side toggle — the same pattern the ROI calculator already
 * uses — rather than the cookie-based market redirect.
 */
export default function ServicePricing({
  configs,
  idPrefix,
}: {
  configs: Record<Market, ServiceMarketConfig>;
  idPrefix: string;
}) {
  const [market, setMarket] = useState<Market>("us");
  const cfg = configs[market];

  return (
    <div>
      <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] mb-6" role="group" aria-label="Choose your region">
        {(["us", "in"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMarket(m)}
            aria-pressed={market === m}
            className={`h-8 px-3 rounded-md text-[13px] font-medium transition-colors ${
              market === m
                ? "bg-[var(--text-primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {m === "us" ? "🇺🇸 United States" : "🇮🇳 India"}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        {cfg.tiers.map((tier) => (
          <article
            key={`${idPrefix}-${tier.name}`}
            className={`relative flex flex-col rounded-2xl p-6 ${
              tier.featured
                ? "border-2 border-[var(--accent)] bg-[var(--bg-primary)] shadow-[0_20px_50px_-24px_rgba(138,106,47,0.45)]"
                : "border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-[var(--accent)] px-3 py-1 text-[12px] font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-[17px] font-semibold text-[var(--text-primary)]">{tier.name}</h3>
            <p className="text-[13px] text-[var(--text-tertiary)]">{tier.tagline}</p>

            <div className="mt-5">
              <p className="font-display text-[32px] leading-none font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                {tier.price}
              </p>
              {tier.priceAmount > 0 && (
                <p className="mt-1.5 text-[13px] text-[var(--text-tertiary)]">
                  {tier.period === "one-time" ? "one-time" : "per month"}
                </p>
              )}
            </div>

            <ul className="mt-5 space-y-2.5 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-[var(--text-secondary)]">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" strokeWidth={2.5} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={tier.cta.href}
              {...(tier.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`mt-6 inline-flex items-center justify-center h-11 px-5 rounded-xl text-[14px] font-semibold transition-colors ${
                tier.featured
                  ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                  : "border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--text-primary)]"
              }`}
            >
              {tier.cta.label}
            </a>
          </article>
        ))}
      </div>

      <p className="mt-5 text-[13px] text-[var(--text-tertiary)]">{cfg.note}</p>
    </div>
  );
}
