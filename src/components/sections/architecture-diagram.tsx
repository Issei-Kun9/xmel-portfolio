"use client";

import { motion } from "framer-motion";

type Node = {
  id: string;
  label: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  w?: number;
};

const nodes: Node[] = [
  { id: "webhook", label: "WEBHOOK", icon: "⚡", color: "#10b981", x: 30, y: 220 },
  { id: "parser", label: "PARSER", icon: "🔍", color: "#10b981", x: 135, y: 220 },
  { id: "ai", label: "GPT-4o-mini", icon: "🧠", color: "#a78bfa", x: 260, y: 220, w: 120 },
  { id: "scoring", label: "SCORE", icon: "📊", color: "#a78bfa", x: 410, y: 220 },
  { id: "sheets", label: "SHEETS", icon: "📋", color: "#34d399", x: 540, y: 80 },
  { id: "slack", label: "SLACK", icon: "💬", color: "#fb923c", x: 540, y: 175 },
  { id: "email", label: "EMAIL", icon: "✉️", color: "#60a5fa", x: 540, y: 270 },
  { id: "calendar", label: "CALENDAR", icon: "📅", color: "#f472b6", x: 540, y: 365 },
  { id: "twilio", label: "TWILIO", icon: "📱", color: "#facc15", x: 690, y: 270 },
];

type Conn = {
  from: string;
  to: string;
  color: string;
  path: string;
};

const connections: Conn[] = [
  { from: "webhook", to: "parser", color: "#10b981", path: "M95,242 L135,242" },
  { from: "parser", to: "ai", color: "#10b981", path: "M195,242 L260,242" },
  { from: "ai", to: "scoring", color: "#a78bfa", path: "M380,242 L410,242" },
  { from: "scoring", to: "sheets", color: "#34d399", path: "M470,230 Q505,230 505,102 L540,102" },
  { from: "scoring", to: "slack", color: "#fb923c", path: "M470,236 Q505,236 505,197 L540,197" },
  { from: "scoring", to: "email", color: "#60a5fa", path: "M470,242 L540,292" },
  { from: "scoring", to: "calendar", color: "#f472b6", path: "M470,250 Q505,320 505,387 L540,387" },
  { from: "email", to: "twilio", color: "#facc15", path: "M610,292 L690,292" },
];

function NodeBox({ node }: { node: Node }) {
  const w = node.w ?? 95;
  return (
    <motion.div
      whileHover={{ y: -2, filter: "brightness(1.2)" }}
      className="absolute rounded-lg text-center cursor-default z-[2]"
      style={{
        left: `${(node.x / 800) * 100}%`,
        top: `${(node.y / 500) * 100}%`,
        width: `${(w / 800) * 100}%`,
        transform: "translate(-50%, -50%)",
        background: `linear-gradient(135deg, ${node.color}20, ${node.color}08)`,
        border: `1px solid ${node.color}44`,
        boxShadow: `0 0 16px ${node.color}10`,
      }}
    >
      <div className="py-2 sm:py-2.5 px-1">
        <div className="text-sm sm:text-base mb-0.5">{node.icon}</div>
        <div className="font-mono text-[7px] sm:text-[9px] font-semibold tracking-wider" style={{ color: node.color }}>
          {node.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0a0a0f]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
        <span className="w-3 h-3 rounded-full bg-[rgba(255,95,86,0.8)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(255,189,46,0.8)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(39,201,63,0.8)]" />
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] ml-2">
          n8n — 67 nodes
        </span>
      </div>

      <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
        {/* Grid */}
        <div
          className="absolute inset-0 rounded-b-xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 800 500" fill="none">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="none" stroke="#4a5568" strokeWidth="1" />
            </marker>
          </defs>
          {connections.map((c) => (
            <g key={c.from + c.to}>
              <path d={c.path} stroke={c.color} strokeWidth="1.2" opacity="0.3" markerEnd="url(#arrow)" />
              <circle r="2" fill={c.color} opacity="0.7">
                <animateMotion dur="2s" repeatCount="indefinite" path={c.path} />
              </circle>
            </g>
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((n) => (
          <NodeBox key={n.id} node={n} />
        ))}
      </div>
    </div>
  );
}
