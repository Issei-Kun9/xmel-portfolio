import { Search, Star } from "lucide-react";
import type { Sample } from "@/lib/industries";

/** A laptop + phone showing the kind of site we build. Illustrative, not a client. */
export function SiteMockup({ s }: { s: Sample }) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] pb-10">
      <div className="rounded-t-2xl border border-[rgba(15,15,18,0.25)] bg-[#0F0F12] p-2.5 shadow-[0_40px_80px_-40px_rgba(15,15,18,0.5)]">
        <div className="overflow-hidden rounded-lg bg-[#F5F0E6]">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[rgba(15,15,18,0.08)]">
            <i className="w-2 h-2 rounded-full bg-[#E5CFA0]" /><i className="w-2 h-2 rounded-full bg-[#D9C9A8]" /><i className="w-2 h-2 rounded-full bg-[#CDBFA6]" />
            <span className="ml-2 flex-1 rounded bg-[rgba(15,15,18,0.06)] px-2 py-0.5 text-[10px] text-[#6A6358]">{s.domain}</span>
          </div>
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between text-[10px] text-[#6A6358]">
              <b className="font-display text-[13px] text-[#0F0F12]">{s.biz}</b>
              <span className="hidden sm:inline">Services · Work · Reviews · Contact</span>
            </div>
            <p className="mt-5 font-display text-[22px] leading-tight text-[#0F0F12]">{s.headline}</p>
            <p className="mt-2 text-[11px] text-[#4A463F] max-w-[75%]">{s.sub}</p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-md bg-[#8A6A2F] px-3 py-1.5 text-[10px] font-semibold text-white">{s.cta}</span>
              <span className="rounded-md border border-[rgba(15,15,18,0.15)] px-3 py-1.5 text-[10px] font-semibold text-[#0F0F12]">Call now</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 rounded-md bg-[linear-gradient(135deg,#E8E1D2,#D9CBAE)]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-3 w-[108%] -ml-[4%] rounded-b-xl bg-[linear-gradient(#2A2A30,#0F0F12)]" />
      <div className="absolute -right-2 sm:-right-6 bottom-0 w-[118px] rounded-[22px] border border-[rgba(15,15,18,0.25)] bg-[#0F0F12] p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-[17px] bg-[#F5F0E6] px-2.5 pt-4 pb-3">
          <b className="block font-display text-[9px] text-[#0F0F12]">{s.biz}</b>
          <p className="mt-2 font-display text-[12px] leading-tight text-[#0F0F12]">{s.sub.split(".")[0]}.</p>
          <span className="mt-2 block rounded bg-[#8A6A2F] py-1 text-center text-[8px] font-semibold text-white">{s.cta}</span>
          <div className="mt-2 h-10 rounded bg-[linear-gradient(135deg,#E8E1D2,#D9CBAE)]" />
        </div>
      </div>
    </div>
  );
}

/** A Google-style results page with the business in the top spot. Illustrative. */
export function SerpMockup({ s }: { s: Sample }) {
  return (
    <div className="mx-auto w-full max-w-[520px] rounded-2xl border border-[rgba(15,15,18,0.1)] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(15,15,18,0.35)]">
      <div className="flex items-center gap-2 rounded-full border border-[#DFE1E5] px-4 py-2 text-[13px] text-[#202124]">
        <Search className="w-4 h-4 text-[#9AA0A6]" aria-hidden="true" />
        {s.query}
      </div>
      <ol className="mt-4 space-y-3">
        <li className="relative rounded-xl border border-[rgba(138,106,47,0.32)] bg-[rgba(201,168,106,0.08)] p-3.5">
          <span className="absolute -top-2.5 right-3 rounded-full bg-[#0F0F12] px-2 py-0.5 text-[10px] font-bold text-[#C9A86A]">#1</span>
          <p className="text-[11px] text-[#4D5156]">{s.domain}</p>
          <p className="text-[16px] text-[#1A0DAB] leading-snug">{s.biz} — {s.serpTitle}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[#70757A]">
            <span className="flex text-[#F4B400]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-3 h-3 fill-current" aria-hidden="true" />)}</span>
            4.9 · Open now
          </p>
        </li>
        {s.rivals.map((o, i) => (
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
