import { getAllPosts } from "@/lib/blog";
import { MARKETS, MARKET_CONFIG, MARKET_PATH } from "@/lib/market";
import { absoluteUrl } from "@/lib/seo";
import { INDUSTRIES } from "@/lib/industries";

export const dynamic = "force-static";

/**
 * Hand-maintained pages: bump `lastmod` when a page's content meaningfully
 * changes. Blog posts come from their frontmatter (`updated`, else `date`),
 * so new posts appear here automatically.
 */
const PAGES: { path: string; lastmod: string; homepage?: boolean }[] = [
  { path: MARKET_PATH.us, lastmod: "2026-09-22", homepage: true },
  { path: MARKET_PATH.in, lastmod: "2026-09-22", homepage: true },
  { path: "/ai-automation-real-estate", lastmod: "2026-09-22" },
  { path: "/ai-automation-home-services", lastmod: "2026-09-22" },
  { path: "/website-development", lastmod: "2026-09-25" },
  { path: "/seo", lastmod: "2026-09-25" },
  { path: "/tools/roi-calculator", lastmod: "2026-09-22" },
  { path: "/blog", lastmod: "2026-09-22" },
  { path: "/about", lastmod: "2026-09-22" },
  { path: "/contact", lastmod: "2026-09-22" },
  ...INDUSTRIES.map((i) => ({ path: `/for/${i.slug}`, lastmod: "2026-09-26" })),
];

const homepageAlternates = [
  ...MARKETS.map((m) => ({ hreflang: MARKET_CONFIG[m].hreflang, href: absoluteUrl(MARKET_PATH[m]) })),
  { hreflang: "x-default", href: absoluteUrl(MARKET_PATH.us) },
];

function entry(loc: string, lastmod: string, alternates?: typeof homepageAlternates) {
  const links = (alternates ?? [])
    .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
    .join("");
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>${links}\n  </url>`;
}

export function GET() {
  const pages = PAGES.map((p) => entry(absoluteUrl(p.path), p.lastmod, p.homepage ? homepageAlternates : undefined));
  const posts = getAllPosts().map((post) =>
    entry(absoluteUrl(`/blog/${post.slug}`), post.updated ?? post.date)
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...pages, ...posts].join("\n")}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
