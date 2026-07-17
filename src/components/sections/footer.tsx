"use client";

import { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(ist);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time} IST</span>;
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">&gt;</span> ISA.SYSTEMS
            </span>
            <p className="font-mono text-[11px] text-[var(--text-tertiary)] mt-1">
              AI automation for real estate &amp; home services.
            </p>
          </div>

          <div className="flex items-center gap-8">
            {["WORK", "ISA SYSTEM", "PROCESS", "ABOUT", "CONTACT"].map((link) => (
              <a
                key={link}
                href={`#${link === "WORK" ? "work" : link === "ISA SYSTEM" ? "isa-system" : link === "PROCESS" ? "process" : link === "ABOUT" ? "about" : "contact"}`}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200 hidden md:block"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="font-mono text-[11px] text-[var(--text-tertiary)]">
            <LiveClock />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-[var(--text-tertiary)]">
            © 2026 ISA Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:yashwwardhanai@gmail.com"
              className="font-mono text-[10px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Email
            </a>
            <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
              Built with precision. No templates.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
