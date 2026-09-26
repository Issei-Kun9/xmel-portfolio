import { ArrowRight, Check } from "lucide-react";
import Lottie from "@/components/motion/lottie";
import { MARKET_CONFIG, type Market } from "@/lib/market";
import { SEO_SERVICE, WEBSITE_DEV } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import MarketSwitch from "@/components/site/market-switch";

/**
 * The homepage's core: every service, its promise and its starting price, on
 * the brand's dark ink band. Prices come from market.ts / services.ts, so
 * this never drifts from the service pages.
 */
export default function ServicesShowcase({ market }: { market: Market }) {
  const ai = MARKET_CONFIG[market].tiers[0];
  const web = WEBSITE_DEV[market].tiers[0];
  const seo = SEO_SERVICE[market].tiers[0];

  const services = [
    {
      lottie: "house",
      label: "AI for real estate",
      title: "Every portal lead answered and qualified in under a minute",
      points: ["Replies by " + MARKET_CONFIG[market].replyChannel + " at 2 AM too", "Qualifies budget and timeline", "Books showings and site visits"],
      price: `${ai.setup} setup + ${ai.monthly}/mo`,
      href: "/ai-automation-real-estate",
    },
    {
      lottie: "tools",
      label: "AI for home services",
      title: "An AI receptionist that never misses a call or a job",
      points: ["Answers every call and missed call", "Captures the job details", "Books the slot, flags emergencies"],
      price: `${ai.setup} setup + ${ai.monthly}/mo`,
      href: "/ai-automation-home-services",
    },
    {
      lottie: "laptop",
      label: "Website development",
      title: "A website that turns visitors into enquiries, live in a week",
      points: ["Written around your business", "Mobile-first and fast", "Yours to keep, no page-builder fee"],
      price: `${web.price} one-time`,
      href: "/website-development",
    },
    {
      lottie: "growth-chart",
      label: "SEO",
      title: "Get found on Google by people ready to buy",
      points: ["Technical fixes first", "Content for real searches", "Monthly report in plain English"],
      price: `${seo.price}/month`,
      href: "/seo",
    },
  ];

  return (
    <section id="services" className="ink scroll-mt-20 py-16 sm:py-24">
      <span id="pricing" className="block -mt-20 pt-20" aria-hidden="true" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">What we do</p>
            <h2 className="mt-2 font-display text-[clamp(32px,4.8vw,56px)] font-medium leading-[1.04] tracking-[-0.02em] max-w-3xl">
              Four ways to win more customers. <span className="gold-italic">Pick one, or all.</span>
            </h2>
          </div>
          <MarketSwitch current={market} />
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="spotlight lift group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(245,240,230,0.12)] bg-[rgba(245,240,230,0.04)] p-7 hover:border-[var(--gold)] hover:bg-[rgba(201,168,106,0.07)] transition-colors duration-300"
            >
              <Lottie name={s.lottie} className="absolute right-5 top-5 w-16 h-16 opacity-90" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--gold)]">{s.label}</span>
              <h3 className="mt-3 pr-16 text-[22px] font-semibold leading-snug">{s.title}</h3>
              <ul className="mt-4 space-y-2 flex-1">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15px] text-[rgba(245,240,230,0.78)]">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--gold)]" strokeWidth={2.5} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-end justify-between gap-4 border-t border-[rgba(245,240,230,0.12)] pt-5">
                <div>
                  <p className="text-[12px] text-[rgba(245,240,230,0.6)]">From</p>
                  <p className="font-display text-[22px] font-medium text-[var(--gold)]">{s.price}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--gold)]">
                  See details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[14px] text-[var(--text-tertiary)]">Built for</span>
          {INDUSTRIES.map((i) => (
            <a key={i.slug} href={`/for/${i.slug}`} className="rounded-full border border-[var(--border-subtle)] px-3.5 py-1.5 text-[13px] text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
              {i.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
