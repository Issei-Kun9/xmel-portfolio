import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Contact from "@/components/sections/contact";
import Breadcrumbs from "@/components/shared/breadcrumbs";


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
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-4">
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
