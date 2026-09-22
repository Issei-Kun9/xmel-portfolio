import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, CATEGORY_LABELS } from "@/lib/blog";

/**
 * Links a page to its most relevant guides — named slugs first, then the
 * newest posts in the given categories. Server-only (reads content/blog).
 */
export default function RelatedGuides({
  slugs = [],
  categories = [],
  limit = 3,
  title = "Guides",
  className = "",
}: {
  slugs?: string[];
  categories?: string[];
  limit?: number;
  title?: string;
  className?: string;
}) {
  const all = getAllPosts();
  const picked = [
    ...slugs.map((s) => all.find((p) => p.slug === s)).filter((p) => p !== undefined),
    ...all.filter((p) => !slugs.includes(p.slug) && categories.includes(p.category)),
  ].slice(0, limit);

  if (picked.length === 0) return null;

  return (
    <section className={className} aria-labelledby="related-guides">
      <div className="flex items-end justify-between gap-4">
        <h2 id="related-guides" className="font-display text-[clamp(22px,3vw,30px)] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
          {title}
        </h2>
        <Link href="/blog" className="text-[14px] font-semibold text-[var(--accent)] hover:underline underline-offset-4 shrink-0">
          All guides
        </Link>
      </div>
      <ul className="mt-6 grid md:grid-cols-3 gap-4">
        {picked.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5 hover:border-[var(--accent-line)] transition-colors"
            >
              <span className="text-[12px] font-semibold text-[var(--accent)]">
                {CATEGORY_LABELS[p.category]} · {p.readTime}
              </span>
              <span className="mt-2 text-[16px] font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {p.title}
              </span>
              <span className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)] line-clamp-3">{p.description}</span>
              <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-primary)]">
                Read guide <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
