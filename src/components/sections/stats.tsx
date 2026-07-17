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
    const duration = 1400;
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

const stats = [
  { value: 67, label: "NODES IN FLAGSHIP SYSTEM", prefix: "" },
  { value: 5, label: "MIN AVG LEAD RESPONSE", prefix: "<", suffix: "" },
  { value: 24, label: "SYSTEM UPTIME", suffix: "/7", prefix: "" },
  { value: 7, label: "WEBHOOK INTEGRATIONS", prefix: "" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--border-subtle)]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-10 lg:py-12 text-center lg:text-left px-4 lg:px-8 first:pl-0 last:pr-0"
            >
              <div className="text-3xl lg:text-4xl font-bold text-[var(--accent)] mb-2 tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
