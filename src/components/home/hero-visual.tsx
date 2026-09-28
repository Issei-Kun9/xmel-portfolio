import GoldX3D from "@/components/visuals/gold-x-3d";

/** Result cards that float around the emblem: what a customer actually gets. */
const CHIPS = [
  { k: "42s", t: "New lead replied", s: "2:14 AM, automatically", pos: "left-0 top-[14%] -rotate-[5deg]", delay: "0s" },
  { k: "#1", t: "Top of Google", s: "for the searches that sell", pos: "right-0 top-[4%] rotate-[4deg]", delay: "-2s" },
  { k: "✓", t: "Call booked", s: "Sat · 11:00 AM", pos: "left-[4%] bottom-[12%] rotate-[3deg]", delay: "-4s" },
  { k: "7d", t: "Website live", s: "in about a week", pos: "right-[2%] bottom-[20%] -rotate-[3deg]", delay: "-1s" },
];

/**
 * The hero centrepiece: the 3D gold emblem with result cards floating
 * around it. On phones the cards sit in a 2x2 grid under a smaller emblem
 * so nothing overlaps the copy.
 */
export default function HeroVisual() {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-[300px] sm:max-w-none">
        <GoldX3D />
      </div>

      {/* Desktop: floating around the emblem */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {CHIPS.map((c) => (
          <div key={c.t} className={`absolute ${c.pos}`}>
            <div className="float-slow" style={{ animationDelay: c.delay }}>
              <Chip {...c} />
            </div>
          </div>
        ))}
      </div>

      {/* Phones and tablets: a tidy grid under the emblem */}
      <div className="mt-2 grid grid-cols-2 gap-2.5 lg:hidden" aria-hidden="true">
        {CHIPS.map((c) => (
          <Chip key={c.t} {...c} compact />
        ))}
      </div>
    </div>
  );
}

function Chip({ k, t, s, compact = false }: { k: string; t: string; s: string; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-[rgba(201,168,106,0.35)] bg-[rgba(245,240,230,0.06)] backdrop-blur-md shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)] ${compact ? "px-3 py-2.5" : "px-4 py-3"}`}>
      <span className={`grid shrink-0 place-items-center rounded-full bg-[var(--gold)] font-extrabold text-[var(--ink)] ${compact ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-[13px]"}`}>{k}</span>
      <span className="leading-tight">
        <span className={`block font-semibold text-[var(--ivory)] ${compact ? "text-[13px]" : "text-[15px]"}`}>{t}</span>
        <span className={`block text-[rgba(245,240,230,0.55)] ${compact ? "text-[11px]" : "text-[12px]"}`}>{s}</span>
      </span>
    </div>
  );
}
