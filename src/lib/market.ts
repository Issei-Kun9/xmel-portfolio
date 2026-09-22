/**
 * The main site sells to two markets. Everything that differs between them —
 * currency, prices, lead sources, the primary call to action — lives here, so
 * the homepage components stay market-agnostic.
 *
 * Each market has its own indexable homepage URL (MARKET_PATH): "/" for the
 * US (also x-default) and "/in" for India, linked with hreflang. On "/",
 * the middleware sends India visitors to "/in", deciding by:
 *   1. ?market=us|in in the URL (useful for ads) — also saved to the cookie
 *   2. the MARKET_COOKIE set by the region switch
 *   3. Vercel's x-vercel-ip-country header: IN → "in", anything else → "us"
 * Crawlers are never redirected.
 */

export const MARKETS = ["us", "in"] as const;
export type Market = (typeof MARKETS)[number];

/** Public, indexable URL of each market's homepage. */
export const MARKET_PATH: Record<Market, string> = { us: "/", in: "/in" };

export const SITE_URL = "https://xmelautomations.xyz";

export const MARKET_COOKIE = "xmel_market";
export const MARKET_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isMarket(value: unknown): value is Market {
  return typeof value === "string" && (MARKETS as readonly string[]).includes(value);
}

export function marketFromCountry(country: string | null | undefined): Market {
  return country?.toUpperCase() === "IN" ? "in" : "us";
}

export const CALENDLY_URL = "https://calendly.com/yashwwardhanx/15-min-meeting";
export const CONTACT_EMAIL = "yashwardhan@xmelautomations.xyz";
export const WHATSAPP_NUMBER = "917905214791";
export const PHONE_DISPLAY = "+91 79052 14791";

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Tier = {
  name: string;
  tagline: string;
  /** One-time setup, shown as "from". null → "Custom quote". */
  setup: string | null;
  /** Monthly, shown as "+ X/mo". null → no monthly line. */
  monthly: string | null;
  /** The same prices as plain numbers, for structured data (schema.org Offer). */
  setupAmount?: number;
  monthlyAmount?: number;
  features: string[];
  featured?: boolean;
};

export type MarketConfig = {
  market: Market;
  /** BCP 47 language tag for hreflang and <html lang>-level signals. */
  hreflang: "en-US" | "en-IN";
  ogLocale: "en_US" | "en_IN";
  seo: { title: string; description: string };
  label: string;
  flag: string;
  currency: "USD" | "INR";
  /** Lead sources named in the copy, so each market recognises its own. */
  leadSources: string;
  /** Channel the AI replies on first. */
  replyChannel: string;
  /** Primary action: US books a call, India opens WhatsApp. */
  primaryCta: { label: string; href: string; external: boolean; kind: "book" | "whatsapp" };
  secondaryCta: { label: string; href: string; external: boolean; kind: "book" | "whatsapp" };
  tiers: Tier[];
  pricingNote: string;
};

const WHATSAPP_PREFILL =
  "Hi Yashwardhan, I saw XMEL Automations and want to know how the AI lead responder would work for my business.";

const US_FEATURES_STARTER = [
  "Replies to every new lead by text within 60 seconds, 24/7",
  "AI qualifies budget, timeline and location",
  "Instant alert to you with a summary of each lead",
  "Every lead logged to Google Sheets or your CRM",
  "Up to 2 lead sources connected",
];

const IN_FEATURES_STARTER = [
  "Replies to every new lead on WhatsApp within 60 seconds, 24/7",
  "AI qualifies budget, timeline and location",
  "Instant alert to you with a summary of each lead",
  "Every lead logged to Google Sheets or your CRM",
  "Up to 2 lead sources connected",
];

const GROWTH_FEATURES = [
  "Everything in Starter",
  "AI voice call to hot leads within 60 seconds",
  "Books appointments straight into your calendar",
  "Automatic follow-up for leads who go quiet",
  "All your lead sources connected",
  "Monthly report: leads, response times, bookings",
];

const CUSTOM_FEATURES = [
  "Teams, brokerages and multi-location businesses",
  "Routing leads to the right agent or crew",
  "Custom CRM and tool integrations",
  "Priced after a 15-minute call",
];

export const MARKET_CONFIG: Record<Market, MarketConfig> = {
  us: {
    market: "us",
    hreflang: "en-US",
    ogLocale: "en_US",
    seo: {
      title: "AI Lead Response for Real Estate & Home Services | XMEL",
      description:
        "AI that texts, calls and qualifies every new lead in under 60 seconds and books the appointment, 24/7. From $997, with a 14-day pilot on your real leads.",
    },
    label: "United States",
    flag: "🇺🇸",
    currency: "USD",
    leadSources: "Zillow, Realtor.com, Facebook ads and your website",
    replyChannel: "text",
    primaryCta: { label: "Book a 15-min demo", href: "#book", external: false, kind: "book" },
    secondaryCta: {
      label: "Message on WhatsApp",
      href: whatsappHref(WHATSAPP_PREFILL),
      external: true,
      kind: "whatsapp",
    },
    tiers: [
      {
        name: "Starter",
        tagline: "AI lead responder",
        setup: "$997",
        setupAmount: 997,
        monthly: "$197",
        monthlyAmount: 197,
        features: US_FEATURES_STARTER,
      },
      {
        name: "Growth",
        tagline: "AI inside sales agent",
        setup: "$2,497",
        setupAmount: 2497,
        monthly: "$497",
        monthlyAmount: 497,
        features: GROWTH_FEATURES,
        featured: true,
      },
      {
        name: "Custom",
        tagline: "For teams and multi-location",
        setup: null,
        monthly: null,
        features: CUSTOM_FEATURES,
      },
    ],
    pricingNote:
      "Setup is a one-time fee. Phone and messaging usage (calls, texts) is billed at cost. Prices in USD.",
  },
  in: {
    market: "in",
    hreflang: "en-IN",
    ogLocale: "en_IN",
    seo: {
      title: "WhatsApp AI Lead Response for Real Estate in India | XMEL",
      description:
        "Reply to every MagicBricks, 99acres and Housing.com lead on WhatsApp in under 60 seconds, qualify it and book the site visit. From ₹24,999.",
    },
    label: "India",
    flag: "🇮🇳",
    currency: "INR",
    leadSources: "MagicBricks, 99acres, Housing.com, Facebook ads and your website",
    replyChannel: "WhatsApp",
    primaryCta: {
      label: "Chat on WhatsApp",
      href: whatsappHref(WHATSAPP_PREFILL),
      external: true,
      kind: "whatsapp",
    },
    secondaryCta: { label: "Book a 15-min call", href: "#book", external: false, kind: "book" },
    tiers: [
      {
        name: "Starter",
        tagline: "AI lead responder",
        setup: "₹24,999",
        setupAmount: 24999,
        monthly: "₹4,999",
        monthlyAmount: 4999,
        features: IN_FEATURES_STARTER,
      },
      {
        name: "Growth",
        tagline: "AI inside sales agent",
        setup: "₹59,999",
        setupAmount: 59999,
        monthly: "₹9,999",
        monthlyAmount: 9999,
        features: GROWTH_FEATURES,
        featured: true,
      },
      {
        name: "Custom",
        tagline: "For teams and multi-location",
        setup: null,
        monthly: null,
        features: CUSTOM_FEATURES,
      },
    ],
    pricingNote:
      "Setup is a one-time fee. Phone and WhatsApp usage is billed at cost. Prices in INR; GST extra where applicable.",
  },
};
