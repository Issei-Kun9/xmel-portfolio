import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/breadcrumbs";

const siteUrl = "https://xmelautomations.xyz/ai-automation-real-estate";

export const metadata: Metadata = {
  title: "AI Automation for Real Estate Agents | AI Inside Sales Agent | XMEL",
  description:
    "AI automation for real estate agents — an AI inside sales agent that qualifies portal leads in seconds, responds in under 50 seconds, books appointments, and follows up automatically.",
  keywords: [
    "AI automation for real estate",
    "AI inside sales agent real estate",
    "real estate lead response automation",
    "AI lead qualification real estate",
    "real estate AI ISA",
    "MagicBricks lead automation",
    "99acres lead automation",
    "AI appointment booking real estate",
    "real estate automation India",
    "AI inside sales agent Miami",
    "AI lead response Austin",
    "AI automation for real estate agents Phoenix",
  ],
  openGraph: {
    title: "AI Automation for Real Estate | AI Inside Sales Agent",
    description:
      "An AI ISA that qualifies portal leads in seconds, responds in under 50 seconds, and books appointments while you show homes.",
    type: "website",
    url: siteUrl,
    siteName: "XMEL Automations",
    locale: "en_IN",
    images: [
      {
        url: "https://xmelautomations.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Automation for Real Estate Agents — XMEL Automations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Real Estate | AI Inside Sales Agent",
    description:
      "An AI ISA that qualifies portal leads in seconds, responds in under 50 seconds, and books appointments automatically.",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Automation for Real Estate Agents",
  serviceType: "AI Inside Sales Agent",
  url: siteUrl,
  description:
    "An AI inside sales agent for real estate — qualifies leads from MagicBricks, 99acres, Zillow, and Realtor.com in seconds, responds in under 50 seconds via Twilio voice and SMS, and books appointments into Google Calendar.",
  provider: {
    "@type": "Organization",
    name: "XMEL Automations",
    url: "https://xmelautomations.xyz",
  },
  areaServed: ["IN", "US"],
  audience: { "@type": "BusinessAudience", audienceType: "Real estate agents and brokerages" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "Contact for pricing",
  },
};

export default function AiAutomationRealEstatePage() {
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
              items={[{ name: "AI Automation for Real Estate" }]}
            />
          </div>

          {/* Header */}
          <div className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
              SOLUTIONS — REAL ESTATE
            </span>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              AI automation for real estate agents
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              An AI inside sales agent that picks up every lead from your
              portals, WhatsApp, and website within seconds — qualifies the
              buyer, sends a personal response, and books the appointment while
              you&apos;re out showing homes.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
              >
                Get a free lead-flow audit
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

          {/* What the AI ISA does */}
          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              WHAT THE SYSTEM DOES
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              How AI automation for real estate agents does the full inside sales job
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Instant lead capture",
                  body: "Every portal inquiry, WhatsApp message, and web form lands in one n8n webhook trigger — MagicBricks, 99acres, Zillow, Realtor.com, and your site forms all normalize into the same lead format.",
                },
                {
                  title: "AI qualification in seconds",
                  body: "GPT-4o-mini reads the lead — budget, location, timeline, and intent — and scores it 0-100 in under 3 seconds. Hot, warm, and cold leads are routed to different outreach paths automatically.",
                },
                {
                  title: "Response under 50 seconds",
                  body: "Hot leads get a Twilio voice call from an AI agent that introduces itself, confirms the property, asks qualifying questions, and books a slot in Google Calendar. Warm leads get a personalized WhatsApp or SMS.",
                },
                {
                  title: "Booking + CRM sync",
                  body: "Appointments land directly in Google Calendar. Every interaction is logged to Google Sheets, a Slack notification fires to the agent, and nothing falls through the cracks.",
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
              From portal lead to booked appointment in one workflow
            </h2>

            <ol className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Lead enters the webhook layer",
                  body: "Seven webhook triggers listen on every channel you generate leads from. Each one normalizes incoming data into a standard lead record before anything else runs.",
                },
                {
                  step: "02",
                  title: "GPT-4o-mini scores the lead",
                  body: "The qualification layer extracts structured data from the message, assesses budget and timeline signals, and returns a lead score with a recommended action and a draft response.",
                },
                {
                  step: "03",
                  title: "Outreach routes by score",
                  body: "High-intent leads trigger a live AI voice call with follow-up SMS. Mid-intent leads get a WhatsApp or SMS conversation. Low-intent leads enter an automated nurture sequence.",
                },
                {
                  step: "04",
                  title: "Appointment books itself",
                  body: "When the buyer is ready, the AI checks Google Calendar availability and books the slot. A confirmation SMS with the details goes out automatically.",
                },
                {
                  step: "05",
                  title: "The agent stays in the loop",
                  body: "A Slack notification and a Sheets log keep you aware without keeping you attached. You only step in for the showings and negotiations.",
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
              SYSTEM ARCHITECTURE — 67 NODES / 7 WEBHOOKS
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              The real estate build is a 67-node n8n workflow. The stack:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "n8n",
                "GPT-4o-mini",
                "Twilio",
                "Vapi",
                "ElevenLabs",
                "WhatsApp Business API",
                "Google Calendar",
                "Google Sheets",
                "Slack",
                "Supabase",
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
                href="/blog/n8n-workflow-automation-guide"
                className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)] hover:opacity-80 transition-opacity duration-200"
              >
                Read the n8n workflow build guide →
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
                  q: "How fast does the AI respond to a new lead?",
                  a: "The end-to-end response is designed to stay under 50 seconds from lead entry to first touch — a live voice call for hot leads or a personalized WhatsApp/SMS for warm leads. The qualification step itself runs in under 3 seconds.",
                },
                {
                  q: "Which real estate lead sources are supported?",
                  a: "Anything that can call a webhook — MagicBricks, 99acres, Zillow, Realtor.com, website forms, WhatsApp Business messages, incoming calls via Twilio, manual CSV imports, and scheduled re-engagement tasks.",
                },
                {
                  q: "Does the AI replace my sales team?",
                  a: "It replaces the manual grunt work — answering, qualifying, and booking. Human agents stay in the loop for showings, negotiations, and relationship building. The AI handles first contact and follow-up so your team only talks to serious buyers.",
                },
                {
                  q: "How is this different from a chatbot on my website?",
                  a: "A website chatbot only handles visitors already on your page. This system works across portals, WhatsApp, and phone calls — and it takes action: it calls leads, books appointments, and syncs to your CRM automatically.",
                },
                {
                  q: "How long does deployment take?",
                  a: "Typically 2-3 weeks from a discovery call to production. Week one is mapping your lead flow and designing the workflow, week two is building the n8n workflows and voice agents, and week three is testing with real scenarios and deploying.",
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
                  href: "/blog/ai-lead-response-real-estate",
                  title: "How AI Lead Response Automation Works for Real Estate Agents",
                  desc: "The architecture of a real-world AI lead response system — capture, qualify, call, book.",
                },
                {
                  href: "/blog/voice-ai-agent-vs-human-isa",
                  title: "Voice AI Agent vs Human Inside Sales Agent",
                  desc: "Response speed, qualification accuracy, availability, and cost — head to head.",
                },
                {
                  href: "/blog/n8n-workflow-automation-guide",
                  title: "n8n Workflow Automation: 67-Node Lead Qualification System",
                  desc: "The full build breakdown — webhook layer, AI qualification, outreach, and monitoring.",
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
              Ready to stop losing leads to slow response times?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Tell us which portals you advertise on and how many leads you get
              each month. We&apos;ll map your current lead flow and show you
              exactly what an AI ISA would change — no obligation.
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
