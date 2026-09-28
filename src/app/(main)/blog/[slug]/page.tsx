import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPost, getAllPosts, CATEGORY_LABELS } from "@/lib/blog";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/kit/kit";
import Toc from "@/components/blog/toc";
import { PostCard, PostCover, fmtDate, headingsOf, slugify, textOf } from "@/components/blog/blog-kit";

/** h2s get stable ids so the contents list and shared links can jump to them. */
const mdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(textOf(children))} className="scroll-mt-24">
      {children}
    </h2>
  ),
};

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
        : post.category === "websites"
          ? {
              href: "/website-development",
              label: "Website development",
              desc: "A mobile-first website written around your business, live in about a week. See it before you pay in full.",
            }
          : post.category === "seo"
            ? {
                href: "/seo",
                label: "SEO for small businesses",
                desc: "Technical fixes, local search and content for the searches your customers actually make. Month-to-month.",
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

  const toc = headingsOf(post.content);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <header className="ink overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-14 sm:pb-20">
            <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: CATEGORY_LABELS[post.category], href: "/blog" }, { name: post.title }]} />
            <div className="mt-8 sm:mt-12 grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">
                  {CATEGORY_LABELS[post.category]} · {post.readTime}
                </p>
                <h1 className="mt-4 font-display text-[clamp(34px,4.8vw,58px)] font-medium leading-[1.05] tracking-[-0.02em]">{post.title}</h1>
                <p className="mt-5 text-[18px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">{post.description}</p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(201,168,106,0.5)] font-display italic text-[var(--gold)]" aria-hidden="true">
                    YC
                  </span>
                  <div className="text-[14px] leading-tight">
                    <a href="/about" rel="author" className="inline-block py-1 font-semibold text-[var(--ivory)] hover:text-[var(--gold)]">
                      Yashwardhan Chauhan
                    </a>
                    <div className="mt-0.5 text-[var(--text-tertiary)]">
                      <time dateTime={post.date}>{fmtDate(post.date)}</time>
                      {post.updated && post.updated !== post.date && (
                        <>
                          {" · Updated "}
                          <time dateTime={post.updated}>{fmtDate(post.updated)}</time>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <PostCover category={post.category} big className="hidden lg:block aspect-square rounded-3xl border border-[rgba(201,168,106,0.3)]" />
            </div>
          </div>
        </header>

        <div className="paper">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-[minmax(0,720px)_1fr] gap-12 lg:gap-16">
            <article className="min-w-0">
              <div className="prose-custom">
                <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
              </div>

              <div className="mt-14 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-[13px] text-[var(--text-tertiary)]">
                    {tag}
                  </span>
                ))}
              </div>

              <aside className="mt-10 flex flex-col sm:flex-row gap-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--ink)] font-display text-[20px] italic text-[var(--gold)]" aria-hidden="true">
                  YC
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-[var(--text-primary)]">Written by Yashwardhan Chauhan</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    Founder of XMEL Automations. I build AI lead-response systems, websites and SEO for businesses in the US and India, and
                    write up what works.
                  </p>
                  <a href="/about" className="mt-2 inline-block py-1 text-[14px] font-semibold text-[var(--accent)] underline underline-offset-4">
                    More about me
                  </a>
                </div>
              </aside>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <Toc items={toc} />
                <div className="ink rounded-2xl p-6">
                  <p className="font-display text-[22px] leading-snug">
                    Want this <span className="gold-italic">built for you?</span>
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">A 15-minute call. No slides, no hard sell.</p>
                  <a href="/#book" data-cta="book" data-cta-location="blog-sidebar" className="mt-5 inline-flex w-full items-center justify-center gap-2 h-11 rounded-xl bg-[var(--gold)] text-[14px] font-semibold text-[var(--ink)] hover:brightness-110">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" /> Book a call
                  </a>
                </div>
                {serviceLink && (
                  <Link href={serviceLink.href} className="group block rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 hover:border-[var(--gold)] transition-colors">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Our service</p>
                    <p className="mt-2 text-[16px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">{serviceLink.label}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">{serviceLink.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--accent)]">
                      See it <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <section className="paper bg-[var(--bg-secondary)] py-16 sm:py-20">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <h2 className="font-display text-[clamp(28px,3.6vw,40px)] font-medium leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
                Keep reading
              </h2>
              <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <PostCard post={r} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <CtaBand
          title="Want this"
          italic="built for your business?"
          body="Tell me how your customers reach you today. I'll show you what I'd build and what it would cost."
          secondary={serviceLink ? { label: serviceLink.label, href: serviceLink.href } : { label: "Browse all guides", href: "/blog" }}
        />
      </main>
    </>
  );
}
