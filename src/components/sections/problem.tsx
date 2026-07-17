"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneOff, Database, Clock } from "lucide-react";

function DecayChart() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 250"
      className="w-full h-auto"
      fill="none"
    >
      {/* Grid lines */}
      {[50, 100, 150, 200].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {[80, 160, 240, 320].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Decay curve */}
      <motion.path
        d="M 0 30 C 60 35, 100 80, 140 160 S 240 230, 400 240"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Area fill */}
      <motion.path
        d="M 0 30 C 60 35, 100 80, 140 160 S 240 230, 400 240 L 400 250 L 0 250 Z"
        fill="url(#decay-gradient)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      <defs>
        <linearGradient id="decay-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Time markers */}
      {[
        { x: 0, y: 30, label: "0 min", val: "100%" },
        { x: 100, y: 80, label: "5 min", val: "50%" },
        { x: 200, y: 190, label: "30 min", val: "10%" },
        { x: 320, y: 235, label: "60 min", val: "2%" },
      ].map((pt) => (
        <motion.g
          key={pt.label}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <circle cx={pt.x} cy={pt.y} r="4" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="2" />
          <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="monospace" fontWeight="600">
            {pt.val}
          </text>
          <text x={pt.x} y={248} textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" fontFamily="monospace">
            {pt.label}
          </text>
        </motion.g>
      ))}

      <text x="0" y="248" fill="var(--text-tertiary)" fontSize="9" fontFamily="monospace">LEAD VALUE</text>
    </svg>
  );
}

const painPoints = [
  {
    icon: PhoneOff,
    title: "Missed calls, lost deals",
    desc: "85% of leads never get a callback. By hour one, your competitor already closed them.",
  },
  {
    icon: Database,
    title: "No CRM sync",
    desc: "Manual data entry means leads fall through the cracks. No follow-up, no pipeline visibility.",
  },
  {
    icon: Clock,
    title: "Slow follow-up kills conversion",
    desc: "Every minute of delay reduces your close rate by 40%. Speed-to-lead is everything.",
  },
];

export default function Problem() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                The Problem
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6"
            >
              Your leads are dying in 5 minutes.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-lg mb-12"
            >
              The average real estate agent takes 47 hours to respond to a lead. 
              In that time, 78% go with whoever answered first. Every missed call 
              is a commission check walking out the door.
            </motion.p>

            <DecayChart />
          </div>

          <div className="space-y-6 lg:pt-12">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
                className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] border-l-2 border-l-[var(--warning)]"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <point.icon className="w-5 h-5 text-[var(--warning)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-medium text-[var(--text-primary)] mb-1">
                      {point.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
