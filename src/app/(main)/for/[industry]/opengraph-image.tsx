import { INDUSTRIES, industryBySlug } from "@/lib/industries";
import { OG_SIZE, renderOg } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "XMEL Automations for your industry";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ industry: string }> }) {
  const ind = industryBySlug((await params).industry);
  return renderOg({
    eyebrow: ind ? `For ${ind.plural}` : "Industries",
    title: ind ? `More jobs for ${ind.plural}. ${ind.mood.tagline}` : "More customers for your business.",
    footer: "Website · SEO · AI that answers every enquiry",
  });
}
