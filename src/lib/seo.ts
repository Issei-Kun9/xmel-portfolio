import type { Metadata } from "next";
import { MARKETS, MARKET_CONFIG, MARKET_PATH, SITE_URL, type Market } from "@/lib/market";

/** Site-wide social preview image (1200×630), in the current design. */
export const OG_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: "XMEL Automations — every lead answered in under 60 seconds",
};

export const absoluteUrl = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

/** hreflang map for the two market homepages. */
export function homepageAlternates(market: Market): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(MARKET_PATH[market]),
    languages: {
      ...Object.fromEntries(MARKETS.map((m) => [MARKET_CONFIG[m].hreflang, absoluteUrl(MARKET_PATH[m])])),
      "x-default": absoluteUrl(MARKET_PATH.us),
    },
  };
}

/**
 * Standard metadata for a main-site page: title, description, canonical and
 * matching Open Graph / Twitter cards, so no page inherits another's preview.
 */
export function pageMetadata({
  path,
  title,
  description,
  ogTitle,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle ?? title,
      description,
      url,
      type,
      siteName: "XMEL Automations",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
