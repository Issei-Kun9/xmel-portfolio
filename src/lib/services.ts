/**
 * Pricing and copy for the two newer service lines: Website Development and
 * SEO. Kept separate from market.ts (the AI lead-response product) because
 * their shape differs — website dev is one-time, SEO is a monthly retainer
 * with no setup fee, and India's website-dev tiers hand off to the existing,
 * already-live WhatsApp offers on sites./pro. rather than duplicating them.
 *
 * India website-dev prices are NOT invented: they're the same ₹2,500 /
 * ₹4,000 offers already running on sites.xmelautomations.xyz and
 * pro.xmelautomations.xyz. US website-dev and both markets' SEO prices are
 * new — set from researched 2026 freelancer/small-agency market rates
 * (small US business sites commonly run $1,500–$8,000; local SEO retainers
 * commonly run $500–$3,000/mo, with $501–$1,000/mo the single most common
 * bracket) and should be reviewed before being treated as final.
 */

import type { Market } from "./market";
import { whatsappHref } from "./market";

export type ServiceTier = {
  name: string;
  tagline: string;
  price: string;
  /** Numeric price, for schema.org Offer. */
  priceAmount: number;
  period: "one-time" | "month";
  features: string[];
  cta: { label: string; href: string; external: boolean };
  featured?: boolean;
};

export type ServiceMarketConfig = {
  currency: "USD" | "INR";
  tiers: ServiceTier[];
  note: string;
};

const WEBSITE_DEV_PREFILL =
  "Hi Yashwardhan, I'd like a website built for my business. Can you tell me more?";

export const WEBSITE_DEV: Record<Market, ServiceMarketConfig> = {
  us: {
    currency: "USD",
    tiers: [
      {
        name: "Starter",
        tagline: "One page, live in a week",
        price: "$499",
        priceAmount: 499,
        period: "one-time",
        features: [
          "A single-page site: services, photos, contact details",
          "Mobile-first, fast-loading, no page-builder bloat",
          "Written for you from a short call, not a template fill-in",
          "Live on your own domain in about 7 days",
        ],
        cta: { label: "Book a 15-min call", href: "#book", external: false },
      },
      {
        name: "Business",
        tagline: "A full multi-page site",
        price: "$1,499",
        priceAmount: 1499,
        period: "one-time",
        features: [
          "Everything in Starter",
          "Up to 5 pages: home, services, about, gallery, contact",
          "Contact form, basic on-page SEO, Google Business setup help",
          "One round of revisions after you see the finished site",
        ],
        cta: { label: "Book a 15-min call", href: "#book", external: false },
        featured: true,
      },
      {
        name: "Custom",
        tagline: "E-commerce, bookings, more pages",
        price: "Custom",
        priceAmount: 0,
        period: "one-time",
        features: [
          "Online stores, booking systems, member areas",
          "Content migration from an existing site",
          "Ongoing care plans available",
          "Priced after a 15-minute call",
        ],
        cta: { label: "Book a call", href: "#book", external: false },
      },
    ],
    note: "One-time build fee. Domain and hosting are billed at cost (typically $15–25/year and $0–20/month). No monthly fee unless you want an ongoing care plan.",
  },
  in: {
    currency: "INR",
    tiers: [
      {
        name: "Starter",
        tagline: "One page, live in 7 days",
        price: "₹2,500",
        priceAmount: 2500,
        period: "one-time",
        features: [
          "A single-page site: services, prices, photos, timings, location",
          "₹500 to start (refundable before your build begins), rest after you see it live",
          "Mobile-first, written around your business, not a template",
          "Runs as an introductory-batch offer — current spots and terms on the offer page",
        ],
        cta: { label: "See the ₹2,500 offer", href: "https://sites.xmelautomations.xyz", external: true },
      },
      {
        name: "Business",
        tagline: "A full multi-page site",
        price: "₹4,000",
        priceAmount: 4000,
        period: "one-time",
        features: [
          "Everything in Starter",
          "Multiple pages, built around what your business actually needs",
          "₹500 to start, the rest only after you see the finished site",
          "Current batch size and queue shown on the offer page",
        ],
        cta: { label: "See the ₹4,000 offer", href: "https://pro.xmelautomations.xyz", external: true },
        featured: true,
      },
      {
        name: "Custom",
        tagline: "Online stores, bookings, more pages",
        price: "Custom",
        priceAmount: 0,
        period: "one-time",
        features: [
          "Online stores, booking systems, member areas",
          "Content migration from an existing site",
          "Ongoing care plans available",
          "Priced after a WhatsApp chat",
        ],
        cta: { label: "Chat on WhatsApp", href: whatsappHref(WEBSITE_DEV_PREFILL), external: true },
      },
    ],
    note: "Starter and Business are the same offers running on sites.xmelautomations.xyz and pro.xmelautomations.xyz — this page just explains them. Domain and hosting billed at cost.",
  },
};

const SEO_PREFILL =
  "Hi Yashwardhan, I'd like to talk about SEO for my business. Can you tell me more?";

export const SEO_SERVICE: Record<Market, ServiceMarketConfig> = {
  us: {
    currency: "USD",
    tiers: [
      {
        name: "Starter",
        tagline: "Local SEO, one location",
        price: "$397",
        priceAmount: 397,
        period: "month",
        features: [
          "Google Business Profile setup and optimization",
          "On-page fixes: titles, descriptions, headings, site speed",
          "Local citations and directory listings",
          "Monthly report: rankings, traffic, what changed",
        ],
        cta: { label: "Book a 15-min call", href: "#book", external: false },
      },
      {
        name: "Growth",
        tagline: "Content and links, faster growth",
        price: "$797",
        priceAmount: 797,
        period: "month",
        features: [
          "Everything in Starter",
          "2 new blog posts or location pages a month",
          "Backlink outreach and directory building",
          "Keyword tracking across more search terms",
        ],
        cta: { label: "Book a 15-min call", href: "#book", external: false },
        featured: true,
      },
      {
        name: "Custom",
        tagline: "Multi-location or competitive markets",
        price: "Custom",
        priceAmount: 0,
        period: "month",
        features: [
          "Multiple locations or service areas",
          "Competitive urban markets",
          "Custom content and link-building volume",
          "Priced after a 15-minute call",
        ],
        cta: { label: "Book a call", href: "#book", external: false },
      },
    ],
    note: "Monthly retainer, no setup fee, cancel any time — most clients start seeing movement in 8–12 weeks. Paid ad spend, if any, is separate and billed at cost.",
  },
  in: {
    currency: "INR",
    tiers: [
      {
        name: "Starter",
        tagline: "Local SEO, one location",
        price: "₹7,999",
        priceAmount: 7999,
        period: "month",
        features: [
          "Google Business Profile setup and optimization",
          "On-page fixes: titles, descriptions, headings, site speed",
          "Local citations and directory listings",
          "Monthly report: rankings, traffic, what changed",
        ],
        cta: { label: "Chat on WhatsApp", href: whatsappHref(SEO_PREFILL), external: true },
      },
      {
        name: "Growth",
        tagline: "Content and links, faster growth",
        price: "₹15,999",
        priceAmount: 15999,
        period: "month",
        features: [
          "Everything in Starter",
          "2 new blog posts or location pages a month",
          "Backlink outreach and directory building",
          "Keyword tracking across more search terms",
        ],
        cta: { label: "Chat on WhatsApp", href: whatsappHref(SEO_PREFILL), external: true },
        featured: true,
      },
      {
        name: "Custom",
        tagline: "Multi-location or competitive markets",
        price: "Custom",
        priceAmount: 0,
        period: "month",
        features: [
          "Multiple locations or service areas",
          "Competitive metro markets",
          "Custom content and link-building volume",
          "Priced after a WhatsApp chat",
        ],
        cta: { label: "Chat on WhatsApp", href: whatsappHref(SEO_PREFILL), external: true },
      },
    ],
    note: "Monthly retainer, no setup fee, cancel any time — most clients start seeing movement in 8–12 weeks. GST extra where applicable.",
  },
};
