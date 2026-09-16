import { Check, Clock, ExternalLink, Zap } from "lucide-react";
import WhatsappCta, { WhatsappIcon } from "./whatsapp-cta";

/**
 * Single-offer landing page: ₹2,500 website, ₹500 books the spot.
 * Served at https://sites.xmelautomations.xyz (see src/middleware.ts).
 *
 * EDIT ME as spots fill — this is the only thing you need to change.
 */
const OFFER = {
  price: "₹2,500",
  booking: "₹500",
  balance: "₹2,000",
  priceAfter: "₹7,500",
  spotsTotal: 10,
  deliveryDays: 7,
};

/**
 * The spots counter, on a schedule you author.
 *
 * Each entry means: up to (but not including) `until`, show `spotsLeft`.
 * Past the last date, FINAL_SPOTS_LEFT is shown. Dates are YYYY-MM-DD.
 *
 * EDIT ME: if a real booking comes in ahead of schedule, drop the number early.
 * When the count reaches zero, raise the price to priceAfter — the page says
 * you will, so do it.
 */
const SPOT_SCHEDULE = [
  { until: "2026-09-20", spotsLeft: 6 },
  { until: "2026-09-24", spotsLeft: 5 },
  { until: "2026-09-28", spotsLeft: 4 },
  { until: "2026-10-02", spotsLeft: 3 },
  { until: "2026-10-07", spotsLeft: 2 },
];
const FINAL_SPOTS_LEFT = 1;

function spotsLeftToday(): number {
  const today = new Date().toISOString().slice(0, 10);
  return (
    SPOT_SCHEDULE.find((entry) => today < entry.until)?.spotsLeft ??
    FINAL_SPOTS_LEFT
  );
}

// Re-render hourly so the counter follows the schedule without a redeploy.
export const revalidate = 3600;

const EXAMPLE = {
  name: "Hermont",
  domain: "hermont.in",
  url: "https://hermont.in",
  blurb:
    "A multidisciplinary advisory group with offices in Surat, Jaipur, Delhi and Dubai. Clean, fast, and built to be read on a phone.",
};

const INCLUDED = [
  "A complete website, designed for your business",
  "Works perfectly on mobile — that's where your customers are",
  "Your services, photos, prices and contact details",
  "A WhatsApp button so customers message you in one tap",
  "Your own domain connected (yourname.com)",
  "Live on Google in 7 days",
];

const STEPS = [
  {
    n: "1",
    title: `Pay ${OFFER.booking} to book your spot`,
    body: "That's it to lock the price. Message me on WhatsApp and I'll send the payment link.",
  },
  {
    n: "2",
    title: "Tell me about your business",
    body: "Ten minutes on WhatsApp. Your services, your photos, your number. I write everything else.",
  },
  {
    n: "3",
    title: `See it, then pay the rest`,
    body: `I show you the finished website first. You pay the remaining ${OFFER.balance} only when you're happy with it.`,
  },
];

const FAQS = [
  {
    q: `Is ${OFFER.price} really the full price?`,
    a: `Yes. ${OFFER.booking} to book your spot, ${OFFER.balance} when the website is ready and you've seen it. No monthly fees to me, ever.`,
  },
  {
    q: "Why so cheap?",
    a: `I'm building my portfolio in this space, so the first ${OFFER.spotsTotal} businesses get it at ${OFFER.price}. After these spots are gone the price goes back to ${OFFER.priceAfter}.`,
  },
  {
    q: "What if I don't like it?",
    a: `You see the website before you pay the remaining ${OFFER.balance}. If it's not right, I fix it. If you still don't want it, you don't pay the balance.`,
  },
  {
    q: "How long does it take?",
    a: `${OFFER.deliveryDays} days from the day you send me your business details.`,
  },
  {
    q: "Do I need to know anything technical?",
    a: "No. Send me your details on WhatsApp and I handle everything — design, writing, domain, going live.",
  },
];

export default function SitesLanding() {
  const spotsLeft = spotsLeftToday();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website design and development",
    provider: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
      telephone: "+91 7905214791",
    },
    areaServed: "IN",
    description: `A complete, mobile-ready website for ${OFFER.price}. ${OFFER.booking} books your spot.`,
    offers: {
      "@type": "Offer",
      price: "2500",
      priceCurrency: "INR",
      availability: "https://schema.org/LimitedAvailability",
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
    <main className="relative pb-28 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* --------------------------------------------------------- Scarcity bar */}
      <div className="sticky top-0 z-40 bg-[var(--accent)] text-[#0A0A0B]">
        <div className="max-w-[900px] mx-auto px-5 py-2.5 flex items-center justify-center gap-2 text-center">
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-semibold">
            Only {spotsLeft} of {OFFER.spotsTotal} spots left at{" "}
            {OFFER.price}
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[90%] h-[70%] rounded-full opacity-[0.09] blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-14 text-center">
          <h1 className="font-display text-[clamp(32px,8vw,60px)] font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--text-primary)] mb-6">
            <span className="block">Get your business a</span>
            <span className="block">website for {OFFER.price}</span>
          </h1>

          <p className="text-[17px] sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-[540px] mx-auto mb-3">
            Pay just <strong className="text-[var(--text-primary)]">{OFFER.booking}</strong>{" "}
            to book your spot. The rest only when you&apos;ve seen your finished
            website.
          </p>

          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-9">
            Live in {OFFER.deliveryDays} days · No monthly fees
          </p>

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-5 rounded-full bg-[rgba(193,255,114,0.12)] border border-[var(--accent)] shadow-[0_0_30px_-8px_rgba(193,255,114,0.55)]">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] status-pulse" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.06em] font-semibold text-[var(--accent)]">
              Only {spotsLeft} of {OFFER.spotsTotal} spots left
            </span>
          </div>

          <WhatsappCta className="w-full sm:w-auto mb-4">
            <WhatsappIcon />
            Book my spot on WhatsApp
          </WhatsappCta>

          <p className="text-sm text-[var(--text-tertiary)]">
            Tap the button — the message is already typed for you.
          </p>

          {/* -------------------------------------------------- Example site */}
          <div className="mt-12 text-left">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] text-center mb-4">
              An example of my work
            </p>

            <a
              href={EXAMPLE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] transition-colors duration-300"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                </span>
                <span className="flex-1 mx-2 px-3 py-1 rounded bg-[var(--bg-primary)] font-mono text-[11px] text-[var(--text-tertiary)] truncate">
                  {EXAMPLE.domain}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1.5">
                  {EXAMPLE.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {EXAMPLE.blurb}
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-[12px] text-[var(--accent)]">
                  Open the live site
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>

            <p className="text-sm text-[var(--text-tertiary)] text-center mt-4">
              Yours will be built the same way — for your business.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Included */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="max-w-[700px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <h2 className="font-display text-[clamp(23px,5vw,34px)] font-semibold tracking-[-0.015em] text-[var(--text-primary)] mb-8 text-center">
            What you get for {OFFER.price}
          </h2>
          <ul className="space-y-3.5">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex gap-3.5 items-start p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
              >
                <Check className="w-5 h-5 shrink-0 mt-0.5 text-[var(--accent)]" />
                <span className="text-[15px] sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- Price anchor */}
      <section className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[700px] mx-auto px-5 sm:px-8 py-14 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-strong)] bg-[rgba(193,255,114,0.06)] mb-7">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]">
              This price ends after {OFFER.spotsTotal} spots
            </span>
          </div>

          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="text-center">
              <div className="font-display text-[28px] sm:text-[34px] font-semibold text-[var(--text-tertiary)] line-through leading-none">
                {OFFER.priceAfter}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-2">
                Normal price
              </div>
            </div>
            <div className="w-px h-14 bg-[var(--border-strong)]" />
            <div className="text-center">
              <div className="font-display text-[44px] sm:text-[56px] font-semibold text-[var(--accent)] leading-none">
                {OFFER.price}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] mt-2">
                Right now
              </div>
            </div>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[480px] mx-auto">
            {spotsLeft}&nbsp;spots remain. Once they&apos;re taken, the next
            website is {OFFER.priceAfter} — and this page comes down.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- Process */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="max-w-[700px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <h2 className="font-display text-[clamp(23px,5vw,34px)] font-semibold tracking-[-0.015em] text-[var(--text-primary)] mb-9 text-center">
            How it works
          </h2>
          <div className="space-y-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex gap-4 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-[var(--accent)] text-[#0A0A0B] font-display font-semibold flex items-center justify-center">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-display text-[17px] font-semibold text-[var(--text-primary)] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ FAQ */}
      <section className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[700px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <h2 className="font-display text-[clamp(23px,5vw,34px)] font-semibold tracking-[-0.015em] text-[var(--text-primary)] mb-8 text-center">
            Common questions
          </h2>
          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex items-start justify-between gap-5 cursor-pointer list-none min-h-[36px]">
                  <h3 className="font-display text-[16px] font-medium text-[var(--text-primary)] group-open:text-[var(--accent)] transition-colors">
                    {f.q}
                  </h3>
                  <span className="shrink-0 font-mono text-xl leading-none text-[var(--text-tertiary)] group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 pr-8">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="max-w-[700px] mx-auto px-5 sm:px-8 py-16 text-center">
          <h2 className="font-display text-[clamp(25px,6vw,40px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4">
            Ready to book your spot?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[440px] mx-auto">
            Send one message on WhatsApp. I&apos;ll reply with the {OFFER.booking}{" "}
            payment link and we start today.
          </p>

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-5 rounded-full bg-[rgba(193,255,114,0.12)] border border-[var(--accent)] shadow-[0_0_30px_-8px_rgba(193,255,114,0.55)]">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] status-pulse" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.06em] font-semibold text-[var(--accent)]">
              Only {spotsLeft} of {OFFER.spotsTotal} spots left
            </span>
          </div>

          <WhatsappCta className="w-full sm:w-auto">
            <WhatsappIcon />
            Book my spot — {OFFER.booking}
          </WhatsappCta>

          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-10">
            XMEL Automations · +91 79052 14791
          </p>
        </div>
      </section>

      {/* ------------------------------------------- Sticky mobile WhatsApp bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[var(--bg-primary)]/95 backdrop-blur border-t border-[var(--border-subtle)]">
        <WhatsappCta size="md" className="w-full">
          <WhatsappIcon className="w-[18px] h-[18px]" />
          Book my spot — {OFFER.booking}
        </WhatsappCta>
      </div>
    </main>
  );
}
