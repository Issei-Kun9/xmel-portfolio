import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Collapsible, CollapsibleGroup } from "@astryxdesign/core/Collapsible";
import Breadcrumbs, { type Crumb } from "@/components/shared/breadcrumbs";
import Words from "@/components/motion/words";

/*
 * The site's shared page kit: one header, one section heading, one card
 * grid, one step timeline, one FAQ and one closing band, all in the
 * homepage's ink / ivory / gold language. Inner pages compose these instead
 * of hand-rolling their own, so every page looks like the same site.
 */

/** Button looks. `gold` on ink, `ink` on paper; `ghost` adapts via the .ink tokens. */
export const btn = {
  gold: "shine-sweep inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[var(--gold)] text-[var(--ink)] text-[15px] font-semibold hover:brightness-110 transition-[filter]",
  ink: "shine-sweep inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[var(--ink)] text-[var(--ivory)] text-[15px] font-semibold hover:bg-black transition-colors",
  ghost: "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-[var(--border-strong)] text-[var(--text-primary)] text-[15px] font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors",
};

export function Eyebrow({ children, onInk = false }: { children: ReactNode; onInk?: boolean }) {
  return (
    <p className={`text-[13px] font-semibold uppercase tracking-[0.12em] ${onInk ? "text-[var(--gold)]" : "text-[var(--accent)]"}`}>
      {children}
    </p>
  );
}

/**
 * Ink page header: crumbs, eyebrow, a two-part headline (plain + gold
 * italic), lede, actions and proof points on the left; the page's own
 * visual on the right (below the copy on phones, never over the headline).
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  italic,
  lede,
  actions,
  proof,
  visual,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  italic?: string;
  lede: ReactNode;
  actions?: ReactNode;
  proof?: string[];
  visual?: ReactNode;
}) {
  return (
    <div className="ink overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-8 sm:mt-12 grid gap-12 lg:gap-16 items-center ${visual ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
          <div className="min-w-0">
            <Eyebrow onInk>{eyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(38px,5.8vw,72px)] font-medium leading-[1.02] tracking-[-0.03em] max-w-3xl">
              <Words text={title} />
              {italic && (
                <>
                  {" "}
                  <span className="gold-italic">
                    <Words text={italic} start={title.split(" ").length} />
                  </span>
                </>
              )}
            </h1>
            <p className="mt-6 text-[18px] leading-relaxed text-[var(--text-secondary)] max-w-xl">{lede}</p>
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {proof && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[var(--text-secondary)]">
                {proof.map((p) => (
                  <li key={p} className="inline-flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--gold)]" strokeWidth={2.5} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {visual && <div className="min-w-0">{visual}</div>}
        </div>
      </div>
    </div>
  );
}

/** Section heading: eyebrow, serif title with an optional gold italic tail, short lede. */
export function SectionHead({
  eyebrow,
  title,
  italic,
  lede,
  onInk = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  lede?: ReactNode;
  onInk?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}>
      <Eyebrow onInk={onInk}>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
        {title}
        {italic && (
          <>
            {" "}
            <span className={onInk ? "gold-italic" : "italic text-[var(--accent)]"}>{italic}</span>
          </>
        )}
      </h2>
      {lede && <p className="mt-4 text-[17px] leading-relaxed text-[var(--text-secondary)]">{lede}</p>}
    </div>
  );
}

export type Feature = { icon: ReactNode; title: string; body: string };

/** Icon cards. Light cards on paper, or dark glass cards inside an .ink band. */
export function FeatureGrid({ items, onInk = false, cols = 2 }: { items: Feature[]; onInk?: boolean; cols?: 2 | 3 | 4 }) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <ul className={`mt-10 grid gap-4 ${grid}`}>
      {items.map((f) => (
        <li
          key={f.title}
          className={`lift group rounded-2xl p-7 transition-colors duration-300 ${
            onInk
              ? "border border-[rgba(245,240,230,0.12)] bg-[rgba(245,240,230,0.04)] hover:border-[var(--gold)]"
              : "border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-[var(--shadow-card)] hover:border-[var(--gold)]"
          }`}
        >
          <span className={`inline-grid h-12 w-12 place-items-center rounded-xl ${onInk ? "bg-[rgba(201,168,106,0.12)]" : "bg-[var(--ink)]"} text-[var(--gold)]`}>
            {f.icon}
          </span>
          <h3 className="mt-5 text-[19px] font-semibold leading-snug text-[var(--text-primary)]">{f.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered steps on a gold rail. Heading sits beside the steps on desktop
 * (sticky), above them on phones.
 */
export function Steps({
  eyebrow,
  title,
  italic,
  lede,
  steps,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  lede?: ReactNode;
  steps: { title: string; body: string; when?: string }[];
}) {
  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
      <div className="lg:sticky lg:top-28">
        <SectionHead eyebrow={eyebrow} title={title} italic={italic} lede={lede} />
      </div>
      <ol className="relative border-l border-[var(--gold)]/40 ml-5">
        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-10 pb-10 last:pb-0">
            <span className="absolute -left-5 top-0 grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] font-display text-[16px] text-[var(--gold)] ring-4 ring-[var(--bg-secondary)]">
              {i + 1}
            </span>
            {s.when && <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{s.when}</p>}
            <h3 className="mt-1 font-display text-[24px] leading-tight text-[var(--text-primary)]">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-xl">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** FAQ as an accordion (same component as the homepage), with FAQPage structured data. */
export function Faq({ faqs, title = "Questions, answered.", lede }: { faqs: { q: string; a: string }[]; title?: string; lede?: ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SectionHead
        eyebrow="FAQ"
        title={title}
        lede={
          lede ?? (
            <>
              Something else on your mind?{" "}
              <a href="/#book" className="font-semibold text-[var(--accent)] underline underline-offset-4">
                Ask on a 15-minute call.
              </a>
            </>
          )
        }
      />
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 sm:px-4">
        <CollapsibleGroup type="single" defaultValue="faq-0" hasDividers chevronPosition="end">
          {faqs.map((f, i) => (
            <Collapsible
              key={f.q}
              value={`faq-${i}`}
              trigger={<span className="block py-2 text-[16px] font-semibold text-[var(--text-primary)]">{f.q}</span>}
            >
              <p className="pb-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">{f.a}</p>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </div>
    </div>
  );
}

/** Closing ink band: big line, short body, two actions, optional cross-link. */
export function CtaBand({
  title,
  italic,
  body,
  primary = { label: "Book a 15-min call", href: "/#book" },
  secondary,
  note,
}: {
  title: string;
  italic?: string;
  body?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string; external?: boolean };
  note?: ReactNode;
}) {
  return (
    <section className="ink py-20 sm:py-28">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-[clamp(34px,5vw,64px)] font-medium leading-[1.02] tracking-[-0.02em]">
          {title} {italic && <span className="gold-italic">{italic}</span>}
        </h2>
        {body && <p className="mt-5 text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-2xl mx-auto">{body}</p>}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={primary.href} data-cta="book" data-cta-location="cta-band" className={btn.gold}>
            {primary.label}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              {...(secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={btn.ghost}
            >
              {secondary.label}
            </a>
          )}
        </div>
        {note && <p className="mt-8 text-[14px] text-[var(--text-tertiary)]">{note}</p>}
      </div>
    </section>
  );
}
