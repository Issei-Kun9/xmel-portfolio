import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WEBSITE_DEV } from "@/lib/services";
import { MARKETS } from "@/lib/market";
import { SiteMockup } from "@/components/visuals/mockups";
import { DEFAULT_SAMPLES } from "@/lib/industries";
import ServicePricing from "@/components/site/service-pricing";
import RelatedGuides from "@/components/site/related-guides";
import { ArrowRight, ArrowUpRight, KeyRound, PenLine, Search, Smartphone } from "lucide-react";
import { CtaBand, Faq, FeatureGrid, PageHero, SectionHead, Steps, btn } from "@/components/kit/kit";
import { INSPIRATION, shotFor } from "@/lib/inspiration";

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

const icon = "h-6 w-6";
const features = [
  {
    icon: <PenLine className={icon} />,
    title: "Written around your business",
    body: "A short call or WhatsApp chat, then I write and design the site from what you actually do — not a form you fill into a template.",
  },
  {
    icon: <Smartphone className={icon} />,
    title: "Mobile-first and fast",
    body: "Most visitors are on a phone. Every site is built to load fast and look right on a small screen first, desktop second.",
  },
  {
    icon: <Search className={icon} />,
    title: "Basic SEO built in",
    body: "Titles, descriptions, one clear heading per page and correct structured data from day one — so Google can actually read the site.",
  },
  {
    icon: <KeyRound className={icon} />,
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

/** Three real sites from the inspiration gallery (with screenshots), one per style. */
const styles = ["mahindralifespaces.com", "enrichbeauty.com", "urbanladder.com"]
  .map((d) => INSPIRATION.find((s) => s.url.includes(d)))
  .filter((s) => s !== undefined)
  .map((s) => ({ ...s, shot: shotFor(s.url) }))
  .filter((s) => s.shot);

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <PageHero
          crumbs={[{ name: "Website Development" }]}
          eyebrow="Website development"
          title="A website built around your business,"
          italic="live in about a week."
          lede="Mobile-first, fast, and written for what you actually do, not a template you have to wrestle into shape. One flat price, no monthly page-builder fee."
          proof={["From $499 / ₹2,500", "Live in about a week", "See it before you pay in full"]}
          actions={
            <>
              <a href="#pricing" className={btn.gold}>
                See pricing
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="/#book" data-cta="book" data-cta-location="hero" className={btn.ghost}>Book a 15-min call</a>
            </>
          }
          visual={
            <figure>
              <SiteMockup s={DEFAULT_SAMPLES.us} />
              <figcaption className="mt-4 text-center text-[12px] text-[var(--text-tertiary)]">Illustration with a sample business, not a client.</figcaption>
            </figure>
          }
        />

        <section className="paper py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <SectionHead eyebrow="What you get" title="Not a template." italic="A site built for your business." />
            <FeatureGrid items={features} cols={4} />
          </div>
        </section>

        <section className="paper bg-[var(--bg-secondary)] py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <Steps eyebrow="How it works" title="From a first call" italic="to a live website." steps={steps} />
          </div>
        </section>

        {styles.length > 0 && (
          <section className="ink py-20 sm:py-24">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <SectionHead onInk eyebrow="Style inspiration" title="Pick a look you love." italic="We'll build yours in it." />
                <a href="/inspiration" className={btn.ghost}>Browse all by industry</a>
              </div>
              <ul className="mt-10 grid md:grid-cols-3 gap-4">
                {styles.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="lift group block overflow-hidden rounded-2xl border border-[rgba(245,240,230,0.12)] bg-[rgba(245,240,230,0.04)] hover:border-[var(--gold)] transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element -- static screenshot, already sized */}
                      <img src={s.shot!} alt={`${s.name} homepage`} width={960} height={600} loading="lazy" className="aspect-[16/10] w-full object-cover object-left-top" />
                      <span className="flex items-center justify-between gap-3 p-5">
                        <span>
                          <span className="block font-semibold text-[var(--ivory)]">{s.name}</span>
                          <span className="block text-[13px] text-[var(--text-tertiary)]">{s.why}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--gold)]" aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] text-[var(--text-tertiary)]">Real sites by their own teams, shown as style references. Not XMEL work.</p>
            </div>
          </section>
        )}

        <section id="pricing" className="paper scroll-mt-20 py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <SectionHead eyebrow="Pricing" title="One flat price." italic="No monthly page-builder fee." />
            <ServicePricing configs={WEBSITE_DEV} idPrefix="webdev" />
          </div>
        </section>

        <section className="paper bg-[var(--bg-secondary)] py-20 sm:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <Faq faqs={faqs} />
          </div>
        </section>

        <section className="paper py-20 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <RelatedGuides slugs={["website-cost-small-business-india", "contractor-website-checklist", "google-business-profile-india-local-seo"]} title="Website guides" />
          </div>
        </section>

        <CtaBand
          title="Ready to get your business"
          italic="online?"
          body="Tell me about your business and what the site needs to do. I'll tell you which plan fits and how soon it can be live."
          secondary={{ label: "See SEO services", href: "/seo" }}
        />
      </main>
    </>
  );
}
