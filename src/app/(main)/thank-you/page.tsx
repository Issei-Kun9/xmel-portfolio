import type { Metadata } from "next";
import Lottie from "@/components/motion/lottie";
import Words from "@/components/motion/words";
import { whatsappHref, PHONE_DISPLAY } from "@/lib/market";

export const metadata: Metadata = {
  title: "Message Received | XMEL Automations",
  description: "Thank you — your message has been received. XMEL Automations will respond within 24 hours.",
  robots: {
    index: false,
    follow: true,
  },
};

const steps = [
  {
    title: "I read it myself",
    body: "No ticket queue. You'll get a personal reply within 24 hours, usually much sooner.",
  },
  {
    title: "A 15-minute call",
    body: "We look at where your leads come from today and how fast they get an answer. No slides, no hard sell.",
  },
  {
    title: "A written plan and a fixed price",
    body: "What we'd build, how long it takes, and what it costs. You decide from there.",
  },
];

const prepare = [
  "Where your leads come from (Zillow, Google, Facebook, IndiaMART, walk-ins…)",
  "Roughly how many you get each month",
  "Who answers them today, and how quickly",
  "Your website link, if you have one",
];

export default function ThankYouPage() {
  return (
    <main className="paper relative overflow-hidden px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-[760px] mx-auto">
        <div className="text-center">
          <Lottie name="success" loop={false} className="w-24 h-24 mx-auto mb-2" />
          <h1 className="font-display text-[clamp(32px,6vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)]">
            <Words text="Message received." />
          </h1>
          <p className="mt-4 text-[var(--text-secondary)] text-[17px] leading-relaxed max-w-[520px] mx-auto">
            Thanks for reaching out. Here&apos;s exactly what happens next.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
              <span className="font-mono text-[12px] text-[var(--accent)]">0{i + 1}</span>
              <h2 className="mt-2 text-[16px] font-semibold text-[var(--text-primary)]">{s.title}</h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-secondary)]">{s.body}</p>
            </li>
          ))}
        </ol>

        <section className="mt-6 rounded-2xl bg-[var(--bg-secondary)] p-6 sm:p-7" aria-labelledby="prepare">
          <h2 id="prepare" className="text-[16px] font-semibold text-[var(--text-primary)]">
            To make the call count, have a rough idea of:
          </h2>
          <ul className="mt-3 space-y-2">
            {prepare.map((p) => (
              <li key={p} className="flex gap-2.5 text-[15px] text-[var(--text-secondary)]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappHref("Hi Yashwardhan, I just sent a message through the XMEL site.")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            data-cta-location="thank-you"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[var(--whatsapp)] text-[#06300E] text-[15px] font-semibold hover:brightness-105"
          >
            Faster? Message on WhatsApp
          </a>
          <a
            href="/tools/roi-calculator"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-[var(--border-strong)] text-[15px] font-semibold text-[var(--text-primary)] hover:border-[var(--gold)]"
          >
            Try the ROI calculator
          </a>
        </div>
        <p className="mt-4 text-center text-[13px] text-[var(--text-tertiary)]">WhatsApp {PHONE_DISPLAY}</p>
      </div>
    </main>
  );
}
