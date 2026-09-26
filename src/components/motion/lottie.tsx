import type { ReactNode } from "react";

/**
 * Custom gold line icons. This used to mount the dotLottie player, but its
 * WASM decoder loads from a public CDN, and wherever that CDN is blocked
 * every icon rendered blank. Inline SVG always paints, weighs nothing, and
 * matches the logo's gold-on-ink stroke language. The strokes draw on once
 * (`.icon-draw` in globals.css); the name → icon API is unchanged.
 */
const ICONS: Record<string, ReactNode> = {
  house: (
    <>
      <path d="M8 30 32 11l24 19" />
      <path d="M14 26v26h36V26" />
      <path d="M27 52V38h10v14" />
    </>
  ),
  tools: (
    <>
      <path d="M40 12a10 10 0 0 0-9 14L13 44a4.2 4.2 0 0 0 6 6l18-18a10 10 0 0 0 14-9l-6 6-6-2-2-6z" />
      <path d="M16 14l10 10M12 18l6-6" />
    </>
  ),
  laptop: (
    <>
      <rect x="13" y="14" width="38" height="26" rx="3" />
      <path d="M7 48h50l-4-8H11z" />
      <path d="M20 24h14M20 30h22" />
    </>
  ),
  "growth-chart": (
    <>
      <path d="M10 10v44h44" />
      <path d="M17 44l11-12 8 7 16-19" />
      <path d="M44 20h8v8" />
    </>
  ),
  "phone-ring": (
    <>
      <path d="M22 10h20a3 3 0 0 1 3 3v38a3 3 0 0 1-3 3H22a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" />
      <path d="M29 48h6" />
      <path d="M50 20a10 10 0 0 1 0 14M54 15a17 17 0 0 1 0 24" />
    </>
  ),
  rocket: (
    <>
      <path d="M32 8c9 7 12 17 10 30H22C20 25 23 15 32 8z" />
      <circle cx="32" cy="24" r="4" />
      <path d="M22 34l-7 9h8M42 34l7 9h-8M27 44l5 10 5-10" />
    </>
  ),
  success: (
    <>
      <circle cx="32" cy="32" r="22" />
      <path d="M22 33l7 7 14-15" />
    </>
  ),
  message: (
    <>
      <path d="M10 14h44v28H28l-10 9v-9h-8z" />
      <path d="M20 25h24M20 32h16" />
    </>
  ),
  email: (
    <>
      <rect x="9" y="15" width="46" height="34" rx="3" />
      <path d="M10 17l22 17 22-17" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M32 9a23 23 0 0 0-20 34l-3 12 12-3A23 23 0 1 0 32 9z" />
      <path d="M24 22c0 10 8 18 18 18l3-4-6-3-3 3c-3-1-7-5-8-8l3-3-3-6z" />
    </>
  ),
  moon: (
    <>
      <path d="M40 10a22 22 0 1 0 14 30A18 18 0 0 1 40 10z" />
      <path d="M50 12v6M47 15h6" />
    </>
  ),
};

export default function Lottie({
  name,
  className = "w-16 h-16",
}: {
  name: string;
  className?: string;
  loop?: boolean;
  speed?: number;
}) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="var(--gold)"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-draw ${className}`}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
