import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { INDUSTRIES, industryBySlug } from "@/lib/industries";
import { MARKET_CONFIG } from "@/lib/market";
import { SEO_SERVICE, WEBSITE_DEV } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import MarketMockups from "@/components/visuals/market-mockups";
import Lottie from "@/components/motion/lottie";
import ChatDemo from "@/components/home/chat-demo";
import ServiceArt from "@/components/visuals/service-art";
import RelatedGuides from "@/components/site/related-guides";
import { INDUSTRY_CHATS } from "@/lib/chat-scripts";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

/** Most useful guides per industry; the rest fill in from the industry's AI category. */
const GUIDES: Record<string, string[]> = {
  "real-estate-agents": ["zillow-lead-response-time", "whatsapp-auto-reply-99acres-magicbricks-leads", "real-estate-lead-qualification"],
  roofers: ["google-map-pack-local-seo-contractors", "contractor-website-checklist", "missed-call-automation-contractors"],
  plumbers: ["missed-call-automation-contractors", "contractor-website-checklist", "google-map-pack-local-seo-contractors"],
  hvac: ["ai-receptionist-hvac", "contractor-website-checklist", "google-map-pack-local-seo-contractors"],
  electricians: ["contractor-website-checklist", "google-map-pack-local-seo-contractors", "missed-call-automation-contractors"],
  dentists: ["dental-clinic-missed-calls-new-patients", "google-business-profile-india-local-seo", "whatsapp-business-app-vs-api"],
  "interior-designers": ["website-cost-small-business-india", "whatsapp-business-app-vs-api", "google-business-profile-india-local-seo"],
  salons: ["google-business-profile-india-local-seo", "whatsapp-business-app-vs-api", "website-cost-small-business-india"],
};

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const ind = industryBySlug((await params).industry);
  if (!ind) return {};
  return pageMetadata({
    path: `/for/${ind.slug}`,
    title: `Websites, SEO & AI Lead Response for ${ind.name} | XMEL Automations`,
    description: `More customers for ${ind.plural}: a website that converts, SEO that gets you found on Google, and AI that answers every enquiry in under a minute. US & India.`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const ind = industryBySlug((await params).industry);
  if (!ind) notFound();
  const aiHref = ind.ai === "real-estate" ? "/ai-automation-real-estate" : "/ai-automation-home-services";
  const services = [
    { art: "website" as const, title: "A website that wins the job", body: `Built for ${ind.plural}: your work, your reviews and one clear way to book, on every phone.`, price: `From ${WEBSITE_DEV.us.tiers[0].price} · ${WEBSITE_DEV.in.tiers[0].price}`, href: "/website-development" },
    { art: "seo" as const, title: "Found first on Google", body: `Local SEO for the searches your customers make, so you show up above other ${ind.plural}.`, price: `From ${SEO_SERVICE.us.tiers[0].price} · ${SEO_SERVICE.in.tiers[0].price}/mo`, href: "/seo" },
    { art: ind.ai, title: "Every enquiry answered in 60s", body: "AI replies, qualifies and books into your calendar, day and night, so no lead goes to a competitor.", price: `From ${MARKET_CONFIG.us.tiers[0].setup} · ${MARKET_CONFIG.in.tiers[0].setup} setup`, href: aiHref },
  ];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Websites, SEO and AI lead response for ${ind.plural}`,
    provider: { "@type": "Organization", "@id": "https://xmelautomations.xyz/#organization" },
    areaServed: ["US", "IN"],
    audience: { "@type": "BusinessAudience", audienceType: ind.name },
    url: `https://xmelautomations.xyz/for/${ind.slug}`,
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div
        className="ink overflow-hidden"
        style={{ backgroundImage: `radial-gradient(55% 70% at 85% 30%, ${ind.mood.tint}33, transparent 70%)` }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24 grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-center">
          <div>
          <div className="mb-10"><Breadcrumbs items={[{ name: "Industries" }, { name: ind.name }]} /></div>
          <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: ind.mood.tint }}>
            <span className="h-2 w-2 rounded-full" style={{ background: ind.mood.tint }} aria-hidden="true" />
            For {ind.plural}
          </p>
          <h1 className="mt-4 font-display text-[clamp(38px,6.4vw,76px)] font-medium leading-[1.0] tracking-[-0.03em] max-w-4xl">
            More jobs for {ind.plural}.{" "}
            <span className="italic font-normal" style={{ color: ind.mood.tint }}>{ind.mood.tagline}</span>
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
            A website that makes people trust you, SEO that puts you first on Google, and AI that
            answers every enquiry in under a minute, built and run by one team, in the US and India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#build" className="inline-flex h-12 items-center rounded-xl bg-[var(--gold)] px-6 text-[15px] font-semibold text-[var(--ink)] hover:brightness-110">Build your plan →</a>
            <a href="/#book" className="inline-flex h-12 items-center rounded-xl border border-[var(--border-strong)] px-6 text-[15px] font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">Book a 15-min call</a>
          </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[200px] sm:max-w-[260px] lg:max-w-[340px]" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border" style={{ borderColor: `${ind.mood.tint}55` }} />
            <div className="absolute inset-[12%] rounded-full border border-dashed" style={{ borderColor: `${ind.mood.tint}33` }} />
            <div className="absolute inset-[18%] rounded-full blur-2xl" style={{ background: `radial-gradient(closest-side, ${ind.mood.tint}40, transparent)` }} />
            <Lottie name={ind.mood.icon} color={ind.mood.tint} strokeWidth={1.4} className="absolute inset-[22%] h-[56%] w-[56%]" />
          </div>
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="font-display text-[clamp(28px,4vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl">
          Sound familiar?
        </h2>
        <ul className="mt-8 grid md:grid-cols-3 gap-4">
          {ind.pains.map((p) => (
            <li key={p} className="flex gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 text-[16px] leading-relaxed text-[var(--text-secondary)]">
              <X className="mt-1 w-4 h-4 shrink-0 text-[#A0432E]" strokeWidth={3} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {INDUSTRY_CHATS[ind.slug] && <ChatDemo scripts={INDUSTRY_CHATS[ind.slug]} eyebrow={`The AI, for ${ind.plural}`} />}

      <section className="bg-[var(--bg-secondary)] py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="font-display text-[clamp(28px,4vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl">
            What this looks like for <span className="italic text-[var(--accent)]">{ind.plural}.</span>
          </h2>
          <p className="mt-3 mb-10 text-[16px] text-[var(--text-secondary)]">Sample businesses, to show the style, not clients.</p>
          <MarketMockups samples={ind.samples} />
          <a href={`/inspiration?industry=${ind.slug}`} className="link-grow mt-10 inline-block text-[15px] font-semibold text-[var(--accent)]">See real {ind.plural} websites we admire →</a>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="font-display text-[clamp(28px,4vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          Three things, one team.
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {services.map((s) => (
            <a key={s.href} href={s.href} className="group lift overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 shadow-[var(--shadow-card)] hover:border-[var(--gold)] transition-colors">
              <span className="-mx-7 -mt-7 mb-2 flex h-40 items-center justify-center bg-[var(--ink)] bg-[radial-gradient(70%_90%_at_50%_100%,rgba(201,168,106,0.16),transparent_70%)]">
                <ServiceArt kind={s.art} className="h-32 w-auto transition-transform duration-500 group-hover:scale-[1.04]" />
              </span>
              <h3 className="mt-5 text-[20px] font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{s.body}</p>
              <p className="mt-4 text-[13px] font-semibold text-[var(--accent)]">{s.price}</p>
            </a>
          ))}
        </div>
        <RelatedGuides slugs={GUIDES[ind.slug] ?? []} categories={[ind.ai]} title={`Guides for ${ind.plural}`} className="mt-16" />
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[var(--text-secondary)]">
          {["No long-term contracts", "Websites live in about a week", "See the site before you pay in full"].map((t) => (
            <li key={t} className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} aria-hidden="true" />{t}</li>
          ))}
        </ul>
      </section>

      <section className="cta-band ink py-16 sm:py-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.05]">
            Ready to be the first name they call?
          </h2>
          <a href="/#book" className="mt-8 inline-flex h-12 items-center rounded-xl bg-[var(--gold)] px-7 text-[15px] font-semibold text-[var(--ink)] hover:brightness-110">Book a 15-min call →</a>
          <p className="mt-6 text-[14px] text-[var(--text-tertiary)]">
            Other industries:{" "}
            {INDUSTRIES.filter((i) => i.slug !== ind.slug).map((i, k) => (
              <span key={i.slug}>{k > 0 && " · "}<a href={`/for/${i.slug}`} className="link-grow hover:text-[var(--gold)]">{i.name}</a></span>
            ))}
          </p>
        </div>
      </section>
    </main>
  );
}
