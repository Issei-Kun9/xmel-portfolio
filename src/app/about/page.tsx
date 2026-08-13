import type { Metadata } from "next";
import Link from "next/link";
import About from "@/components/sections/about";
import Breadcrumbs from "@/components/shared/breadcrumbs";

const siteUrl = "https://xmelautomations.xyz/about";

export const metadata: Metadata = {
  title: "About | XMEL Automations",
  description:
    "XMEL Automations is an AI automation company founded by Yashwardhan Chauhan — building AI sales agents, voice AI agents, lead qualification, and n8n workflow automation for real estate and home services.",
  openGraph: {
    title: "About | XMEL Automations",
    description:
      "The team and systems behind XMEL Automations — AI sales agents, voice AI, and n8n workflow automation for real estate and home services.",
    type: "website",
    url: siteUrl,
    siteName: "XMEL Automations",
    locale: "en_US",
    images: [
      {
        url: "https://xmelautomations.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "About XMEL Automations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | XMEL Automations",
    description:
      "The team and systems behind XMEL Automations — AI sales agents, voice AI, and n8n workflow automation.",
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
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="mb-10">
            <Breadcrumbs items={[{ name: "About" }]} />
          </div>

          {/* Header */}
          <div className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
              ABOUT
            </span>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              About XMEL Automations
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              XMEL Automations is an AI automation company founded by
              Yashwardhan Chauhan. We build autonomous lead response systems,
              AI voice agents, and n8n workflow automations for real estate
              agents and home services contractors — systems that qualify
              leads, respond in under 50 seconds, and book appointments 24/7.
            </p>
          </div>

          {/* Founder / company section */}
          <About />

          {/* CTA */}
          <section className="mt-16 p-8 lg:p-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-center">
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)]">
              Let&apos;s build your lead-response system.
            </h2>
            <p className="text-[var(--text-secondary)] mt-4 mb-8 max-w-xl mx-auto">
              Whether you&apos;re a real estate agent losing leads to slow
              response times or a home services contractor missing calls — I
              can build the system that fixes it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
            >
              Start the conversation
              <span>→</span>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
