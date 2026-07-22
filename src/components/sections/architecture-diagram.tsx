"use client";

import { motion } from "framer-motion";

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

      {/* Architecture canvas */}
      <div className="relative w-full" style={{ aspectRatio: "1100/500" }}>
        {/* Grid background */}
        <div
          className="absolute inset-0 rounded-b-xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Title */}
        <div className="absolute top-[4%] left-1/2 -translate-x-1/2 text-center z-10">
          <div className="font-mono text-[11px] sm:text-[13px] font-medium text-[#3b82f6] tracking-[6px] uppercase">
            AI ISA Pipeline
          </div>
        </div>

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 1100 500" fill="none">
          {/* Trigger → AI */}
          <path stroke="#10b981" strokeWidth="1.5" opacity="0.3" d="M170,260 C220,260 230,250 280,250" />
          <circle r="2.5" fill="#10b981" opacity="0.8">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M170,260 C220,260 230,250 280,250" />
          </circle>

          {/* AI → Sheets */}
          <path stroke="#8b5cf6" strokeWidth="1.5" opacity="0.3" d="M460,230 C530,230 550,120 600,120" />
          <circle r="2.5" fill="#a78bfa" opacity="0.8">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M460,230 C530,230 550,120 600,120" />
          </circle>

          {/* AI → Slack */}
          <path stroke="#fb923c" strokeWidth="1.5" opacity="0.3" d="M460,240 C530,240 550,200 600,200" />
          <circle r="2.5" fill="#fb923c" opacity="0.8">
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M460,240 C530,240 550,200 600,200" />
          </circle>

          {/* AI → Email */}
          <path stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" d="M460,255 C530,260 550,290 600,290" />
          <circle r="2.5" fill="#60a5fa" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" path="M460,255 C530,260 550,290 600,290" />
          </circle>

          {/* AI → Calendar */}
          <path stroke="#f472b6" strokeWidth="1.5" opacity="0.3" d="M460,265 C530,280 550,380 600,380" />
          <circle r="2.5" fill="#f472b6" opacity="0.8">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M460,265 C530,280 550,380 600,380" />
          </circle>

          {/* Email → Twilio */}
          <path stroke="#facc15" strokeWidth="1.5" opacity="0.3" d="M760,290 C810,290 830,260 870,255" />
          <circle r="2.5" fill="#facc15" opacity="0.8">
            <animateMotion dur="1.7s" repeatCount="indefinite" path="M760,290 C810,290 830,260 870,255" />
          </circle>
        </svg>

        {/* Nodes */}
        {/* Webhook Trigger */}
        <div className="absolute z-[5] w-[11%]" style={{ left: "4%", top: "42%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-3 sm:p-4 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
              border: "1px solid rgba(16,185,129,0.3)",
              boxShadow: "0 0 20px rgba(16,185,129,0.08)",
            }}
          >
            <div className="text-base sm:text-xl mb-1">⚡</div>
            <div className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#10b981]">
              Webhook
            </div>
          </motion.div>
        </div>

        {/* GPT-4o-mini */}
        <div className="absolute z-[5] w-[15%]" style={{ left: "26%", top: "36%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-4 sm:p-5 text-center cursor-default relative"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))",
              border: "1px solid rgba(139,92,246,0.4)",
              boxShadow: "0 0 30px rgba(139,92,246,0.12)",
            }}
          >
            <div
              className="absolute inset-[-2px] rounded-xl pointer-events-none"
              style={{
                border: "2px solid rgba(139,92,246,0.3)",
                animation: "pulse-ring 2s ease-out infinite",
              }}
            />
            <div className="text-lg sm:text-2xl mb-1">🧠</div>
            <div className="font-mono text-[9px] sm:text-[12px] font-semibold tracking-wider uppercase text-[#a78bfa]">
              GPT-4o-mini
            </div>
            <div className="font-mono text-[7px] sm:text-[9px] text-[#7c3aed] mt-0.5">qualify &middot; score &middot; route</div>
          </motion.div>
        </div>

        {/* Google Sheets */}
        <div className="absolute z-[5] w-[12%]" style={{ left: "55%", top: "12%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-3 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03))",
              border: "1px solid rgba(16,185,129,0.25)",
              boxShadow: "0 0 15px rgba(16,185,129,0.06)",
            }}
          >
            <div className="text-base sm:text-xl mb-1">📊</div>
            <div className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#34d399]">
              Sheets
            </div>
          </motion.div>
        </div>

        {/* Slack */}
        <div className="absolute z-[5] w-[12%]" style={{ left: "55%", top: "30%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-3 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,146,60,0.03))",
              border: "1px solid rgba(251,146,60,0.25)",
              boxShadow: "0 0 15px rgba(251,146,60,0.06)",
            }}
          >
            <div className="text-base sm:text-xl mb-1">💬</div>
            <div className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#fb923c]">
              Slack
            </div>
          </motion.div>
        </div>

        {/* Email */}
        <div className="absolute z-[5] w-[12%]" style={{ left: "55%", top: "48%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-3 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.03))",
              border: "1px solid rgba(59,130,246,0.25)",
              boxShadow: "0 0 15px rgba(59,130,246,0.06)",
            }}
          >
            <div className="text-base sm:text-xl mb-1">✉️</div>
            <div className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#60a5fa]">
              Email
            </div>
          </motion.div>
        </div>

        {/* Calendar */}
        <div className="absolute z-[5] w-[12%]" style={{ left: "55%", top: "66%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-3 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(244,114,182,0.12), rgba(244,114,182,0.03))",
              border: "1px solid rgba(244,114,182,0.25)",
              boxShadow: "0 0 15px rgba(244,114,182,0.06)",
            }}
          >
            <div className="text-base sm:text-xl mb-1">📅</div>
            <div className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#f472b6]">
              Calendar
            </div>
          </motion.div>
        </div>

        {/* Twilio SMS */}
        <div className="absolute z-[5] w-[12%]" style={{ left: "80%", top: "38%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-3 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(250,204,21,0.12), rgba(250,204,21,0.03))",
              border: "1px solid rgba(250,204,21,0.25)",
              boxShadow: "0 0 15px rgba(250,204,21,0.06)",
            }}
          >
            <div className="text-base sm:text-xl mb-1">📱</div>
            <div className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#facc15]">
              Twilio
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
