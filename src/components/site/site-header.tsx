"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import LogoMark from "./logo-mark";
import { CalendarDays, Menu, X } from "lucide-react";
import { TopNavMenu } from "@astryxdesign/core/TopNav";
import Lottie from "@/components/motion/lottie";

const primaryLinks = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
];

const services = [
  { name: "AI for real estate", href: "/ai-automation-real-estate", desc: "AI inside sales agent for agents & brokerages", icon: "house" },
  { name: "AI for home services", href: "/ai-automation-home-services", desc: "AI receptionist for HVAC, plumbing & electrical", icon: "tools" },
  { name: "Website development", href: "/website-development", desc: "Mobile-first sites, live in about a week", icon: "laptop" },
  { name: "SEO", href: "/seo", desc: "Technical fixes, content and local search", icon: "growth-chart" },
];

const tailLinks = [
  { name: "ROI calculator", href: "/tools/roi-calculator" },
  { name: "Blog", href: "/blog" },
];

/** Section links ("/#pricing") never count as the current page. */
const isCurrent = (pathname: string, href: string) =>
  !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

const desktopLink =
  "relative inline-flex items-center py-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors aria-[current=page]:text-[var(--ivory)] aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-px aria-[current=page]:after:bg-[var(--gold)]";

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Shadow once scrolled; on phones and tablets, tuck the header away while
  // reading down and bring it back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const small = window.innerWidth < 1024;
      if (!small || openRef.current || y < 160) setTucked(false);
      else if (Math.abs(y - last) > 6) setTucked(y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Open menu: lock the page, keep Tab inside (toggle + menu links), Esc closes.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab" || !menuRef.current || !toggle) return;
      const items = [toggle, ...menuRef.current.querySelectorAll<HTMLElement>("a")];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === -1 || i === items.length - 1 ? 0 : i + 1);
      e.preventDefault();
      items[next].focus();
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const servicesActive = services.some((s) => isCurrent(pathname, s.href));
  const close = () => setOpen(false);

  return (
    <>
    <header
      className={`site-header ink sticky top-0 z-50 !bg-[rgba(15,15,18,0.9)] backdrop-blur-md transition-[border-color,box-shadow,translate] duration-300 border-b ${
        scrolled ? "border-[var(--border-subtle)] shadow-[0_1px_20px_rgba(0,0,0,0.35)]" : "border-transparent"
      } ${tucked ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="XMEL Automations home">
          <LogoMark size={30} />
          <span className="font-display font-semibold text-[17px] tracking-[-0.01em] text-[var(--text-primary)]">
            XMEL <span className="text-[var(--gold)] font-normal italic">Automations</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
          {primaryLinks.map((l) => (
            <a key={l.href} href={l.href} className={desktopLink}>
              {l.name}
            </a>
          ))}

          <TopNavMenu
            label="Services"
            className={`astryx-nav-trigger${servicesActive ? " is-current" : ""}`}
            items={services.map((x) => ({ title: x.name, description: x.desc, href: x.href, icon: <Lottie name={x.icon} className="w-7 h-7" /> }))}
          />

          {tailLinks.map((l) => (
            <a key={l.href} href={l.href} aria-current={isCurrent(pathname, l.href) ? "page" : undefined} className={desktopLink}>
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#book"
            data-cta="book"
            data-cta-location="header"
            className="inline-flex items-center gap-1.5 h-10 px-3 sm:px-4 rounded-lg bg-[var(--gold)] text-[var(--ink)] text-[14px] font-semibold hover:brightness-110 transition-[filter]"
          >
            <CalendarDays className="w-4 h-4 sm:hidden" aria-hidden="true" />
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a call</span>
          </a>
          <button
            ref={toggleRef}
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

    {/* Portalled to <body>: any ancestor with a transform, filter or
        backdrop-filter (the header's blur, the page-in wrapper) becomes the
        containing block for fixed children and pulls this panel off-screen. */}
      {open && createPortal(
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="ink menu-in lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 border-t border-[var(--border-subtle)] px-4 sm:px-6 pt-4 pb-[max(24px,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain"
        >
          <nav className="flex flex-col max-w-[640px] mx-auto" aria-label="Mobile">
            <p className="pb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
              Services
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {services.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  onClick={close}
                  aria-current={isCurrent(pathname, s.href) ? "page" : undefined}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-3 hover:border-[var(--gold)] aria-[current=page]:border-[var(--gold)] transition-colors"
                >
                  <span className="shrink-0 w-11 h-11 rounded-lg bg-[var(--bg-secondary)] inline-flex items-center justify-center">
                    <Lottie name={s.icon} className="w-7 h-7" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-semibold text-[var(--text-primary)]">{s.name}</span>
                    <span className="block text-[13px] leading-snug text-[var(--text-secondary)]">{s.desc}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="pt-4" />
            {[...primaryLinks, ...tailLinks, { name: "About", href: "/about" }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                className="py-3.5 text-[17px] font-medium text-[var(--text-primary)] border-b border-[var(--border-subtle)] aria-[current=page]:text-[var(--gold)]"
              >
                {l.name}
              </a>
            ))}
            <a
              href="/#book"
              onClick={close}
              data-cta="book"
              data-cta-location="mobile-menu"
              className="mt-6 flex items-center justify-center gap-2 h-12 rounded-lg bg-[var(--gold)] text-[var(--ink)] font-semibold"
            >
              <CalendarDays className="w-[18px] h-[18px]" aria-hidden="true" />
              Book a 15-min demo
            </a>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
