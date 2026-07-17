export default function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XMEL Automations",
    url: "https://xmelautomations.dpdns.org",
    description:
      "AI automation agency building autonomous lead response systems, voice AI agents, and n8n workflow automations for real estate agents and home services contractors.",
    founder: {
      "@type": "Person",
      name: "Yashwardhan Chauhan",
      url: "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
      jobTitle: "AI Automation Engineer",
    },
    sameAs: ["https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "yashwwardhanai@gmail.com",
      contactType: "customer service",
    },
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yashwardhan Chauhan",
    url: "https://xmelautomations.dpdns.org#about",
    jobTitle: "AI Automation Engineer & Founder",
    worksFor: {
      "@type": "Organization",
      name: "XMEL Automations",
    },
    description:
      "Solo founder building AI automation systems — 67-node n8n workflows, GPT-4o-mini qualification, Twilio voice calling, and real-time lead response under 50 seconds.",
    sameAs: ["https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"],
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
  };

  const services = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Lead Response Automation",
      description:
        "Autonomous AI systems that respond to leads in under 50 seconds via voice, SMS, and WhatsApp — eliminating the 5-minute lead death problem for real estate agents and home services contractors.",
      provider: { "@type": "Organization", name: "XMEL Automations" },
      areaServed: { "@type": "Country", name: "India" },
      serviceType: "AI Automation",
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: "Contact for pricing",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Voice AI Agent Development",
      description:
        "Custom AI phone agents built on Vapi, Twilio, and ElevenLabs that answer calls, qualify leads, and book appointments 24/7 without human intervention.",
      provider: { "@type": "Organization", name: "XMEL Automations" },
      areaServed: { "@type": "Country", name: "India" },
      serviceType: "Voice AI",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "n8n Workflow Automation",
      description:
        "Complex multi-step automation workflows using n8n — CRM sync, lead qualification, appointment booking, Slack notifications, and Google Sheets integration.",
      provider: { "@type": "Organization", name: "XMEL Automations" },
      areaServed: { "@type": "Country", name: "India" },
      serviceType: "Workflow Automation",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "WhatsApp Automation Bot",
      description:
        "AI-powered WhatsApp chatbots that qualify leads, answer questions, and sync data to your CRM — built on WhatsApp Business API with GPT-4o-mini reasoning.",
      provider: { "@type": "Organization", name: "XMEL Automations" },
      areaServed: { "@type": "Country", name: "India" },
      serviceType: "Chatbot Development",
    },
  ];

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does AI lead response automation work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI lead response automation uses GPT-4o-mini to instantly qualify incoming leads from web forms, phone calls, and WhatsApp messages. When a lead comes in, the AI scores their intent, sends a personalized response via SMS or voice call, and books appointments directly into your calendar — all within 50 seconds. The entire workflow runs on n8n with 67 interconnected nodes and 7 webhook triggers.",
        },
      },
      {
        "@type": "Question",
        name: "What is an AI Inside Sales Agent (ISA)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An AI Inside Sales Agent is an autonomous system that replaces the manual work of a human inside sales agent. It answers inbound leads, qualifies them using AI reasoning (GPT-4o-mini), makes outbound calls via Twilio, sends follow-up SMS messages, and books appointments into Google Calendar. The AI ISA I built is a 67-node n8n system that responds in under 50 seconds — 400x faster than the industry average of 47 hours.",
        },
      },
      {
        "@type": "Question",
        name: "How much does AI automation cost for real estate agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI automation pricing depends on the complexity of your lead flow and the number of integrations needed. Most real estate AI systems start from a one-time build fee plus a monthly hosting and API cost (typically $50-150/month for Twilio, OpenAI API, and n8n hosting). The ROI is immediate — agents typically recover 3-5x their investment in the first month through leads that would have otherwise been lost to slow response times.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI answer phone calls for my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI voice agents built on Vapi and Twilio can answer incoming calls 24/7, have natural conversations with callers, qualify their needs, and take action — like booking appointments or sending information via SMS. The AI sounds natural (using ElevenLabs voice synthesis), handles interruptions, and escalates to a human agent when needed. This is ideal for real estate agents and home services contractors who miss calls during showings or job sites.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to set up AI automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical AI lead response system takes 2-3 weeks from discovery call to production deployment. Week 1 is discovery and system design — mapping your lead flow, choosing AI models, and designing the workflow architecture. Week 2 is building the n8n workflows, voice agents, and integrations. Week 3 is testing with real lead scenarios, deploying to production, and setting up monitoring dashboards. Ongoing optimization continues after launch.",
        },
      },
      {
        "@type": "Question",
        name: "What is n8n automation and why use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "n8n is an open-source workflow automation platform that lets you connect different apps and services (like Google Sheets, Twilio, OpenAI, Slack) into complex automated workflows. Unlike Zapier, n8n runs on your own infrastructure, handles complex branching logic, and can process thousands of leads without per-task pricing. It's the backbone of the AI ISA system — powering 67 interconnected nodes that handle lead qualification, voice calling, SMS follow-up, and CRM sync.",
        },
      },
      {
        "@type": "Question",
        name: "How can AI help real estate agents generate more leads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI helps real estate agents in three critical ways: (1) Instant response — AI qualifies and responds to leads in under 50 seconds vs. the industry average of 47 hours, (2) 24/7 availability — AI answers calls, texts, and WhatsApp messages at 2 AM just as effectively as at 2 PM, (3) Automated follow-up — leads that don't convert immediately get nurtured with timed SMS and voice follow-ups, recovering deals that would otherwise go cold.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need coding knowledge to use AI automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. As your AI automation engineer, I handle all the technical work — from system design to deployment. You interact with the system through simple tools you already use: Google Sheets for lead data, Slack for notifications, and Google Calendar for appointments. The AI runs in the background 24/7. If you can check your email and calendar, you can use the AI automation system.",
        },
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "XMEL Automations",
    url: "https://xmelautomations.dpdns.org",
    description:
      "AI automation agency building autonomous lead response systems, voice AI agents, and n8n workflow automations.",
    publisher: {
      "@type": "Organization",
      name: "XMEL Automations",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "XMEL Automations",
    url: "https://xmelautomations.dpdns.org",
    description:
      "AI automation agency specializing in lead response automation, voice AI agents, and n8n workflow automations for real estate and home services.",
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
    ],
    serviceType: [
      "AI Automation",
      "Voice AI Development",
      "Workflow Automation",
      "Chatbot Development",
    ],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(services) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}
