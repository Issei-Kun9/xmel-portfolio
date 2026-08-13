import type { Metadata } from "next";
import Contact from "@/components/sections/contact";
import Breadcrumbs from "@/components/shared/breadcrumbs";

const siteUrl = "https://xmelautomations.xyz/contact";

export const metadata: Metadata = {
  title: "Contact | XMEL Automations",
  description:
    "Contact XMEL Automations — AI automation for real estate and home services. Email yashwardhan@xmelautomations.xyz or send a project inquiry for AI lead response, voice AI agents, and n8n workflows.",
  openGraph: {
    title: "Contact | XMEL Automations",
    description:
      "Start a project with XMEL Automations — AI lead response systems, voice AI agents, and n8n workflow automation for real estate and home services.",
    type: "website",
    url: siteUrl,
    siteName: "XMEL Automations",
    locale: "en_US",
    images: [
      {
        url: "https://xmelautomations.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact XMEL Automations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | XMEL Automations",
    description:
      "Start a project with XMEL Automations — AI lead response, voice AI agents, and n8n workflows.",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "en-IN": siteUrl,
      "x-default": siteUrl,
    },
  },
};

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
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-32 pb-4">
          <div className="mb-10">
            <Breadcrumbs items={[{ name: "Contact" }]} />
          </div>

          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
              CONTACT
            </span>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              Contact XMEL Automations
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              Tell me about your lead flow and what&apos;s broken — I&apos;ll
              respond within 24 hours with how an AI system can fix it.
            </p>
          </div>
        </div>

        <Contact />
      </main>
    </>
  );
}
