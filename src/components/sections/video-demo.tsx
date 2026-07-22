"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function VideoDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            SEE THE DIFFERENCE
          </span>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4">
            Not a mockup. The actual system.
          </h2>
          <p className="font-mono text-sm text-[var(--text-secondary)] mt-3">
            Real architecture, real screen recordings — the system running live.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* n8n Architecture — Animated HTML */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
              <span className="w-3 h-3 rounded-full bg-[rgba(255,95,86,0.8)]" />
              <span className="w-3 h-3 rounded-full bg-[rgba(255,189,46,0.8)]" />
              <span className="w-3 h-3 rounded-full bg-[rgba(39,201,63,0.8)]" />
              <span className="font-mono text-[10px] text-[var(--text-tertiary)] ml-2">
                architecture.html
              </span>
            </div>
            <iframe
              src="/media/architecture.html"
              className="w-full border-0"
              style={{ height: "420px" }}
              title="AI ISA Pipeline Architecture"
            />
            <div className="px-4 py-3 border-t border-[var(--border-subtle)]">
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                The actual n8n workflow — not a mockup
              </span>
            </div>
          </motion.div>

          {/* Lead Processing Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
              <span className="w-3 h-3 rounded-full bg-[rgba(255,95,86,0.8)]" />
              <span className="w-3 h-3 rounded-full bg-[rgba(255,189,46,0.8)]" />
              <span className="w-3 h-3 rounded-full bg-[rgba(39,201,63,0.8)]" />
              <span className="font-mono text-[10px] text-[var(--text-tertiary)] ml-2">
                xmel-demo.mp4
              </span>
            </div>
            <video
              src="/media/xmel-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
            <div className="px-4 py-3 border-t border-[var(--border-subtle)]">
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                Same lead, same day — before ISA vs. after
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
