"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollUp}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-10 h-10 bg-[rgba(10,10,11,0.6)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-full text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-200"
          style={{ animation: "fade-in 0.2s ease both" }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
