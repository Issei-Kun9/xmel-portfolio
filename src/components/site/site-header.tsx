"use client";

import { useEffect, useRef, useState } from "react";
import LogoMark from "./logo-mark";
import { Menu, X, ChevronDown } from "lucide-react";

const primaryLinks = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
];

const services = [
  { name: "AI for real estate", href: "/ai-automation-real-estate", desc: "AI inside sales agent for agents & brokerages" },
  { name: "AI for home services", href: "/ai-automation-home-services", desc: "AI receptionist for HVAC, plumbing & electrical" },
  { name: "Website development", href: "/website-development", desc: "Mobile-first sites, live in about a week" },
  { name: "SEO", href: "/seo", desc: "Technical fixes, content and local search" },
];

const tailLinks = [
  { name: "ROI calculator", href: "/tools/roi-calculator" },
  { name: "Blog", href: "/blog" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 bg-[rgba(255,255,255,0.88)] backdrop-blur-md transition-[border-color,box-shadow] duration-200 border-b ${
        scrolled ? "border-[var(--border-subtle)] shadow-[0_1px_12px_rgba(14,21,18,0.06)]" : "border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="XMEL Automations home">
          <LogoMark size={30} />
          <span className="font-display font-semibold text-[17px] tracking-[-0.01em] text-[var(--text-primary)]">
            XMEL <span className="text-[var(--text-tertiary)] font-medium">Automations</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
          {primaryLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {l.name}
            </a>
          ))}

          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[300px] z-50">
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-[0_20px_40px_-16px_rgba(14,21,18,0.25)] p-2">
                  {services.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <span className="block text-[14px] font-semibold text-[var(--text-primary)]">{s.name}</span>
                      <span className="block text-[13px] text-[var(--text-tertiary)] mt-0.5">{s.desc}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {tailLinks.map((l) => (
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
            {primaryLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-[17px] font-medium text-[var(--text-primary)] border-b border-[var(--border-subtle)]"
              >
                {l.name}
              </a>
            ))}
            <p className="pt-5 pb-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
              Services
            </p>
            {services.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-[17px] font-medium text-[var(--text-primary)] border-b border-[var(--border-subtle)]"
              >
                {s.name}
              </a>
            ))}
            <div className="pt-5" />
            {tailLinks.map((l) => (
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
