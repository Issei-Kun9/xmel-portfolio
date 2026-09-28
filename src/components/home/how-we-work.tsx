import Lottie from "@/components/motion/lottie";

const steps = [
  {
    icon: "phone-ring",
    title: "A 15-minute call",
    body: "Tell us what you sell and where your customers come from. We tell you exactly what we'd build and what it costs — no pitch deck.",
    when: "Day 1",
  },
  {
    icon: "rocket",
    title: "We build it, fast",
    body: "Websites go live in about a week. AI Infrastructure in 2–3 weeks. SEO fixes start in the first month.",
    when: "Week 1–3",
  },
  {
    icon: "success",
    title: "You see it before you pay in full",
    body: "Websites: pay the rest after you see the finished site. AI: a 14-day pilot on your real leads — if it doesn't beat what you do now, you owe nothing.",
    when: "Before full payment",
  },
];

/**
 * Three steps as a timeline: oversized serif numerals on a gold rail, so the
 * process reads at a glance and looks as considered as the dark sections.
 */
export default function HowWeWork() {
  return (
    <section id="how-it-works" className="paper scroll-mt-20 py-16 sm:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">How we work</p>
        <h2 className="mt-3 font-display text-[clamp(32px,4.8vw,56px)] font-medium leading-[1.04] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl">
          Simple, fast, and <span className="italic text-[var(--accent)]">low-risk from day one.</span>
        </h2>

        <ol className="relative mt-14 grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Gold rail behind the numerals (desktop) */}
          <span className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-[linear-gradient(90deg,transparent,var(--gold)_12%,var(--gold)_88%,transparent)] opacity-60 md:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.title} className="group relative">
              <div className="flex items-end gap-4">
                <span className="font-display text-[88px] leading-none font-medium tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--gold)] transition-colors duration-500 group-hover:text-[var(--gold)]">
                  0{i + 1}
                </span>
                <span className="relative z-10 mb-2 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--ink)] shadow-[0_16px_32px_-16px_rgba(15,15,18,0.6)] transition-transform duration-300 group-hover:-translate-y-1">
                  <Lottie name={s.icon} className="h-9 w-9" />
                </span>
              </div>
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{s.when}</p>
              <h3 className="mt-2 font-display text-[26px] leading-tight text-[var(--text-primary)]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-sm">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
