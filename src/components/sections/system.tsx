"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const archNodes = [
  { id: "lead", label: "LEAD IN", tech: "Webhook / Form / Call", x: 0, y: 90 },
  { id: "gpt", label: "GPT-4o-mini", tech: "Qualification & Scoring", x: 160, y: 90 },
  { id: "twilio", label: "TWILIO", tech: "Voice / SMS Outreach", x: 320, y: 50 },
  { id: "vapi", label: "VAPI", tech: "AI Voice Agent", x: 320, y: 130 },
  { id: "sheets", label: "SHEETS", tech: "Lead Data & CRM", x: 480, y: 50 },
  { id: "calendar", label: "CALENDAR", tech: "Google Calendar", x: 480, y: 130 },
  { id: "slack", label: "SLACK", tech: "Agent Notification", x: 640, y: 90 },
];

const archEdges = [
  { from: "lead", to: "gpt" },
  { from: "gpt", to: "twilio" },
  { from: "gpt", to: "vapi" },
  { from: "twilio", to: "sheets" },
  { from: "vapi", to: "calendar" },
  { from: "sheets", to: "slack" },
  { from: "calendar", to: "slack" },
];

function ArchitectureDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <svg viewBox="0 0 740 180" className="w-full min-w-[600px] h-auto" fill="none">
        {/* Edges */}
        {archEdges.map((edge) => {
          const from = archNodes.find((n) => n.id === edge.from)!;
          const to = archNodes.find((n) => n.id === edge.to)!;
          const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x + 60}
              y1={from.y + 15}
              x2={to.x}
              y2={to.y + 15}
              stroke={isHighlighted ? "var(--accent)" : "rgba(255,255,255,0.12)"}
              strokeWidth={isHighlighted ? 2 : 1}
              className={isHighlighted ? "" : "animate-dash-flow"}
              strokeDasharray={isHighlighted ? "none" : "8 4"}
            />
          );
        })}

        {/* Nodes */}
        {archNodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={node.y}
                width={120}
                height={30}
                rx={4}
                fill={isHovered ? "var(--accent)" : "var(--bg-tertiary)"}
                stroke={isHovered ? "var(--accent)" : "rgba(255,255,255,0.1)"}
                strokeWidth={1}
                className="transition-colors duration-200"
              />
              <text
                x={node.x + 60}
                y={node.y + 19}
                textAnchor="middle"
                fill={isHovered ? "var(--bg-primary)" : "var(--text-primary)"}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="600"
                className="transition-colors duration-200 select-none"
              >
                {node.label}
              </text>
              {isHovered && (
                <text
                  x={node.x + 60}
                  y={node.y - 6}
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize="8"
                  fontFamily="monospace"
                  className="select-none"
                >
                  {node.tech}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const verticals = {
  realEstate: {
    title: "Real Estate",
    description:
      "Built for real estate agents drowning in Zillow and Realtor.com leads. The AI Inside Sales Agent qualifies inbound leads via GPT-4o-mini, makes a Twilio voice call within 47 seconds, sends a follow-up SMS, and books appointments directly into Google Calendar. Leads that score above 80 get immediate outreach. Everything syncs to Google Sheets and triggers a Slack notification — a fully autonomous lead response automation system.",
    stats: [
      { label: "Response time", value: "< 50s" },
      { label: "Qualification accuracy", value: "94%" },
      { label: "Appointments booked/week", value: "35+" },
    ],
  },
  homeServices: {
    title: "Home Services",
    description:
      "Same n8n workflow automation architecture, different vertical. For plumbing, HVAC, and electrical contractors who miss 60% of inbound calls. The AI voice agent answers every call using Vapi and ElevenLabs, qualifies the job type and urgency, estimates a pricing range, and books the slot into Google Calendar. Emergency calls get escalated to the on-call technician instantly via Twilio — turning missed calls into booked jobs.",
    stats: [
      { label: "Call answer rate", value: "100%" },
      { label: "Jobs booked/week", value: "28+" },
      { label: "Revenue recovered/month", value: "$42k" },
    ],
  },
};

export default function System() {
  const [activeVertical, setActiveVertical] = useState<"realEstate" | "homeServices">("realEstate");
  const [leads, setLeads] = useState(50);
  const [commission, setCommission] = useState(15000);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const v = verticals[activeVertical];
  const annualRecovered = Math.round(leads * (commission / 100) * 0.34 * 12);

  return (
    <section id="isa-system" ref={ref} className="relative py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            CASE STUDY / 01
          </span>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4">
            The AI Inside Sales Agent
          </h2>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 lg:p-8 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-subtle)]"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-4">
            SYSTEM ARCHITECTURE — 67 NODES / 7 WEBHOOKS
          </div>
          <ArchitectureDiagram />
        </motion.div>

        {/* Tabs */}
        <div className="mb-10">
          <div className="flex gap-0 border-b border-[var(--border-subtle)]">
            {(Object.keys(verticals) as Array<"realEstate" | "homeServices">).map((key) => (
              <button
                key={key}
                onClick={() => setActiveVertical(key)}
                className={`relative font-mono text-sm px-6 py-3 transition-colors duration-200 ${
                  activeVertical === key
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                }`}
              >
                {verticals[key].title}
                {activeVertical === key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent)]"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeVertical}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-8"
            >
              <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-2xl mb-8">
                {v.description}
              </p>

              <div className="grid grid-cols-3 gap-6">
                {v.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-mono text-xl lg:text-2xl font-bold text-[var(--accent)]">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 lg:p-8 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-subtle)]"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-6">
            ROI CALCULATOR
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-mono text-xs text-[var(--text-secondary)]">
                    LEADS / MONTH
                  </label>
                  <span className="font-mono text-xs text-[var(--accent)]">{leads}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  value={leads}
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-[var(--border-subtle)] cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-mono text-xs text-[var(--text-secondary)]">
                    AVG COMMISSION ($)
                  </label>
                  <span className="font-mono text-xs text-[var(--accent)]">${commission.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={commission}
                  onChange={(e) => setCommission(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-[var(--border-subtle)] cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]"
                />
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-2">
                COMMISSION RECOVERED / YEAR
              </div>
              <div className="font-mono text-4xl lg:text-5xl font-bold text-[var(--accent)]">
                ${annualRecovered.toLocaleString()}
              </div>
              <div className="font-mono text-[11px] text-[var(--text-tertiary)] mt-2">
                Based on 34% conversion rate improvement
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
