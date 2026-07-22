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
          architecture.html
        </span>
      </div>

      {/* Architecture canvas */}
      <div className="relative w-full" style={{ aspectRatio: "1100/700" }}>
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
        <div className="absolute top-[3%] left-1/2 -translate-x-1/2 text-center z-10">
          <div className="font-mono text-[11px] sm:text-[14px] font-medium text-[#3b82f6] tracking-[6px] uppercase">
            AI ISA Pipeline
          </div>
          <div className="font-mono text-[8px] sm:text-[11px] text-[#4a5568] mt-1">
            autonomous lead qualification &amp; engagement system
          </div>
        </div>

        {/* Tech details — corners */}
        <div className="absolute top-[3%] left-[2%] font-mono text-[7px] sm:text-[9px] text-[#2d3748] z-2">
          <div><span className="inline-block w-[5px] h-[5px] rounded-full bg-[#10b981] mr-1 animate-pulse" />SYSTEM ACTIVE</div>
          <div className="mt-1">NODE.JS runtime</div>
          <div>port :5680</div>
        </div>
        <div className="absolute top-[3%] right-[2%] font-mono text-[7px] sm:text-[9px] text-[#2d3748] z-2 text-right">
          <div>gpt-4o-mini // openrouter</div>
          <div className="mt-1">server-side scoring</div>
          <div>session memory // 20 msg window</div>
        </div>
        <div className="absolute bottom-[8%] left-[2%] font-mono text-[7px] sm:text-[9px] text-[#2d3748] z-2">
          <div>google oauth 2.0</div>
          <div>sheets api v4 // gmail api // calendar api v3</div>
        </div>
        <div className="absolute bottom-[8%] right-[2%] font-mono text-[7px] sm:text-[9px] text-[#2d3748] z-2 text-right">
          <div>twilio sms // slack bot api</div>
          <div>real-time webhook pipeline</div>
        </div>

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 1100 700" fill="none">
          {/* Trigger → AI */}
          <path stroke="#10b981" strokeWidth="1.5" opacity="0.4" d="M180,320 C230,320 230,310 280,310" />
          <circle r="3" fill="#10b981" opacity="0.9">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M180,320 C230,320 230,310 280,310" />
          </circle>

          {/* AI → Sheets */}
          <path stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" d="M460,290 C520,290 540,130 600,130" />
          <circle r="3" fill="#a78bfa" opacity="0.9">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M460,290 C520,290 540,130 600,130" />
          </circle>

          {/* AI → Slack */}
          <path stroke="#fb923c" strokeWidth="1.5" opacity="0.4" d="M460,300 C530,300 550,240 600,240" />
          <circle r="3" fill="#fb923c" opacity="0.9">
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M460,300 C530,300 550,240 600,240" />
          </circle>

          {/* AI → Email */}
          <path stroke="#3b82f6" strokeWidth="1.5" opacity="0.4" d="M460,310 C530,310 550,370 600,370" />
          <circle r="3" fill="#60a5fa" opacity="0.9">
            <animateMotion dur="2s" repeatCount="indefinite" path="M460,310 C530,310 550,370 600,370" />
          </circle>

          {/* AI → Calendar */}
          <path stroke="#f472b6" strokeWidth="1.5" opacity="0.4" d="M460,320 C530,330 550,490 600,490" />
          <circle r="3" fill="#f472b6" opacity="0.9">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M460,320 C530,330 550,490 600,490" />
          </circle>

          {/* Email → Twilio */}
          <path stroke="#facc15" strokeWidth="1.5" opacity="0.4" d="M750,370 C800,370 820,320 870,310" />
          <circle r="3" fill="#facc15" opacity="0.9">
            <animateMotion dur="1.7s" repeatCount="indefinite" path="M750,370 C800,370 820,320 870,310" />
          </circle>
        </svg>

        {/* Nodes */}
        {/* Webhook Trigger */}
        <div className="absolute z-[5] w-[12%] sm:w-[13%]" style={{ left: "3.6%", top: "41%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-4 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
              border: "1px solid rgba(16,185,129,0.3)",
              boxShadow: "0 0 30px rgba(16,185,129,0.1)",
            }}
          >
            <div className="text-lg sm:text-2xl mb-1">⚡</div>
            <div className="font-mono text-[8px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#10b981]">
              Webhook
            </div>
            <div className="font-mono text-[6px] sm:text-[9px] text-[#718096]">POST /isa-chat</div>
          </motion.div>
        </div>

        {/* GPT-4o-mini */}
        <div className="absolute z-[5] w-[16%] sm:w-[16%]" style={{ left: "25.4%", top: "37%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-3 sm:p-5 text-center cursor-default relative"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))",
              border: "1px solid rgba(139,92,246,0.4)",
              boxShadow: "0 0 40px rgba(139,92,246,0.15)",
            }}
          >
            {/* Pulse ring */}
            <div
              className="absolute inset-[-2px] rounded-xl pointer-events-none"
              style={{
                border: "2px solid rgba(139,92,246,0.3)",
                animation: "pulse-ring 2s ease-out infinite",
              }}
            />
            <div className="text-xl sm:text-2xl mb-1">🧠</div>
            <div className="font-mono text-[10px] sm:text-[13px] font-semibold tracking-wider uppercase text-[#a78bfa]">
              GPT-4o-mini
            </div>
            <div className="font-mono text-[7px] sm:text-[10px] text-[#7c3aed]">Lead Qualification AI</div>
            <div className="font-mono text-[6px] sm:text-[8px] text-[#6d28d9] mt-1">score // route // schedule</div>
          </motion.div>
        </div>

        {/* Google Sheets */}
        <div className="absolute z-[5] w-[13%] sm:w-[14%]" style={{ left: "54.5%", top: "8.5%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-4 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03))",
              border: "1px solid rgba(16,185,129,0.25)",
              boxShadow: "0 0 20px rgba(16,185,129,0.08)",
            }}
          >
            <div className="text-lg sm:text-2xl mb-1">📊</div>
            <div className="font-mono text-[8px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#34d399]">
              Google Sheets
            </div>
            <div className="font-mono text-[6px] sm:text-[9px] text-[#718096]">Lead Database</div>
          </motion.div>
        </div>

        {/* Slack */}
        <div className="absolute z-[5] w-[13%] sm:w-[14%]" style={{ left: "54.5%", top: "27%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-4 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,146,60,0.03))",
              border: "1px solid rgba(251,146,60,0.25)",
              boxShadow: "0 0 20px rgba(251,146,60,0.08)",
            }}
          >
            <div className="text-lg sm:text-2xl mb-1">💬</div>
            <div className="font-mono text-[8px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#fb923c]">
              Slack
            </div>
            <div className="font-mono text-[6px] sm:text-[9px] text-[#718096]">Live Lead Alerts</div>
          </motion.div>
        </div>

        {/* Email */}
        <div className="absolute z-[5] w-[13%] sm:w-[14%]" style={{ left: "54.5%", top: "45.7%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-4 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.03))",
              border: "1px solid rgba(59,130,246,0.25)",
              boxShadow: "0 0 20px rgba(59,130,246,0.08)",
            }}
          >
            <div className="text-lg sm:text-2xl mb-1">✉️</div>
            <div className="font-mono text-[8px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#60a5fa]">
              Email
            </div>
            <div className="font-mono text-[6px] sm:text-[9px] text-[#718096]">Listings + Invites</div>
          </motion.div>
        </div>

        {/* Calendar */}
        <div className="absolute z-[5] w-[13%] sm:w-[14%]" style={{ left: "54.5%", top: "64.3%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-4 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(244,114,182,0.12), rgba(244,114,182,0.03))",
              border: "1px solid rgba(244,114,182,0.25)",
              boxShadow: "0 0 20px rgba(244,114,182,0.08)",
            }}
          >
            <div className="text-lg sm:text-2xl mb-1">📅</div>
            <div className="font-mono text-[8px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#f472b6]">
              Calendar
            </div>
            <div className="font-mono text-[6px] sm:text-[9px] text-[#718096]">Auto Scheduling</div>
          </motion.div>
        </div>

        {/* Twilio SMS */}
        <div className="absolute z-[5] w-[13%] sm:w-[14%]" style={{ left: "79%", top: "35.7%" }}>
          <motion.div
            whileHover={{ y: -2, filter: "brightness(1.2)" }}
            className="rounded-xl p-2 sm:p-4 text-center cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(250,204,21,0.12), rgba(250,204,21,0.03))",
              border: "1px solid rgba(250,204,21,0.25)",
              boxShadow: "0 0 20px rgba(250,204,21,0.08)",
            }}
          >
            <div className="text-lg sm:text-2xl mb-1">📱</div>
            <div className="font-mono text-[8px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#facc15]">
              Twilio SMS
            </div>
            <div className="font-mono text-[6px] sm:text-[9px] text-[#718096]">Instant Notifications</div>
          </motion.div>
        </div>

        {/* Flow labels */}
        <div className="absolute z-[6] font-mono text-[7px] sm:text-[8px] tracking-wider uppercase px-1 sm:px-1.5 py-0.5 rounded text-[#10b981] bg-[rgba(16,185,129,0.1)]" style={{ left: "17.7%", top: "42%" }}>
          trigger
        </div>
        <div className="absolute z-[6] font-mono text-[7px] sm:text-[8px] tracking-wider uppercase px-1 sm:px-1.5 py-0.5 rounded text-[#a78bfa] bg-[rgba(139,92,246,0.1)]" style={{ left: "44.5%", top: "32.8%" }}>
          qualify + score
        </div>

        {/* Bottom info bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[6%] flex items-center justify-between px-[2%] z-10 rounded-b-xl"
          style={{
            background: "rgba(15,15,25,0.8)",
            borderTop: "1px solid rgba(59,130,246,0.1)",
          }}
        >
          <span className="font-mono text-[7px] sm:text-[9px] text-[#4a5568] tracking-wider flex items-center">
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-[#10b981] mr-1 animate-pulse" />
            ALL SYSTEMS OPERATIONAL
          </span>
          <span className="font-mono text-[7px] sm:text-[9px] text-[#4a5568] tracking-wider hidden sm:inline">
            LATENCY: &lt;200MS // UPTIME: 99.9%
          </span>
          <span className="font-mono text-[7px] sm:text-[9px] text-[#4a5568] tracking-wider">
            BUILT BY YASH
          </span>
        </div>
      </div>

    </div>
  );
}
