"use client";

import { useEffect } from "react";
import { MARKET_COOKIE, isMarket, type Market } from "@/lib/market";

/** What a link does, from its data-cta or, failing that, from where it goes. */
function ctaKind(a: HTMLElement): string | null {
  if (a.dataset.cta) return a.dataset.cta;
  const href = a.getAttribute("href") ?? "";
  if (href.includes("wa.me/")) return "whatsapp";
  if (href.includes("calendly.com") || href.endsWith("#book")) return "book";
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (href.endsWith("#pricing")) return "pricing";
  if (href.endsWith("#demo")) return "demo";
  return null;
}

/** The market this visitor is seeing: "/in" pages, else the region cookie, else US. */
function currentMarket(): Market {
  if (location.pathname === "/in" || location.pathname.startsWith("/in/")) return "in";
  const m = document.cookie.match(new RegExp(`(?:^|; )${MARKET_COOKIE}=([^;]+)`))?.[1];
  return isMarket(m) ? m : "us";
}

/**
 * One delegated listener for the whole site: every link that books, messages,
 * calls or emails sends a GA4 "cta_click" tagged with the market, the page
 * and where on the page it sits (data-cta-location, else the nearest section
 * id) and the hostname, so the pro./sites. subdomains (whose pathname is
 * also "/") don't blur into the main site. WhatsApp, phone and email clicks, and a meeting actually booked in the
 * Calendly embed, also count as "generate_lead".
 */
export default function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cta], a[href]");
      if (!el) return;
      const cta = ctaKind(el);
      if (!cta) return;
      const where =
        el.dataset.ctaLocation ??
        el.closest("header, footer")?.tagName.toLowerCase() ??
        el.closest("section[id]")?.id ??
        "page";
      const params = { cta, location: where, page: location.pathname, host: location.hostname, market: currentMarket() };
      window.gtag?.("event", "cta_click", params);
      if (cta === "whatsapp" || cta === "phone" || cta === "email") {
        window.gtag?.("event", "generate_lead", { ...params, method: cta });
      }
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if ((e.data as { event?: string } | null)?.event === "calendly.event_scheduled") {
        window.gtag?.("event", "generate_lead", { method: "calendly", location: "book", page: location.pathname, market: currentMarket() });
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return null;
}
