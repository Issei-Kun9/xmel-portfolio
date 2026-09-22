import { Inbox, MessageSquareText, CalendarCheck } from "lucide-react";
import type { MarketConfig } from "@/lib/market";

const SOURCES: Record<MarketConfig["market"], string[]> = {
  us: ["Zillow", "Realtor.com", "Facebook Lead Ads", "Google Ads", "Website forms", "Missed calls"],
  in: ["MagicBricks", "99acres", "Housing.com", "Facebook Lead Ads", "Website forms", "Missed calls"],
};

const TOOLS = ["Google Calendar", "Google Sheets", "WhatsApp Business", "SMS", "Email", "Your CRM"];

export default function HowItWorks({ cfg }: { cfg: MarketConfig }) {
  const steps = [
    {
      icon: Inbox,
      title: "A lead comes in",
      body: `From ${cfg.leadSources} — day or night, weekday or holiday.`,
    },
    {
      icon: MessageSquareText,
      title: "AI replies in under 60 seconds",
      body: `It messages the lead by ${cfg.replyChannel} (or calls them), answers questions and qualifies budget, timeline and location.`,
    },
    {
      icon: CalendarCheck,
      title: "The appointment is booked",
      body: "Serious leads get a slot in your calendar. You get a summary, so you only spend time on people ready to move.",
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[14px] font-semibold text-[var(--accent)]">How it works</p>
          <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
            From new lead to booked appointment — without you lifting a finger.
          </h2>
        </div>

        <ol className="mt-10 grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)] flex items-center justify-center">
                  <s.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-[18px] font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[var(--bg-secondary)] p-6">
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Lead sources it picks up</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOURCES[cfg.market].map((s) => (
                <li key={s} className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-[13px] text-[var(--text-secondary)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-[var(--bg-secondary)] p-6">
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Works with the tools you already use</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TOOLS.map((s) => (
                <li key={s} className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-[13px] text-[var(--text-secondary)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
