import { MARKET_CONFIG, CONTACT_EMAIL, type Market } from "@/lib/market";
import Booking from "@/components/sections/booking";
import MailtoLink from "@/components/shared/mailto-link";
import Hero from "./hero";
import HomeFaq from "./faq";
import ServicesShowcase from "./services-showcase";
import Bundle from "./bundle";
import HowWeWork from "./how-we-work";
import BeforeAfter from "./before-after";
import ScrollStory from "./scroll-story";
import QuoteBuilder from "./quote-builder";
import NumbersBand from "./numbers-band";
import StickyCta from "./sticky-cta";
import CtaTracker from "./cta-tracker";
import CtaButton from "./cta-button";

export default function HomePage({ market }: { market: Market }) {
  const cfg = MARKET_CONFIG[market];
  return (
    <>
      <main>
        <Hero cfg={cfg} />
        <BeforeAfter />
        <ServicesShowcase market={market} />
        <ScrollStory cfg={cfg} />
        <NumbersBand />
        <QuoteBuilder market={market} />
        <Bundle market={market} />
        <div className="gold-rule" aria-hidden="true" />
        <HowWeWork />
        <HomeFaq cfg={cfg} />
        <Booking>
          <div className="mt-8 rounded-2xl bg-[var(--bg-secondary)] p-6">
            <p className="text-[14px] font-semibold text-[var(--text-primary)]">Prefer to message?</p>
            <div className="mt-4 flex flex-col gap-3">
              <CtaButton
                cta={cfg.primaryCta.kind === "whatsapp" ? cfg.primaryCta : cfg.secondaryCta}
                variant="secondary"
                location="book-aside"
              />
              <p className="text-[14px] text-[var(--text-secondary)]">
                Or email{" "}
                <MailtoLink email={CONTACT_EMAIL} className="font-semibold text-[var(--accent)] underline underline-offset-4 break-all" />
                {" "}— or{" "}
                <a href="/contact" className="font-semibold text-[var(--accent)] underline underline-offset-4">
                  send a message
                </a>
                .
              </p>
            </div>
          </div>
        </Booking>
      </main>
      <StickyCta cfg={cfg} />
      <CtaTracker market={market} />
    </>
  );
}
