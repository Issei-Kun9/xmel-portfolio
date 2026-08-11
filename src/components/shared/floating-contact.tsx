"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import MailtoLink from "@/components/shared/mailto-link";

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {expanded && (
        <div
          className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg p-4 shadow-2xl max-w-[220px]"
          style={{ animation: "dropdown-in 0.2s ease both" }}
        >
          <p className="font-mono text-[12px] text-[var(--text-secondary)] mb-3 leading-relaxed">
            Need an AI automation system? Let&apos;s talk.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setExpanded(false)}
              className="block py-2 px-4 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-[12px] font-medium text-center rounded hover:opacity-90 transition-opacity"
            >
              Send a message
            </a>
            <MailtoLink
              email="yashwardhan@xmelautomations.xyz"
              className="block py-2 px-4 border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-[12px] text-center rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              Email directly
            </MailtoLink>
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="group relative flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-[12px] font-medium rounded-full shadow-[0_0_20px_rgba(193,255,114,0.25)] hover:shadow-[0_0_30px_rgba(193,255,114,0.4)] transition-shadow duration-300"
        aria-expanded={expanded}
        aria-label="Contact options"
      >
        {expanded ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
        <span className="hidden sm:inline">Contact me</span>

        {/* Pulse ring */}
        {!expanded && (
          <span className="absolute inset-0 rounded-full border-2 border-[var(--accent)] animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </div>
  );
}
