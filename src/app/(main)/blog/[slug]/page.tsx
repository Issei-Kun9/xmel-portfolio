import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
  const url = `https://xmelautomations.xyz/blog/${post.slug}`;

  // The social image comes from ./opengraph-image.tsx (one per post).
  return {
    title: `${metaTitle} | XMEL`,
    description: post.description,
    authors: [{ name: "Yashwardhan Chauhan", url: "https://xmelautomations.xyz/about" }],
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: post.description,
      type: "article",
      url,
      siteName: "XMEL Automations",
      locale: "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["https://xmelautomations.xyz/about"],
      section: CATEGORY_LABELS[post.category],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: post.description,
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

  const url = `https://xmelautomations.xyz/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en",
    image: "https://xmelautomations.xyz/og.png",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      "@id": "https://xmelautomations.xyz/#founder",
      name: "Yashwardhan Chauhan",
      url: "https://xmelautomations.xyz/about",
      sameAs: ["https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"],
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://xmelautomations.xyz/#organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
      logo: { "@type": "ImageObject", url: "https://xmelautomations.xyz/logo-512.png" },
    },
    url,
    keywords: post.tags.join(", "),
    articleSection: CATEGORY_LABELS[post.category],
    about: post.primaryKeyword,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <article className="max-w-[800px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-24">
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
            <time dateTime={post.date} className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
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

          {/* Byline — who wrote it and when it was last checked */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-full bg-[var(--text-primary)] text-[var(--accent-bright)] font-display font-bold flex items-center justify-center" aria-hidden="true">
              YC
            </span>
            <div className="text-[14px] leading-tight">
              <a href="/about" rel="author" className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]">
                Yashwardhan Chauhan
              </a>
              <div className="text-[var(--text-tertiary)]">
                Founder, XMEL Automations
                {post.updated && post.updated !== post.date && (
                  <>
                    {" · Updated "}
                    <time dateTime={post.updated}>
                      {new Date(post.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </time>
                  </>
                )}
              </div>
            </div>
          </div>

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
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pt-8 border-t border-[var(--border-subtle)]">
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Want to build an AI automation system like this for your business?
            </p>
            <Link
              href="/#book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white text-[15px] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(138,106,47,0.2)] transition-shadow duration-300"
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
