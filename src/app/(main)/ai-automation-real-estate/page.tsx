import type { Metadata } from "next";
import { CalendarCheck, Gauge, Inbox, PhoneCall } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import AiServicePage from "@/components/kit/ai-service-page";

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

const icon = "h-6 w-6";

export default function AiAutomationRealEstatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AiServicePage
        crumb="AI Automation for Real Estate"
        eyebrow="AI for real estate"
        title="AI automation for real estate agents."
        italic="Every lead, answered first."
        lede="An AI inside sales agent that picks up every lead from your portals, WhatsApp and website within seconds, qualifies the buyer, sends a personal reply and books the showing while you're out with clients."
        auditLabel="Get a free lead-flow audit"
        proof={["First reply in under 60 seconds", "Zillow, Realtor.com, 99acres, MagicBricks", "14-day pilot on your real leads"]}
        flow={{
          replyIn: "42s",
          steps: [
            { kind: "lead", label: "New lead · Zillow", time: "2:14 AM", text: "Hi, is the 3-bed on Oak Street still available?" },
            { kind: "ai", label: "Your AI assistant", time: "2:14 AM", text: "Hi Sarah! Yes, it is. Are you hoping to move in the next 3 months, and are you pre-approved?" },
            { kind: "booked", label: "Showing booked", time: "Sat 11:00 AM", text: "Pre-approved, moving in 2 months. Added to your calendar." },
          ],
        }}
        variant="real-estate"
        features={{
          eyebrow: "What the system does",
          title: "The whole inside-sales job,",
          italic: "done in seconds.",
          items: [
            { icon: <Inbox className={icon} />, title: "Instant lead capture", body: "Every portal inquiry, WhatsApp message and web form lands in one place. MagicBricks, 99acres, Zillow, Realtor.com and your site forms all become the same clean lead record." },
            { icon: <Gauge className={icon} />, title: "AI qualification in seconds", body: "The AI reads each lead for budget, location, timeline and intent, and scores it 0–100 in under 3 seconds. Hot, warm and cold leads each get their own path." },
            { icon: <PhoneCall className={icon} />, title: "A reply in under a minute", body: "Hot leads can get an AI voice call that confirms the property, asks the qualifying questions and books a slot. Warm leads get a personal WhatsApp or text." },
            { icon: <CalendarCheck className={icon} />, title: "Booked, logged, and you're told", body: "Showings land in your Google Calendar, every conversation is logged to your sheet or CRM, and you get an alert with the summary. Nothing falls through the cracks." },
          ],
        }}
        steps={{
          title: "From portal lead to booked showing,",
          italic: "in one workflow.",
          items: [
            { title: "The lead arrives", body: "Listeners on every channel you get leads from turn each new enquiry into a standard lead record before anything else runs." },
            { title: "The AI scores it", body: "It pulls out budget and timeline signals, returns a score with a recommended next step, and drafts the reply." },
            { title: "Outreach matches the score", body: "High-intent leads get a call and a text. Mid-intent leads get a WhatsApp or SMS conversation. The rest enter a polite follow-up sequence." },
            { title: "The showing books itself", body: "When the buyer is ready, the AI checks your calendar, books the slot and sends a confirmation with the details." },
            { title: "You stay in the loop", body: "An alert and a log keep you informed without keeping you on your phone. You step in for showings and negotiations." },
          ],
        }}
        stack={{
          lede: "The real estate build is a 67-node workflow with 7 lead-source webhooks, running on established tools rather than a black box.",
          tools: ["n8n", "GPT-4o-mini", "Twilio", "Vapi", "ElevenLabs", "WhatsApp Business API", "Google Calendar", "Google Sheets", "Slack", "Supabase"],
          stats: [
            { n: "67", label: "workflow steps in the real estate build" },
            { n: "7", label: "lead sources wired in" },
            { n: "<60s", label: "from new lead to first reply" },
            { n: "24/7", label: "including nights, weekends and holidays" },
          ],
          guide: { href: "/blog/n8n-workflow-automation-guide", label: "Read how the workflow is built" },
        }}
        faqs={faqs}
        guides={["zillow-lead-response-time", "whatsapp-auto-reply-99acres-magicbricks-leads", "ai-isa-real-estate", "real-estate-lead-follow-up-automation", "ai-lead-response-cost", "real-estate-lead-qualification"]}
        guidesTitle="Real estate guides"
        cta={{
          title: "Stop losing leads",
          italic: "to slow replies.",
          body: "Tell us which portals you advertise on and how many leads you get each month. We'll map your lead flow and show you exactly what an AI assistant would change. No obligation.",
        }}
        crossLink={{ lead: "Run a trades business instead?", href: "/ai-automation-home-services", label: "See AI for home services" }}
      />
    </>
  );
}
