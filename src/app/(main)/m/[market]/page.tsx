import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/home/home-page";
import { MARKETS, MARKET_CONFIG, MARKET_PATH, isMarket } from "@/lib/market";
import { OG_IMAGE, absoluteUrl, homepageAlternates } from "@/lib/seo";

/**
 * The homepage, prerendered once per market. The public URLs are "/" (US)
 * and "/in" (India) — the middleware rewrites them here — so each version is
 * its own indexable page, tied together with hreflang.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return MARKETS.map((market) => ({ market }));
}

type Props = { params: Promise<{ market: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market } = await params;
  if (!isMarket(market)) return {};
  const cfg = MARKET_CONFIG[market];
  const url = absoluteUrl(MARKET_PATH[market]);
  return {
    title: { absolute: cfg.seo.title },
    description: cfg.seo.description,
    alternates: homepageAlternates(market),
    openGraph: {
      title: cfg.seo.title,
      description: cfg.seo.description,
      url,
      type: "website",
      siteName: "XMEL Automations",
      locale: cfg.ogLocale,
      alternateLocale: MARKETS.filter((m) => m !== market).map((m) => MARKET_CONFIG[m].ogLocale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: cfg.seo.title,
      description: cfg.seo.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function MarketHome({ params }: Props) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return <HomePage market={market} />;
}
