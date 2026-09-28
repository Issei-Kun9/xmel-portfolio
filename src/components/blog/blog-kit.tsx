import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import Lottie from "@/components/motion/lottie";
import type { BlogPost } from "@/lib/blog";
import { CATEGORY_LABELS, type PostCategory } from "@/lib/blog-categories";

const COVER_ICON: Record<PostCategory, string> = {
  "real-estate": "house",
  "home-services": "tools",
  websites: "laptop",
  seo: "growth-chart",
  automation: "message",
};

/**
 * Cover art for a post: the category's gold line icon on ink, with rings and
 * a glow. The same visual language as the share images, drawn in HTML so it
 * costs nothing to load.
 */
export function PostCover({ category, big = false, className = "" }: { category: PostCategory; big?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-[var(--ink)] ${className}`}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 70% at 78% 18%, rgba(201,168,106,0.28), transparent 70%), radial-gradient(40% 50% at 10% 100%, rgba(201,168,106,0.12), transparent 70%)" }} />
      <div className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-[rgba(201,168,106,0.22)] ${big ? "right-[8%] h-[78%] aspect-square" : "right-[6%] h-[90%] aspect-square"}`} />
      <div className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(201,168,106,0.18)] ${big ? "right-[16%] h-[50%] aspect-square" : "right-[15%] h-[60%] aspect-square"}`} />
      <Lottie name={COVER_ICON[category]} strokeWidth={1.6} className={`absolute top-1/2 -translate-y-1/2 ${big ? "right-[20%] h-[34%] w-auto aspect-square" : "right-[19%] h-[40%] w-auto aspect-square"}`} />
      <span className="absolute left-5 bottom-4 rounded-full border border-[rgba(201,168,106,0.4)] bg-[rgba(15,15,18,0.6)] px-3 py-1 text-[12px] font-semibold text-[var(--gold)]">
        {CATEGORY_LABELS[category]}
      </span>
    </div>
  );
}

export type PostMeta = Omit<BlogPost, "content">;

export const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** Card for grids: cover, meta, title, description. */
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="lift group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-[var(--shadow-card)] hover:border-[var(--gold)] transition-colors">
      <PostCover category={post.category} className="aspect-[16/8]" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[13px] text-[var(--text-tertiary)]">
          {fmtDate(post.date)} · {post.readTime}
        </p>
        <h3 className="mt-2 font-display text-[21px] leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{post.description}</p>
        <span className="mt-auto pt-5 text-[14px] font-semibold text-[var(--accent)]">Read guide →</span>
      </div>
    </Link>
  );
}

/** "What a strong first text says" → "what-a-strong-first-text-says". */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Plain text of MDX heading children (strings, numbers, nested elements). */
export function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

/** The post's "## " headings, for the contents list. */
export function headingsOf(markdown: string) {
  return markdown
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3).replace(/[*_`]/g, "").trim())
    .map((t) => ({ text: t, id: slugify(t) }));
}
