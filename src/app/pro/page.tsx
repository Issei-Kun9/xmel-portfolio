import { ArrowRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import WhatsappCta, {
  WhatsappCtaGhost,
  WhatsappIcon,
  PHONE_DISPLAY,
} from "./whatsapp-cta";
import CapacityBar, { BATCH_SIZE, PLACES_LEFT } from "./capacity";
import StoreInspirations from "./store-inspirations";
import Lottie from "@/components/motion/lottie";
import Words from "@/components/motion/words";

/**
 * Ad landing page for the ₹12,000 online-store offer.
 * Served at https://pro.xmelautomations.xyz (see src/middleware.ts).
 *
 * One conversion: visitor → WhatsApp → asks for the ₹2,000 link.
 *
 * Sibling of /sites (the ₹2,500 single-page offer). Kept as a separate page
 * rather than a shared template on purpose: the two will be tested and
 * rewritten independently, and marketing copy that shares a template tends to
 * get worse in both places at once.
 */
const OFFER = {
  total: "₹12,000",
  today: "₹2,000",
  later: "₹10,000",
  products: 50,
  deliveryDays: 21,
};

const INCLUDED = [
  {
    title: "Your own store, on your own domain",
    body: "yourbrand.com, not a marketplace listing. Your logo, your colours, your customers.",
  },
  {
    title: `Up to ${OFFER.products} products uploaded`,
    body: "Photos, prices, sizes, colours and descriptions — set up for you, organised into collections.",
  },
  {
    title: "UPI, cards and cash on delivery",
    body: "Checkout connected to a payment gateway, so money lands in your bank account. COD if you want it.",
  },
  {
    title: "Shipping, sorted",
    body: "Delivery charges, free-shipping thresholds and a shipping partner connected, so orders are ready to dispatch.",
  },
  {
    title: "WhatsApp on every product",
    body: "A tap-to-ask button for customers who want to check a size or a colour before they buy.",
  },
  {
    title: "Built for phones first",
    body: "Nearly all of your buyers will be on a phone. Every page, cart and checkout step is designed for that.",
  },
  {
    title: "Policy pages done",
    body: "Returns, shipping, privacy and terms — the pages payment gateways ask for before they approve you.",
  },
  {
    title: "Found on Google",
    body: "Titles, descriptions and a sitemap set up for every product and collection, and submitted to Google.",
  },
  {
    title: "You can run it yourself",
    body: "A walkthrough video at launch: add a product, change a price, fulfil an order. No developer needed.",
  },
];

/**
 * Why a store of your own, stated as consequences rather than statistics.
 * Every line holds whatever marketplace or month it is.
 */
const WHY_OWN_STORE = [
  {
    title: "Instagram DMs don't scale",
    body: "Answering “price?” forty times a day, chasing UPI screenshots, typing addresses into notes. A store takes the order and the payment while you sleep.",
  },
  {
    title: "Marketplaces own your customer",
    body: "On a marketplace you pay a cut of every order and the buyer belongs to the platform. On your store the customer, the data and the repeat order are yours.",
  },
  {
    title: "A real store makes you look established",
    body: "A proper checkout on your own domain reads as a brand, not a side hustle — and people pay more readily to a brand.",
  },
];

const WHY_NOW = [
  {
    title: `Only ${BATCH_SIZE} stores a month`,
    body: "A store is products, payments, shipping and policies, not just pages. Each one takes real hours, so the number per month is fixed.",
  },
  {
    title: "Builds start in the order they're reserved",
    body: `Your ${OFFER.today} holds your place in the queue. Reserve later and you aren't turned away — you just start later.`,
  },
  {
    title: "Nothing more is owed until it's live",
    body: `The ${OFFER.later} is due when your store is live and you've placed a test order yourself. Until then you've risked ${OFFER.today}, refundable.`,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Reserve your store",
    body: `Message me on WhatsApp. I send the ${OFFER.today} payment details and your place in the queue is held.`,
  },
  {
    n: "02",
    title: "Pick a look and send your products",
    body: "Point at a store below that you like. Then send your logo, product photos, prices and variants.",
  },
  {
    n: "03",
    title: "I build it",
    body: `Around ${OFFER.deliveryDays} days. You get a preview link the whole way, so you're never waiting in the dark.`,
  },
  {
    n: "04",
    title: "It goes live, then you pay the rest",
    body: `Once the store is live on your domain and you've placed a test order, the ${OFFER.later} is due.`,
  },
];

const FAQS = [
  {
    q: "Which platform is the store built on?",
    a: "We decide together on WhatsApp. Shopify if you want the easiest dashboard to run yourself (Shopify has its own monthly plan, paid directly to them), or WooCommerce if you'd rather avoid a monthly platform fee. Either way, the store and the account are in your name.",
  },
  {
    q: `What's included for ${OFFER.total}?`,
    a: `Store design, up to ${OFFER.products} products uploaded, collections, payment gateway, shipping setup, WhatsApp button, policy pages, basic Google setup and a walkthrough video. If you have far more products, say so and I'll quote it before we start — never after.`,
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
    a: "When the store is live on your domain and you've placed a test order yourself. Not on a milestone, not halfway — live and taking orders.",
  },
  {
    q: "How long does it take?",
    a: `Around ${OFFER.deliveryDays} days from the day you send your products and details — not from the day you pay. Payment-gateway approval can add a few days; I handle the paperwork with you.`,
  },
  {
    q: "Are there any ongoing costs?",
    a: "Nothing monthly to me. You pay directly for your domain (yearly), your platform plan if you choose Shopify, and the payment gateway's per-transaction fee. I'll show you the exact numbers for your setup before you pay anything.",
  },
  {
    q: "Can you make it look like one of the stores on this page?",
    a: "In spirit, yes: the layout, the feel, the way products are shown. Not a copy — your brand, your colours, your photos. Point at the one you like on WhatsApp and we start from there.",
  },
  {
    q: "Can I add products myself later?",
    a: "Yes. That's the point of the walkthrough video. Adding a product takes a couple of minutes once you've seen it done.",
  },
  {
    q: "What happens after I message you on WhatsApp?",
    a: `I reply with a few questions about your products and the ${OFFER.today} payment details. No call unless you want one, and if a store isn't the right fit yet I'll say so.`,
  },
];

export default function ProLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "E-commerce website development",
    name: "Online store build",
    provider: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
      telephone: "+91 7905214791",
    },
    areaServed: "IN",
    description: `A complete online store with up to ${OFFER.products} products, payments and shipping. ₹12,000 total — ₹2,000 to start, ₹10,000 when it goes live.`,
    offers: {
      "@type": "Offer",
      price: "12000",
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

  const h2 =
    "font-display text-[clamp(24px,5vw,38px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)]";

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
      <div className="sticky top-0 z-40 bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_2px_18px_-4px_rgba(201,168,106,0.45)]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-center gap-2.5 text-center">
          <span className="relative flex w-2 h-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--on-accent)] status-pulse" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--on-accent)]" />
          </span>
          <p className="font-mono text-[11px] sm:text-[12.5px] uppercase tracking-[0.08em]">
            <strong className="font-semibold">
              Online store · {OFFER.total}
            </strong>
            <span className="mx-1.5 opacity-50">·</span>
            <span className="whitespace-nowrap">
              {PLACES_LEFT} of {BATCH_SIZE} builds left this month
            </span>
            <span className="hidden sm:inline">
              <span className="mx-1.5 opacity-50">·</span>
              <span>{OFFER.today} to start</span>
            </span>
          </p>
        </div>
      </div>

      {/* ============================================================== Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-35%] left-1/2 -translate-x-1/2 w-[85%] h-[70%] rounded-full opacity-[0.16] blur-[120px]"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
          />
        </div>

        <Lottie name="rocket" className="float-slow absolute right-[4%] top-10 hidden md:block w-40 h-40 lg:w-52 lg:h-52 z-0 pointer-events-none" />
        <div className="relative z-10 max-w-[840px] mx-auto px-5 sm:px-8 pt-8 sm:pt-14 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-4">
            E-commerce package
          </p>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(30px,7.2vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--text-primary)] mb-4"
          >
            <Words text="Your own online store. Taking orders in 3 weeks." />
          </h1>

          <p className="text-[16px] sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[540px] mb-5">
            Up to {OFFER.products} products, UPI / card / COD checkout, shipping
            and WhatsApp — built, set up and handed over, ready to sell.
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
            WhatsApp — Reserve my store for {OFFER.today}
          </WhatsappCta>

          <p className="inline-flex items-start gap-2 mt-3 max-w-[470px]">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[var(--accent)] mt-0.5" aria-hidden="true" />
            <span className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)] font-semibold">
                {OFFER.today} to start, refundable
              </strong>{" "}
              before your build begins — the {OFFER.later} is due only once your
              store is live.
            </span>
          </p>

          <div className="mt-9 pt-8 border-t border-[var(--border-subtle)] max-w-[520px]">
            <a
              href="#inspirations"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)] hover:underline underline-offset-4"
            >
              See the stores you can pick a style from
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-5">
              One-time build fee · No monthly fee to me
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================= Inspirations */}
      <section
        id="inspirations"
        aria-labelledby="inspo-heading"
        className="scroll-mt-14 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-3">
            Inspirations
          </p>
          <h2 id="inspo-heading" className={`${h2} mb-3`}>
            Pick a style. I&apos;ll build yours in that direction.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[600px] mb-10">
            Real Indian brands with stores worth borrowing from. Send me the one
            closest to what you want — the layout, the feel, the way products
            are shown — and your store starts there, in your brand.
          </p>

          <StoreInspirations />

          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-5">
            Real stores we admire, shown for style reference — not our work, no
            affiliation
          </p>

          <div className="mt-9">
            <WhatsappCtaGhost>
              I like one of these — reserve my store
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* =================================================== Risk reversal flow */}
      <section aria-labelledby="flow-heading" className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <h2
            id="flow-heading"
            className="font-display text-[clamp(22px,4.5vw,32px)] font-semibold tracking-[-0.015em] text-[var(--text-primary)] mb-3"
          >
            You pay the bulk of it only once it&apos;s taking orders.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-9">
            And the {OFFER.today}{" "}that starts it is refundable right up until I
            begin your build — so today&apos;s decision is genuinely reversible.
          </p>

          <ol className="grid sm:grid-cols-4 gap-3">
            {[
              { label: "You pay", value: OFFER.today, note: "Holds your place", strong: true },
              { label: "Then", value: "Pick a style", note: "From the stores above", strong: false },
              { label: "Then", value: "It goes live", note: "You place a test order", strong: false },
              { label: "Only then", value: OFFER.later, note: "The remaining balance", strong: true },
            ].map((step) => (
              <li
                key={step.value}
                className={`relative p-5 rounded-xl border bg-[var(--bg-secondary)] ${
                  step.strong ? "border-[var(--accent-line)]" : "border-[var(--border-subtle)]"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] block mb-2">
                  {step.label}
                </span>
                <span
                  className={`font-display text-[22px] font-semibold block leading-none mb-2 ${
                    step.strong ? "text-[var(--accent)]" : "text-[var(--text-primary)]"
                  }`}
                >
                  {step.value}
                </span>
                <span className="text-[13px] text-[var(--text-secondary)]">{step.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ====================================================== What you get */}
      <section
        aria-labelledby="included-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="included-heading" className={`${h2} mb-10 max-w-[620px]`}>
            Everything a store needs to sell on day one.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
              >
                <Check className="w-5 h-5 text-[var(--accent)] mb-4" aria-hidden="true" />
                <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <WhatsappCtaGhost>
              Reserve my store for {OFFER.today}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* ===================================================== Why own store */}
      <section aria-labelledby="own-heading" className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="own-heading" className={`${h2} mb-3`}>
            Why a store of your own.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            Selling through DMs and marketplaces works — until it becomes the
            thing holding you back.
          </p>

          <div className="space-y-3">
            {WHY_OWN_STORE.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
              >
                <span className="shrink-0 w-1 rounded-full bg-[var(--accent-line)]" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-[16px] font-semibold text-[var(--text-primary)] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ Hermont */}
      <section
        aria-labelledby="built-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="built-heading" className={`${h2} mb-10`}>
            Here&apos;s what I&apos;ve built.
          </h2>

          <a
            href="https://hermont.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--accent-line)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] transition-colors duration-300"
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
                {["Design and build", "Mobile-first", "Content and structure", "Live on its own domain"].map((tag) => (
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
            Same care, applied to your products, your checkout and your brand.
          </p>
        </div>
      </section>

      {/* ======================================================= How it works */}
      <section aria-labelledby="how-heading" className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="how-heading" className={`${h2} mb-10`}>
            How it works.
          </h2>

          <ol className="space-y-4">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="flex gap-5 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
              >
                <span className="font-mono text-[13px] text-[var(--accent)] shrink-0 pt-0.5" aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-semibold text-[var(--text-primary)] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
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
          <h2 id="whynow-heading" className={`${h2} mb-3`}>
            Why reserve now rather than later.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            No fake countdown and no invented shortage. Three plain reasons,
            all true whenever you happen to read this.
          </p>

          <ol className="grid sm:grid-cols-3 gap-4">
            {WHY_NOW.map((item, i) => (
              <li
                key={item.title}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
              >
                <span className="font-mono text-[12px] text-[var(--accent)] block mb-3" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="font-display text-[16px] font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="max-w-[520px] mt-9">
            <CapacityBar />
          </div>

          <div className="mt-6">
            <WhatsappCtaGhost>
              Hold my place for {OFFER.today}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* ========================================================= Pricing */}
      <section aria-labelledby="pricing-heading" className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="pricing-heading" className={`${h2} mb-3`}>
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

          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)]">
            No monthly fee to me · Platform and gateway fees paid directly, at cost
          </p>
        </div>
      </section>

      {/* =========================================================== FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="faq-heading" className={`${h2} mb-9`}>
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
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 pr-8">{f.a}</p>
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
          {PLACES_LEFT} of {BATCH_SIZE} store builds left this month
        </p>
      </div>

      {/* ===================================================== Final CTA */}
      <section aria-labelledby="final-heading" className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <h2
            id="final-heading"
            className="font-display text-[clamp(26px,6vw,42px)] font-semibold tracking-[-0.025em] text-[var(--text-primary)] mb-5"
          >
            Ready to start selling on your own store?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4 max-w-[460px] mx-auto">
            Reserve your store for {OFFER.today}. I&apos;ll send the payment
            details on WhatsApp.
          </p>
          <p className="text-[15px] text-[var(--text-primary)] mb-9 max-w-[460px] mx-auto">
            {OFFER.total} total — and the {OFFER.later} is due only once your
            store is live and taking orders.
          </p>

          <WhatsappCta className="w-full sm:w-auto">
            <WhatsappIcon />
            WhatsApp — Reserve my store for {OFFER.today}
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
