import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getAllPosts } from "@/lib/blog";

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

  return {
    title: `${post.title} | XMEL Automations Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://xmelautomations.dpdns.org/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ["Yashwardhan Chauhan"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://xmelautomations.dpdns.org/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
      url: "https://xmelautomations.dpdns.org",
    },
    url: `https://xmelautomations.dpdns.org/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <article className="max-w-[800px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors mb-12"
          >
            <span>←</span>
            <span>ALL POSTS</span>
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <time className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
              ·
            </span>
            <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
              {post.readTime}
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
                className="inline-block px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--text-tertiary)]"
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
        </article>
      </main>
    </>
  );
}
