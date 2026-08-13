import MailtoLink from "@/components/shared/mailto-link";
import LiveClock from "@/components/shared/live-clock";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">&gt;</span> XMEL AUTOMATIONS
            </span>
            <p className="font-mono text-[12px] text-[var(--text-tertiary)] mt-1">
              AI automation for real estate &amp; home services.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="/ai-automation-real-estate"
              className="inline-block py-1 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Real Estate
            </a>
            <a
              href="/ai-automation-home-services"
              className="inline-block py-1 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Home Services
            </a>
            {["WORK", "ISA SYSTEM", "PROCESS", "ABOUT", "CONTACT"].map((link) => (
              <a
                key={link}
                href={`#${link === "WORK" ? "work" : link === "ISA SYSTEM" ? "isa-system" : link === "PROCESS" ? "process" : link === "ABOUT" ? "about" : "contact"}`}
                className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200 hidden md:block"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="font-mono text-[12px] text-[var(--text-tertiary)]">
            <LiveClock />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[12px] text-[var(--text-tertiary)]">
            © 2026 XMEL Automations. All rights reserved.
          </div>
          <div className="font-mono text-[12px] text-[var(--text-tertiary)]">
            SERVING: Miami · Austin · Phoenix · Tampa · Orlando · Dallas ·
            Houston · Atlanta · Charlotte · Denver · India
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/blog"
              className="inline-block py-1 font-mono text-[13px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Blog
            </a>
            <a
              href="/tools/roi-calculator"
              className="inline-block py-1 font-mono text-[13px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              ROI Calculator
            </a>
            <a
              href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-1 font-mono text-[13px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/yashwardhan.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-1 font-mono text-[13px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Instagram
            </a>
            <MailtoLink
              email="yashwardhan@xmelautomations.xyz"
              className="inline-block py-1 font-mono text-[13px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Email
            </MailtoLink>
            <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
              Built with precision. No templates.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
