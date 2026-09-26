import Tilt from "@/components/motion/tilt";

const DEPTH = 14;

/** One slice of the emblem's strokes; stacked in Z they read as a solid, extruded X. */
function Slice({ id, front, z, shade }: { id: string; front: boolean; z: number; shade: number }) {
  const gold = front ? "url(#gx-gold)" : `rgb(${Math.round(120 * shade)},${Math.round(92 * shade)},${Math.round(44 * shade)})`;
  const ivory = front ? "url(#gx-ivory)" : `rgb(${Math.round(150 * shade)},${Math.round(140 * shade)},${Math.round(120 * shade)})`;
  return (
    <svg
      viewBox="-100 -100 200 200"
      className="absolute inset-0 w-full h-full"
      style={{ transform: `translateZ(${z}px)` }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id}>
          <rect x="-100" y="-61.8" width="200" height="123.6" />
        </clipPath>
        {front && (
          <>
            <linearGradient id="gx-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F1DDB0" />
              <stop offset=".45" stopColor="#C9A86A" />
              <stop offset="1" stopColor="#8A6A2F" />
            </linearGradient>
            <linearGradient id="gx-ivory" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFDF7" />
              <stop offset="1" stopColor="#D9CFBD" />
            </linearGradient>
          </>
        )}
      </defs>
      <g transform="scale(.764)" clipPath={`url(#${id})`} strokeWidth={19.1} fill="none">
        <line x1={-47.4} y1={-99.6} x2={71} y2={99.6} stroke={gold} />
        {front && <line x1={47.4} y1={-99.6} x2={-71} y2={99.6} stroke="#0F0F12" strokeWidth={33.7} />}
        <line x1={47.4} y1={-99.6} x2={-71} y2={99.6} stroke={ivory} />
      </g>
    </svg>
  );
}

/**
 * The hero centrepiece: the XMEL emblem as a slowly turning, extruded gold
 * object that also tilts toward the cursor. Pure CSS 3D — no WebGL, no
 * library — so it paints instantly on any phone.
 */
export default function GoldX({ className = "" }: { className?: string }) {
  return (
    <Tilt max={14} className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(201,168,106,0.35),transparent)] blur-2xl" aria-hidden="true" />
        <div className="gx-orbit absolute inset-[4%] rounded-full border border-[rgba(201,168,106,0.28)]" aria-hidden="true" />
        <div className="gx-orbit gx-orbit-2 absolute inset-[14%] rounded-full border border-dashed border-[rgba(201,168,106,0.18)]" aria-hidden="true" />
        <div className="gx-spin absolute inset-[10%] [transform-style:preserve-3d]">
          {Array.from({ length: DEPTH }, (_, i) => (
            <Slice key={i} id={`gx-clip-${i}`} front={i === DEPTH - 1} z={i * 1.6 - DEPTH * 0.8} shade={0.45 + (0.4 * i) / DEPTH} />
          ))}
        </div>
      </div>
    </Tilt>
  );
}
