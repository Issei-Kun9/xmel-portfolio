import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getAllPosts, CATEGORY_LABELS } from "@/lib/blog";
import Breadcrumbs from "@/components/shared/breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const metaTitle = post.seoTitle ?? post.title;

  return {
    title: `${metaTitle} | XMEL`,
    description: post.description,
    openGraph: {
      title: metaTitle,
      description: post.description,
      type: "article",
      url: `https://xmelautomations.xyz/blog/${post.slug}`,
      siteName: "XMEL Automations",
      publishedTime: post.date,
      authors: ["Yashwardhan Chauhan"],
      tags: post.tags,
      images: [
        {
          url: "https://xmelautomations.xyz/og-image.png",
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: post.description,
      images: ["https://xmelautomations.xyz/og-image.png"],
    },
    alternates: {
      canonical: `https://xmelautomations.xyz/blog/${post.slug}`,
      languages: {
        "en-US": `https://xmelautomations.xyz/blog/${post.slug}`,
        "en-IN": `https://xmelautomations.xyz/blog/${post.slug}`,
        "x-default": `https://xmelautomations.xyz/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const serviceLink =
    post.category === "real-estate"
      ? {
          href: "/ai-automation-real-estate",
          label: "AI automation for real estate agents",
          desc: "An AI inside sales agent that picks up every portal lead, qualifies the buyer, and books the appointment.",
        }
      : post.category === "home-services"
        ? {
            href: "/ai-automation-home-services",
            label: "AI automation for home services",
            desc: "An AI receptionist that answers every call, qualifies the job, and books the slot — 24/7.",
          }
        : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Yashwardhan Chauhan",
      url: "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
    },
    publisher: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
    },
    url: `https://xmelautomations.xyz/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: CATEGORY_LABELS[post.category],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <article className="max-w-[800px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          {/* Breadcrumb */}
          <div className="mb-10">
            <Breadcrumbs
              items={[
                { name: "Blog", href: "/blog" },
                { name: CATEGORY_LABELS[post.category], href: "/blog" },
                { name: post.title },
              ]}
            />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <time className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
              ·
            </span>
            <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
              {post.readTime}
            </span>
            <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
              ·
            </span>
            <span className="font-mono text-[12px] text-[var(--accent)]">
              {CATEGORY_LABELS[post.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(28px,5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mb-8">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono text-[12px] text-[var(--text-tertiary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border-subtle)] mb-12" />

          {/* MDX Content */}
          <div className="prose-custom">
            <MDXRemote source={post.content} />
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pt-8 border-t border-[var(--border-subtle)]">
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Want to build an AI automation system like this for your business?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
            >
              Get in touch
              <span>→</span>
            </Link>
          </div>

          {/* Related service */}
          {serviceLink && (
            <div className="mt-16">
              <Link
                href={serviceLink.href}
                className="group block p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--accent)] block mb-3">
                  OUR SOLUTION
                </span>
                <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {serviceLink.label}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {serviceLink.desc}
                </p>
              </Link>
            </div>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16">
              <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                RELATED READING
              </span>
              <div className="mt-6 grid gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
                        {r.readTime}
                      </span>
                      <span className="font-mono text-[12px] text-[var(--accent)]">
                        {CATEGORY_LABELS[r.category]}
                      </span>
                    </div>
                    <h2 className="font-display text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                      {r.title}
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {r.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
}
