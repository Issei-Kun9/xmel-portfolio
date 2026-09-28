import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import About, { FounderCard } from "@/components/sections/about";
import Commitments from "@/components/home/commitments";
import { CtaBand, PageHero } from "@/components/kit/kit";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About XMEL Automations — Founder Yashwardhan Chauhan",
  description:
    "Meet Yashwardhan Chauhan, the engineer behind XMEL Automations, building AI lead-response systems for real estate and home services in the US and India.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://xmelautomations.xyz/#about-page",
  url: "https://xmelautomations.xyz/about",
  name: "About XMEL Automations",
  description:
    "XMEL Automations is an AI automation company founded by Yashwardhan Chauhan — building autonomous lead response systems, AI voice agents, and n8n workflow automations for real estate agents and home services contractors.",
  isPartOf: { "@id": "https://xmelautomations.xyz/#website" },
  publisher: { "@id": "https://xmelautomations.xyz/#organization" },
  about: { "@id": "https://xmelautomations.xyz/#organization" },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <PageHero
          crumbs={[{ name: "About" }]}
          eyebrow="About"
          title="About XMEL Automations."
          italic="One builder, end to end."
          lede="XMEL Automations is an AI automation company founded by Yashwardhan Chauhan. We build AI lead-response systems, voice agents, websites and SEO for real estate agents, home services contractors and local businesses in the US and India."
          proof={["Founder-built, founder-supported", "US & India", "Replies within 24 hours"]}
          visual={<FounderCard />}
        />
        <About />
        <Commitments />
        <CtaBand
          title="Let's build your"
          italic="lead-response system."
          body="Whether you're losing leads to slow replies or missing calls on the job, tell me how customers reach you today and I'll show you what I'd build."
          secondary={{ label: "Send a message", href: "/contact" }}
        />
      </main>
    </>
  );
}
