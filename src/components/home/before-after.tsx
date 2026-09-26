"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

const ROWS = [
  { without: "A lead messages at 11 PM. You reply at 9 AM. They've already booked someone else.", with: "The AI replies in under a minute, qualifies them and books the call — while you sleep." },
  { without: "Your website looks dated on a phone, so visitors leave without calling.", with: "A fast, mobile-first site written to turn visitors into enquiries." },
  { without: "Customers search for what you do and find your competitors first.", with: "SEO puts you on the first page for the searches that bring buyers." },
  { without: "You juggle a web guy, an SEO agency and a pile of apps.", with: "One team, one invoice, one number to message." },
];

/**
 * The "why buy" in one glance: a toggle between the visitor's week as it is
 * and the week with us. Interactive so it gets played with, not skimmed.
 */
export default function BeforeAfter() {
  const [on, setOn] = useState(true);
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-display text-[clamp(30px,4.6vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] max-w-2xl">
            Same business. <span className="italic text-[var(--accent)]">Very different week.</span>
          </h2>
          <div role="group" aria-label="Compare" className="inline-flex self-start md:self-auto rounded-full border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-1 text-[14px] font-semibold">
            {[false, true].map((v) => (
              <button
                key={String(v)}
                type="button"
                aria-pressed={on === v}
                onClick={() => setOn(v)}
                className={`rounded-full px-5 py-2 transition-colors ${on === v ? (v ? "bg-[var(--ink)] text-[var(--gold)]" : "bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm") : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"}`}
              >
                {v ? "With XMEL" : "Without us"}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid md:grid-cols-2 gap-4">
          {ROWS.map((r) => (
            <li
              key={r.with}
              className={`flex gap-4 rounded-2xl border p-6 transition-all duration-500 ${on ? "ink border-transparent" : "border-[var(--border-subtle)] bg-[var(--bg-secondary)]"}`}
            >
              <span className={`mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${on ? "bg-[var(--gold)] text-[var(--ink)]" : "bg-[rgba(180,60,40,0.12)] text-[#A0432E]"}`}>
                {on ? <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" /> : <X className="w-4 h-4" strokeWidth={3} aria-hidden="true" />}
              </span>
              <p className={`text-[16px] leading-relaxed ${on ? "text-[var(--ivory)]" : "text-[var(--text-secondary)]"}`}>
                {on ? r.with : r.without}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
