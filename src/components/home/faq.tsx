import { ChevronDown } from "lucide-react";
import type { MarketConfig } from "@/lib/market";

function faqsFor(cfg: MarketConfig) {
  const [starter, growth] = cfg.tiers;
  return [
    {
      q: "How much does it cost?",
      a: `Starter is ${starter.setup} one-time setup plus ${starter.monthly}/month. Growth, which adds AI voice calls and calendar booking, is ${growth.setup} setup plus ${growth.monthly}/month. Teams and multi-location businesses get a custom quote. Every build starts with a 14-day pilot on your real leads — if it doesn't outperform your current process, you owe nothing.`,
    },
    {
      q: "Will my leads know they're talking to an AI?",
      a: "The AI introduces itself as your assistant and writes in a friendly, natural way. It never pretends to be you. When a lead asks something it shouldn't answer — a negotiation, a complaint, anything unusual — it hands the conversation to you straight away.",
    },
    {
      q: "How long does setup take?",
      a: "Most systems are live in 2–3 weeks: a short call to map where your leads come from, about a week to build and connect your tools, then testing on real lead scenarios before it goes live.",
    },
    {
      q: `Which lead sources and tools does it work with?`,
      a: `Anything that can send a notification or an email: ${cfg.leadSources}, missed calls and more. Appointments go into Google Calendar, leads are logged to Google Sheets or your CRM, and you get alerts wherever you prefer.`,
    },
    {
      q: "Do I need to be technical?",
      a: "No. I build, connect and monitor everything. You keep using your phone, your calendar and your inbox — the AI works in the background.",
    },
    {
      q: "What happens after the pilot?",
      a: "If you're happy with the results, the system keeps running on the plan you choose and I keep monitoring and improving it. There's no long-term contract — you can cancel the monthly plan any time.",
    },
  ];
}

export default function HomeFaq({ cfg }: { cfg: MarketConfig }) {
  const faqs = faqsFor(cfg);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--bg-secondary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div>
          <p className="text-[14px] font-semibold text-[var(--accent)]">FAQ</p>
          <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
            Questions, answered.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Something else on your mind?{" "}
            <a href="#book" className="font-semibold text-[var(--accent)] underline underline-offset-4">
              Ask on a 15-minute call.
            </a>
          </p>
        </div>
        <div className="divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
          {faqs.map((f, i) => (
            <details key={f.q} className="group px-6" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-[16px] font-semibold text-[var(--text-primary)]">{f.q}</span>
                <ChevronDown className="w-5 h-5 shrink-0 text-[var(--text-tertiary)] transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-5 -mt-1 text-[15px] leading-relaxed text-[var(--text-secondary)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
