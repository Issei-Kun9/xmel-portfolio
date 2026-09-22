"use client";

import { useEffect, useState } from "react";
import type { MarketConfig } from "@/lib/market";
import CtaButton from "./cta-button";

/**
 * Phone-only bar with the market's primary action. Appears once the hero is
 * scrolled past and hides again over the booking section, where it would
 * only duplicate what's on screen.
 */
export default function StickyCta({ cfg }: { cfg: MarketConfig }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const book = document.getElementById("book");
      const pastHero = window.scrollY > 640;
      const atBook = book ? book.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(pastHero && !atBook);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[rgba(255,255,255,0.95)] backdrop-blur px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!visible}
    >
      <CtaButton cta={cfg.primaryCta} location="sticky-mobile" className="w-full" />
    </div>
  );
}
