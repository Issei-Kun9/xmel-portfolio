"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We went from missing 60% of leads to closing 43% more appointments in two weeks. The system pays for itself.",
    name: "Rajesh Mehta",
    role: "Managing Director",
    company: "PropertyPulse Realty",
    location: "Mumbai",
    metric: "43% more bookings",
    initials: "RM",
  },
  {
    quote:
      "Our phone never stops ringing now. The AI answers every call, qualifies the lead, and books the job — all before I finish my chai.",
    name: "Ankit Sharma",
    role: "Founder",
    company: "HomeServe India",
    location: "Bengaluru",
    metric: "100% call answer rate",
    initials: "AS",
  },
  {
    quote:
      "Before XMEL, we had three people doing manual follow-ups. Now one n8n workflow handles 200+ leads a day. The ROI was obvious within the first week.",
    name: "Priya Nair",
    role: "Head of Sales",
    company: "PropVista Solutions",
    location: "Pune",
    metric: "200+ leads/day automated",
    initials: "PN",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            CLIENT RESULTS
          </span>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4">
            Don&apos;t take our word for it.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 lg:p-8 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]"
                  />
                ))}
              </div>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 min-h-[80px]">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center">
                    <span className="font-mono text-[10px] font-medium text-[var(--accent)]">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-xs font-medium text-[var(--text-primary)]">
                      {t.name}
                    </div>
                    <div className="font-mono text-[10px] text-[var(--text-tertiary)]">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-1 rounded bg-[var(--accent-dim)] text-[var(--accent)] border border-[rgba(193,255,114,0.15)]">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
