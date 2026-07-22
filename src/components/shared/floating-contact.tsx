"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

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
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg p-4 shadow-2xl max-w-[220px]"
          >
            <p className="font-mono text-[11px] text-[var(--text-secondary)] mb-3 leading-relaxed">
              Need an AI automation system? Let&apos;s talk.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setExpanded(false)}
                className="block py-2 px-4 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-[11px] font-medium text-center rounded hover:opacity-90 transition-opacity"
              >
                Send a message
              </a>
              <a
                href="mailto:yashwwardhanai@gmail.com"
                className="block py-2 px-4 border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-[11px] text-center rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                Email directly
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={() => setExpanded(!expanded)}
        className="group relative flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-[11px] font-medium rounded-full shadow-[0_0_20px_rgba(193,255,114,0.25)] hover:shadow-[0_0_30px_rgba(193,255,114,0.4)] transition-shadow duration-300"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-4 h-4" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="hidden sm:inline">Contact me</span>

        {/* Pulse ring */}
        {!expanded && (
          <span className="absolute inset-0 rounded-full border-2 border-[var(--accent)] animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
