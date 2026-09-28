/** A slow gold ticker of outcomes between the hero and the page body. */
const ITEMS = [
  "Every lead answered in under 60 seconds",
  "Websites live in about a week",
  "First page of Google for the searches that sell",
  "AI working 24/7, weekends included",
  "No long-term contracts",
  "Serving the US and India",
];

export default function OutcomeTicker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="ink border-y border-[rgba(201,168,106,0.25)] py-4 overflow-hidden marquee-mask" aria-label="What you get">
      <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <li key={i} className="flex items-center gap-10 text-[15px] font-medium text-[rgba(245,240,230,0.82)]" aria-hidden={i >= ITEMS.length}>
            {t}
            <span className="h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}
