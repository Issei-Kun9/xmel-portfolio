"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function Guarantee() {
  return (
    <section id="pilot" className="relative py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 lg:p-12 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--accent)] overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-xl bg-[var(--accent-dim)] border border-[rgba(193,255,114,0.15)] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[var(--accent)]" strokeWidth={1.5} />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-display text-xl lg:text-2xl font-semibold text-[var(--text-primary)] mb-2">
                14-Day Pilot — See Results Before You Commit
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
                We build a working prototype of your AI system and run it against your real leads for two weeks.
                No contracts, no upfront fees. If it doesn&apos;t outperform your current process, you owe us nothing.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-start lg:items-end gap-3">
              <p className="font-mono text-[11px] text-[var(--text-tertiary)] max-w-[280px] lg:text-right leading-relaxed">
                No contracts. No upfront fees. Pricing is scoped to your pilot results — most clients recover the cost from a single recovered deal.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg font-mono text-sm font-medium hover:opacity-90 transition-opacity shine-sweep"
              >
                Start Pilot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
