"use client";

import { useEffect, useState } from "react";
import type { Market } from "@/lib/market";
import type { Sample } from "@/lib/industries";
import { SerpMockup, SiteMockup } from "./mockups";

/** Site + Google mockups for one industry, switchable between the US and India samples. */
export default function MarketMockups({ samples }: { samples: Record<Market, Sample> }) {
  const [m, setM] = useState<Market>("us");
  useEffect(() => {
    if (document.cookie.includes("market=in")) setM("in");
  }, []);
  return (
    <div>
      <div role="group" aria-label="Market" className="mb-8 inline-flex rounded-full border border-[var(--border-strong)] p-1 text-[13px] font-semibold">
        {(["us", "in"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={m === k} onClick={() => setM(k)}
            className={`rounded-full px-4 py-1.5 transition-colors ${m === k ? "bg-[var(--ink)] text-[var(--gold)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"}`}>
            {k === "us" ? "🇺🇸 United States" : "🇮🇳 India"}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <SerpMockup s={samples[m]} />
        <SiteMockup s={samples[m]} />
      </div>
    </div>
  );
}
