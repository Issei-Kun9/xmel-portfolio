import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import InspirationGallery from "@/components/site/inspiration-gallery";
import { INSPIRATION } from "@/lib/inspiration";

/** Re-check once a day whether each site still allows being framed. */
export const revalidate = 86400;

/**
 * Whether a site lets other pages embed it. Sites that send X-Frame-Options
 * or a restrictive CSP frame-ancestors would show a blank box, so those get
 * the branded card instead. Unreachable → not embeddable (safe default).
 */
async function canEmbed(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(8000), next: { revalidate } });
    await res.body?.cancel();
    if (!res.ok) return false;
    const xfo = res.headers.get("x-frame-options");
    if (xfo) return false;
    const csp = res.headers.get("content-security-policy") ?? "";
    const fa = /frame-ancestors([^;]*)/i.exec(csp);
    if (fa && !/(^|\s)(\*|https:)(\s|$)/.test(fa[1])) return false;
    return true;
  } catch {
    return false;
  }
}

export const metadata: Metadata = pageMetadata({
  path: "/inspiration",
  title: "Website Style Inspiration by Industry | XMEL Automations",
  description:
    "Great websites from Indian and US businesses — real estate, interiors, clinics, salons, jewellers and more. Pick a style you love and we'll build yours in it.",
});

export default async function InspirationPage() {
  const checks = await Promise.all(INSPIRATION.map(async (s) => [s.url, await canEmbed(s.url)] as const));
  const embeddable = Object.fromEntries(checks);
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="ink overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-20">
          <div className="mb-10">
            <Breadcrumbs items={[{ name: "Website development", href: "/website-development" }, { name: "Style inspiration" }]} />
          </div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">Style inspiration</p>
          <h1 className="mt-4 font-display text-[clamp(38px,6.4vw,76px)] font-medium leading-[1.0] tracking-[-0.03em] max-w-4xl">
            Pick a style you love. <span className="gold-italic">We&apos;ll build yours in it.</span>
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
            Some of the best-looking business websites in India and the US, sorted by industry.
            Open any of them, then tap &ldquo;I want this style&rdquo; and we&apos;ll design your site in that direction.
          </p>
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <InspirationGallery embeddable={embeddable} />
        <p className="mt-12 text-[13px] leading-relaxed text-[var(--text-tertiary)] max-w-3xl">
          These sites belong to the businesses named and were built by their own teams — they are
          not XMEL work and are shown only as style references. Live previews are the real sites, loaded directly from each business; some sites don&apos;t allow previews, so those show a card instead.
        </p>
      </section>
    </main>
  );
}
