import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SEO_SERVICE } from "@/lib/services";
import { MARKETS } from "@/lib/market";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import ServicePricing from "@/components/site/service-pricing";
import Lottie from "@/components/motion/lottie";
import Words from "@/components/motion/words";

const siteUrl = "https://xmelautomations.xyz/seo";

export const metadata: Metadata = pageMetadata({
  path: "/seo",
  title: "SEO for Small Businesses | XMEL Automations",
  description:
    "Technical fixes, local presence and content that targets real searches — from $397/month in the US, from ₹7,999/month in India. No long-term contract.",
});

const offers = MARKETS.flatMap((m) =>
  SEO_SERVICE[m].tiers
    .filter((t) => t.priceAmount > 0)
    .map((t) => ({
      "@type": "Offer",
      name: `${t.name} SEO (${m === "us" ? "United States" : "India"})`,
      priceCurrency: SEO_SERVICE[m].currency,
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
      name: "SEO for Small Businesses",
      isPartOf: { "@id": "https://xmelautomations.xyz/#website" },
      about: { "@id": "https://xmelautomations.xyz/#organization" },
      mainEntity: { "@id": `${siteUrl}#service` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}#service`,
      name: "SEO",
      serviceType: "Search Engine Optimization",
      url: siteUrl,
      description:
        "Technical SEO fixes, local search presence and content built around real search queries, reported on monthly.",
      provider: { "@type": "Organization", "@id": "https://xmelautomations.xyz/#organization" },
      areaServed: ["US", "IN"],
      audience: { "@type": "BusinessAudience", audienceType: "Small and local businesses" },
      hasOfferCatalog: { "@type": "OfferCatalog", name: "SEO plans", itemListElement: offers },
    },
  ],
};

const features = [
  {
    title: "Technical SEO fixed first",
    body: "Titles, descriptions, structured data, sitemaps, page speed and mobile usability — the basics Google checks before anything else matters.",
  },
  {
    title: "Content for real searches",
    body: "Pages and posts written for what your customers actually type into Google, not just broad, crowded terms you'll never win.",
  },
  {
    title: "Local presence",
    body: "Your Google Business Profile, local citations and directory listings, kept accurate and consistent across the web.",
  },
  {
    title: "Reporting you can read",
    body: "A monthly report in plain language: what moved, what we changed, and what's next — not a dashboard you have to decode yourself.",
  },
];

const steps = [
  { step: "01", title: "A free audit of where you stand", body: "Rankings, technical issues and content gaps — what's holding your site back today." },
  { step: "02", title: "Fix the technical basics", body: "Metadata, structured data, sitemaps, broken links, page speed — the fixes that unblock everything else." },
  { step: "03", title: "Publish content that targets real searches", body: "Pages and posts built around the exact questions and terms your customers search." },
  { step: "04", title: "Build local presence and links", body: "Google Business Profile, citations and links from relevant sites, built up steadily." },
  { step: "05", title: "Report, adjust, keep going", body: "A monthly report shows what changed and why — the plan adjusts as we see what's working." },
];

const faqs = [
  {
    q: "How long until I see results?",
    a: "Most clients see the first movement in rankings within 8–12 weeks. SEO compounds — the biggest gains usually show up after 4–6 months of consistent work.",
  },
  {
    q: "Do you write the content too?",
    a: "Yes, on the Growth and Custom plans — blog posts and location pages are researched, written and published as part of the retainer, not billed separately.",
  },
  {
    q: "Do I need a new website first?",
    a: "No — SEO works on your existing site. If your current site has deeper problems (very slow, not mobile-friendly, or hard to update), I'll flag that honestly; see website development if a rebuild would help more than a retainer.",
  },
  {
    q: "Will this work for my industry?",
    a: "It's built for small and local businesses — real estate, home services, and similar — where customers search locally and the competition is winnable. Very large national markets need a bigger budget than these plans assume.",
  },
  {
    q: "Do you also run paid ads?",
    a: "Not currently — these plans are organic SEO only. If paid search is part of your plan, that's a separate conversation with your own budget, billed at cost.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. It's a month-to-month retainer — you can cancel any time. SEO is a genuine 3–6 month commitment to see real results, but nothing locks you in on paper.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function SeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-24">
          <div className="mb-10">
            <Breadcrumbs items={[{ name: "SEO" }]} />
          </div>

          <div className="relative mb-16">
            <Lottie name="growth-chart" className="float-slow absolute right-0 -top-6 hidden md:block w-36 h-36 lg:w-44 lg:h-44 pointer-events-none" />
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)]">
              SOLUTIONS — SEO
            </span>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-6">
              <Words text="Get found on Google for the searches that bring you customers" />
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              Technical fixes, local search presence and content built around
              real search queries — reported on every month, in plain
              language.
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
                Get a free audit
              </a>
            </div>
          </div>

          <section className="mb-16">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              WHAT&apos;S INCLUDED
            </span>
            <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mt-4 mb-8">
              The fixes that actually move rankings
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
              From audit to steady growth
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
              A monthly retainer, no long-term contract
            </h2>
            <ServicePricing configs={SEO_SERVICE} idPrefix="seo" />
          </section>

          <section className="p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3">
              Ready to get found on Google?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Tell me your website and what you sell — I&apos;ll run a free
              audit and show you exactly what&apos;s holding your rankings
              back.
            </p>
            <a
              href="/#book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(58,125,14,0.2)] transition-shadow duration-300"
            >
              Start the conversation
              <span>→</span>
            </a>
            <p className="text-[var(--text-tertiary)] text-sm mt-6">
              Need a website before SEO makes sense?{" "}
              <a href="/website-development" className="text-[var(--accent)] underline hover:no-underline">
                See website development
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
