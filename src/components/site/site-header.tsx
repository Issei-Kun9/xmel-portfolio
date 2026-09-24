"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Real estate", href: "/ai-automation-real-estate" },
  { name: "Home services", href: "/ai-automation-home-services" },
  { name: "ROI calculator", href: "/tools/roi-calculator" },
  { name: "Blog", href: "/blog" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 bg-[rgba(255,255,255,0.88)] backdrop-blur-md transition-[border-color,box-shadow] duration-200 border-b ${
        scrolled ? "border-[var(--border-subtle)] shadow-[0_1px_12px_rgba(14,21,18,0.06)]" : "border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="XMEL Automations home">
          <span className="w-7 h-7 rounded-md bg-[var(--text-primary)] text-[var(--accent-bright)] font-display font-bold text-[15px] flex items-center justify-center">
            X
          </span>
          <span className="font-display font-semibold text-[17px] tracking-[-0.01em] text-[var(--text-primary)]">
            XMEL <span className="text-[var(--text-tertiary)] font-medium">Automations</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#book"
            className="hidden sm:inline-flex items-center h-10 px-4 rounded-lg bg-[var(--accent)] text-white text-[14px] font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            Book a demo
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </header>

    {/* Rendered outside <header>: the header's backdrop-filter makes it the
        containing block for fixed children, which squeezed this full-screen
        panel into the header's 64px. */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] px-4 sm:px-6 py-6 overflow-y-auto"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-[17px] font-medium text-[var(--text-primary)] border-b border-[var(--border-subtle)]"
              >
                {l.name}
              </a>
            ))}
            <a href="/about" onClick={() => setOpen(false)} className="py-3.5 text-[17px] font-medium text-[var(--text-primary)] border-b border-[var(--border-subtle)]">
              About
            </a>
          </nav>
          <a
            href="/#book"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center h-12 rounded-lg bg-[var(--accent)] text-white font-semibold"
          >
            Book a 15-min demo
          </a>
        </div>
      )}
    </>
  );
}
