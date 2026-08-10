import Link from "next/link";

const siteUrl = "https://xmelautomations.xyz";

export interface Crumb {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const crumbs = [{ name: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: new URL(c.href, siteUrl).toString() } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link
                  href={c.href}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-[var(--text-secondary)]">
                  {c.name}
                </span>
              )}
              {i < crumbs.length - 1 && <span>/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
