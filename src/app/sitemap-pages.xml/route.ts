export const dynamic = "force-static";

const SITEMAP_URLS = [
  { loc: "https://xmelautomations.xyz/", lastmod: "2026-07-17" },
  { loc: "https://xmelautomations.xyz/tools/roi-calculator", lastmod: "2026-07-26" },
  { loc: "https://xmelautomations.xyz/blog", lastmod: "2026-07-17" },
  { loc: "https://xmelautomations.xyz/blog/ai-lead-response-real-estate", lastmod: "2026-07-16" },
  { loc: "https://xmelautomations.xyz/blog/n8n-workflow-automation-guide", lastmod: "2026-07-15" },
  { loc: "https://xmelautomations.xyz/blog/voice-ai-agent-vs-human-isa", lastmod: "2026-07-14" },
];

export function GET() {
  const urls = SITEMAP_URLS.map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  ).join("\n\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "X-Robots-Tag": "index,follow",
    },
  });
}
