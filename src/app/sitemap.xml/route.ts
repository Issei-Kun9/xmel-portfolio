export const dynamic = "force-static";

const SITEMAP_URLS = [
  { loc: "https://xmelautomations.xyz", lastmod: "2026-07-17" },
  { loc: "https://xmelautomations.xyz/about", lastmod: "2026-08-13" },
  { loc: "https://xmelautomations.xyz/contact", lastmod: "2026-08-13" },
  { loc: "https://xmelautomations.xyz/tools/roi-calculator", lastmod: "2026-07-26" },
  { loc: "https://xmelautomations.xyz/blog", lastmod: "2026-07-17" },
  { loc: "https://xmelautomations.xyz/blog/ai-lead-response-real-estate", lastmod: "2026-07-16" },
  { loc: "https://xmelautomations.xyz/blog/n8n-workflow-automation-guide", lastmod: "2026-07-15" },
  { loc: "https://xmelautomations.xyz/blog/voice-ai-agent-vs-human-isa", lastmod: "2026-07-14" },
  { loc: "https://xmelautomations.xyz/ai-automation-real-estate", lastmod: "2026-08-10" },
  { loc: "https://xmelautomations.xyz/ai-automation-home-services", lastmod: "2026-08-10" },
  { loc: "https://xmelautomations.xyz/blog/ai-isa-real-estate", lastmod: "2026-07-20" },
  { loc: "https://xmelautomations.xyz/blog/real-estate-lead-qualification", lastmod: "2026-07-23" },
  { loc: "https://xmelautomations.xyz/blog/real-estate-lead-follow-up-automation", lastmod: "2026-07-25" },
  { loc: "https://xmelautomations.xyz/blog/missed-call-automation-contractors", lastmod: "2026-07-24" },
  { loc: "https://xmelautomations.xyz/blog/ai-receptionist-hvac", lastmod: "2026-07-22" },
  { loc: "https://xmelautomations.xyz/blog/home-service-lead-response-automation", lastmod: "2026-07-21" },
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
