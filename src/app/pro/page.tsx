import { ArrowDown, ArrowRight, Check } from "lucide-react";
import WhatsappCta, {
  WhatsappCtaGhost,
  WhatsappIcon,
  PHONE_DISPLAY,
} from "./whatsapp-cta";
import StoreInspirations from "./store-inspirations";
import Words from "@/components/motion/words";

/**
 * Ad landing page for e-commerce websites, aimed at Dubai / UAE businesses.
 * Served at https://pro.xmelautomations.xyz (see src/middleware.ts).
 *
 * One conversion, and nothing competing with it: visitor → WhatsApp → asks
 * for a quote. No checkout, no scarcity, no payment split — the price is a
 * "from" figure and every real number is agreed on WhatsApp.
 */
const FROM_PRICE = "AED 740";

const INCLUDED = [
  {
    title: "Your own store, on your own domain",
    body: "Your brand, your logo, your colours — not a listing on someone else's marketplace.",
  },
  {
    title: "Products, set up for you",
    body: "Photos, prices, sizes and variants uploaded and organised into collections.",
  },
  {
    title: "Card payments and cash on delivery",
    body: "Checkout connected to a payment gateway that works in the UAE, plus COD if you want it.",
  },
  {
    title: "Delivery across the Emirates",
    body: "Delivery charges, free-delivery thresholds and your courier set up, ready to dispatch.",
  },
  {
    title: "WhatsApp on every product",
    body: "One tap for customers who want to ask about a size, a colour or delivery before they buy.",
  },
  {
    title: "English and Arabic",
    body: "Need your store in both? Tell us when you ask for your quote and it's built in from the start.",
  },
  {
    title: "Built for phones first",
    body: "Almost every buyer is on a phone. Every page, the cart and checkout are designed for that.",
  },
  {
    title: "You can run it yourself",
    body: "A walkthrough at launch: add a product, change a price, fulfil an order. No developer needed.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Tap the WhatsApp button",
    body: "It opens a chat with a message ready to send. No forms, no sign-up.",
  },
  {
    n: "02",
    title: "Tell us what you sell",
    body: "Roughly how many products, whether you need Arabic, and a store you like the look of.",
  },
  {
    n: "03",
    title: "Get a fixed quote",
    body: "A clear price and timeline, before anything starts. If it isn't right for you, no hard feelings.",
  },
];

const FAQS = [
  {
    q: `What does "from ${FROM_PRICE}" include?`,
    a: "A complete store with your products, checkout, delivery setup and WhatsApp button. The final price depends on how many products you have and what you need — Arabic, extra pages, integrations — and you get it as a fixed quote on WhatsApp before anything starts.",
  },
  {
    q: "Do you work with businesses in Dubai and across the UAE?",
    a: "Yes. Everything runs over WhatsApp and video calls, so it doesn't matter which Emirate you're in. You get a preview link throughout the build.",
  },
  {
    q: "Which payment methods can my customers use?",
    a: "Cards through a payment gateway that supports UAE businesses, and cash on delivery if you want it. We help you set up the gateway account in your company's name.",
  },
  {
    q: "How long does it take?",
    a: "Usually two to three weeks from the day you send your products, depending on how many there are. Your quote includes the timeline.",
  },
  {
    q: "Are there monthly fees?",
    a: "Nothing monthly to us. You pay your domain yearly, and your platform plan and payment-gateway fees directly to them — we'll show you the exact numbers for your setup in the quote.",
  },
];

/** The hero button, with a pulsing glow and a pointer so it can't be missed. */
function BigCta({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-[#25D366] mb-3">
        Tap here for your price
        <ArrowDown className="w-3.5 h-3.5 motion-safe:animate-bounce" aria-hidden="true" />
      </span>
      <div className="relative w-full sm:w-auto">
        <span
          className="absolute -inset-1 rounded-[20px] bg-[#25D366] opacity-45 blur-lg motion-safe:animate-pulse pointer-events-none"
          aria-hidden="true"
        />
        <WhatsappCta size="xl" className="relative w-full sm:w-auto shadow-[0_10px_40px_-8px_rgba(37,211,102,0.65)]">
          <WhatsappIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          {label}
          <ArrowRight className="hidden sm:block w-5 h-5" aria-hidden="true" />
        </WhatsappCta>
      </div>
      <p className="text-[13px] text-[var(--text-tertiary)] mt-3">
        Free quote · No obligation · Opens WhatsApp
      </p>
    </div>
  );
}

export default function ProLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "E-commerce website development",
    name: "E-commerce website",
    provider: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
      telephone: "+91 7905214791",
    },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    description: `Online stores for UAE businesses, starting from ${FROM_PRICE}. Quotes on WhatsApp.`,
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "740",
        priceCurrency: "AED",
      },
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

      {/* ============================================================== Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-35%] left-1/2 -translate-x-1/2 w-[90%] h-[75%] rounded-full opacity-[0.16] blur-[120px]"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8 pt-14 sm:pt-24 pb-16 sm:pb-24 text-center sm:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-5">
            E-commerce websites · Dubai &amp; UAE
          </p>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(32px,7.6vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em] text-[var(--text-primary)] mb-5"
          >
            <Words text="Your own online store, built for the UAE." />
          </h1>

          <p className="text-[16px] sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[560px] mx-auto sm:mx-0 mb-8">
            Products, secure checkout, cash on delivery, delivery across the
            Emirates and WhatsApp orders — designed, built and handed over,
            ready to sell.
          </p>

          <div className="mb-9">
            <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-2">
              E-commerce websites starting from
            </span>
            <span className="font-display text-[52px] sm:text-[72px] font-semibold leading-none text-[var(--accent)]">
              {FROM_PRICE}
              <span className="text-[var(--text-primary)]">+</span>
            </span>
          </div>

          <BigCta label="Get my quote on WhatsApp" />
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <WhatsappCta className="w-full sm:w-auto">
              <WhatsappIcon />
              Ask for my price on WhatsApp
            </WhatsappCta>
          </div>
        </div>
      </section>

      {/* ======================================================= How it works */}
      <section aria-labelledby="how-heading" className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="how-heading" className={`${h2} mb-3`}>
            Your quote in three steps.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10">
            Every store is different, so every price is quoted — fixed and
            clear, before anything starts.
          </p>

          <ol className="grid sm:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
              >
                <span className="font-mono text-[13px] text-[var(--accent)] block mb-3" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="font-display text-[17px] font-semibold text-[var(--text-primary)] mb-1.5">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <WhatsappCta className="w-full sm:w-auto">
              <WhatsappIcon />
              Start step 1 — open WhatsApp
            </WhatsappCta>
          </div>
        </div>
      </section>

      {/* ======================================================= Inspirations */}
      <section
        id="inspirations"
        aria-labelledby="inspo-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-3">
            Inspirations
          </p>
          <h2 id="inspo-heading" className={`${h2} mb-3`}>
            Pick a style. We&apos;ll build yours in that direction.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[600px] mb-10">
            Real online stores worth borrowing from. Send us the one closest to
            what you want — the layout, the feel, the way products are shown —
            and your store starts there, in your brand.
          </p>

          <StoreInspirations />

          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-5">
            Real stores shown for style reference — not our work, no affiliation
          </p>

          <div className="mt-9">
            <WhatsappCtaGhost>
              I like one of these — get my quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsappCtaGhost>
          </div>
        </div>
      </section>

      {/* =========================================================== FAQ */}
      <section aria-labelledby="faq-heading" className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 id="faq-heading" className={`${h2} mb-9`}>
            Questions.
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
          Get my quote on WhatsApp
        </WhatsappCta>
      </div>

      {/* ===================================================== Final CTA */}
      <section
        aria-labelledby="final-heading"
        className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-3">
            E-commerce websites starting from
          </p>
          <p className="font-display text-[48px] sm:text-[64px] font-semibold leading-none text-[var(--accent)] mb-6">
            {FROM_PRICE}
            <span className="text-[var(--text-primary)]">+</span>
          </p>
          <h2
            id="final-heading"
            className="font-display text-[clamp(24px,5.5vw,38px)] font-semibold tracking-[-0.025em] text-[var(--text-primary)] mb-9"
          >
            Find out exactly what yours would cost.
          </h2>

          <div className="flex justify-center">
            <BigCta label="Get my quote on WhatsApp" />
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-12">
            XMEL Automations · WhatsApp {PHONE_DISPLAY}
          </p>
        </div>
      </section>
    </main>
  );
}
