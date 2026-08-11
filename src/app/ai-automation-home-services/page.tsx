import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/breadcrumbs";

const siteUrl = "https://xmelautomations.xyz/ai-automation-home-services";

export const metadata: Metadata = {
  title: "AI Automation for Home Services | AI Receptionist for HVAC & Plumbing | XMEL",
  description:
    "AI automation for home services contractors — an AI receptionist that answers every call, qualifies the job, books the slot, and escalates emergencies. No more missed calls.",
  keywords: [
    "AI automation for home services",
    "AI receptionist HVAC",
    "AI phone answering plumbing",
    "missed call automation contractors",
    "AI appointment booking home services",
    "after hours answering service",
    "HVAC lead automation",
    "plumbing lead response automation",
    "emergency call escalation AI",
  ],
  openGraph: {
    title: "AI Automation for Home Services | AI Receptionist",
    description:
      "An AI receptionist that answers every call, qualifies the job, books the slot, and escalates emergencies — 24/7.",
    type: "website",
    url: siteUrl,
    siteName: "XMEL Automations",
    locale: "en_IN",
    images: [
      {
        url: "https://xmelautomations.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Automation for Home Services — XMEL Automations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Home Services | AI Receptionist",
    description:
      "An AI receptionist that answers every call, qualifies the job, books the slot, and escalates emergencies — 24/7.",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Automation for Home Services Contractors",
  serviceType: "AI Receptionist",
  url: siteUrl,
  description:
    "An AI voice receptionist for plumbing, HVAC, and electrical contractors — answers every call 24/7 via Vapi and ElevenLabs, qualifies the job type and urgency, books slots into Google Calendar, and escalates emergencies to the on-call technician via Twilio.",
  provider: {
    "@type": "Organization",
    name: "XMEL Automations",
    url: "https://xmelautomations.xyz",
  },
  areaServed: ["IN", "US"],
  audience: { "@type": "BusinessAudience", audienceType: "Home services contractors" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "Contact for pricing",
  },
};

export default function AiAutomationHomeServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="mb-10">
            <Breadcrumbs
              items={[{ name: "AI Automation for Home Services" }]}
            />
          </div>

          {/* Header */}
          <div className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
              SOLUTIONS — HOME SERVICES
            </span>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              AI automation for home services
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              An AI receptionist that answers every call while you&apos;re on a
              job site — qualifies the job type and urgency, books the slot into
              your calendar, and escalates real emergencies to your on-call
              technician. Missed calls become booked jobs.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
              >
                Get a free call-flow audit
                <span>→</span>
              </a>
              <Link
                href="/tools/roi-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono text-sm font-medium rounded border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
              >
                Calculate your ROI
              </Link>
            </div>
          </div>

          {/* What the system does */}
          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              WHAT THE SYSTEM DOES
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              A receptionist that never misses a call — plus the parts a human
              can&apos;t do
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "100% call answering",
                  body: "Every inbound call is answered by an AI voice agent built on Vapi with ElevenLabs voice synthesis — after hours, weekends, holidays, and while every tech is on a job site. No call goes to voicemail.",
                },
                {
                  title: "Job qualification on the call",
                  body: "The AI asks the caller what the problem is, where they are, and how urgent it is. GPT-4o-mini classifies the job type — repair, install, maintenance — and the urgency level in real time.",
                },
                {
                  title: "Automatic slot booking",
                  body: "Qualified jobs are booked directly into Google Calendar. The caller gets a confirmation SMS with the technician's arrival window, so the schedule fills itself without phone tag.",
                },
                {
                  title: "Emergency escalation",
                  body: "When the AI detects a true emergency — a burst pipe, no heat, an electrical hazard — it routes the call instantly to the on-call technician via Twilio, and notifies the team on Slack.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]"
                >
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              HOW IT WORKS
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              From ringing phone to booked job — automatically
            </h2>

            <ol className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Call lands on the AI receptionist",
                  body: "A caller dials your business number and the AI picks up on the first ring, in a natural voice. If a human answers first, the system never interferes — it only handles calls that would otherwise go unanswered.",
                },
                {
                  step: "02",
                  title: "The AI qualifies the job",
                  body: "It asks what the caller needs, confirms the address and time constraints, and classifies the job type and urgency using GPT-4o-mini reasoning over the live conversation.",
                },
                {
                  step: "03",
                  title: "Emergency or scheduled booking",
                  body: "Urgent jobs trigger an instant escalation to the on-call technician. Everything else is booked into Google Calendar with a confirmation SMS, and the job is logged in Google Sheets.",
                },
                {
                  step: "04",
                  title: "Your team sees everything in Slack",
                  body: "A Slack notification with the caller's details, job type, and booked slot lands in your team channel. You know what's booked without touching a phone log.",
                },
                {
                  step: "05",
                  title: "Follow-up happens automatically",
                  body: "No-shows and reschedules are handled by scheduled SMS reminders. The system stays on top of the schedule so your techs don't have to.",
                },
              ].map((s) => (
                <li key={s.step} className="flex gap-6">
                  <span className="font-mono text-[12px] text-[var(--accent)] pt-1">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Architecture note */}
          <section className="mb-16 p-6 lg:p-8 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-subtle)]">
            <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-4">
              SYSTEM ARCHITECTURE
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              The home services build shares the same n8n backbone as the real
              estate system, tuned for voice-first call handling. The stack:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "n8n",
                "Vapi",
                "ElevenLabs",
                "GPT-4o-mini",
                "Twilio",
                "Google Calendar",
                "Google Sheets",
                "Slack",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-block px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono text-[12px] text-[var(--text-tertiary)]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/blog/voice-ai-agent-vs-human-isa"
                className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)] hover:opacity-80 transition-opacity duration-200"
              >
                Voice AI vs human receptionist — the full comparison →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              FAQ
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              Common questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Does the AI sound robotic on the phone?",
                  a: "The voice agent uses ElevenLabs voice synthesis on Vapi, which produces natural, human-sounding speech. It handles interruptions, background noise, and rephrases on the fly rather than reading a script.",
                },
                {
                  q: "What happens when a caller needs a human?",
                  a: "The AI can transfer the call to a live agent at any point. By default it handles what a human receptionist would — answering, qualifying, and booking — and escalates true emergencies to the on-call technician automatically.",
                },
                {
                  q: "Which home service businesses does this work for?",
                  a: "Plumbing, HVAC, electrical, roofing, and any trades business that takes inbound calls for jobs. If your schedule can be booked over the phone, the AI can book it.",
                },
                {
                  q: "How does emergency detection work?",
                  a: "During the conversation, GPT-4o-mini classifies urgency from the caller's description — burst pipe, no heat, gas smell, electrical hazard. Urgent cases immediately trigger a Twilio call to the on-call tech and a Slack alert.",
                },
                {
                  q: "How long does deployment take?",
                  a: "Typically 2-3 weeks. We map your call flow and scheduling rules first, build the voice agent and n8n workflow, then test with real call scenarios before going live on your number.",
                },
              ].map((f) => (
                <div
                  key={f.q}
                  className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]"
                >
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-2">
                    {f.q}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related reading */}
          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              RELATED READING
            </span>
            <div className="mt-6 grid gap-4">
              {[
                {
                  href: "/blog/missed-call-automation-contractors",
                  title: "Missed Call Automation for Home Service Contractors",
                  desc: "How to turn the calls you miss on a job site into booked jobs — automatically.",
                },
                {
                  href: "/blog/ai-receptionist-hvac",
                  title: "AI Receptionist for HVAC & Plumbing Companies",
                  desc: "What an AI receptionist actually handles — answering, qualifying, booking, escalating.",
                },
                {
                  href: "/blog/home-service-lead-response-automation",
                  title: "Home Service Lead Response Automation",
                  desc: "The end-to-end lead flow for contractors — from first call to booked appointment.",
                },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group block p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
                >
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {r.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3">
              How many calls did you miss this week?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Every missed call is a job that went to whoever picked up. Tell us
              how your calls come in today and we&apos;ll show you what an AI
              receptionist would capture — no obligation.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
            >
              Start the conversation
              <span>→</span>
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
