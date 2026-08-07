import type { Metadata } from "next";
import CalculatorClient from "./calculator-client";

export const metadata: Metadata = {
  title: "Lead Response ROI Calculator | XMEL Automations",
  description:
    "See how much revenue slow lead response is costing you. Free ROI calculator for real estate agents and home services contractors.",
  keywords: [
    "lead response ROI calculator",
    "real estate lead response time calculator",
    "AI lead response ROI",
    "how much do slow leads cost",
    "lead response time revenue impact",
    "real estate automation ROI",
    "home services lead calculator",
  ],
  openGraph: {
    title: "Lead Response ROI Calculator | XMEL Automations",
    description:
      "See how much revenue you're losing to slow lead response. Free calculator — takes 30 seconds.",
    type: "website",
    url: "https://xmelautomations.xyz/tools/roi-calculator",
    siteName: "XMEL Automations",
    locale: "en_IN",
    images: [
      {
        url: "https://xmelautomations.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lead Response ROI Calculator — XMEL Automations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Response ROI Calculator | XMEL Automations",
    description:
      "How much revenue are slow leads costing you? Free calculator — takes 30 seconds.",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  alternates: {
    canonical: "https://xmelautomations.xyz/tools/roi-calculator",
  },
};

export default function RoiCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Lead Response ROI Calculator",
    description:
      "Calculate how much commission you're losing to slow lead response times. Free ROI calculator for real estate agents and home services contractors.",
    url: "https://xmelautomations.xyz/tools/roi-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Yashwardhan Chauhan",
      url: "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
    },
    publisher: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors mb-12"
          >
            <span>←</span>
            <span>BACK TO HOME</span>
          </a>

          {/* Header */}
          <div className="mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
              FREE TOOL
            </span>
            <h1 className="font-display text-[clamp(28px,5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              Lead Response ROI Calculator
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              Every minute you take to respond to a lead, your chance of closing
              drops by roughly 5×. Drag the sliders to see how much revenue
              you&apos;re leaving on the table — and what an AI lead-response
              system could recover.
            </p>
          </div>

          {/* Calculator */}
          <CalculatorClient />

          {/* Bottom CTA */}
          <div className="mt-20 pt-8 border-t border-[var(--border-subtle)]">
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Want to build an AI lead-response system that captures the revenue
              you&apos;re currently losing?
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
            >
              Get in touch
              <span>→</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
