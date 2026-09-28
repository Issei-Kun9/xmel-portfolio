import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ChatDemo from "@/components/home/chat-demo";
import RelatedGuides from "@/components/site/related-guides";
import ServicePricing from "@/components/site/service-pricing";
import LeadFlow from "@/components/visuals/lead-flow";
import { AI_SERVICE } from "@/lib/services";
import { CtaBand, Faq, FeatureGrid, PageHero, SectionHead, Steps, btn, type Feature } from "./kit";

/**
 * The layout both AI service pages share (real estate, home services):
 * hero with the lead-flow visual, the live demo, what it does, how it works,
 * what it runs on, pricing, FAQ, guides and a closing band.
 */
export default function AiServicePage(p: {
  crumb: string;
  eyebrow: string;
  title: string;
  italic: string;
  lede: ReactNode;
  auditLabel: string;
  proof: string[];
  flow: ComponentProps<typeof LeadFlow>;
  variant: "real-estate" | "home-services";
  features: { eyebrow: string; title: string; italic: string; items: Feature[] };
  steps: { title: string; italic: string; items: { title: string; body: string }[] };
  stack: { lede: string; tools: string[]; stats: { n: string; label: string }[]; guide: { href: string; label: string } };
  faqs: { q: string; a: string }[];
  guides: string[];
  guidesTitle: string;
  cta: { title: string; italic: string; body: string };
  crossLink: { lead: string; href: string; label: string };
}) {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        crumbs={[{ name: p.crumb }]}
        eyebrow={p.eyebrow}
        title={p.title}
        italic={p.italic}
        lede={p.lede}
        proof={p.proof}
        actions={
          <>
            <a href="/#book" data-cta="book" data-cta-location="hero" className={btn.gold}>
              {p.auditLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="#pricing" className={btn.ghost}>See pricing</a>
          </>
        }
        visual={<LeadFlow {...p.flow} />}
      />

      <ChatDemo variant={p.variant} />

      <section className="paper py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionHead eyebrow={p.features.eyebrow} title={p.features.title} italic={p.features.italic} />
          <FeatureGrid items={p.features.items} />
        </div>
      </section>

      <section className="paper bg-[var(--bg-secondary)] py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Steps eyebrow="How it works" title={p.steps.title} italic={p.steps.italic} steps={p.steps.items} />
        </div>
      </section>

      <section className="paper py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <div>
            <SectionHead eyebrow="Under the hood" title="Real systems," italic="not a chatbot plugin." lede={p.stack.lede} />
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.stack.tools.map((t) => (
                <li key={t} className="rounded-full border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3.5 py-1.5 text-[13px] text-[var(--text-secondary)]">
                  {t}
                </li>
              ))}
            </ul>
            <Link href={p.stack.guide.href} className="link-grow mt-8 inline-block text-[15px] font-semibold text-[var(--accent)]">
              {p.stack.guide.label} →
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)] shadow-[var(--shadow-card)]">
            {p.stack.stats.map((s) => (
              <div key={s.label} className="relative bg-[var(--bg-primary)] p-7">
                <span aria-hidden="true" className="absolute left-7 top-0 h-[2px] w-10 bg-[var(--gold)]" />
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(36px,4.5vw,56px)] leading-none text-[var(--accent)]">{s.n}</span>
                  <span className="mt-3 block text-[14px] leading-snug text-[var(--text-secondary)]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="pricing" className="paper bg-[var(--bg-secondary)] scroll-mt-20 py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionHead
            eyebrow="Pricing"
            title="Start with a pilot."
            italic="Keep it if it wins."
            lede="Every plan starts with a 14-day pilot on your real leads. If it doesn't beat what you do now, you owe nothing."
          />
          <ServicePricing configs={AI_SERVICE} idPrefix={p.variant} />
          <Link href="/blog/ai-lead-response-cost" className="link-grow mt-4 inline-block text-[15px] font-semibold text-[var(--accent)]">
            How this compares with other options →
          </Link>
        </div>
      </section>

      <section className="paper py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Faq faqs={p.faqs} />
        </div>
      </section>

      <section className="paper bg-[var(--bg-secondary)] py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <RelatedGuides slugs={p.guides} limit={6} title={p.guidesTitle} />
        </div>
      </section>

      <CtaBand
        title={p.cta.title}
        italic={p.cta.italic}
        body={p.cta.body}
        primary={{ label: "Book a 15-min call", href: "/#book" }}
        secondary={{ label: "Try the ROI calculator", href: "/tools/roi-calculator" }}
        note={
          <>
            {p.crossLink.lead}{" "}
            <Link href={p.crossLink.href} className="font-semibold text-[var(--gold)] underline underline-offset-4">
              {p.crossLink.label}
            </Link>
          </>
        }
      />
    </main>
  );
}
