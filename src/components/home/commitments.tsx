import { BadgeCheck, FileText, KeyRound, MessageCircle, ShieldCheck, Unlock } from "lucide-react";

/**
 * Plain commitments instead of testimonials we don't have yet: things a
 * business owner can hold us to, each one checkable. Keep every line true;
 * the terms here match the FAQ and the plan builder.
 */
const items = [
  {
    icon: MessageCircle,
    title: "You talk to the person who builds it",
    body: "No account managers or hand-offs. The call, the build and the support come from the same person.",
  },
  {
    icon: FileText,
    title: "A fixed price, in writing, before we start",
    body: "You see exactly what's included and what it costs. No hourly billing, no surprise invoices.",
  },
  {
    icon: BadgeCheck,
    title: "Proof before full payment",
    body: "Websites: pay the rest after you've seen the finished site. AI: a 14-day pilot on your real leads.",
  },
  {
    icon: KeyRound,
    title: "Your site, your domain, your data",
    body: "The website, the domain and every lead we capture belong to you, and stay with you if you leave.",
  },
  {
    icon: Unlock,
    title: "No lock-in",
    body: "No long-term contract. Cancel the monthly part any time, with nothing held back.",
  },
  {
    icon: ShieldCheck,
    title: "Your customers' data stays private",
    body: "Lead details are used only to reply to that lead and are logged to your own sheet or CRM. Never sold or shared.",
  },
];

export default function Commitments() {
  return (
    <section id="commitments" className="ink scroll-mt-20 py-16 sm:py-24" aria-labelledby="commitments-title">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">Why work with us</p>
        <h2 id="commitments-title" className="mt-3 font-display text-[clamp(32px,4.8vw,56px)] font-medium leading-[1.04] tracking-[-0.02em] max-w-3xl">
          Six things you can <span className="gold-italic">hold us to.</span>
        </h2>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)]">
          {items.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-[#141417] p-7">
              <Icon className="h-6 w-6 text-[var(--gold)]" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-4 text-[18px] font-semibold leading-snug">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
