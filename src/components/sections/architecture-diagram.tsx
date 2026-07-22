"use client";

import { motion } from "framer-motion";

const nodes = [
  { label: "Webhook", icon: "⚡", color: "#10b981" },
  { label: "GPT-4o-mini", icon: "🧠", color: "#a78bfa", sub: "qualify · score · route" },
];

const outputs = [
  { label: "Sheets", icon: "📊", color: "#34d399" },
  { label: "Slack", icon: "💬", color: "#fb923c" },
  { label: "Email", icon: "✉️", color: "#60a5fa" },
  { label: "Calendar", icon: "📅", color: "#f472b6" },
  { label: "Twilio", icon: "📱", color: "#facc15" },
];

export default function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0a0a0f]">
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
        <span className="w-3 h-3 rounded-full bg-[rgba(255,95,86,0.8)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(255,189,46,0.8)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(39,201,63,0.8)]" />
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] ml-2">
          architecture
        </span>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-col items-center gap-4 p-6 sm:p-8">
        {/* Stage 1 — input */}
        <div className="flex items-center justify-center gap-3">
          {nodes.map((n, i) => (
            <div key={n.label} className="flex items-center gap-3">
              {i > 0 && (
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none" className="shrink-0">
                  <path d="M0,6 H24 M20,2 L26,6 L20,10" stroke={n.color} strokeWidth="1.5" opacity="0.4" />
                </svg>
              )}
              <motion.div
                whileHover={{ y: -2, filter: "brightness(1.2)" }}
                className="rounded-xl px-4 py-3 text-center cursor-default relative"
                style={{
                  background: `linear-gradient(135deg, ${n.color}22, ${n.color}08)`,
                  border: `1px solid ${n.color}55`,
                  boxShadow: `0 0 20px ${n.color}15`,
                  minWidth: "110px",
                }}
              >
                {n.sub && (
                  <div
                    className="absolute inset-[-1px] rounded-xl pointer-events-none"
                    style={{
                      border: `2px solid ${n.color}40`,
                      animation: "pulse-ring 2s ease-out infinite",
                    }}
                  />
                )}
                <div className="text-lg sm:text-xl mb-1">{n.icon}</div>
                <div className="font-mono text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase" style={{ color: n.color }}>
                  {n.label}
                </div>
                {n.sub && (
                  <div className="font-mono text-[7px] sm:text-[9px] mt-0.5" style={{ color: `${n.color}cc` }}>
                    {n.sub}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Arrow down */}
        <svg width="2" height="24" viewBox="0 0 2 24" fill="none" className="shrink-0">
          <line x1="1" y1="0" x2="1" y2="18" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3" />
          <polygon points="0,18 1,24 2,18" fill="#a78bfa" opacity="0.3" />
        </svg>

        {/* Stage 2 — outputs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {outputs.map((n) => (
            <motion.div
              key={n.label}
              whileHover={{ y: -2, filter: "brightness(1.2)" }}
              className="rounded-xl px-3 py-2.5 text-center cursor-default"
              style={{
                background: `linear-gradient(135deg, ${n.color}18, ${n.color}05)`,
                border: `1px solid ${n.color}33`,
                boxShadow: `0 0 12px ${n.color}0a`,
                minWidth: "80px",
              }}
            >
              <div className="text-base sm:text-lg mb-0.5">{n.icon}</div>
              <div className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase" style={{ color: n.color }}>
                {n.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
        <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-tertiary)] tracking-wider flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          LIVE
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-tertiary)] tracking-wider">
          BUILT BY YASH
        </span>
      </div>
    </div>
  );
}
