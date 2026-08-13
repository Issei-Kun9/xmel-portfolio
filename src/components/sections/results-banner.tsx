import CountUp from "@/components/shared/count-up";

const results = [
  { value: 50, suffix: "+", label: "LEADS / DAY", description: "designed capacity per system" },
  { value: 50, suffix: "s", prefix: "<", label: "FIRST RESPONSE", description: "lead to first touch" },
  { value: 7, label: "WEBHOOK TRIGGERS", description: "in the flagship build" },
  { value: 34, suffix: "%", label: "CONVERSION LIFT", description: "from pilot data" },
];

export default function ResultsBanner() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            WHAT I&apos;VE BUILT
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4">
            Real systems, real numbers.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((r) => (
            <div
              key={r.label}
              className="group p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] text-center hover:border-[var(--accent)] transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl font-bold text-[var(--accent)] mb-2 tracking-tight">
                <CountUp target={r.value} suffix={r.suffix} prefix={r.prefix} duration={1600} />
              </div>
              <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-1">
                {r.label}
              </div>
              <div className="font-mono text-[13px] text-[var(--text-secondary)]">
                {r.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
