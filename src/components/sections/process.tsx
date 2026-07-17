"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We map your lead flow, identify bottlenecks, and define what \"fast response\" means for your business.",
  },
  {
    num: "02",
    title: "System Design",
    desc: "Architecture planning — webhook triggers, AI model selection, integration points, and fallback logic.",
  },
  {
    num: "03",
    title: "Build & Test",
    desc: "n8n workflows, voice agents, qualification logic — tested against real lead scenarios before going live.",
  },
  {
    num: "04",
    title: "Deploy & Monitor",
    desc: "Production deployment with live dashboards, Slack alerts, and continuous optimization from real data.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4">
            From call to deployed system.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-6 lg:p-8 border-t border-[var(--border-subtle)] lg:border-t-0 lg:border-l first:border-l-0 first:border-t-0"
            >
              <span className="font-mono text-[80px] lg:text-[100px] font-bold leading-none text-[rgba(255,255,255,0.03)] absolute top-4 right-4 select-none">
                {step.num}
              </span>

              <div className="relative z-10">
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] mb-3">
                  STEP {step.num}
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
