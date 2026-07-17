import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title:
    "Blog | XMEL Automations — AI Automation Insights for Real Estate & Home Services",
  description:
    "Technical deep-dives on AI lead response automation, n8n workflow systems, voice AI agents, and lead qualification for real estate agents and home services contractors.",
  openGraph: {
    title: "Blog | XMEL Automations",
    description:
      "AI automation insights — lead response, voice AI, n8n workflows.",
    url: "https://xmelautomations.dpdns.org/blog",
  },
  alternates: {
    canonical: "https://xmelautomations.dpdns.org/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors mb-8"
          >
            <span>←</span>
            <span>BACK TO HOME</span>
          </Link>

          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-4">
            Blog.
          </h1>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
            Technical deep-dives on AI automation, voice AI agents, n8n
            workflows, and lead response systems for real estate and home
            services.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                      ·
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-xl lg:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-3">
                    {post.title}
                  </h2>

                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2 font-mono text-[11px] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:mt-8">
                  READ
                  <span>→</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--text-tertiary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-[var(--text-tertiary)]">
              No posts yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
