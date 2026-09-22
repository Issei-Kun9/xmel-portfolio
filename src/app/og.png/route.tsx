import { renderOg } from "@/lib/og";

export const dynamic = "force-static";

/** Site-wide social preview at /og.png (see OG_IMAGE in src/lib/seo.ts). */
export function GET() {
  return renderOg({
    eyebrow: "Speed-to-lead, automated",
    title: "Every lead answered in under 60 seconds. Even at 2 AM.",
  });
}
