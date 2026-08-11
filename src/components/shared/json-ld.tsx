import type { SchemaObject, PersonSchema, LocalBusinessSchema } from "@power-seo/schema";
import { person, faqPage, webSite, service, localBusiness, schemaGraph, toJsonLdString } from "@power-seo/schema";

const siteUrl = "https://xmelautomations.xyz";

const US_CITIES = [
  "Miami",
  "Austin",
  "Phoenix",
  "Tampa",
  "Orlando",
  "Dallas",
  "Houston",
  "Atlanta",
  "Charlotte",
  "Denver",
];

const areaServedMetros = US_CITIES.map((name) => ({
  "@type": "City",
  name,
}));

const areaServed = [
  ...areaServedMetros,
  { "@type": "Country", name: "India" },
];

const graph = schemaGraph([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XMEL Automations",
    url: siteUrl,
    foundingDate: "2026",
    description:
      "AI automation agency building autonomous lead response systems, voice AI agents, and n8n workflow automations for real estate agents and home services contractors.",
    founder: {
      "@type": "Person",
      name: "Yashwardhan Chauhan",
      url: "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
      jobTitle: "AI Automation Engineer",
    },
    sameAs: [
      "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
      "https://www.instagram.com/yashwardhan.ai/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7905214791",
      contactType: "customer service",
      areaServed: ["US", "IN"],
    },
  } as unknown as SchemaObject,
  person({
    name: "Yashwardhan Chauhan",
    url: `${siteUrl}#about`,
    jobTitle: "AI Automation Engineer & Founder",
    worksFor: {
      "@type": "Organization",
      name: "XMEL Automations",
    },
    description:
      "Solo founder building AI automation systems — 67-node n8n workflows, GPT-4o-mini qualification, Twilio voice calling, and real-time lead response under 50 seconds.",
    sameAs: [
      "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
      "https://www.instagram.com/yashwardhan.ai/",
    ],
    knowsAbout: [
      "AI Automation",
      "n8n Workflow Automation",
      "Voice AI Agents",
      "Twilio",
      "GPT-4o-mini",
      "Lead Response Automation",
      "WhatsApp Business API",
      "Real Estate AI",
      "Home Services Automation",
    ],
  } as unknown as Omit<PersonSchema, "@type">),
  service({
    name: "AI Lead Response Automation",
    description:
      "Autonomous AI systems that respond to leads in under 50 seconds via voice, SMS, and WhatsApp — eliminating the 5-minute lead death problem for real estate agents and home services contractors.",
    provider: { "@type": "Organization", name: "XMEL Automations" },
    areaServed: ["US", "IN"],
    serviceType: "AI Automation",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "Contact for pricing",
    },
  }),
  service({
    name: "Voice AI Agent Development",
    description:
      "Custom AI phone agents built on Vapi, Twilio, and ElevenLabs that answer calls, qualify leads, and book appointments 24/7 without human intervention.",
    provider: { "@type": "Organization", name: "XMEL Automations" },
    areaServed: ["US", "IN"],
    serviceType: "Voice AI",
  }),
  service({
    name: "n8n Workflow Automation",
    description:
      "Complex multi-step automation workflows using n8n — CRM sync, lead qualification, appointment booking, Slack notifications, and Google Sheets integration.",
    provider: { "@type": "Organization", name: "XMEL Automations" },
    areaServed: ["US", "IN"],
    serviceType: "Workflow Automation",
  }),
  service({
    name: "WhatsApp Automation Bot",
    description:
      "AI-powered WhatsApp chatbots that qualify leads, answer questions, and sync data to your CRM — built on WhatsApp Business API with GPT-4o-mini reasoning.",
    provider: { "@type": "Organization", name: "XMEL Automations" },
    areaServed: ["US", "IN"],
    serviceType: "Chatbot Development",
  }),
  faqPage([
    {
      question: "How does AI lead response automation work?",
      answer: "AI lead response automation uses GPT-4o-mini to instantly qualify incoming leads from web forms, phone calls, and WhatsApp messages. When a lead comes in, the AI scores their intent, sends a personalized response via SMS or voice call, and books appointments directly into your calendar — all within 50 seconds. The entire workflow runs on n8n with 67 interconnected nodes and 7 webhook triggers.",
    },
    {
      question: "What is an AI Inside Sales Agent (ISA)?",
      answer: "An AI Inside Sales Agent is an autonomous system that replaces the manual work of a human inside sales agent. It answers inbound leads, qualifies them using AI reasoning (GPT-4o-mini), makes outbound calls via Twilio, sends follow-up SMS messages, and books appointments into Google Calendar. The AI ISA I built is a 67-node n8n system that responds in under 50 seconds — 400x faster than the industry average of 47 hours.",
    },
    {
      question: "How much does AI automation cost for real estate agents?",
      answer: "AI automation pricing depends on the complexity of your lead flow and the number of integrations needed. Most real estate AI systems start from a one-time build fee plus a monthly hosting and API cost (typically $50-150/month for Twilio, OpenAI API, and n8n hosting). The ROI is immediate — agents typically recover 3-5x their investment in the first month through leads that would have otherwise been lost to slow response times.",
    },
    {
      question: "Can AI answer phone calls for my business?",
      answer: "Yes. AI voice agents built on Vapi and Twilio can answer incoming calls 24/7, have natural conversations with callers, qualify their needs, and take action — like booking appointments or sending information via SMS. The AI sounds natural (using ElevenLabs voice synthesis), handles interruptions, and escalates to a human agent when needed. This is ideal for real estate agents and home services contractors who miss calls during showings or job sites.",
    },
    {
      question: "How long does it take to set up AI automation?",
      answer: "A typical AI lead response system takes 2-3 weeks from discovery call to production deployment. Week 1 is discovery and system design — mapping your lead flow, choosing AI models, and designing the workflow architecture. Week 2 is building the n8n workflows, voice agents, and integrations. Week 3 is testing with real lead scenarios, deploying to production, and setting up monitoring dashboards. Ongoing optimization continues after launch.",
    },
    {
      question: "What is n8n automation and why use it?",
      answer: "n8n is an open-source workflow automation platform that lets you connect different apps and services (like Google Sheets, Twilio, OpenAI, Slack) into complex automated workflows. Unlike Zapier, n8n runs on your own infrastructure, handles complex branching logic, and can process thousands of leads without per-task pricing. It's the backbone of the AI ISA system — powering 67 interconnected nodes that handle lead qualification, voice calling, SMS follow-up, and CRM sync.",
    },
    {
      question: "How can AI help real estate agents generate more leads?",
      answer: "AI helps real estate agents in three critical ways: (1) Instant response — AI qualifies and responds to leads in under 50 seconds vs. the industry average of 47 hours, (2) 24/7 availability — AI answers calls, texts, and WhatsApp messages at 2 AM just as effectively as at 2 PM, (3) Automated follow-up — leads that don't convert immediately get nurtured with timed SMS and voice follow-ups, recovering deals that would otherwise go cold.",
    },
    {
      question: "Do I need coding knowledge to use AI automation?",
      answer: "No. As your AI automation engineer, I handle all the technical work — from system design to deployment. You interact with the system through simple tools you already use: Google Sheets for lead data, Slack for notifications, and Google Calendar for appointments. The AI runs in the background 24/7. If you can check your email and calendar, you can use the AI automation system.",
    },
  ]),
  webSite({
    name: "XMEL Automations",
    url: siteUrl,
    description:
      "AI automation agency building autonomous lead response systems, voice AI agents, and n8n workflow automations.",
    publisher: {
      "@type": "Organization",
      name: "XMEL Automations",
    },
  }),
  localBusiness({
    name: "XMEL Automations",
    url: siteUrl,
    description:
      "AI automation agency specializing in lead response automation, voice AI agents, and n8n workflow automations for real estate and home services.",
    telephone: "+91-7905214791",
    areaServed,
    serviceType: [
      "AI Automation",
      "Voice AI Development",
      "Workflow Automation",
      "Chatbot Development",
    ],
    priceRange: "$$",
  } as unknown as Omit<LocalBusinessSchema, "@type">) as unknown as SchemaObject,
]);

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLdString(graph)}}
    />
  );
}
