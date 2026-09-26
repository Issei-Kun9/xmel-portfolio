/** Big-number band: what we commit to, stated as numbers. Promises, not client stats. */
const NUMBERS = [
  { n: "<60s", label: "to answer every new lead, day or night" },
  { n: "~7 days", label: "from call to a live website" },
  { n: "24/7", label: "your AI works, weekends and holidays too" },
  { n: "0", label: "long-term contracts. Stay because it works" },
];

export default function NumbersBand() {
  return (
    <section className="ink py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {NUMBERS.map((x) => (
            <div key={x.n} className="border-l border-[rgba(201,168,106,0.35)] pl-5">
              <dt className="font-display text-[clamp(44px,6vw,76px)] font-medium leading-none tracking-[-0.03em] text-[var(--gold)]">{x.n}</dt>
              <dd className="mt-3 text-[15px] leading-snug text-[rgba(245,240,230,0.72)] max-w-[220px]">{x.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
