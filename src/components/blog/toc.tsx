"use client";

import { useEffect, useState } from "react";

/** Sticky "On this page" list; the section in view is highlighted in gold. */
export default function Toc({ items }: { items: { text: string; id: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  return (
    <nav aria-label="On this page">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-[var(--border-subtle)]">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[14px] leading-snug text-[var(--text-secondary)] hover:text-[var(--text-primary)] aria-[current=location]:border-[var(--gold)] aria-[current=location]:font-semibold aria-[current=location]:text-[var(--text-primary)] transition-colors"
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
