import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does AI lead response automation work?",
    a: "AI lead response automation uses GPT-4o-mini to instantly qualify incoming leads from web forms, phone calls, and WhatsApp messages. When a lead comes in, the AI scores their intent, sends a personalized response via SMS or voice call, and books appointments directly into your calendar — all within 50 seconds. The entire workflow runs on n8n with 67 interconnected nodes and 7 webhook triggers.",
  },
  {
    q: "What is an AI Inside Sales Agent (ISA)?",
    a: "An AI Inside Sales Agent is an autonomous system that replaces the manual work of a human inside sales agent. It answers inbound leads, qualifies them using AI reasoning (GPT-4o-mini), makes outbound calls via Twilio, sends follow-up SMS messages, and books appointments into Google Calendar. The AI ISA I built responds in under 50 seconds — 400x faster than the industry average of 47 hours.",
  },
  {
    q: "How much does AI automation cost for real estate agents?",
    a: "Pricing depends on lead volume, integrations, and system complexity — every engagement starts with a 14-Day Pilot so you see results before any commitment. Most clients recover the full cost from a single recovered deal.",
  },
  {
    q: "Can AI answer phone calls for my business?",
    a: "Yes. AI voice agents built on Vapi and Twilio can answer incoming calls 24/7, have natural conversations with callers, qualify their needs, and take action — like booking appointments or sending information via SMS. The AI sounds natural using ElevenLabs voice synthesis, handles interruptions, and escalates to a human agent when needed. This is ideal for real estate agents and home services contractors who miss calls during showings or job sites.",
  },
  {
    q: "How long does it take to set up AI automation?",
    a: "A typical AI lead response system takes 2–3 weeks from discovery call to production deployment. Week 1 is discovery and system design — mapping your lead flow, choosing AI models, and designing the workflow architecture. Week 2 is building the n8n workflows, voice agents, and integrations. Week 3 is testing with real lead scenarios, deploying to production, and setting up monitoring dashboards.",
  },
  {
    q: "What is n8n automation and why use it?",
    a: "n8n is an open-source workflow automation platform that connects apps and services — Google Sheets, Twilio, OpenAI, Slack — into complex automated workflows. Unlike Zapier, n8n runs on your own infrastructure, handles complex branching logic, and processes thousands of leads without per-task pricing. It's the backbone of the AI ISA system, powering 67 interconnected nodes that handle lead qualification, voice calling, SMS follow-up, and CRM sync.",
  },
  {
    q: "How can AI help real estate agents generate more leads?",
    a: "AI helps real estate agents in three critical ways: (1) Instant response — AI qualifies and responds to leads in under 50 seconds vs. the industry average of 47 hours. (2) 24/7 availability — AI answers calls, texts, and WhatsApp messages at 2 AM just as effectively as at 2 PM. (3) Automated follow-up — leads that don't convert immediately get nurtured with timed SMS and voice follow-ups, recovering deals that would otherwise go cold.",
  },
  {
    q: "Do I need coding knowledge to use AI automation?",
    a: "No. As your AI automation engineer, I handle all the technical work — from system design to deployment. You interact with the system through tools you already use: Google Sheets for lead data, Slack for notifications, and Google Calendar for appointments. The AI runs in the background 24/7. If you can check your email and calendar, you can use the AI automation system.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <div className="mb-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
                FAQ
              </span>
            </div>

            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6">
              Questions about AI automation.
            </h2>

            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md">
              Everything you need to know about AI lead response automation,
              voice AI agents, and n8n workflow systems. Can&apos;t find your
              question?{" "}
              <a href="#contact" className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity">
                Ask me directly.
              </a>
            </p>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border-b border-[var(--border-subtle)]"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="w-full flex items-center justify-between py-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-[var(--accent)]" />
                </summary>
                <p className="pb-5 text-[var(--text-secondary)] text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
