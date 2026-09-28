import type { Metadata } from "next";
import { CalendarCheck, PhoneIncoming, Siren, Stethoscope } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import AiServicePage from "@/components/kit/ai-service-page";

const siteUrl = "https://xmelautomations.xyz/ai-automation-home-services";

export const metadata: Metadata = pageMetadata({
  path: "/ai-automation-home-services",
  title: "AI Receptionist for HVAC, Plumbing & Home Services | XMEL",
  description:
    "An AI receptionist that answers every call and missed call, qualifies the job, books the slot and escalates emergencies to you, 24/7.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}#webpage`,
      url: siteUrl,
      name: "AI Automation for Home Services Contractors",
      isPartOf: { "@id": "https://xmelautomations.xyz/#website" },
      about: { "@id": "https://xmelautomations.xyz/#organization" },
      mainEntity: { "@id": `${siteUrl}#service` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}#service`,
      name: "AI Automation for Home Services Contractors",
      serviceType: "AI Receptionist",
      url: siteUrl,
      description:
        "An AI voice receptionist for plumbing, HVAC, and electrical contractors — answers every call 24/7 via Vapi and ElevenLabs, qualifies the job type and urgency, books slots into Google Calendar, and escalates emergencies to the on-call technician via Twilio.",
      provider: {
        "@type": "Organization",
        "@id": "https://xmelautomations.xyz/#organization",
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
    },
  ],
};

const faqs = [
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
];

const icon = "h-6 w-6";

export default function AiAutomationHomeServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AiServicePage
        crumb="AI Automation for Home Services"
        eyebrow="AI for home services"
        title="AI automation for home services."
        italic="Missed calls become booked jobs."
        lede="An AI receptionist that answers every call while you're on a job site, qualifies the job and its urgency, books the slot into your calendar and escalates real emergencies to your on-call tech."
        auditLabel="Get a free call-flow audit"
        proof={["Answers every call, 24/7", "HVAC, plumbing, electrical, roofing", "14-day pilot on your real calls"]}
        flow={{
          replyIn: "38s",
          steps: [
            { kind: "missed", label: "Missed call · (512) 555-0148", time: "11:52 PM", text: "Everyone's on a job. The call would have gone to voicemail." },
            { kind: "ai", label: "Your AI receptionist", time: "11:52 PM", text: "Sorry we missed you! What's going on, and what's your ZIP code?" },
            { kind: "booked", label: "Job booked", time: "Tomorrow 7:00 AM", text: "Water heater leak, valve closed, ZIP 78704. Tech assigned." },
          ],
        }}
        variant="home-services"
        features={{
          eyebrow: "What the system does",
          title: "A receptionist that",
          italic: "never misses a call.",
          items: [
            { icon: <PhoneIncoming className={icon} />, title: "Every call answered", body: "An AI voice agent picks up after hours, on weekends, on holidays and whenever every tech is on a job. No call goes to voicemail." },
            { icon: <Stethoscope className={icon} />, title: "The job qualified on the call", body: "It asks what the problem is, where they are and how urgent it is, and classifies the job (repair, install or maintenance) as the conversation happens." },
            { icon: <CalendarCheck className={icon} />, title: "The slot booked automatically", body: "Qualified jobs go straight into your calendar and the caller gets a text with the arrival window. The schedule fills itself, without phone tag." },
            { icon: <Siren className={icon} />, title: "Emergencies escalated instantly", body: "A burst pipe, no heat, a gas smell or an electrical hazard goes straight to your on-call tech by phone, with the team alerted at the same time." },
          ],
        }}
        steps={{
          title: "From ringing phone",
          italic: "to booked job.",
          items: [
            { title: "The call reaches the AI", body: "It picks up on the first ring in a natural voice. If someone on your team answers first, it stays out of the way and only handles calls that would go unanswered." },
            { title: "The AI qualifies the job", body: "It asks what's needed, confirms the address and timing, and works out the job type and urgency from the conversation." },
            { title: "Emergency, or booked in", body: "Urgent jobs go straight to the on-call tech. Everything else is booked into your calendar with a confirmation text, and logged." },
            { title: "Your team sees it all", body: "A message with the caller's details, the job and the booked slot lands in your team channel. No phone log to check." },
            { title: "Reminders run themselves", body: "Reminder texts cut no-shows and handle reschedules, so your techs don't have to chase the schedule." },
          ],
        }}
        stack={{
          lede: "The home services build shares the real estate system's backbone, tuned for voice-first call handling, on established tools rather than a black box.",
          tools: ["n8n", "Vapi", "ElevenLabs", "GPT-4o-mini", "Twilio", "Google Calendar", "Google Sheets", "Slack"],
          stats: [
            { n: "1", label: "number: it goes live on your existing business line" },
            { n: "24/7", label: "nights, weekends and holidays" },
            { n: "<60s", label: "to text back a missed call" },
            { n: "0", label: "calls sent to voicemail" },
          ],
          guide: { href: "/blog/voice-ai-agent-vs-human-isa", label: "Voice AI vs a human receptionist, compared" },
        }}
        faqs={faqs}
        guides={["missed-call-automation-contractors", "ai-receptionist-hvac", "home-service-lead-response-automation", "ai-lead-response-cost", "voice-ai-agent-vs-human-isa", "n8n-workflow-automation-guide"]}
        guidesTitle="Home services guides"
        cta={{
          title: "How many calls did you",
          italic: "miss this week?",
          body: "Every missed call is a job that went to whoever picked up. Tell us how your calls come in today and we'll show you what an AI receptionist would capture. No obligation.",
        }}
        crossLink={{ lead: "Selling on property portals instead?", href: "/ai-automation-real-estate", label: "See AI for real estate" }}
      />
    </>
  );
}
