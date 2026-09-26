import { Search, Star } from "lucide-react";
import type { Market } from "@/lib/market";

const SAMPLE = {
  us: { biz: "Summit Roofing Co.", query: "roofer near me", city: "Austin, TX", domain: "summitroofing.com" },
  in: { biz: "Sharma Interiors", query: "interior designer in pune", city: "Pune", domain: "sharmainteriors.in" },
};

/** A laptop + phone showing the kind of site we build. Illustrative, not a client. */
function SiteMockup({ market }: { market: Market }) {
  const s = SAMPLE[market];
  return (
    <div className="relative mx-auto w-full max-w-[520px] pb-10">
      <div className="rounded-t-2xl border border-[var(--border-strong)] bg-[var(--ink)] p-2.5 shadow-[0_40px_80px_-40px_rgba(15,15,18,0.5)]">
        <div className="overflow-hidden rounded-lg bg-[var(--ivory)]">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[rgba(15,15,18,0.08)]">
            <i className="w-2 h-2 rounded-full bg-[#E5CFA0]" /><i className="w-2 h-2 rounded-full bg-[#D9C9A8]" /><i className="w-2 h-2 rounded-full bg-[#CDBFA6]" />
            <span className="ml-2 flex-1 rounded bg-[rgba(15,15,18,0.06)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]">{s.domain}</span>
          </div>
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)]">
              <b className="font-display text-[13px] text-[var(--ink)]">{s.biz}</b>
              <span className="hidden sm:inline">Services · Work · Reviews · Contact</span>
            </div>
            <p className="mt-5 font-display text-[22px] leading-tight text-[var(--ink)]">
              Trusted by homeowners across {s.city}.
            </p>
            <p className="mt-2 text-[11px] text-[var(--text-secondary)] max-w-[70%]">Free quote in 24 hours. Licensed, insured, and on time.</p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-[10px] font-semibold text-white">Get a free quote</span>
              <span className="rounded-md border border-[rgba(15,15,18,0.15)] px-3 py-1.5 text-[10px] font-semibold text-[var(--ink)]">Call now</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 rounded-md bg-[linear-gradient(135deg,#E8E1D2,#D9CBAE)]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-[108%] -ml-[4%] rounded-b-xl bg-[linear-gradient(#2A2A30,#0F0F12)]" />
      {/* phone */}
      <div className="absolute -right-2 sm:-right-6 bottom-0 w-[118px] rounded-[22px] border border-[var(--border-strong)] bg-[var(--ink)] p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-[17px] bg-[var(--ivory)] px-2.5 pt-4 pb-3">
          <b className="block font-display text-[9px] text-[var(--ink)]">{s.biz}</b>
          <p className="mt-2 font-display text-[12px] leading-tight text-[var(--ink)]">Free quote in 24 hours.</p>
          <span className="mt-2 block rounded bg-[var(--accent)] py-1 text-center text-[8px] font-semibold text-white">Get a quote</span>
          <div className="mt-2 h-10 rounded bg-[linear-gradient(135deg,#E8E1D2,#D9CBAE)]" />
        </div>
      </div>
    </div>
  );
}

/** A Google-style results page with the business in the top spot. Illustrative. */
function SerpMockup({ market }: { market: Market }) {
  const s = SAMPLE[market];
  const others = market === "us" ? ["ProRoof Austin", "Lone Star Roofers"] : ["Pune Home Decor", "Studio Casa Pune"];
  return (
    <div className="mx-auto w-full max-w-[520px] rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(15,15,18,0.35)]">
      <div className="flex items-center gap-2 rounded-full border border-[#DFE1E5] px-4 py-2 text-[13px] text-[#202124]">
        <Search className="w-4 h-4 text-[#9AA0A6]" aria-hidden="true" />
        {s.query}
      </div>
      <ol className="mt-4 space-y-3">
        <li className="relative rounded-xl border border-[var(--accent-line)] bg-[rgba(201,168,106,0.08)] p-3.5">
          <span className="absolute -top-2.5 right-3 rounded-full bg-[var(--ink)] px-2 py-0.5 text-[10px] font-bold text-[var(--gold)]">#1</span>
          <p className="text-[11px] text-[#4D5156]">{s.domain}</p>
          <p className="text-[16px] text-[#1A0DAB] leading-snug">{s.biz} — {market === "us" ? `Roofing in ${s.city}` : `Interior Design in ${s.city}`}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[#70757A]">
            <span className="flex text-[#F4B400]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-3 h-3 fill-current" aria-hidden="true" />)}</span>
            4.9 · Open now
          </p>
        </li>
        {others.map((o, i) => (
          <li key={o} className="px-3.5 opacity-55">
            <p className="text-[11px] text-[#4D5156]">result {i + 2}</p>
            <p className="text-[15px] text-[#1A0DAB]">{o}</p>
            <div className="mt-1 h-2 w-3/4 rounded bg-[#E8EAED]" />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ShowcaseVisuals({ market }: { market: Market }) {
  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Website development</p>
            <h2 className="mt-3 font-display text-[clamp(30px,4.4vw,50px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
              A website that looks like <span className="italic text-[var(--accent)]">the best in town.</span>
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-lg">
              Written around what your customers ask, built mobile-first, and live in about a week.
              Every page ends in one clear next step: call, book or message.
            </p>
            <a href="/website-development" className="link-grow mt-6 inline-block text-[15px] font-semibold text-[var(--accent)]">See website plans →</a>
          </div>
          <SiteMockup market={market} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">SEO</p>
            <h2 className="mt-3 font-display text-[clamp(30px,4.4vw,50px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
              When they search, <span className="italic text-[var(--accent)]">they find you first.</span>
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-lg">
              Technical fixes, local listings and pages written for the exact searches your buyers make.
              A plain-English report every month.
            </p>
            <a href="/seo" className="link-grow mt-6 inline-block text-[15px] font-semibold text-[var(--accent)]">See SEO plans →</a>
          </div>
          <div className="lg:order-1"><SerpMockup market={market} /></div>
        </div>
      </div>
      <p className="mt-10 text-center text-[12px] text-[var(--text-tertiary)]">Illustrations of our work style — sample businesses, not clients.</p>
    </section>
  );
}
