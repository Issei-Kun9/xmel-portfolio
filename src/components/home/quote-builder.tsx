"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MARKET_CONFIG, whatsappHref, type Market } from "@/lib/market";
import { BUNDLE, SEO_SERVICE, WEBSITE_DEV } from "@/lib/services";

type Opt = { id: string; label: string; setup: number; monthly: number };
type Group = { key: string; title: string; options: Opt[] };

function groups(market: Market): Group[] {
  const ai = MARKET_CONFIG[market].tiers.filter((t) => t.setupAmount);
  const web = WEBSITE_DEV[market].tiers.filter((t) => t.priceAmount > 0);
  const seo = SEO_SERVICE[market].tiers.filter((t) => t.priceAmount > 0);
  return [
    { key: "ai", title: "AI lead response", options: ai.map((t) => ({ id: t.name, label: t.name, setup: t.setupAmount ?? 0, monthly: t.monthlyAmount ?? 0 })) },
    { key: "web", title: "Website", options: web.map((t) => ({ id: t.name, label: `${t.name} · ${t.tagline}`, setup: t.priceAmount, monthly: 0 })) },
    { key: "seo", title: "SEO", options: seo.map((t) => ({ id: t.name, label: t.name, setup: 0, monthly: t.priceAmount })) },
  ];
}

/**
 * Build-your-plan: pick services, watch the price add up, then book with the
 * selection already in the message. Prices come from market.ts / services.ts.
 */
export default function QuoteBuilder({ market }: { market: Market }) {
  const cfg = MARKET_CONFIG[market];
  const gs = groups(market);
  const [pick, setPick] = useState<Record<string, string | null>>({ ai: gs[0].options[0]?.id ?? null, web: gs[1].options[0]?.id ?? null, seo: null });

  const fmt = (n: number) =>
    new Intl.NumberFormat(market === "in" ? "en-IN" : "en-US", { style: "currency", currency: cfg.currency, maximumFractionDigits: 0 }).format(n);

  const chosen = gs.flatMap((g) => {
    const o = g.options.find((x) => x.id === pick[g.key]);
    return o ? [{ group: g.title, ...o }] : [];
  });
  const setup = chosen.reduce((s, o) => s + o.setup, 0);
  const monthly = chosen.reduce((s, o) => s + o.monthly, 0);
  const all3 = chosen.length === 3;
  const summary = chosen.map((o) => `${o.group}: ${o.id}`).join(", ");

  const message = `Hi Yashwardhan, I built a plan on your site: ${summary || "not sure yet"}. Can we talk?`;
  const cta =
    cfg.primaryCta.kind === "whatsapp"
      ? { href: whatsappHref(message), label: "Send this plan on WhatsApp", external: true }
      : { href: `/contact?plan=${encodeURIComponent(summary)}`, label: "Get this plan", external: false };

  return (
    <section id="build" className="scroll-mt-20 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Build your plan</p>
        <h2 className="mt-3 font-display text-[clamp(32px,4.8vw,56px)] font-medium leading-[1.04] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl">
          Pick what you need. <span className="italic text-[var(--accent)]">See the price now.</span>
        </h2>

        <div className="mt-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-start">
          <div className="space-y-6">
            {gs.map((g) => (
              <fieldset key={g.key} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5">
                <legend className="px-1 text-[15px] font-semibold text-[var(--text-primary)]">{g.title}</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[{ id: null as string | null, label: "Not now", setup: 0, monthly: 0 }, ...g.options].map((o) => {
                    const on = pick[g.key] === o.id;
                    return (
                      <button
                        key={o.id ?? "none"}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setPick((p) => ({ ...p, [g.key]: o.id }))}
                        className={`rounded-xl border px-4 py-2.5 text-left text-[14px] transition-all duration-200 ${on ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)] shadow-[0_8px_20px_-10px_rgba(15,15,18,0.6)]" : "border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"}`}
                      >
                        <span className="block font-semibold">{o.label}</span>
                        {o.id && (
                          <span className={`block text-[12px] ${on ? "text-[var(--gold)]" : "text-[var(--text-tertiary)]"}`}>
                            {[o.setup ? `${fmt(o.setup)} once` : "", o.monthly ? `${fmt(o.monthly)}/mo` : ""].filter(Boolean).join(" + ")}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="ink rounded-2xl p-7 lg:sticky lg:top-24">
            <p className="text-[13px] text-[var(--text-tertiary)]">Your plan</p>
            <ul className="mt-3 space-y-1.5 text-[14px] text-[var(--text-secondary)] min-h-[64px]">
              {chosen.length ? chosen.map((o) => <li key={o.group}>{o.group} · {o.id}</li>) : <li>Pick at least one service.</li>}
            </ul>
            <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
              <p className="text-[13px] text-[var(--text-tertiary)]">One-time</p>
              <p className="font-display text-[44px] leading-none text-[var(--ivory)] tabular-nums">{fmt(setup)}</p>
              <p className="mt-3 text-[16px] text-[var(--gold)] tabular-nums">+ {fmt(monthly)}/month</p>
            </div>
            {all3 && (
              <p className="mt-4 rounded-lg bg-[rgba(201,168,106,0.12)] px-3 py-2 text-[13px] text-[var(--gold)]">
                Want all three? The Growth Bundle is {BUNDLE[market].setup} + {BUNDLE[market].monthly}/mo.
              </p>
            )}
            <a
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              data-cta={cfg.primaryCta.kind}
              data-cta-location="quote-builder"
              className="mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--gold)] text-[15px] font-semibold text-[var(--ink)] hover:brightness-110 transition"
            >
              {cta.label}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">No long-term contract. Final quote confirmed on a 15-minute call.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
