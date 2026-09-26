"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { INSPIRATION, INSPO_CATEGORIES, INDUSTRY_TO_CATEGORY, shotUrl, type InspoMarket } from "@/lib/inspiration";

/** Filterable grid of real sites we admire, India first. Every card links to the original. */
export default function InspirationGallery() {
  const [market, setMarket] = useState<InspoMarket>("in");
  const [cat, setCat] = useState<string>("all");

  // ?market=us and ?industry=<industry-page slug> or ?category=<slug> preselect filters.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const m = q.get("market");
    if (m === "us" || m === "in") setMarket(m);
    const c = q.get("category") ?? INDUSTRY_TO_CATEGORY[q.get("industry") ?? ""];
    if (c && INSPO_CATEGORIES.some((x) => x.slug === c)) setCat(c);
  }, []);

  const inMarket = INSPIRATION.filter((s) => s.market === market);
  const chips = [{ slug: "all", name: "All" }, ...INSPO_CATEGORIES.filter((c) => inMarket.some((s) => s.category === c.slug))];
  const active = chips.some((c) => c.slug === cat) ? cat : "all";
  const shown = active === "all" ? inMarket : inMarket.filter((s) => s.category === active);

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
      on
        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--gold)]"
        : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
    }`;

  return (
    <div>
      <div role="group" aria-label="Market" className="inline-flex rounded-full border border-[var(--border-strong)] p-1 text-[14px] font-semibold">
        {(["in", "us"] as const).map((m) => (
          <button key={m} type="button" aria-pressed={market === m} onClick={() => setMarket(m)}
            className={`rounded-full px-5 py-2 transition-colors ${market === m ? "bg-[var(--ink)] text-[var(--gold)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"}`}>
            {m === "in" ? "🇮🇳 India" : "🇺🇸 United States"}
          </button>
        ))}
      </div>

      <div role="group" aria-label="Filter by industry" className="mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button key={c.slug} type="button" aria-pressed={active === c.slug} onClick={() => setCat(c.slug)} className={chip(active === c.slug)}>
            {c.name}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((s) => {
          const label = INSPO_CATEGORIES.find((c) => c.slug === s.category)?.name ?? "";
          const host = new URL(s.url).hostname.replace(/^www\./, "");
          return (
            <li key={s.url} className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]">
              <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="block" aria-label={`Open ${s.name} (opens in a new tab)`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-secondary)]">
                  <span className="absolute inset-0 flex items-center justify-center font-display text-[22px] text-[var(--text-tertiary)]" aria-hidden="true">{host}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote live screenshot */}
                  <img
                    src={shotUrl(s.url)}
                    alt={`Homepage of ${s.name}`}
                    loading="lazy"
                    className="relative h-full w-full object-cover object-top text-transparent transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[rgba(15,15,18,0.85)] px-2.5 py-1 text-[11px] font-semibold text-[var(--gold)]">{label}</span>
                </div>
              </a>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[17px] font-semibold text-[var(--text-primary)]">{s.name}</h3>
                  <span className="text-[12px] text-[var(--text-tertiary)]">{host}</span>
                </div>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">{s.why}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4 text-[14px] font-semibold">
                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    Visit site <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a href={`/contact?plan=${encodeURIComponent(`A website in the style of ${s.name} (${host})`)}`} className="text-[var(--accent)] link-grow">
                    I want this style →
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
