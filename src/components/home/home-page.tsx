import { MARKET_CONFIG, CONTACT_EMAIL, type Market } from "@/lib/market";
import Problem from "@/components/sections/problem";
import VideoDemo from "@/components/sections/video-demo";
import Booking from "@/components/sections/booking";
import MailtoLink from "@/components/shared/mailto-link";
import Hero from "./hero";
import HowItWorks from "./how-it-works";
import Industries from "./industries";
import Pricing from "./pricing";
import RoiBand from "./roi-band";
import HomeFaq from "./faq";
import StickyCta from "./sticky-cta";
import CtaTracker from "./cta-tracker";
import CtaButton from "./cta-button";
import RelatedGuides from "@/components/site/related-guides";

const GUIDES = {
  us: ["zillow-lead-response-time", "ai-lead-response-cost", "ai-receptionist-hvac"],
  in: ["whatsapp-auto-reply-99acres-magicbricks-leads", "ai-lead-response-cost", "real-estate-lead-follow-up-automation"],
} as const;

export default function HomePage({ market }: { market: Market }) {
  const cfg = MARKET_CONFIG[market];
  return (
    <>
      <main className="reveal">
        <Hero cfg={cfg} />
        <Problem />
        <HowItWorks cfg={cfg} />
        <VideoDemo />
        <Industries />
        <Pricing cfg={cfg} />
        <RoiBand />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <RelatedGuides slugs={[...GUIDES[market]]} title="Guides to faster lead response" />
        </div>
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
