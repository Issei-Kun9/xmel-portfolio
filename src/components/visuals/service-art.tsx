/**
 * Custom illustrations for the four services, in the logo's language: gold
 * and ivory line work on ink, one small scene each. Strokes draw on
 * (.art-draw), the badge / bubble floats (.art-float). Decorative only.
 */
export type ServiceKind = "real-estate" | "home-services" | "website" | "seo" | "automation";

const G = "var(--gold)";
const I = "#F5F0E6";
const FILL = "rgba(201,168,106,0.08)";
const INK = "#0F0F12";

function RealEstate() {
  return (
    <>
      {/* ground */}
      <path d="M14 128H186" stroke={I} strokeOpacity=".25" />
      {/* house */}
      <path d="M28 70 74 30l46 40" stroke={G} strokeWidth="2.2" />
      <rect x="38" y="64" width="72" height="64" rx="2" stroke={G} fill={FILL} />
      <path d="M98 44V30h9v22" stroke={G} />
      <rect x="64" y="96" width="20" height="32" rx="2" stroke={I} strokeOpacity=".85" />
      <rect x="46" y="76" width="13" height="13" rx="1.5" stroke={I} strokeOpacity=".6" />
      <rect x="89" y="76" width="13" height="13" rx="1.5" stroke={I} strokeOpacity=".6" />
      {/* reply thread from house to bubble */}
      <path d="M112 58c8-6 12-10 16-16" stroke={G} strokeDasharray="3 4" strokeOpacity=".7" />
      <g className="art-float">
        <path d="M122 14h56a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8h-38l-12 10v-10h-6a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z" stroke={I} fill="rgba(245,240,230,0.06)" />
        <path d="M128 28h44M128 38h30" stroke={I} strokeOpacity=".7" />
      </g>
      {/* 42s badge */}
      <g className="art-float" style={{ animationDelay: "-1.5s" }}>
        <circle cx="160" cy="92" r="17" fill={G} stroke={G} />
        <text x="160" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-inter), sans-serif">42s</text>
      </g>
      <path d="M150 124l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" stroke={G} strokeOpacity=".8" />
    </>
  );
}

function HomeServices() {
  return (
    <>
      <path d="M14 132H186" stroke={I} strokeOpacity=".25" />
      {/* phone */}
      <rect x="26" y="20" width="54" height="100" rx="11" stroke={I} fill="rgba(245,240,230,0.05)" />
      <path d="M44 30h18M48 110h10" stroke={I} strokeOpacity=".6" />
      <path d="M40 58c0 12 10 22 22 22l4-5-7-4-4 4c-4-1-9-6-10-10l4-4-4-7z" stroke={G} fill={FILL} />
      {/* ring */}
      <path d="M88 52a16 16 0 0 1 0 26M96 44a28 28 0 0 1 0 42" stroke={G} strokeLinecap="round" />
      {/* wrench */}
      <g className="art-float" style={{ animationDelay: "-2s" }}>
        <path d="M168 22a13 13 0 0 0-17 16l-27 27a5 5 0 0 0 7 7l27-27a13 13 0 0 0 16-17l-8 8-8-2-2-8z" stroke={I} fill="rgba(245,240,230,0.05)" />
      </g>
      {/* booked slot */}
      <g className="art-float">
        <rect x="116" y="84" width="64" height="44" rx="7" stroke={G} fill={FILL} />
        <path d="M116 96h64M130 80v8M166 80v8" stroke={G} />
        <path d="M137 111l7 7 14-14" stroke={G} strokeWidth="2.6" />
      </g>
    </>
  );
}

function Website() {
  return (
    <>
      {/* browser */}
      <rect x="14" y="18" width="136" height="100" rx="9" stroke={I} fill="rgba(245,240,230,0.04)" />
      <path d="M14 36h136" stroke={I} strokeOpacity=".5" />
      <circle cx="26" cy="27" r="2.5" stroke={G} />
      <circle cx="35" cy="27" r="2.5" stroke={I} strokeOpacity=".5" />
      <circle cx="44" cy="27" r="2.5" stroke={I} strokeOpacity=".5" />
      <path d="M26 54h52M26 64h38" stroke={I} strokeWidth="2.4" strokeOpacity=".85" />
      <rect x="26" y="76" width="30" height="11" rx="3" fill={G} stroke={G} />
      <rect x="92" y="48" width="46" height="40" rx="5" stroke={G} fill={FILL} />
      <path d="M96 82l12-14 9 9 6-6 11 11" stroke={G} />
      <circle cx="126" cy="59" r="4" stroke={G} />
      <path d="M26 100h26M60 100h26M94 100h26" stroke={I} strokeOpacity=".35" strokeWidth="6" strokeLinecap="round" />
      {/* phone */}
      <g className="art-float">
        <rect x="140" y="54" width="44" height="80" rx="8" stroke={G} fill={INK} />
        <path d="M150 70h24M150 78h16" stroke={I} strokeOpacity=".8" />
        <rect x="150" y="88" width="18" height="7" rx="2" fill={G} stroke={G} />
        <rect x="150" y="102" width="24" height="20" rx="3" stroke={I} strokeOpacity=".5" />
      </g>
      {/* cursor */}
      <path d="M58 88l0 20 5-5 4 9 4-2-4-9 7 0z" stroke={I} fill={INK} />
    </>
  );
}

function Seo() {
  return (
    <>
      {/* search bar */}
      <rect x="14" y="16" width="120" height="18" rx="9" stroke={I} strokeOpacity=".6" />
      <circle cx="26" cy="25" r="4" stroke={I} strokeOpacity=".6" />
      <path d="M36 25h52" stroke={I} strokeOpacity=".45" />
      {/* results: #1 highlighted */}
      <rect x="14" y="44" width="120" height="26" rx="6" stroke={G} fill={FILL} />
      <path d="M24 53h60M24 62h40" stroke={G} />
      <rect x="104" y="50" width="22" height="13" rx="6.5" fill={G} stroke={G} />
      <text x="115" y="60" textAnchor="middle" fontSize="9" fontWeight="700" fill={INK} fontFamily="var(--font-inter), sans-serif">#1</text>
      <path d="M24 82h52M24 90h34M24 106h48M24 114h30" stroke={I} strokeOpacity=".35" />
      {/* magnifier */}
      <g className="art-float">
        <circle cx="152" cy="68" r="22" stroke={I} fill="rgba(245,240,230,0.05)" />
        <path d="M168 84l18 18" stroke={I} strokeWidth="5" strokeLinecap="round" />
        <path d="M140 74l8-8 6 5 10-12" stroke={G} strokeWidth="2.2" />
      </g>
      {/* growth */}
      <path d="M96 132l22-12 14 6 26-18" stroke={G} strokeWidth="2.2" />
      <path d="M150 106h9v9" stroke={G} strokeWidth="2.2" />
    </>
  );
}

function Automation() {
  return (
    <>
      {/* lead in */}
      <rect x="12" y="54" width="46" height="40" rx="8" stroke={I} fill="rgba(245,240,230,0.05)" />
      <path d="M22 66h26M22 76h18" stroke={I} strokeOpacity=".7" />
      <path d="M58 74h20" stroke={G} strokeWidth="2" />
      <path d="M74 70l5 4-5 4" stroke={G} strokeWidth="2" />
      {/* AI step */}
      <g className="art-float">
        <rect x="80" y="44" width="48" height="60" rx="12" fill={G} stroke={G} />
        <path d="M104 58l3.5 8 8 3.5-8 3.5-3.5 8-3.5-8-8-3.5 8-3.5z" stroke={INK} strokeWidth="2" fill={INK} />
        <path d="M92 94h24" stroke={INK} strokeOpacity=".5" />
      </g>
      {/* branches out */}
      <path d="M128 64c14 0 14-26 30-26M128 84c14 0 14 26 30 26" stroke={G} strokeWidth="2" />
      <rect x="158" y="24" width="30" height="28" rx="6" stroke={G} fill={FILL} />
      <path d="M166 38l5 5 9-9" stroke={G} strokeWidth="2.2" />
      <rect x="158" y="96" width="30" height="28" rx="6" stroke={I} fill="rgba(245,240,230,0.05)" />
      <path d="M165 106h16M165 114h10" stroke={I} strokeOpacity=".7" />
      <path d="M40 124l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" stroke={G} strokeOpacity=".7" />
    </>
  );
}

const ART = { "real-estate": RealEstate, "home-services": HomeServices, website: Website, seo: Seo, automation: Automation };

export default function ServiceArt({ kind, className = "" }: { kind: ServiceKind; className?: string }) {
  const Scene = ART[kind];
  return (
    <svg viewBox="0 0 200 150" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`art-draw ${className}`} aria-hidden="true">
      <Scene />
    </svg>
  );
}
