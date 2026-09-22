"use client";

import { useEffect } from "react";
import type { Market } from "@/lib/market";

/**
 * One delegated listener instead of an onClick per button: any element with
 * data-cta sends a GA4 "cta_click" event tagged with the market and where on
 * the page it was clicked. A WhatsApp click, or a meeting actually booked in
 * the Calendly embed, is also sent as "generate_lead".
 */
export default function CtaTracker({ market }: { market: Market }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      const cta = el.dataset.cta ?? "unknown";
      const location = el.dataset.ctaLocation ?? "unknown";
      window.gtag?.("event", "cta_click", { cta, location, market });
      if (cta === "whatsapp") {
        window.gtag?.("event", "generate_lead", { method: "whatsapp", location, market });
      }
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if ((e.data as { event?: string } | null)?.event === "calendly.event_scheduled") {
        window.gtag?.("event", "generate_lead", { method: "calendly", location: "book", market });
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, [market]);

  return null;
}
