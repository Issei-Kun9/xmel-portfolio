"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "PropertyPulse Realty",
    location: "Mumbai, Maharashtra",
    description:
      "ISA system for a Mumbai brokerage. 67-node n8n workflow handling inbound leads from MagicBricks and 99acres — qualify, call, book, sync. Fully autonomous.",
    tags: ["N8N", "GPT-4O-MINI", "TWILIO", "SHEETS"],
    metrics: "contact rate: before vs after",
    size: "large",
  },
  {
    title: "HomeServe India",
    location: "Bengaluru, Karnataka",
    description:
      "Voice AI for a Bengaluru plumbing and HVAC company. Every call answered, every job qualified, every slot booked — automatically.",
    tags: ["VAPI", "TWILIO", "GOOGLE-CALENDAR"],
    metrics: "revenue recovered (pilot data)",
    size: "small",
  },
];

export default function Projects() {
  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            SELECTED WORK
          </span>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4">
            What I&apos;ve shipped so far.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]
                hover:border-[var(--accent)] hover:-translate-y-1 transition-all duration-300
                ${i === 0 ? "lg:col-span-2 lg:row-span-2 lg:p-10" : ""}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" />
              </div>

              <h3 className={`font-display font-semibold text-[var(--text-primary)] mb-1 ${i === 0 ? "text-2xl lg:text-3xl" : "text-xl"}`}>
                {project.title}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-3">
                {project.location}
              </div>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 max-w-xl">
                {project.description}
              </p>

              <div className="font-mono text-sm font-medium text-[var(--accent)]">
                {project.metrics}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
