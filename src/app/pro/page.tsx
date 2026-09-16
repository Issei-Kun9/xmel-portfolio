import { ArrowRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import WhatsappCta, {
  WhatsappCtaGhost,
  WhatsappIcon,
  PHONE_DISPLAY,
} from "./whatsapp-cta";
import BusinessPreviews from "@/components/offer/business-previews";
import CapacityBar from "./capacity";

/**
 * Ad landing page for the ₹4,000 multi-page website offer.
 * Served at https://pro.xmelautomations.xyz (see src/middleware.ts).
 *
 * One conversion: visitor → WhatsApp → asks for the ₹500 link.
 *
 * Sibling of /sites (the ₹2,500 single-page offer). Kept as a separate page
 * rather than a shared template on purpose: the two will be tested and
 * rewritten independently, and marketing copy that shares a template tends to
 * get worse in both places at once.
 *
 * No client components — the page ships no route JavaScript.
 */
const OFFER = {
  total: "₹4,000",
  today: "₹500",
  later: "₹3,500",
  pages: 6,
  deliveryDays: 12,
};

const INCLUDED = [
  {
    title: `Up to ${OFFER.pages} pages`,
    body: "Home, services, about, gallery, contact — each one written and designed for what it needs to do.",
  },
  {
    title: "A page per service",
    body: "So a customer looking for one specific thing lands on a page about that thing, not a paragraph buried on your home page.",
  },
  {
    title: "Built for phones first",
    body: "Every page reads properly on a phone. That's where nearly all of your visitors will be.",
  },
  {
    title: "WhatsApp on every page",
    body: "A tap-to-message button wherever they are, so they never have to hunt for your number.",
  },
  {
    title: "Your own web address",
    body: "Your business on its own domain — on your card, your board, your invoices.",
  },
  {
    title: "Gallery of your work",
    body: "Photos of what you actually do, laid out so they load fast and look deliberate.",
  },
  {
    title: "Your business content",
    body: "Services, prices, timings, location, contact details. You send the facts, I write the words.",
  },
  {
    title: "Launch and setup",
    body: "Domain connected, site live, technical side handled. You don't touch any of it.",
  },
];

/**
 * Urgency here is structural, not theatrical: every claim is a consequence of
 * how the offer actually works, so it holds however long the page is live.
 * No countdowns, no invented statistics.
 */
const COST_OF_WAITING = [
  {
    title: "One page can't answer every question",
    body: "A customer who wants to know if you handle their particular job shouldn't have to call to find out. A page that answers it wins the enquiry.",
  },
  {
    title: "You look smaller than you are",
    body: "A single page reads as a side project. A proper structure reads as an established business — often before anyone has read a word.",
  },
  {
    title: "Google has less to work with",
    body: "One page gives search engines one thing to understand about you. A page per service gives them several, each about something specific.",
  },
];

const WHY_NOW = [
  {
    title: "Only a few run at a time",
    body: `A ${OFFER.pages}-page build is real work — writing, structure, design, launch. I take a small number each month because each one takes real hours.`,
  },
  {
    title: "Builds start in the order they're reserved",
    body: `Your ${OFFER.today} holds your place in the queue. Reserve later and you aren't turned away — you just start later.`,
  },
  {
    title: "Nothing is owed until it's live",
    body: `The ${OFFER.later} is due when your website is live and you've seen it working. Until then you've risked ${OFFER.today}, refundable.`,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Reserve your build",
    body: `Message me on WhatsApp. I send the ${OFFER.today} payment details and your place in the queue is held.`,
  },
  {
    n: "02",
    title: "We plan the pages",
    body: `We work out what the ${OFFER.pages} pages should be for your business — not a fixed template. Then you send photos and details.`,
  },
  {
    n: "03",
    title: "I build it",
    body: `Around ${OFFER.deliveryDays} days. You get a preview link the whole way, so you're never waiting in the dark.`,
  },
  {
    n: "04",
    title: "It goes live, then you pay the rest",
    body: `The ${OFFER.later} is due once the site is live on your domain and you've seen it working.`,
  },
];

const FAQS = [
  {
    q: `What makes this ${OFFER.total} and not less?`,
    a: `This is a ${OFFER.pages}-page build: separate pages for your services, your work, who you are and how to reach you. Each page is planned, written and designed. If a single page covers what you need, say so on WhatsApp and I'll tell you honestly — there's a smaller build for that.`,
  },
  {
    q: `Why do I only pay ${OFFER.today} first?`,
    a: `Because you shouldn't hand ${OFFER.total} to someone you've just met online. The ${OFFER.today} reserves your build and lets me start. It's the smallest amount that makes the commitment real on both sides.`,
  },
  {
    q: `What if I change my mind after paying the ${OFFER.today}?`,
    a: `If I haven't started your build yet, message me and I'll refund the ${OFFER.today}. You're reserving a place, not signing a contract you can't get out of.`,
  },
  {
    q: `When exactly do I pay the ${OFFER.later}?`,
    a: "When the website is live on your domain and you've seen it working. Not on a milestone, not halfway — live.",
  },
  {
    q: "How long does it take?",
    a: `Around ${OFFER.deliveryDays} days from the day you send your business details — not from the day you pay. More pages means more writing, so it's longer than a single-page build.`,
  },
  {
    q: "Do I have to pay every month?",
    a: "Not to me. No monthly fee for the website itself. Domain renewal is paid once a year directly to the registrar, and hosting for a site this size is free or close to it — you pay those yourself, not through me.",
  },
  {
    q: "What if I need more than the pages included?",
    a: `${OFFER.pages} pages covers almost every local business. If yours genuinely needs more, tell me what and I'll quote it before we start — never after.`,
  },
  {
    q: "Can I add or change things later?",
    a: "Text and images are set up so you can edit them yourself, and I send a short walkthrough video at launch. For bigger changes, message me.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. If you own one I'll connect it. If not, I'll help you pick and register one — in your name, owned by you.",
  },
  {
    q: "What happens after I message you on WhatsApp?",
    a: `I reply with a few questions about your business and the ${OFFER.today} payment details. No call unless you want one, and if it isn't a fit I'll say so.`,
  },
];

export default function ProLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website design and development",
    name: "Multi-page business website",
    provider: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
      telephone: "+91 7905214791",
    },
    areaServed: "IN",
    description: `A ${OFFER.pages}-page mobile-first website for a business. ₹4,000 total — ₹500 to start, ₹3,500 when it goes live.`,
    offers: {
      "@type": "Offer",
      price: "4000",
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

      {/* -------------------------------------------------------- Scarcity bar */}
      <div className="sticky top-0 z-40 bg-[var(--accent)] text-white shadow-[0_2px_12px_-4px_rgba(15,76,156,0.5)]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-center gap-2.5 text-center">
          <span className="relative flex w-2 h-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-white status-pulse" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
          </span>

          <p className="font-mono text-[11px] sm:text-[12.5px] uppercase tracking-[0.08em]">
            <strong className="font-semibold">
              {OFFER.pages}-page build · {OFFER.total}
            </strong>
            <span className="mx-1.5 opacity-60">·</span>
            <span className="whitespace-nowrap">
              {OFFER.today} to start
            </span>
            <span className="hidden sm:inline">
              <span className="mx-1.5 opacity-60">·</span>
              <span className="opacity-90">Limited builds, reserved in order</span>
            </span>
          </p>
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

        <div className="relative z-10 max-w-[840px] mx-auto px-5 sm:px-8 pt-8 sm:pt-14 pb-12">
          {/*
            Decision-critical content only, above the fold: headline, price,
            scarcity, button. Supporting detail sits below the CTA.
          */}
          <h1
            id="hero-heading"
            className="font-display text-[clamp(30px,7.2vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--text-primary)] mb-4"
          >
            A proper website. Not just one page.
          </h1>

          <p className="text-[16px] sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[520px] mb-5">
            Up to {OFFER.pages} pages — your services, your work, your business
            — live in about {OFFER.deliveryDays} days.
          </p>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-display text-[40px] sm:text-[52px] font-semibold leading-none text-[var(--text-primary)]">
              {OFFER.total}
            </span>
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              total · {OFFER.today} to start
            </span>
          </div>

          <div className="max-w-[480px] mb-5">
            <CapacityBar />
          </div>

          <WhatsappCta className="w-full sm:w-auto">
            <WhatsappIcon />
            WhatsApp — Reserve my build for {OFFER.today}
          </WhatsappCta>

          <p className="inline-flex items-start gap-2 mt-3 max-w-[470px]">
            <ShieldCheck
              className="w-4 h-4 shrink-0 text-[var(--accent)] mt-0.5"
              aria-hidden="true"
            />
            <span className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)] font-semibold">
                {OFFER.today} to start, refundable
              </strong>{" "}
              before your build begins — the {OFFER.later} is due only once your
              site is live.
            </span>
          </p>

          {/* ---- below the fold on a phone: the supporting detail ---- */}
          <div className="mt-9 pt-8 border-t border-[var(--border-subtle)] max-w-[520px]">
            <div className="flex flex-col gap-2 p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)]">
              <p className="text-[15px] sm:text-base text-[var(--text-primary)]">
                Pay{" "}
                <strong className="text-[var(--accent)] font-semibold">
                  {OFFER.today} to start.
                </strong>
              </p>
              <p className="text-[15px] sm:text-base text-[var(--text-secondary)]">
                Pay the remaining {OFFER.later}{" "}
                <strong className="text-[var(--text-primary)] font-medium">
                  when your website is live.
                </strong>
              </p>
            </div>

            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-5">
              {OFFER.pages} pages · One-time payment · No monthly website fee
            </p>

            <p className="text-sm text-[var(--text-tertiary)] mt-4">
              Takes about 30 seconds. I&apos;ll send the {OFFER.today} payment
              details on WhatsApp — it holds your place in the build queue.
            </p>
          </div>
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
            You pay the bulk of it only once it&apos;s live.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-9">
            And the {OFFER.today} that starts it is refundable right up until I
            begin your build — so today&apos;s decision is genuinely reversible.
          </p>

          <ol className="grid sm:grid-cols-4 gap-3">
            {[
              {
                label: "You pay",
                value: OFFER.today,
                note: "Holds your place",
                strong: true,
              },
              {
                label: "Then",
                value: "We plan it",
                note: `What the ${OFFER.pages} pages are`,
                strong: false,
              },
              {
                label: "Then",
                value: "It goes live",
                note: "On your own domain",
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
            What {OFFER.pages} pages actually gets you.
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
              Reserve my build for {OFFER.today}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* ==================================================== Cost of waiting */}
      <section
        aria-labelledby="waiting-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="waiting-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3"
          >
            Why one page usually isn&apos;t enough.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            A single page is better than nothing. It just runs out of room
            faster than most business owners expect.
          </p>

          <div className="space-y-3">
            {COST_OF_WAITING.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
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
        </div>
      </section>

      {/* ========================================================== Previews */}
      <section
        aria-labelledby="previews-heading"
        className="border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2
            id="previews-heading"
            className="font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3"
          >
            Imagine your business here.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            Every business needs slightly different pages. Here is the shape it
            usually takes.
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
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
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
            className="group block rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] transition-colors duration-300"
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
              <span className="flex-1 mx-2 px-3 py-1 rounded bg-[var(--bg-secondary)] font-mono text-[11px] text-[var(--text-tertiary)] truncate">
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
        className="border-t border-[var(--border-subtle)]"
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
                className="flex gap-5 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
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
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
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
            reasons, all true whenever you happen to read this.
          </p>

          <ol className="grid sm:grid-cols-3 gap-4">
            {WHY_NOW.map((item, i) => (
              <li
                key={item.title}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
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
            Agreed before I start. No hourly billing, no invoice at the end you
            didn&apos;t expect.
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
                When it&apos;s live
              </dt>
              <dd className="font-display text-[40px] font-semibold text-[var(--text-primary)] leading-none">
                {OFFER.later}
              </dd>
            </div>
          </dl>

          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)] mb-8">
            No monthly website fee
          </p>

          <div className="max-w-[520px]">
            <CapacityBar />
          </div>
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
        Sticky mobile CTA — position:sticky, not fixed, so it rides the bottom
        of the viewport and then lands in the flow just above the final CTA.
        No duplicate buttons on screen, and no JavaScript to arrange it.
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
            Ready to give your business a real website?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4 max-w-[460px] mx-auto">
            Reserve your build for {OFFER.today}. I&apos;ll send the payment
            details on WhatsApp.
          </p>
          <p className="text-[15px] text-[var(--text-primary)] mb-9 max-w-[460px] mx-auto">
            {OFFER.pages} pages, {OFFER.total} total — and the {OFFER.later} is
            due only once your site is live.
          </p>

          <WhatsappCta className="w-full sm:w-auto">
            <WhatsappIcon />
            WhatsApp — Reserve my build for {OFFER.today}
          </WhatsappCta>

          <p className="text-[13px] text-[var(--accent)] mt-4 font-medium">
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
