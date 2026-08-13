import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, CATEGORY_LABELS, type PostCategory } from "@/lib/blog";
import Breadcrumbs from "@/components/shared/breadcrumbs";

const CATEGORY_ORDER: PostCategory[] = ["real-estate", "home-services", "automation"];

export const metadata: Metadata = {
  title: "Blog | XMEL Automations — AI Automation Insights",
  description:
    "Deep-dives on AI lead response automation, n8n workflows, voice AI agents, and lead qualification for real estate and home services.",
  openGraph: {
    title: "Blog | XMEL Automations",
    description:
      "AI automation insights — lead response, voice AI, n8n workflows.",
    url: "https://xmelautomations.xyz/blog",
    siteName: "XMEL Automations",
    type: "website",
    images: [
      {
        url: "https://xmelautomations.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "XMEL Automations blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | XMEL Automations",
    description:
      "AI automation insights — lead response, voice AI, n8n workflows.",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  alternates: {
    canonical: "https://xmelautomations.xyz/blog",
    languages: {
      "en-US": "https://xmelautomations.xyz/blog",
      "en-IN": "https://xmelautomations.xyz/blog",
      "x-default": "https://xmelautomations.xyz/blog",
    },
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    posts: posts.filter((p) => p.category === category),
  })).filter((g) => g.posts.length > 0);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-8">
            <Breadcrumbs items={[{ name: "Blog" }]} />
          </div>

          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-4">
            Blog.
          </h1>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
            Technical deep-dives on AI automation, voice AI agents, n8n
            workflows, and lead response systems for real estate and home
            services. Every post is written from real builds we ship to
            production — not theory.
          </p>

          <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mt-4">
            If you sell homes or home services, speed is the entire game. The
            lead that gets a response in under a minute wins the job; the one
            that waits an hour goes to whoever answered first. That&apos;s why we
            build AI inside sales agents that pick up every call, qualify
            inbound leads in seconds, and book appointments while you sleep.
            These posts break down exactly how those systems are built — the
            webhook chains, LLM prompts, voice pipelines, and n8n architecture
            behind them — with the response-time and conversion numbers from
            real deployments, not demos.
          </p>
        </div>

        {/* Solutions */}
        <div className="mb-16 grid md:grid-cols-2 gap-4">
          {[
            {
              href: "/ai-automation-real-estate",
              label: "REAL ESTATE",
              title: "AI Automation for Real Estate Agents",
              desc: "AI inside sales agent — qualify portal leads, respond in under 50 seconds, book appointments.",
            },
            {
              href: "/ai-automation-home-services",
              label: "HOME SERVICES",
              title: "AI Automation for Home Services",
              desc: "AI receptionist — answer every call, qualify the job, book the slot, escalate emergencies.",
            },
          ].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group block p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
                {s.label}
              </span>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {s.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {s.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Posts grouped by category */}
        {grouped.map(({ category, posts }) => (
          <section key={category} className="mb-16">
            <h2 className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-6">
              {CATEGORY_LABELS[category]}
            </h2>

            <div className="grid gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
                          ·
                        </span>
                        <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-display text-xl lg:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-3">
                        {post.title}
                      </h3>

                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-2 font-mono text-[12px] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:mt-8">
                      READ
                      <span>→</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono text-[12px] text-[var(--text-tertiary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

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
