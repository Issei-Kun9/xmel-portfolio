import CountUp from "@/components/shared/count-up";

const stats = [
  { value: 67, label: "NODES IN FLAGSHIP SYSTEM", prefix: "" },
  { value: 50, suffix: "s", label: "LEAD RESPONSE TIME", prefix: "<" },
  { value: 24, label: "DESIGNED FOR UPTIME", suffix: "/7", prefix: "" },
  { value: 7, label: "WEBHOOK INTEGRATIONS", prefix: "" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--border-subtle)]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="py-10 lg:py-12 text-center lg:text-left px-4 lg:px-8 first:pl-0 last:pr-0"
            >
              <div className="text-3xl lg:text-4xl font-bold text-[var(--accent)] mb-2 tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
