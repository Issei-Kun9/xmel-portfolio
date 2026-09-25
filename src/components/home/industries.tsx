import { ArrowRight, Building2, Wrench, Globe, Search } from "lucide-react";

const services = [
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
  {
    icon: Globe,
    label: "Website development",
    title: "A website built around your business, live in about a week",
    body: "Mobile-first, fast, written for what you actually do — not a template you have to wrestle into shape.",
    href: "/website-development",
  },
  {
    icon: Search,
    label: "SEO",
    title: "Get found on Google for the searches that bring customers",
    body: "Technical fixes, local presence and content built around real search queries, reported on every month.",
    href: "/seo",
  },
];

export default function Industries() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-[14px] font-semibold text-[var(--accent)]">What we do</p>
        <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] max-w-2xl">
          AI automation, websites and SEO — everything under one roof.
        </h2>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 shadow-[var(--shadow-card)] hover:border-[var(--accent-line)] transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--accent)]">
                <s.icon className="w-4 h-4" aria-hidden="true" />
                {s.label}
              </span>
              <h3 className="mt-3 text-[20px] font-semibold leading-snug text-[var(--text-primary)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{s.body}</p>
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
