"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "WORK", href: "#work" },
  { name: "ISA SYSTEM", href: "#isa-system" },
  { name: "PROCESS", href: "#process" },
  { name: "ROI CALC", href: "/tools/roi-calculator" },
  { name: "BLOG", href: "/blog" },
  { name: "ABOUT", href: "#about" },
  { name: "CONTACT", href: "#contact" },
];

const solutionsLinks = [
  {
    name: "REAL ESTATE",
    href: "/ai-automation-real-estate",
    desc: "AI inside sales agent for agents & brokerages",
  },
  {
    name: "HOME SERVICES",
    href: "/ai-automation-home-services",
    desc: "AI receptionist for HVAC, plumbing & electrical",
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,11,0.7)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.08)]"
            : "bg-transparent"
        }`}
        style={{ animation: "nav-drop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both" }}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-0">
            <span className="font-mono text-sm text-[var(--accent)] select-none">&gt;</span>
            <span className="font-mono text-sm font-medium text-[var(--text-primary)] tracking-wider ml-1">
              ISA.SYSTEMS
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-px bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-200" />
              </a>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                className={`relative font-mono text-[13px] uppercase tracking-[0.12em] py-2 flex items-center gap-1.5 transition-colors duration-200 group ${
                  solutionsOpen
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
                }`}
              >
                Solutions
                <span
                  className={`inline-block transition-transform duration-200 ${
                    solutionsOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
                <span className="absolute bottom-0 left-0 h-px bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-200" />
              </button>

              {solutionsOpen && (
                <div
                  className="absolute right-0 top-full pt-3 w-[280px]"
                  style={{ animation: "dropdown-in 0.15s ease both" }}
                >
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg p-2 shadow-2xl">
                    {solutionsLinks.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-3 rounded-md hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
                      >
                        <span className="block font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--accent)] mb-1">
                          {s.name}
                        </span>
                        <span className="block text-xs text-[var(--text-secondary)] leading-snug">
                          {s.desc}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] status-pulse" />
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--success)]">
                AVAILABLE
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[var(--bg-primary)] flex flex-col"
          style={{ animation: "fade-in 0.3s ease both" }}
        >
          <div className="h-[72px] px-6 flex items-center justify-between">
            <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">&gt;</span> MENU
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[var(--text-secondary)] p-2"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-3xl font-light text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors py-3 border-b border-[var(--border-subtle)]"
                style={{ animation: `fade-slide-up 0.4s ease ${i * 0.06}s both` }}
              >
                {link.name}
              </a>
            ))}

            <div
              className="pt-4"
              style={{ animation: `fade-slide-up 0.4s ease ${navLinks.length * 0.06}s both` }}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Solutions
              </span>
              <div className="mt-3 space-y-1">
                {solutionsLinks.map((s, i) => (
                  <a
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-mono text-xl font-light text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-2"
                    style={{ animation: `fade-slide-up 0.4s ease ${(navLinks.length + 1 + i) * 0.06}s both` }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="px-8 pb-12">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-4 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm text-center font-medium rounded hover:opacity-90 transition-opacity"
            >
              START A PROJECT
            </a>
          </div>
        </div>
      )}
    </>
  );
}
