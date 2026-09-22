import { PhoneOff, Database, Clock } from "lucide-react";

// Chart geometry. The plot sits inside padding so no label is clipped by
// the SVG edge, and every marker is placed on the curve it labels.
const CHART = { w: 400, h: 270, left: 28, right: 20, top: 34, bottom: 34 };
const PLOT_W = CHART.w - CHART.left - CHART.right;
const PLOT_H = CHART.h - CHART.top - CHART.bottom;

const decayPoints = [
  { at: 0, label: "0 min", val: 100 },
  { at: 0.25, label: "5 min", val: 50 },
  { at: 0.55, label: "30 min", val: 10 },
  { at: 0.85, label: "60 min", val: 2 },
].map((p) => ({
  ...p,
  x: CHART.left + p.at * PLOT_W,
  y: CHART.top + (1 - p.val / 100) * PLOT_H,
}));

// Smooth curve through the markers (Catmull-Rom → cubic Bézier), then a
// flat tail to the right edge of the plot.
function decayPath() {
  const pts = [
    ...decayPoints,
    { x: CHART.left + PLOT_W, y: CHART.top + 0.99 * PLOT_H },
  ];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = Math.min(p1.y + (p2.y - p0.y) / 6, CHART.top + PLOT_H);
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = Math.min(p2.y - (p3.y - p1.y) / 6, CHART.top + PLOT_H);
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function DecayChart() {
  const path = decayPath();
  const baseline = CHART.top + PLOT_H;
  const right = CHART.left + PLOT_W;

  return (
    <svg
      viewBox={`0 0 ${CHART.w} ${CHART.h}`}
      className="w-full h-auto"
      fill="none"
      role="img"
      aria-label="Lead value drops from 100% at 0 minutes to 50% at 5 minutes, 10% at 30 minutes and 2% at 60 minutes."
    >
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={CHART.left} y1={CHART.top + f * PLOT_H} x2={right} y2={CHART.top + f * PLOT_H} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {decayPoints.slice(1).map((p) => (
        <line key={p.label} x1={p.x} y1={CHART.top} x2={p.x} y2={baseline} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Area fill */}
      <path
        d={`${path} L ${right} ${baseline} L ${CHART.left} ${baseline} Z`}
        fill="url(#decay-gradient)"
      />

      {/* Decay curve */}
      <path d={path} stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />

      <defs>
        <linearGradient id="decay-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Axis title */}
      <text x={CHART.left} y="12" fill="var(--text-tertiary)" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
        LEAD VALUE
      </text>

      {/* Time markers */}
      {decayPoints.map((pt, i) => (
        <g key={pt.label}>
          <circle cx={pt.x} cy={pt.y} r="4" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="2" />
          <text
            x={i === 0 ? pt.x + 10 : pt.x}
            y={i === 0 ? pt.y + 4 : pt.y - 12}
            textAnchor={i === 0 ? "start" : "middle"}
            fill="var(--accent)"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="600"
          >
            {pt.val}%
          </text>
          <text x={pt.x} y={CHART.h - 10} textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" fontFamily="monospace">
            {pt.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const painPoints = [
  {
    icon: PhoneOff,
    title: "Missed calls, lost deals",
    desc: "85% of leads never get a callback. By hour one, your competitor already closed them.",
  },
  {
    icon: Database,
    title: "No CRM sync",
    desc: "Manual data entry means leads fall through the cracks. No follow-up, no pipeline visibility.",
  },
  {
    icon: Clock,
    title: "Slow follow-up kills conversion",
    desc: "Every minute of delay reduces your close rate by 40%. Speed-to-lead is everything.",
  },
];

export default function Problem() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="mb-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
                The Problem
              </span>
            </div>

            <h2
              className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6"
            >
              Your leads are dying in 5 minutes.
            </h2>

            <p
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-lg mb-12"
            >
              The average real estate agent takes 47 hours to respond to a lead. 
              In that time, 78% go with whoever answered first. Every missed call 
              is a commission check walking out the door.
            </p>

            <DecayChart />
          </div>

          <div className="space-y-6 lg:pt-12">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] border-l-2 border-l-[var(--warning)]"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <point.icon className="w-5 h-5 text-[var(--warning)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-medium text-[var(--text-primary)] mb-1">
                      {point.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
