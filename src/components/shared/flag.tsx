import type { Market } from "@/lib/market";

/**
 * Small SVG flags for the US / India switches. Emoji flags render
 * inconsistently (Windows shows letters, not flags) and read as emoji-as-icon.
 */
export default function Flag({ market, className = "h-3 w-[18px]" }: { market: Market; className?: string }) {
  if (market === "in") {
    return (
      <svg viewBox="0 0 18 12" className={`inline-block shrink-0 rounded-[2px] ${className}`} aria-hidden="true">
        <rect width="18" height="4" fill="#FF9933" />
        <rect y="4" width="18" height="4" fill="#FFFFFF" />
        <rect y="8" width="18" height="4" fill="#138808" />
        <circle cx="9" cy="6" r="1.5" fill="none" stroke="#000080" strokeWidth=".5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 19 10" className={`inline-block shrink-0 rounded-[2px] ${className}`} aria-hidden="true">
      <rect width="19" height="10" fill="#B22234" />
      {[1, 3, 5, 7, 9].map((y) => (
        <rect key={y} y={(y * 10) / 13} width="19" height={10 / 13} fill="#FFFFFF" />
      ))}
      <rect width="7.6" height={(10 / 13) * 7} fill="#3C3B6E" />
    </svg>
  );
}
