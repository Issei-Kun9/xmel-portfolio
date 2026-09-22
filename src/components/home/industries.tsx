import { ArrowRight, Building2, Wrench } from "lucide-react";

const industries = [
  {
    icon: Building2,
    label: "Real estate",
    title: "An AI inside sales agent for agents and brokerages",
    body: "Qualifies portal and ad leads in seconds, follows up until they reply, and books showings and site visits.",
    href: "/ai-automation-real-estate",
  },
  {
    icon: Wrench,
    label: "Home services",
    title: "An AI receptionist for HVAC, plumbing and electrical",
    body: "Answers every call and message, captures the job details and books the slot — including after hours.",
    href: "/ai-automation-home-services",
  },
];

export default function Industries() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-[14px] font-semibold text-[var(--accent)]">Who it&apos;s for</p>
        <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] max-w-2xl">
          Built for businesses where the fastest reply wins the job.
        </h2>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {industries.map((ind) => (
            <a
              key={ind.href}
              href={ind.href}
              className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 shadow-[var(--shadow-card)] hover:border-[var(--accent-line)] transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--accent)]">
                <ind.icon className="w-4 h-4" aria-hidden="true" />
                {ind.label}
              </span>
              <h3 className="mt-3 text-[20px] font-semibold leading-snug text-[var(--text-primary)]">{ind.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{ind.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                See how it works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
