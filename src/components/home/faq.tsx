import { Collapsible, CollapsibleGroup } from "@astryxdesign/core/Collapsible";
import type { MarketConfig } from "@/lib/market";
import { BUNDLE, SEO_SERVICE, WEBSITE_DEV } from "@/lib/services";

function faqsFor(cfg: MarketConfig) {
  const m = cfg.market;
  const [starter] = cfg.tiers;
  return [
    {
      q: "What do you actually do?",
      a: "Three things that bring small businesses more customers: AI that answers and qualifies every new lead in under a minute, websites built around your business, and SEO so people find you on Google. Take one, or the Growth Bundle with all three.",
    },
    {
      q: "How much does it cost?",
      a: `AI Infrastructure starts at ${starter.setup} setup + ${starter.monthly}/month. Websites start at ${WEBSITE_DEV[m].tiers[0].price} one-time. SEO starts at ${SEO_SERVICE[m].tiers[0].price}/month. The Growth Bundle (website + AI + SEO) is ${BUNDLE[m].setup} setup + ${BUNDLE[m].monthly}/month.`,
    },
    {
      q: "How fast can I get started?",
      a: "A website is usually live in about a week. AI Infrastructure takes 2–3 weeks. SEO work starts in the first month, and rankings usually start moving within 8–12 weeks.",
    },
    {
      q: "What if it doesn't work for me?",
      a: "You don't pay the full website price until you've seen the finished site. The AI starts with a 14-day pilot on your real leads — if it doesn't beat your current process, you owe nothing. SEO is month-to-month with no contract.",
    },
    {
      q: "Will my leads know they're talking to an AI?",
      a: "The AI introduces itself as your assistant and writes naturally. It never pretends to be you, and it hands the conversation to you the moment someone asks for a person or needs something unusual.",
    },
    {
      q: "What happens to my customers' data?",
      a: "Lead details are used for one thing: replying to that lead and booking them in. Every conversation is logged to your own Google Sheet or CRM, so you always have the full record. We never sell or share it, and if you leave, it stays with you.",
    },
    {
      q: "What if the AI says something wrong?",
      a: "It only answers from the facts you approve during setup: your services, areas, hours and how you like to price. Anything outside that (a custom quote, a complaint, a tricky question) goes straight to you with the conversation so far. You can read every message it sends.",
    },
    {
      q: m === "in" ? "Is WhatsApp automation allowed?" : "Is it legal to text leads automatically?",
      a:
        m === "in"
          ? "Yes, when it's done properly. The AI replies to people who messaged you first, through WhatsApp's official Business Platform, and anyone who asks to stop is never messaged again."
          : "Yes, when it's done properly. The AI only texts people who contacted you first, for the enquiry they made. Anyone who replies STOP is opted out automatically and never texted again.",
    },
    {
      q: "I already have a website. Do I need a new one?",
      a: "Not necessarily. The AI and SEO work with the site you have. If it's slow, hard to use on a phone or doesn't show up on Google, we'll say so on the call, and only then suggest a rebuild.",
    },
    {
      q: "Do I need to be technical?",
      a: "No. We build, connect and run everything. You keep using your phone, your calendar and WhatsApp — we handle the rest.",
    },
  ];
}

export default function HomeFaq({ cfg }: { cfg: MarketConfig }) {
  const faqs = faqsFor(cfg);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="paper scroll-mt-20 py-16 sm:py-24 bg-[var(--bg-secondary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div>
          <p className="text-[14px] font-semibold text-[var(--accent)]">FAQ</p>
          <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
            Questions, answered.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Something else on your mind?{" "}
            <a href="#book" className="font-semibold text-[var(--accent)] underline underline-offset-4">
              Ask on a 15-minute call.
            </a>
          </p>
        </div>
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
    </section>
  );
}
