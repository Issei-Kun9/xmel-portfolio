import MailtoLink from "@/components/shared/mailto-link";
import { CONTACT_EMAIL, PHONE_DISPLAY, whatsappHref } from "@/lib/market";
import { CalendarDays } from "lucide-react";
import LogoMark from "./logo-mark";
import { INDUSTRIES } from "@/lib/industries";

const columns = [
  {
    title: "Solutions",
    links: [
      { name: "AI for real estate", href: "/ai-automation-real-estate" },
      { name: "AI for home services", href: "/ai-automation-home-services" },
      { name: "Website development", href: "/website-development" },
      { name: "SEO", href: "/seo" },
    ],
  },
  {
    title: "Industries",
    links: INDUSTRIES.map((i) => ({ name: i.name, href: `/for/${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { name: "Pricing", href: "/#pricing" },
      { name: "Style inspiration", href: "/inspiration" },
      { name: "ROI calculator", href: "/tools/roi-calculator" },
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="ink relative overflow-hidden">
      <div aria-hidden="true" className="h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-70" />
      <div className="footer-cta max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[var(--border-subtle)]">
        <p className="font-display text-[clamp(30px,4vw,46px)] leading-[1.05] tracking-[-0.02em]">
          Ready when you are. <span className="gold-italic">Every lead, answered first.</span>
        </p>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a href="/#book" data-cta="book" data-cta-location="footer" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[var(--gold)] text-[var(--ink)] text-[14px] font-semibold hover:brightness-110">
            <CalendarDays className="h-4 w-4" aria-hidden="true" /> Book a 15-min call
          </a>
          <a href={whatsappHref("Hi Yashwardhan, I found XMEL and have a question.")} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="footer" className="inline-flex items-center h-11 px-5 rounded-xl border border-[var(--border-strong)] text-[14px] font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)]">
            WhatsApp {PHONE_DISPLAY}
          </a>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1.2fr]">
        <div>
          <a href="/" className="flex items-center gap-2">
            <LogoMark size={28} />
            <span className="font-display font-semibold text-[17px] text-[var(--text-primary)]">
              XMEL <span className="font-normal italic text-[var(--gold)]">Automations</span>
            </span>
          </a>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-xs">
            AI infrastructure, websites and SEO that bring you more customers — for
            businesses in the US and India.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] mb-4">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] mb-4">Get in touch</h2>
          <ul className="space-y-2.5 text-[14px]">
            <li>
              <MailtoLink email={CONTACT_EMAIL} className="text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors [overflow-wrap:anywhere]" />
            </li>
            <li>
              <a href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yashwardhan.ai/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[13px] text-[var(--text-tertiary)]">
          <span>
            © {new Date().getFullYear()} XMEL Automations. All rights reserved.
            <span className="mx-2" aria-hidden="true">·</span>
            <a href="/privacy" className="hover:text-[var(--gold)] transition-colors">Privacy</a>
          </span>
          <span>Serving clients in the United States and India.</span>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none select-none text-center font-display text-[clamp(64px,17vw,240px)] leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(201,168,106,0.22)] -mb-[0.12em]">
        XMEL
      </p>
    </footer>
  );
}
