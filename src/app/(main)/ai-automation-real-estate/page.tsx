import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import RelatedGuides from "@/components/site/related-guides";
import Lottie from "@/components/motion/lottie";
import Words from "@/components/motion/words";

const siteUrl = "https://xmelautomations.xyz/ai-automation-real-estate";

export const metadata: Metadata = pageMetadata({
  path: "/ai-automation-real-estate",
  title: "AI Inside Sales Agent for Real Estate Agents | XMEL",
  description:
    "An AI ISA that replies to Zillow, Realtor.com, MagicBricks and 99acres leads in under 60 seconds, qualifies buyers and books showings, 24/7.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}#webpage`,
      url: siteUrl,
      name: "AI Automation for Real Estate Agents",
      isPartOf: { "@id": "https://xmelautomations.xyz/#website" },
      about: { "@id": "https://xmelautomations.xyz/#organization" },
      mainEntity: { "@id": `${siteUrl}#service` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}#service`,
      name: "AI Automation for Real Estate Agents",
      serviceType: "AI Inside Sales Agent",
      url: siteUrl,
      description:
        "An AI inside sales agent for real estate — qualifies leads from MagicBricks, 99acres, Zillow, and Realtor.com in seconds, responds in under 50 seconds via Twilio voice and SMS, and books appointments into Google Calendar.",
      provider: {
        "@type": "Organization",
        "@id": "https://xmelautomations.xyz/#organization",
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
    },
  ],
};

const faqs = [
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
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiAutomationRealEstatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <div className="ink overflow-hidden">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-20">
          <div className="mb-10">
            <Breadcrumbs
              items={[{ name: "AI Automation for Real Estate" }]}
            />
          </div>

          {/* Header */}
          <div className="relative">
            <Lottie name="house" className="float-slow absolute right-0 -top-6 hidden md:block w-36 h-36 lg:w-44 lg:h-44 pointer-events-none" />
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
              SOLUTIONS — REAL ESTATE
            </span>
            <h1 className="font-display text-[clamp(36px,6vw,64px)] font-medium leading-[1.02] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              <Words text="AI automation for real estate agents" />
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              An AI inside sales agent that picks up every lead from your
              portals, WhatsApp, and website within seconds — qualifies the
              buyer, sends a personal response, and books the appointment while
              you&apos;re out showing homes.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/#book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white text-[15px] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(138,106,47,0.2)] transition-shadow duration-300"
              >
                Get a free lead-flow audit
                <span>→</span>
              </a>
              <Link
                href="/tools/roi-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] text-[var(--text-primary)] text-[15px] font-semibold rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
              >
                Calculate your ROI
              </Link>
            </div>
          </div>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-16 pb-24">

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
          <section className="mb-16 p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
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
              {faqs.map((f) => (
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

          {/* Pricing */}
          <section className="mb-16 rounded-2xl border border-[var(--accent-line)] bg-[var(--accent-dim)] p-6 lg:p-8">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">What it costs</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Starter from <strong className="text-[var(--text-primary)]">$997</strong> setup + $197/month in the US, or 
              <strong className="text-[var(--text-primary)]">₹24,999</strong> setup + ₹4,999/month in India — with a 14-day pilot
              on your real leads. If it doesn&apos;t outperform your current process, you owe nothing.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-semibold">
              <a href="/#pricing" className="text-[var(--accent)] underline underline-offset-4">US pricing</a>
              <a href="/in#pricing" className="text-[var(--accent)] underline underline-offset-4">India pricing</a>
              <Link href="/blog/ai-lead-response-cost" className="text-[var(--accent)] underline underline-offset-4">How pricing compares</Link>
            </div>
          </section>

          <RelatedGuides slugs={["zillow-lead-response-time", "whatsapp-auto-reply-99acres-magicbricks-leads", "ai-isa-real-estate", "real-estate-lead-follow-up-automation", "ai-lead-response-cost", "real-estate-lead-qualification"]} limit={6} title="Real estate guides" className="mb-16" />

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
              href="/#book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white text-[15px] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(138,106,47,0.2)] transition-shadow duration-300"
            >
              Start the conversation
              <span>→</span>
            </a>
            <p className="text-[var(--text-tertiary)] text-sm mt-6">
              Also exploring AI for field service businesses?{" "}
              <Link
                href="/ai-automation-home-services"
                className="text-[var(--accent)] underline hover:no-underline"
              >
                See AI automation for home services
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
