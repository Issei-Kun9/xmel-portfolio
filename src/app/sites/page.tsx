import { ArrowRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import WhatsappCta, {
  WhatsappCtaGhost,
  WhatsappIcon,
  PHONE_DISPLAY,
} from "./whatsapp-cta";
import BusinessPreviews from "./mockups";

/**
 * Ad landing page for the ₹2,500 website offer.
 * Served at https://sites.xmelautomations.xyz (see src/middleware.ts).
 *
 * One conversion: visitor → WhatsApp → asks for the ₹500 link.
 *
 * Deliberately contains no client components, so the page ships no route
 * JavaScript. Keep it that way — most traffic arrives on mobile data.
 */
const OFFER = {
  total: "₹2,500",
  today: "₹500",
  later: "₹2,000",
  regular: "₹4,000",
  deliveryDays: 7,
};

const INCLUDED = [
  {
    title: "A professional website",
    body: "Designed around your business, your services and the customers you want.",
  },
  {
    title: "Built for phones first",
    body: "Looks right on phones, tablets and desktops — most of your visitors are on a phone.",
  },
  {
    title: "WhatsApp enquiries",
    body: "A tap-to-message button on every screen, so customers reach you without a phone call.",
  },
  {
    title: "Your own web address",
    body: "Your business on its own domain, so you can put it on a card, a board or a bill.",
  },
  {
    title: "Your business content",
    body: "Your services, prices, photos, timings, location and contact details — written for you.",
  },
  {
    title: "Launch and setup",
    body: "The technical side of getting the site live is handled. You don't touch any of it.",
  },
];

/**
 * Urgency on this page is structural, not theatrical: every claim below is a
 * consequence of how the offer actually works, so it stays true however long
 * the page is live. No countdowns, no spot counters, no invented statistics.
 */
const COST_OF_WAITING = [
  {
    title: "They search your name and find nothing",
    body: "Someone hears about you, looks you up, and lands on an empty result or an old social page. They have no way to judge you, so they move on.",
  },
  {
    title: "The enquiry goes to whoever looks established",
    body: "When two businesses offer the same thing, the one with a proper website looks like the safer choice. That comparison is happening without you in it.",
  },
  {
    title: "Nothing is working while you sleep",
    body: "A website answers the same questions at 11pm on a Sunday that you answer on the phone all week. Until it exists, every enquiry costs you your own time.",
  },
];

const WHY_NOW = [
  {
    title: `${OFFER.total} is the introductory price`,
    body: `This batch is priced to build up my portfolio of business websites. When it closes, this build goes back to ${OFFER.regular} — the same work, the ordinary price.`,
  },
  {
    title: "I build these one at a time",
    body: "This isn't a team or a template factory. One build gets my attention at a time, so the number I can take in a month is small and fixed by how long a good one takes.",
  },
  {
    title: "Builds start in the order they're reserved",
    body: `Your ${OFFER.today} holds your place in that queue. Reserve later and you aren't turned away — you just start later.`,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Reserve your spot",
    body: `Message me on WhatsApp. I send the ${OFFER.today} payment details, and your build is booked.`,
  },
  {
    n: "02",
    title: "We build your website",
    body: "Send your business details, photos and anything you want on it. I write and design the rest.",
  },
  {
    n: "03",
    title: "You see it, then you pay the rest",
    body: `You review the finished website. The remaining ${OFFER.later} is due only after that.`,
  },
];

const FAQS = [
  {
    q: `Why is it only ${OFFER.total}?`,
    a: "I'm taking on an introductory batch of business websites to build up this side of my work, so the price is lower than what I'll charge once that batch is done. The work isn't smaller — the price is introductory.",
  },
  {
    q: `Why do I only pay ${OFFER.today} first?`,
    a: `Because you shouldn't have to hand over ${OFFER.total} to someone you've just met on the internet. The ${OFFER.today} reserves your build and lets me start. It's the smallest amount that makes the commitment real on both sides.`,
  },
  {
    q: `What if I change my mind after paying the ${OFFER.today}?`,
    a: `If I haven't started your build yet, message me and I'll refund the ${OFFER.today}. You're reserving a place, not signing a contract you can't get out of.`,
  },
  {
    q: `When do I pay the remaining ${OFFER.later}?`,
    a: "After the website is finished and you've seen it. Not before.",
  },
  {
    q: "How long does the website take?",
    a: `Around ${OFFER.deliveryDays} days from the day you send me your business details — not from the day you pay. If you take a week to send photos, the clock starts when they arrive.`,
  },
  {
    q: "Do I have to pay every month?",
    a: "Not to me. There's no monthly fee for the website itself. Domain renewal is paid once a year directly to the registrar, and hosting for a site this size is free or close to it — you pay those yourself, not through me.",
  },
  {
    q: "What do you need from me?",
    a: "Your business name, what you do, your contact details, and any photos you have. If you don't have photos, tell me and we work with what's available. I write the words.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. If you already own one, I'll connect it. If you don't, I'll help you pick and register one — you own it, in your name.",
  },
  {
    q: "What happens after I message you on WhatsApp?",
    a: `I reply with a couple of questions about your business and the ${OFFER.today} payment details. No call unless you want one, and no pressure — if it isn't a fit, I'll say so.`,
  },
  {
    q: "Can you build a website for my type of business?",
    a: "If customers need to find you, see what you offer and contact you, then yes. Shops, restaurants, salons, clinics, tradespeople, agents, tutors, consultants. Message me what you do and I'll tell you straight if it's a fit.",
  },
];

export default function SitesLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website design and development",
    name: "Business website launch",
    provider: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
      telephone: "+91 7905214791",
    },
    areaServed: "IN",
    description:
      "A professional, mobile-first website for a small business. ₹2,500 total — ₹500 to start, ₹2,000 after you see the finished site.",
    offers: {
      "@type": "Offer",
      price: "2500",
      priceCurrency: "INR",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ----------------------------------------------------------- Top bar */}
      <div className="sticky top-0 z-40 bg-[var(--accent)] text-white">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold">
            Introductory batch — {OFFER.total} instead of {OFFER.regular}
          </span>
          <span className="hidden sm:inline opacity-50" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.1em] opacity-90">
            Builds run one at a time
          </span>
        </div>
      </div>

      {/* ============================================================== Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-35%] left-1/2 -translate-x-1/2 w-[85%] h-[70%] rounded-full opacity-[0.10] blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[840px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12">
          <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-[var(--accent)] mb-6">
            Introductory batch · Limited builds at this price
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(34px,8vw,62px)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--text-primary)] mb-6"
          >
            Your business deserves a proper website.
          </h1>

          <p className="text-[17px] sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-6">
            A professional, mobile-first website built for your business.
          </p>

          {/* The anchor sits in the first screen: the saving reads instantly. */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display text-[44px] sm:text-[52px] font-semibold leading-none text-[var(--text-primary)]">
              {OFFER.total}
            </span>
            <span className="font-display text-[22px] sm:text-[26px] leading-none text-[var(--text-tertiary)] line-through decoration-2">
              {OFFER.regular}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] font-semibold">
              Introductory
            </span>
          </div>

          {/* payment structure, stated before the ask */}
          <div className="inline-flex flex-col gap-2 p-5 mb-7 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)]">
            <p className="text-[15px] sm:text-base text-[var(--text-primary)]">
              Pay{" "}
              <strong className="text-[var(--accent)] font-semibold">
                {OFFER.today} to start.
              </strong>
            </p>
            <p className="text-[15px] sm:text-base text-[var(--text-secondary)]">
              Pay the remaining {OFFER.later}{" "}
              <strong className="text-[var(--text-primary)] font-medium">
                only after you see the finished website.
              </strong>
            </p>
          </div>

          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-6">
            {OFFER.deliveryDays}-day delivery · One-time payment · No monthly
            website fee
          </p>

          {/* The single biggest objection-killer: make it impossible to miss. */}
          <p className="inline-flex items-start gap-2.5 p-4 mb-7 rounded-xl border border-[var(--accent-line)] bg-[var(--accent-soft)] max-w-[480px]">
            <ShieldCheck
              className="w-5 h-5 shrink-0 text-[var(--accent)] mt-0.5"
              aria-hidden="true"
            />
            <span className="text-[15px] text-[var(--text-primary)] leading-relaxed">
              <strong className="font-semibold">
                Your {OFFER.today} is refundable
              </strong>{" "}
              any time before I start your build. Change your mind and you get
              it back.
            </span>
          </p>

          <WhatsappCta className="w-full sm:w-auto">
            <WhatsappIcon />
            WhatsApp — Reserve my spot for {OFFER.today}
          </WhatsappCta>

          <p className="text-sm text-[var(--text-tertiary)] mt-4 max-w-[440px]">
            Takes about 30 seconds. I&apos;ll send the {OFFER.today} payment
            details on WhatsApp — it holds your place in the build queue.
          </p>
        </div>
      </section>

      {/* =================================================== Risk reversal flow */}
      <section
        aria-labelledby="flow-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <h2
            id="flow-heading"
            className="font-display text-[clamp(22px,4.5vw,32px)] font-semibold tracking-[-0.015em] text-[var(--text-primary)] mb-3"
          >
            You are not paying {OFFER.total} upfront.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-9">
            And the {OFFER.today} that starts it is refundable right up until I
            begin your build — so the decision you&apos;re making today is
            genuinely reversible.
          </p>

          <ol className="grid sm:grid-cols-4 gap-3">
            {[
              {
                label: "You pay",
                value: OFFER.today,
                note: "Reserves your build",
                strong: true,
              },
              {
                label: "Then",
                value: "I build it",
                note: `About ${OFFER.deliveryDays} days`,
                strong: false,
              },
              {
                label: "Then",
                value: "You see it",
                note: "The finished website",
                strong: false,
              },
              {
                label: "Only then",
                value: OFFER.later,
                note: "The remaining balance",
                strong: true,
              },
            ].map((step) => (
              <li
                key={step.value}
                className={`relative p-5 rounded-xl border bg-[var(--bg-primary)] ${
                  step.strong
                    ? "border-[var(--accent)]"
                    : "border-[var(--border-subtle)]"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] block mb-2">
                  {step.label}
                </span>
                <span
                  className={`font-display text-[22px] font-semibold block leading-none mb-2 ${
                    step.strong
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {step.value}
                </span>
                <span className="text-[13px] text-[var(--text-secondary)]">
                  {step.note}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ====================================================== What you get */}
      <section
        aria-labelledby="included-heading"
        className="border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="included-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-10 max-w-[620px]"
          >
            Everything you need to get your business online.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
              >
                <Check
                  className="w-5 h-5 text-[var(--accent)] mb-4"
                  aria-hidden="true"
                />
                <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <WhatsappCtaGhost>
              Reserve my spot for {OFFER.today}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* ==================================================== Cost of waiting */}
      <section
        aria-labelledby="waiting-heading"
        className="border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="waiting-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3"
          >
            What another month without one costs you.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            Not having a website isn&apos;t neutral. It quietly costs you
            customers you never hear about.
          </p>

          <div className="space-y-3">
            {COST_OF_WAITING.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
              >
                <span
                  className="shrink-0 w-1 rounded-full bg-[var(--accent-line)]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-[16px] font-semibold text-[var(--text-primary)] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[15px] text-[var(--text-primary)] mt-8 max-w-[520px]">
            None of this is urgent in the way an emergency is. It&apos;s worse —
            it&apos;s the kind of loss you never get told about.
          </p>
        </div>
      </section>

      {/* ========================================================== Previews */}
      <section
        aria-labelledby="previews-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="previews-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3"
          >
            Imagine your business here.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            Every business needs slightly different things on its website. Here
            is the shape it usually takes.
          </p>

          <BusinessPreviews />

          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-5">
            Illustrations of layout — not screenshots of real client sites
          </p>

          <div className="mt-9">
            <WhatsappCtaGhost>
              Ask about my business
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* ============================================================ Hermont */}
      <section
        aria-labelledby="built-heading"
        className="border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="built-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-10"
          >
            Here&apos;s what I&apos;ve built.
          </h2>

          <a
            href="https://hermont.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] transition-colors duration-300"
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)]"
              aria-hidden="true"
            >
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
              </span>
              <span className="flex-1 mx-2 px-3 py-1 rounded bg-[var(--bg-primary)] font-mono text-[11px] text-[var(--text-tertiary)] truncate">
                hermont.in
              </span>
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                Hermont
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                A multidisciplinary advisory group with offices in Surat,
                Jaipur, Delhi and Dubai. A clean, fast, mobile-first site that
                explains what they do and how to reach them.
              </p>

              <ul className="flex flex-wrap gap-2 mb-5">
                {[
                  "Design and build",
                  "Mobile-first",
                  "Content and structure",
                  "Live on its own domain",
                ].map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <span className="inline-flex items-center gap-2 font-mono text-[12px] text-[var(--accent)]">
                Open the live site
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </a>

          <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mt-5">
            Yours would be built the same way, around your business.
          </p>
        </div>
      </section>

      {/* ======================================================= How it works */}
      <section
        aria-labelledby="how-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="how-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-10"
          >
            How it works.
          </h2>

          <ol className="space-y-4">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="flex gap-5 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
              >
                <span
                  className="font-mono text-[13px] text-[var(--accent)] shrink-0 pt-0.5"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-semibold text-[var(--text-primary)] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="text-[var(--text-secondary)] mt-7">
            That&apos;s it. No complicated process.
          </p>

          <div className="mt-8">
            <WhatsappCtaGhost>
              Start with {OFFER.today}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* ========================================================= Why now */}
      <section
        aria-labelledby="whynow-heading"
        className="border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="whynow-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3"
          >
            Why reserve now rather than later.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            No countdown on this page, and no invented shortage. Three plain
            reasons, all of them true whenever you happen to read this.
          </p>

          <ol className="grid sm:grid-cols-3 gap-4">
            {WHY_NOW.map((item, i) => (
              <li
                key={item.title}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
              >
                <span
                  className="font-mono text-[12px] text-[var(--accent)] block mb-3"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-[16px] font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-9">
            <WhatsappCtaGhost>
              Hold my place for {OFFER.today}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* ========================================================= Pricing */}
      <section
        aria-labelledby="pricing-heading"
        className="border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="pricing-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3"
          >
            One price. Split in two.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10">
            Introductory price while this batch lasts — my regular price for
            this build is {OFFER.regular}.
          </p>

          <dl className="grid sm:grid-cols-3 gap-3 mb-4">
            <div className="p-6 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-2">
                Total
              </dt>
              <dd className="font-display text-[40px] font-semibold text-[var(--text-primary)] leading-none">
                {OFFER.total}
              </dd>
            </div>
            <div className="p-6 rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)] mb-2">
                Today
              </dt>
              <dd className="font-display text-[40px] font-semibold text-[var(--accent)] leading-none">
                {OFFER.today}
              </dd>
            </div>
            <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-2">
                After you see it
              </dt>
              <dd className="font-display text-[40px] font-semibold text-[var(--text-primary)] leading-none">
                {OFFER.later}
              </dd>
            </div>
          </dl>

          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)]">
            No monthly website fee
          </p>
        </div>
      </section>

      {/* =========================================================== FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="faq-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-9"
          >
            Before you message me.
          </h2>

          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex items-start justify-between gap-5 cursor-pointer list-none min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] rounded">
                  <h3 className="font-display text-[16px] sm:text-[17px] font-medium text-[var(--text-primary)] group-open:text-[var(--accent)] transition-colors">
                    {f.q}
                  </h3>
                  <span
                    className="shrink-0 font-mono text-xl leading-none text-[var(--text-tertiary)] group-open:rotate-45 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 pr-8">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-9">
            <WhatsappCtaGhost>
              Ask me something else
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/*
        Sticky mobile CTA.

        position:sticky (not fixed) so it rides the viewport bottom while
        scrolling and then simply lands in the flow just above the final CTA —
        no duplicate CTAs on screen, and no JavaScript to make that happen.
      */}
      <div
        className="sm:hidden sticky bottom-0 z-40 px-3 pt-3 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)] to-transparent"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <WhatsappCta size="md" className="w-full">
          <WhatsappIcon className="w-[18px] h-[18px]" />
          WhatsApp — Start for {OFFER.today}
        </WhatsappCta>
        <p className="text-center text-[11px] text-[var(--text-tertiary)] mt-1.5">
          Refundable before your build starts
        </p>
      </div>

      {/* ===================================================== Final CTA */}
      <section
        aria-labelledby="final-heading"
        className="border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <h2
            id="final-heading"
            className="font-display text-[clamp(26px,6vw,42px)] font-semibold tracking-[-0.025em] text-[var(--text-primary)] mb-5"
          >
            Ready to get your business online?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4 max-w-[460px] mx-auto">
            Reserve your website build for {OFFER.today}. I&apos;ll send the
            payment details on WhatsApp.
          </p>
          <p className="text-[15px] text-[var(--text-primary)] mb-9 max-w-[460px] mx-auto">
            {OFFER.total} while this batch is open, {OFFER.regular} after it
            closes — and builds start in the order they&apos;re reserved.
          </p>

          <WhatsappCta className="w-full sm:w-auto">
            <WhatsappIcon />
            WhatsApp — Reserve my spot for {OFFER.today}
          </WhatsappCta>

          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-6">
            {OFFER.total} total · {OFFER.today} to start · {OFFER.later} after
            you see it
          </p>
          <p className="text-[13px] text-[var(--accent)] mt-3 font-medium">
            {OFFER.today} refundable before your build starts
          </p>

          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-10">
            XMEL Automations · {PHONE_DISPLAY}
          </p>
        </div>
      </section>
    </main>
  );
}
