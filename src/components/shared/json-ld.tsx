import type { SchemaObject, PersonSchema } from "@power-seo/schema";
import { person, webSite, service, schemaGraph, toJsonLdString } from "@power-seo/schema";

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
    "@id": `${siteUrl}/#organization`,
    name: "XMEL Automations",
    url: siteUrl,
    foundingDate: "2026",
    description:
      "AI automation agency building autonomous lead response systems, voice AI agents, and n8n workflow automations for real estate agents and home services contractors.",
    founder: { "@id": `${siteUrl}/#founder` },
    sameAs: [
      "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
      "https://www.instagram.com/yashwardhan.ai/",
    ],
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo-512.png`,
    },
    email: "yashwardhan@xmelautomations.xyz",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 7905214791",
      contactType: "customer service",
      areaServed: ["US", "IN"],
    },
    telephone: "+91 7905214791",
    serviceType: [
      "AI Automation",
      "Voice AI Development",
      "Workflow Automation",
      "Chatbot Development",
    ],
    areaServed,
  } as unknown as SchemaObject,
  person({
    "@id": `${siteUrl}/#founder`,
    name: "Yashwardhan Chauhan",
    url: `${siteUrl}/#about`,
    jobTitle: "AI Automation Engineer & Founder",
    worksFor: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
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
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
    areaServed: ["US", "IN"],
    serviceType: "AI Automation",
  }),
  service({
    name: "Voice AI Agent Development",
    description:
      "Custom AI phone agents built on Vapi, Twilio, and ElevenLabs that answer calls, qualify leads, and book appointments 24/7 without human intervention.",
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
    areaServed: ["US", "IN"],
    serviceType: "Voice AI",
  }),
  service({
    name: "n8n Workflow Automation",
    description:
      "Complex multi-step automation workflows using n8n — CRM sync, lead qualification, appointment booking, Slack notifications, and Google Sheets integration.",
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
    areaServed: ["US", "IN"],
    serviceType: "Workflow Automation",
  }),
  service({
    name: "WhatsApp Automation Bot",
    description:
      "AI-powered WhatsApp chatbots that qualify leads, answer questions, and sync data to your CRM — built on WhatsApp Business API with GPT-4o-mini reasoning.",
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
    areaServed: ["US", "IN"],
    serviceType: "Chatbot Development",
  }),
  service({
    name: "AI ISA System for PropertyPulse Realty",
    description:
      "Fully autonomous AI inside sales agent for a Mumbai brokerage — a 67-node n8n workflow handling inbound leads from MagicBricks and 99acres with GPT-4o-mini qualification, Twilio voice calling, appointment booking, and Sheets sync. Lead response under 50 seconds.",
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "City", name: "Mumbai" } as unknown as string[],
    serviceType: "AI Inside Sales Agent",
  }),
  service({
    name: "Voice AI Receptionist for HomeServe India",
    description:
      "AI voice receptionist for a Bengaluru plumbing and HVAC company — every call answered via Vapi and Twilio, every job qualified, every slot booked into Google Calendar automatically. 43% more bookings in pilot.",
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "City", name: "Bengaluru" } as unknown as string[],
    serviceType: "Voice AI",
  }),
  webSite({
    "@id": `${siteUrl}/#website`,
    name: "XMEL Automations",
    url: siteUrl,
    description:
      "AI automation agency building autonomous lead response systems, voice AI agents, and n8n workflow automations.",
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
    },
  }),
]);

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLdString(graph)}}
    />
  );
}
