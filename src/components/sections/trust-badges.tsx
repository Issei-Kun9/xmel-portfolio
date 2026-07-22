"use client";

import { motion } from "framer-motion";

const badges = [
  { name: "OpenAI", subtext: "GPT-4o-mini" },
  { name: "n8n", subtext: "Workflow Engine" },
  { name: "Twilio", subtext: "Voice & SMS" },
  { name: "ElevenLabs", subtext: "Voice AI" },
  { name: "Vapi", subtext: "Phone Agents" },
  { name: "Google", subtext: "Workspace" },
];

export default function TrustBadges() {
  return (
    <section className="relative py-12 border-y border-[var(--border-subtle)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            POWERED BY
          </span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-3 px-5 py-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center">
                <span className="font-display text-sm font-bold text-[var(--accent)]">
                  {badge.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-mono text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {badge.name}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
                  {badge.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
