import MailtoLink from "@/components/shared/mailto-link";
import { CONTACT_EMAIL } from "@/lib/market";

const columns = [
  {
    title: "Solutions",
    links: [
      { name: "AI for real estate", href: "/ai-automation-real-estate" },
      { name: "AI for home services", href: "/ai-automation-home-services" },
      { name: "Pricing", href: "/#pricing" },
      { name: "ROI calculator", href: "/tools/roi-calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Book a demo", href: "/#book" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr]">
        <div>
          <a href="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-[24px] leading-none text-[var(--accent)]" aria-hidden="true">
              X
            </span>
            <span className="font-display font-semibold text-[17px] text-[var(--text-primary)]">
              XMEL Automations
            </span>
          </a>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-xs">
            AI that answers, qualifies and books your leads in under a minute — for
            real estate and home-service businesses in the US and India.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-[13px] font-semibold text-[var(--text-primary)] mb-3">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-[13px] font-semibold text-[var(--text-primary)] mb-3">Get in touch</h2>
          <ul className="space-y-2.5 text-[14px]">
            <li>
              <MailtoLink email={CONTACT_EMAIL} className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors [overflow-wrap:anywhere]" />
            </li>
            <li>
              <a href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yashwardhan.ai/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[13px] text-[var(--text-tertiary)]">
          <span>© {new Date().getFullYear()} XMEL Automations. All rights reserved.</span>
          <span>Serving clients in the United States and India.</span>
        </div>
      </div>
    </footer>
  );
}
