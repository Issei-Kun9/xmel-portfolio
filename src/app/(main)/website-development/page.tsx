import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WEBSITE_DEV } from "@/lib/services";
import { MARKETS } from "@/lib/market";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import ServicePricing from "@/components/site/service-pricing";

const siteUrl = "https://xmelautomations.xyz/website-development";

export const metadata: Metadata = pageMetadata({
  path: "/website-development",
  title: "Website Development for Small Businesses | XMEL",
  description:
    "A mobile-first website built around your business, live in about a week. From $499 in the US, from ₹2,500 in India. Written for you, not a template.",
});

const offers = MARKETS.flatMap((m) =>
  WEBSITE_DEV[m].tiers
    .filter((t) => t.priceAmount > 0)
    .map((t) => ({
      "@type": "Offer",
      name: `${t.name} website (${m === "us" ? "United States" : "India"})`,
      priceCurrency: WEBSITE_DEV[m].currency,
      price: t.priceAmount,
      eligibleRegion: { "@type": "Country", name: m === "us" ? "United States" : "India" },
    }))
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}#webpage`,
      url: siteUrl,
      name: "Website Development for Small Businesses",
      isPartOf: { "@id": "https://xmelautomations.xyz/#website" },
      about: { "@id": "https://xmelautomations.xyz/#organization" },
      mainEntity: { "@id": `${siteUrl}#service` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}#service`,
      name: "Website Development",
      serviceType: "Web Design and Development",
      url: siteUrl,
      description:
        "Mobile-first websites for small businesses — written and designed around the business, not a page-builder template, live in about a week.",
      provider: { "@type": "Organization", "@id": "https://xmelautomations.xyz/#organization" },
      areaServed: ["US", "IN"],
      audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Website development plans", itemListElement: offers },
    },
  ],
};

const features = [
  {
    title: "Written around your business",
    body: "A short call or WhatsApp chat, then I write and design the site from what you actually do — not a form you fill into a template.",
  },
  {
    title: "Mobile-first and fast",
    body: "Most visitors are on a phone. Every site is built to load fast and look right on a small screen first, desktop second.",
  },
  {
    title: "Basic SEO built in",
    body: "Titles, descriptions, one clear heading per page and correct structured data from day one — so Google can actually read the site.",
  },
  {
    title: "Yours to keep",
    body: "No locked page-builder account. The site runs on your own domain, and you can move it or hand it to someone else at any time.",
  },
];

const steps = [
  { step: "01", title: "Tell me about your business", body: "A 15-minute call or a WhatsApp chat — what you do, who you serve, what the site needs to say." },
  { step: "02", title: "I write and build it", body: "Copy, design and build together, not a generic template — usually done within a week." },
  { step: "03", title: "You review the live draft", body: "You see the actual site before paying the rest, and ask for changes." },
  { step: "04", title: "It goes live on your domain", body: "Connected to your own domain, with basic SEO and analytics set up from day one." },
];

const faqs = [
  {
    q: "Do I own the website?",
    a: "Yes. It runs on your own domain and hosting, not a page-builder account you have to keep paying to access. If you ever want to move it or hand it to someone else, you can.",
  },
  {
    q: "Can I edit it myself afterwards?",
    a: "Small text and photo changes, yes — I'll show you how when it's live. For bigger changes, message me and I'll make them, or add you to an ongoing care plan.",
  },
  {
    q: "What does hosting and the domain cost?",
    a: "Domain and hosting are billed at cost, separate from the build fee — typically $15–25 a year for a domain, and $0–20 a month for hosting depending on the site.",
  },
  {
    q: "How long does it take?",
    a: "A single-page site is usually live within about a week. A multi-page site takes a bit longer, depending on how much content you need written.",
  },
  {
    q: "Do you also handle SEO?",
    a: "Every site ships with the basics — titles, descriptions, structured data, a sitemap. For ongoing work to actually rank for searches, see the SEO service on this page.",
  },
  {
    q: "What if I need an online store or a booking system?",
    a: "That's the Custom tier — tell me what the site needs to do and I'll scope it and quote it after a short call.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-24">
          <div className="mb-10">
            <Breadcrumbs items={[{ name: "Website Development" }]} />
          </div>

          <div className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
              SOLUTIONS — WEBSITE DEVELOPMENT
            </span>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              A website built around your business, live in about a week
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              Mobile-first, fast, and written for what you actually do — not a
              template you have to wrestle into shape. One flat price, no
              monthly page-builder fee.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(58,125,14,0.2)] transition-shadow duration-300"
              >
                See pricing
                <span>→</span>
              </a>
              <a
                href="/#book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono text-sm font-medium rounded border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
              >
                Book a 15-min call
              </a>
            </div>
          </div>

          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              WHAT YOU GET
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              Not a template. A site built for your business.
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              HOW IT WORKS
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              From a first call to a live website
            </h2>
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.step} className="flex gap-6">
                  <span className="font-mono text-[12px] text-[var(--accent)] pt-1">{s.step}</span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-1">{s.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              FAQ
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              Common questions
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-2">{f.q}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="pricing" className="scroll-mt-20 mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              PRICING
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              One flat price. No monthly page-builder fee.
            </h2>
            <ServicePricing configs={WEBSITE_DEV} idPrefix="webdev" />
          </section>

          <section className="p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3">
              Ready to get your business online?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Tell me about your business and what the site needs to do —
              I&apos;ll tell you which tier fits and how soon it can be live.
            </p>
            <a
              href="/#book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(58,125,14,0.2)] transition-shadow duration-300"
            >
              Start the conversation
              <span>→</span>
            </a>
            <p className="text-[var(--text-tertiary)] text-sm mt-6">
              Need to get found on Google once it&apos;s live?{" "}
              <a href="/seo" className="text-[var(--accent)] underline hover:no-underline">
                See SEO services
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
