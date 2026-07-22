"use client";

import { motion } from "framer-motion";

type NodeDef = {
  x: number;
  y: number;
  major?: boolean;
  label?: string;
  color?: string;
};

const W = 2400;
const H = 800;

const nodes: NodeDef[] = [
  // Input pipeline (0-4)
  { x: 80,  y: 400, major: true, label: "WEBHOOK",    color: "#10b981" },
  { x: 160, y: 400, color: "#10b981" },
  { x: 240, y: 400, color: "#10b981" },
  { x: 320, y: 400, color: "#10b981" },
  { x: 400, y: 400, color: "#10b981" },
  // AI core (5-12)
  { x: 500, y: 400, major: true, label: "n8n",         color: "#e44" },
  { x: 580, y: 310, color: "#a78bfa" },
  { x: 580, y: 490, color: "#a78bfa" },
  { x: 660, y: 310, color: "#a78bfa" },
  { x: 660, y: 490, color: "#a78bfa" },
  { x: 740, y: 400, color: "#a78bfa" },
  { x: 860, y: 400, major: true, label: "GPT-4o-mini", color: "#a78bfa" },
  { x: 960, y: 400, color: "#a78bfa" },
  // Scoring (13-16)
  { x: 1060, y: 400, major: true, label: "SCORE",      color: "#a78bfa" },
  { x: 1140, y: 330, color: "#818cf8" },
  { x: 1140, y: 470, color: "#818cf8" },
  { x: 1220, y: 400, major: true, label: "ROUTE",      color: "#818cf8" },
  // Hub (17)
  { x: 1320, y: 400, color: "#6366f1" },
  // Sheets branch (18-27)
  { x: 1440, y: 90,  major: true, label: "SHEETS",     color: "#34d399" },
  { x: 1560, y: 90,  color: "#34d399" },
  { x: 1680, y: 90,  color: "#34d399" },
  { x: 1800, y: 90,  color: "#34d399" },
  { x: 1920, y: 90,  color: "#34d399" },
  { x: 2040, y: 90,  color: "#34d399" },
  { x: 2160, y: 90,  color: "#34d399" },
  { x: 2280, y: 90,  color: "#34d399" },
  { x: 2370, y: 90,  color: "#34d399" },
  // Slack branch (28-35)
  { x: 1440, y: 230, major: true, label: "SLACK",      color: "#fb923c" },
  { x: 1560, y: 230, color: "#fb923c" },
  { x: 1680, y: 230, color: "#fb923c" },
  { x: 1800, y: 230, color: "#fb923c" },
  { x: 1920, y: 230, color: "#fb923c" },
  { x: 2040, y: 230, color: "#fb923c" },
  { x: 2160, y: 230, color: "#fb923c" },
  { x: 2280, y: 230, color: "#fb923c" },
  // Email branch (36-44)
  { x: 1440, y: 370, major: true, label: "GMAIL",      color: "#60a5fa" },
  { x: 1560, y: 370, color: "#60a5fa" },
  { x: 1680, y: 370, color: "#60a5fa" },
  { x: 1800, y: 370, color: "#60a5fa" },
  { x: 1920, y: 370, color: "#60a5fa" },
  { x: 2040, y: 370, color: "#60a5fa" },
  { x: 2160, y: 370, color: "#60a5fa" },
  { x: 2280, y: 370, color: "#60a5fa" },
  { x: 2370, y: 370, color: "#60a5fa" },
  // Calendar branch (45-51)
  { x: 1440, y: 510, major: true, label: "CALENDAR",   color: "#f472b6" },
  { x: 1560, y: 510, color: "#f472b6" },
  { x: 1680, y: 510, color: "#f472b6" },
  { x: 1800, y: 510, color: "#f472b6" },
  { x: 1920, y: 510, color: "#f472b6" },
  { x: 2040, y: 510, color: "#f472b6" },
  { x: 2160, y: 510, color: "#f472b6" },
  // Twilio branch (52-57)
  { x: 1440, y: 650, major: true, label: "TWILIO",     color: "#facc15" },
  { x: 1560, y: 650, color: "#facc15" },
  { x: 1680, y: 650, color: "#facc15" },
  { x: 1800, y: 650, color: "#facc15" },
  { x: 1920, y: 650, color: "#facc15" },
  { x: 2040, y: 650, color: "#facc15" },
  // Error handling (58-62)
  { x: 1140, y: 600, color: "#ef4444" },
  { x: 1220, y: 680, color: "#ef4444" },
  { x: 1320, y: 680, color: "#ef4444" },
  { x: 1400, y: 680, color: "#ef4444" },
  { x: 1480, y: 720, major: true, label: "ERROR",      color: "#ef4444" },
  // Cache & Logger (63-66)
  { x: 500, y: 260, color: "#fbbf24" },
  { x: 580, y: 210, color: "#fbbf24" },
  { x: 500, y: 540, color: "#94a3b8" },
  { x: 580, y: 590, color: "#94a3b8" },
];

const conns: [number, number][] = [
  // Input pipeline
  [0,1],[1,2],[2,3],[3,4],
  // Into n8n
  [4,5],
  // AI core internal
  [5,6],[5,7],[6,8],[7,9],[6,10],[7,10],[10,11],[11,12],
  // Scoring
  [12,13],[13,14],[13,15],[14,16],[15,16],
  // Hub
  [16,17],
  // Fan out to branches
  [17,18],[17,28],[17,36],[17,45],[17,52],
  // Sheets chain
  [18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],
  // Slack chain
  [28,29],[29,30],[30,31],[31,32],[32,33],[33,34],[34,35],
  // Email chain
  [36,37],[37,38],[38,39],[39,40],[40,41],[41,42],[42,43],[43,44],
  // Calendar chain
  [45,46],[46,47],[47,48],[48,49],[49,50],[50,51],
  // Twilio chain
  [52,53],[53,54],[54,55],[55,56],[56,57],
  // Error paths
  [13,58],[58,59],[59,60],[60,61],[61,62],
  // Cache
  [5,63],[63,64],[64,5],
  // Logger
  [5,65],[65,66],[66,5],
];

function connColor(i: number): string {
  const from = conns[i][0];
  return nodes[from].color ?? "#4a5568";
}

function pathD(a: { x: number; y: number }, b: { x: number; y: number }): string {
  const mx = (a.x + b.x) / 2;
  if (Math.abs(a.y - b.y) < 10) return `M${a.x},${a.y} L${b.x},${b.y}`;
  return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
}

export default function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0a0a0f]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
        <span className="w-3 h-3 rounded-full bg-[rgba(255,95,86,0.8)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(255,189,46,0.8)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(39,201,63,0.8)]" />
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] ml-2">
          n8n workflow — {nodes.length} nodes
        </span>
      </div>

      <div className="relative w-full" style={{ aspectRatio: `${W}/${H}` }}>
        {/* Grid */}
        <div
          className="absolute inset-0 rounded-b-xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            </marker>
          </defs>

          {/* Connections — static paths, no animateMotion */}
          {conns.map(([a, b], i) => {
            const c = connColor(i);
            const d = pathD(nodes[a], nodes[b]);
            return (
              <path key={`c${i}`} d={d} stroke={c} strokeWidth="1" opacity="0.2" markerEnd="url(#arr)" />
            );
          })}

          {/* Animated dots — only on 6 key paths (input→n8n, n8n→GPT, route→branches) */}
          {[[0,1],[4,5],[11,12],[16,17],[17,18],[17,36]].map(([a,b], i) => {
            const c = nodes[a].color ?? "#4a5568";
            const d = pathD(nodes[a], nodes[b]);
            return (
              <circle key={`dot${i}`} r="3" fill={c} opacity="0.7">
                <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" path={d} />
              </circle>
            );
          })}

          {/* Minor nodes */}
          {nodes.filter((n) => !n.major).map((n, i) => (
            <circle key={`m${i}`} cx={n.x} cy={n.y} r="5" fill={n.color} opacity="0.25" />
          ))}

          {/* Major nodes */}
          {nodes.filter((n) => n.major).map((n, i) => (
            <g key={`mj${i}`}>
              <rect
                x={n.x - 36}
                y={n.y - 18}
                width={72}
                height={36}
                rx={8}
                fill={`${n.color}18`}
                stroke={n.color}
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x={n.x}
                y={n.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={n.color}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="600"
                letterSpacing="0.08em"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
