import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/kit/kit";
import BlogBrowser from "@/components/blog/blog-browser";
import { PostCover, fmtDate } from "@/components/blog/blog-kit";
import { pageMetadata } from "@/lib/seo";
import { getAllPosts, type PostCategory } from "@/lib/blog";
import Breadcrumbs from "@/components/shared/breadcrumbs";

const CATEGORY_ORDER: PostCategory[] = ["real-estate", "home-services", "websites", "seo", "automation"];

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "AI Lead Response & Automation Blog | XMEL Automations",
  description:
    "Practical guides on speed-to-lead, AI receptionists, WhatsApp lead follow-up and n8n automation for real estate and home-service businesses.",
});

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured] = posts;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="ink overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20">
          <Breadcrumbs items={[{ name: "Blog" }]} />
          <div className="mt-8 sm:mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">The XMEL blog</p>
              <h1 className="mt-4 font-display text-[clamp(40px,6vw,76px)] font-medium leading-[1.0] tracking-[-0.03em]">
                Guides for winning <span className="gold-italic">more customers.</span>
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                Practical, no-fluff guides on answering leads faster, AI receptionists, WhatsApp follow-up, websites that convert
                and getting found on Google, for businesses in the US and India.
              </p>
            </div>
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="lift group block overflow-hidden rounded-3xl border border-[rgba(201,168,106,0.35)] bg-[#141417] hover:border-[var(--gold)] transition-colors">
                <PostCover category={featured.category} big className="aspect-[16/7]" />
                <div className="p-7">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">Newest guide · {featured.readTime}</p>
                  <h2 className="mt-2 font-display text-[clamp(24px,2.6vw,32px)] leading-snug text-[var(--ivory)]">{featured.title}</h2>
                  <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{featured.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--gold)]">
                    Read it <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="sr-only">Published {fmtDate(featured.date)}</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <section className="paper py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {posts.length > 0 ? (
            <BlogBrowser posts={posts} order={CATEGORY_ORDER} />
          ) : (
            <p className="py-20 text-center text-[var(--text-tertiary)]">No posts yet. Check back soon.</p>
          )}
          <p className="mt-16 max-w-3xl text-[14px] leading-relaxed text-[var(--text-tertiary)]">
            If you sell homes or home services, speed is the entire game: the lead that gets a useful reply in under a minute usually
            wins the job. These guides cover how that works in practice, from portal lead replies and AI receptionists to the websites
            and local SEO that bring the leads in, written from real builds rather than theory.
          </p>
        </div>
      </section>

      <CtaBand
        title="Rather have it"
        italic="done for you?"
        body="Everything in these guides is what we build for real estate, home services and local businesses in the US and India."
        secondary={{ label: "See AI for real estate", href: "/ai-automation-real-estate" }}
      />
    </main>
  );
}
