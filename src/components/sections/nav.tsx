"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "WORK", href: "#work" },
  { name: "ISA SYSTEM", href: "#isa-system" },
  { name: "PROCESS", href: "#process" },
  { name: "ABOUT", href: "#about" },
  { name: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,11,0.7)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.08)]"
            : "bg-transparent"
        }`}
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
                className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-px bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] status-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--success)]">
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
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--bg-primary)] flex flex-col"
            style={{ cursor: "auto" }}
          >
            <div className="h-[72px] px-6 flex items-center justify-between">
              <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
                <span className="text-[var(--accent)]">&gt;</span> MENU
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[var(--text-secondary)] p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-3xl font-light text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors py-3 border-b border-[var(--border-subtle)]"
                >
                  {link.name}
                </motion.a>
              ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
