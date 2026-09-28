"use client";

import { useState } from "react";
import { CATEGORY_LABELS, type PostCategory } from "@/lib/blog-categories";
import { PostCard, type PostMeta } from "./blog-kit";

/** Category tabs over the post grid. */
export default function BlogBrowser({ posts, order }: { posts: PostMeta[]; order: PostCategory[] }) {
  const [cat, setCat] = useState<PostCategory | "all">("all");
  const tabs = [
    { id: "all" as const, name: "All guides", n: posts.length },
    ...order.map((c) => ({ id: c, name: CATEGORY_LABELS[c], n: posts.filter((p) => p.category === c).length })).filter((t) => t.n > 0),
  ];
  const shown = cat === "all" ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={cat === t.id}
            onClick={() => setCat(t.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
              cat === t.id ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)]" : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t.name}
            <span className={`text-[12px] ${cat === t.id ? "text-[var(--gold)]" : "text-[var(--text-tertiary)]"}`}>{t.n}</span>
          </button>
        ))}
      </div>
      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
