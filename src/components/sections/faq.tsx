"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    a: "AI automation pricing depends on the complexity of your lead flow and the number of integrations needed. Most real estate AI systems start from a one-time build fee plus a monthly hosting and API cost (typically $50–150/month for Twilio, OpenAI API, and n8n hosting). The ROI is immediate — agents typically recover 3–5x their investment in the first month through leads that would have otherwise been lost to slow response times.",
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

function FaqItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-[var(--border-subtle)]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 pr-4">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-[var(--accent)]" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--text-secondary)] text-sm leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                FAQ
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6"
            >
              Questions about AI automation.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md"
            >
              Everything you need to know about AI lead response automation,
              voice AI agents, and n8n workflow systems. Can&apos;t find your
              question?{" "}
              <a href="#contact" className="text-[var(--accent)] hover:underline">
                Ask me directly.
              </a>
            </motion.p>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
