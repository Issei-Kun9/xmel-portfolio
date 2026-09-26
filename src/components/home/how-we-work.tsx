import Lottie from "@/components/motion/lottie";

const steps = [
  {
    lottie: "phone-ring",
    title: "A 15-minute call",
    body: "Tell us what you sell and where your customers come from. We tell you exactly what we'd build and what it costs — no pitch deck.",
  },
  {
    lottie: "rocket",
    title: "We build it, fast",
    body: "Websites go live in about a week. AI lead response in 2–3 weeks. SEO fixes start in the first month.",
  },
  {
    lottie: "success",
    title: "You see it before you pay in full",
    body: "Websites: pay the rest after you see the finished site. AI: a 14-day pilot on your real leads — if it doesn't beat what you do now, you owe nothing.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-[14px] font-semibold text-[var(--accent)]">How we work</p>
        <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] max-w-2xl">
          Simple, fast, and low-risk from day one.
        </h2>
        <ol className="step-line relative mt-10 grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="group spotlight lift relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <span className="w-14 h-14 rounded-2xl bg-[var(--ink)] flex items-center justify-center">
                  <Lottie name={s.lottie} className="w-9 h-9" />
                </span>
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-[18px] font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
