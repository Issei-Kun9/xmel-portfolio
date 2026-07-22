"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}{count}{suffix}
    </span>
  );
}

const results = [
  { value: 50, suffix: "+", label: "LEADS / DAY", description: "designed capacity per system" },
  { value: 50, suffix: "s", prefix: "<", label: "FIRST RESPONSE", description: "lead to first touch" },
  { value: 7, label: "WEBHOOK TRIGGERS", description: "in the flagship build" },
  { value: 34, suffix: "%", label: "CONVERSION LIFT", description: "from pilot data" },
];

export default function ResultsBanner() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            WHAT I&apos;VE BUILT
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4">
            Real systems, real numbers.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] text-center hover:border-[var(--accent)] transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl font-bold text-[var(--accent)] mb-2 tracking-tight">
                <CountUp target={r.value} suffix={r.suffix} prefix={r.prefix} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-1">
                {r.label}
              </div>
              <div className="font-mono text-[9px] text-[var(--text-tertiary)] opacity-60">
                {r.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
