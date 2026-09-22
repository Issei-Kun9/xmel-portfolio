"use client";

import { MARKETS, MARKET_CONFIG, MARKET_COOKIE, MARKET_COOKIE_MAX_AGE, type Market } from "@/lib/market";

/**
 * Saves the choice in the cookie the middleware reads, then reloads the
 * homepage so the visitor sees prices in their currency. The ?market= param
 * covers browsers that block the cookie.
 */
function chooseMarket(market: Market) {
  try {
    document.cookie = `${MARKET_COOKIE}=${market}; path=/; max-age=${MARKET_COOKIE_MAX_AGE}; samesite=lax`;
  } catch {
    // Cookie blocked: the query parameter still switches this visit.
  }
  window.location.assign(`/?market=${market}`);
}

/** Lets a visitor override the geo guess. */
export default function MarketSwitch({ current }: { current?: Market }) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]" role="group" aria-label="Choose your region">
      {MARKETS.map((m) => {
        const cfg = MARKET_CONFIG[m];
        const active = m === current;
        return (
          <button
            key={m}
            type="button"
            onClick={() => chooseMarket(m)}
            aria-pressed={active}
            className={`h-8 px-3 rounded-md text-[13px] font-medium transition-colors ${
              active
                ? "bg-[var(--text-primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
            }`}
          >
            <span aria-hidden="true">{cfg.flag}</span> {cfg.label} · {cfg.currency}
          </button>
        );
      })}
    </div>
  );
}
