import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SEO_SERVICE } from "@/lib/services";
import { MARKETS } from "@/lib/market";
import { SerpMockup } from "@/components/visuals/mockups";
import { DEFAULT_SAMPLES } from "@/lib/industries";
import ServicePricing from "@/components/site/service-pricing";
import { ArrowRight, BarChart3, FileText, MapPin, Wrench } from "lucide-react";
import { CtaBand, Faq, FeatureGrid, PageHero, SectionHead, Steps, btn } from "@/components/kit/kit";
import RelatedGuides from "@/components/site/related-guides";

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

const icon = "h-6 w-6";
const features = [
  {
    icon: <Wrench className={icon} />,
    title: "Technical SEO fixed first",
    body: "Titles, descriptions, structured data, sitemaps, page speed and mobile usability — the basics Google checks before anything else matters.",
  },
  {
    icon: <FileText className={icon} />,
    title: "Content for real searches",
    body: "Pages and posts written for what your customers actually type into Google, not just broad, crowded terms you'll never win.",
  },
  {
    icon: <MapPin className={icon} />,
    title: "Local presence",
    body: "Your Google Business Profile, local citations and directory listings, kept accurate and consistent across the web.",
  },
  {
    icon: <BarChart3 className={icon} />,
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

export default function SeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <PageHero
          crumbs={[{ name: "SEO" }]}
          eyebrow="SEO"
          title="Get found on Google"
          italic="for the searches that bring you customers."
          lede="Technical fixes, local search presence and content built around real search queries, reported on every month in plain language."
          proof={["From $397 / ₹7,999 a month", "Month-to-month, no contract", "A plain-English monthly report"]}
          actions={
            <>
              <a href="#pricing" className={btn.gold}>
                See pricing
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="/#book" data-cta="book" data-cta-location="hero" className={btn.ghost}>Get a free audit</a>
            </>
          }
          visual={
            <figure>
              <SerpMockup s={DEFAULT_SAMPLES.us} />
              <figcaption className="mt-4 text-center text-[12px] text-[var(--text-tertiary)]">Illustration with a sample business, not a client.</figcaption>
            </figure>
          }
        />

        <section className="paper py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <SectionHead eyebrow="What's included" title="The fixes that" italic="actually move rankings." />
            <FeatureGrid items={features} cols={4} />
          </div>
        </section>

        <section className="paper bg-[var(--bg-secondary)] py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <Steps eyebrow="How it works" title="From audit" italic="to steady growth." steps={steps} />
          </div>
        </section>

        <section className="ink py-20 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)]">
            {[
              { n: "8–12", label: "weeks until most clients see rankings start to move" },
              { n: "3", label: "things Google weighs for local results: relevance, distance, prominence" },
              { n: "0", label: "long-term contracts. Month-to-month, cancel any time" },
            ].map((s) => (
              <div key={s.label} className="bg-[#141417] p-8">
                <p className="font-display text-[clamp(40px,5vw,64px)] leading-none text-[var(--gold)]">{s.n}</p>
                <p className="mt-3 text-[15px] leading-snug text-[var(--text-secondary)]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="paper scroll-mt-20 py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <SectionHead eyebrow="Pricing" title="A monthly retainer." italic="No long-term contract." />
            <ServicePricing configs={SEO_SERVICE} idPrefix="seo" />
          </div>
        </section>

        <section className="paper bg-[var(--bg-secondary)] py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <Faq faqs={faqs} />
          </div>
        </section>

        <section className="paper py-20 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <RelatedGuides slugs={["google-map-pack-local-seo-contractors", "google-business-profile-india-local-seo", "contractor-website-checklist"]} title="SEO guides" />
          </div>
        </section>

        <CtaBand
          title="Ready to get found"
          italic="on Google?"
          body="Tell me your website and what you sell. I'll run a free audit and show you exactly what's holding your rankings back."
          secondary={{ label: "Need a website first?", href: "/website-development" }}
        />
      </main>
    </>
  );
}
