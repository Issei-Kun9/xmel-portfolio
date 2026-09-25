/**
 * The XMEL emblem: two crossing strokes (ivory over gold) on a dark disc,
 * from the "golden section" concept. Self-contained and opaque, so it reads
 * the same in the header, the footer, a blog byline or a browser tab —
 * exact geometry mirrored in public/icon.svg and src/lib/og.tsx.
 */
export default function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="xmel-mark-band">
          <rect x="-100" y="-61.8" width="200" height="123.6" />
        </clipPath>
      </defs>
      <circle r="100" fill="#0F0F12" />
      <g transform="scale(.764)">
        <g clipPath="url(#xmel-mark-band)" strokeWidth={19.1} fill="none">
          <line x1={-47.4} y1={-99.6} x2={71} y2={99.6} stroke="#C9A86A" />
          <line x1={47.4} y1={-99.6} x2={-71} y2={99.6} stroke="#0F0F12" strokeWidth={33.7} />
          <line x1={47.4} y1={-99.6} x2={-71} y2={99.6} stroke="#F5F0E6" />
        </g>
      </g>
    </svg>
  );
}
