import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Contact from "@/components/sections/contact";
import { PageHero } from "@/components/kit/kit";


export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact XMEL Automations — Book a Demo or Send a Message",
  description:
    "Talk to XMEL Automations about an AI lead responder for your business. Book a 15-minute demo, message on WhatsApp or email. Replies within 24 hours.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://xmelautomations.xyz/#contact-page",
  url: "https://xmelautomations.xyz/contact",
  name: "Contact XMEL Automations",
  description:
    "Contact XMEL Automations — AI automation for real estate and home services. Email yashwardhan@xmelautomations.xyz.",
  isPartOf: { "@id": "https://xmelautomations.xyz/#website" },
  publisher: { "@id": "https://xmelautomations.xyz/#organization" },
  mainEntity: { "@id": "https://xmelautomations.xyz/#organization" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <PageHero
          crumbs={[{ name: "Contact" }]}
          eyebrow="Contact"
          title="Contact XMEL Automations."
          italic="Reply in 24 hours."
          lede="Tell me about your business, where your customers come from and what's getting missed. I'll reply with what I'd build and what it would cost."
          proof={["Replies within 24 hours", "WhatsApp, email or a 15-min call", "No hard sell"]}
        />
        <Contact />
      </main>
    </>
  );
}
