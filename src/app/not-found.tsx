import { ArrowRight } from "lucide-react";
import LogoMark from "@/components/site/logo-mark";
import Lottie from "@/components/motion/lottie";

const links = [
  { href: "/ai-automation-real-estate", title: "AI for real estate", icon: "house" },
  { href: "/ai-automation-home-services", title: "AI for home services", icon: "tools" },
  { href: "/website-development", title: "Website development", icon: "laptop" },
  { href: "/seo", title: "SEO", icon: "growth-chart" },
];

/** Branded 404: says what happened, then offers the four services and a way home. */
export default function NotFound() {
  return (
    <main className="ink min-h-screen flex items-center px-4 sm:px-6 py-16">
      <div className="w-full max-w-[720px] mx-auto">
        <a href="/" className="inline-flex items-center gap-2" aria-label="XMEL Automations home">
          <LogoMark size={34} />
          <span className="font-display font-semibold text-[18px]">
            XMEL <span className="text-[var(--gold)] font-normal italic">Automations</span>
          </span>
        </a>

        <p className="mt-14 font-display text-[clamp(72px,16vw,140px)] leading-none font-medium tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--gold)]">
          404
        </p>
        <h1 className="mt-4 font-display text-[clamp(30px,5vw,48px)] font-medium leading-[1.08] tracking-[-0.02em]">
          This page doesn&apos;t exist. <span className="gold-italic">Your next customer does.</span>
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
          The link may be old or mistyped. Here&apos;s where most people are headed:
        </p>

        <ul className="mt-8 grid sm:grid-cols-2 gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-4 hover:border-[var(--gold)] transition-colors"
              >
                <Lottie name={l.icon} className="w-8 h-8 shrink-0" />
                <span className="flex-1 font-semibold">{l.title}</span>
                <ArrowRight className="w-4 h-4 text-[var(--gold)] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/" className="inline-flex h-12 items-center rounded-xl bg-[var(--gold)] px-6 text-[15px] font-semibold text-[var(--ink)] hover:brightness-110">
            Back to home
          </a>
          <a href="/blog" className="inline-flex h-12 items-center rounded-xl border border-[var(--border-strong)] px-6 text-[15px] font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
            Read the guides
          </a>
        </div>
      </div>
    </main>
  );
}
