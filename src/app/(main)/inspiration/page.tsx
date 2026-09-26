import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import InspirationGallery from "@/components/site/inspiration-gallery";

export const metadata: Metadata = pageMetadata({
  path: "/inspiration",
  title: "Website Style Inspiration by Industry | XMEL Automations",
  description:
    "Great websites from Indian and US businesses — real estate, interiors, clinics, salons, jewellers and more. Pick a style you love and we'll build yours in it.",
});

export default function InspirationPage() {
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
        <InspirationGallery />
        <p className="mt-12 text-[13px] leading-relaxed text-[var(--text-tertiary)] max-w-3xl">
          These sites belong to the businesses named and were built by their own teams — they are
          not XMEL work and are shown only as style references. Previews load live from each site.
        </p>
      </section>
    </main>
  );
}
