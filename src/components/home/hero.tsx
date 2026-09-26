import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import type { MarketConfig } from "@/lib/market";
import CtaButton from "./cta-button";
import Lottie from "@/components/motion/lottie";
import Tilt from "@/components/motion/tilt";
import Words from "@/components/motion/words";
import LogoMark from "@/components/site/logo-mark";

type Message = { from: "lead" | "ai"; text: string };

/** Illustrative conversation per market — labelled as an example on the page. */
const CONVERSATION: Record<MarketConfig["market"], { source: string; messages: Message[]; booked: string }> = {
  us: {
    source: "Zillow",
    messages: [
      { from: "lead", text: "Hi, is the 3-bed on Oak Street still available?" },
      { from: "ai", text: "Hi Sarah! Yes, it is. Are you hoping to move in the next 3 months, and are you pre-approved?" },
      { from: "lead", text: "Yes to both — within 2 months." },
      { from: "ai", text: "Great. I can set up a showing: Saturday 11 AM or Sunday 4 PM?" },
      { from: "lead", text: "Saturday works 👍" },
    ],
    booked: "Showing booked · Sat 11:00 AM",
  },
  in: {
    source: "MagicBricks",
    messages: [
      { from: "lead", text: "Hi, is the 3BHK on Baner Road still available?" },
      { from: "ai", text: "Hi Priya! Yes, it is. Are you planning to buy in the next 3 months, and is your budget around ₹1.2 Cr?" },
      { from: "lead", text: "Yes, within 2 months." },
      { from: "ai", text: "Great. I can book a site visit: Saturday 11 AM or Sunday 4 PM?" },
      { from: "lead", text: "Saturday works 👍" },
    ],
    booked: "Site visit booked · Sat 11:00 AM",
  },
};

/** Seconds between beats of the hero conversation; AI replies get a typing beat first. */
const BEAT = 0.7;
const TYPING = 0.9;

/** Start time of each message, plus when the "booked" card lands. */
function timeline(messages: Message[]) {
  let t = 0.4;
  const at = messages.map((m) => {
    const typingAt = t;
    if (m.from === "ai") t += TYPING;
    const showAt = t;
    t += BEAT;
    return { typingAt, showAt };
  });
  return { at, bookedAt: t };
}

function PhoneMock({ cfg }: { cfg: MarketConfig }) {
  const convo = CONVERSATION[cfg.market];
  const { at, bookedAt } = timeline(convo.messages);
  return (
    <figure className="relative mx-auto w-full max-w-[340px]">
      {cfg.market === "in" && (
        <Lottie name="whatsapp" className="float-slow absolute -left-10 bottom-24 w-16 h-16 z-10 pointer-events-none [animation-delay:-3s]" />
      )}
      <div className="absolute -inset-6 rounded-[48px] bg-[radial-gradient(closest-side,rgba(201,168,106,0.28),transparent)]" aria-hidden="true" />
      <div className="relative rounded-[36px] border border-[var(--border-strong)] bg-[var(--bg-primary)] p-3 shadow-[0_30px_60px_-30px_rgba(15,15,18,0.35)]">
        <div className="rounded-[26px] overflow-hidden bg-[var(--bg-secondary)]">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
            <div>
              <div className="text-[13px] font-semibold text-[var(--text-primary)]">New lead · {convo.source}</div>
              <div className="text-[11px] text-[var(--text-tertiary)]">2:14 AM · via {cfg.replyChannel}</div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-dim)] px-2.5 py-1 text-[11px] font-semibold text-[var(--accent)]">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              Replied in 42s
            </span>
          </div>

          <ol className="px-3 py-4 space-y-2.5 text-[13px] leading-snug">
            {convo.messages.map((m, i) => (
              <li key={i} className={`relative flex ${m.from === "ai" ? "justify-end" : "justify-start"}`}>
                {m.from === "ai" && (
                  <span
                    className="chat-typing absolute right-0 top-0 inline-flex gap-1 rounded-2xl rounded-br-md bg-[var(--accent-dim)] px-3 py-3 opacity-0"
                    style={{ "--d": `${at[i].typingAt}s` } as CSSProperties}
                    aria-hidden="true"
                  >
                    <i className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <i className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <i className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                )}
                <span
                  style={{ "--d": `${at[i].showAt}s` } as CSSProperties}
                  className={`chat-in max-w-[82%] rounded-2xl px-3 py-2 ${
                    m.from === "ai"
                      ? "bg-[var(--accent)] text-white rounded-br-md"
                      : "bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-bl-md"
                  }`}
                >
                  {m.from === "ai" && <span className="sr-only">AI: </span>}
                  {m.text}
                </span>
              </li>
            ))}
          </ol>

          <div
            style={{ "--d": `${bookedAt}s` } as CSSProperties}
            className="chat-in mx-3 mb-4 flex items-center gap-2.5 rounded-xl border border-[var(--accent-line)] bg-[var(--bg-primary)] px-3 py-2.5">
            <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
              <Check
                className="check-draw w-3.5 h-3.5"
                strokeWidth={3}
                style={{ "--d": `${bookedAt + 0.3}s` } as CSSProperties}
                aria-hidden="true"
              />
            </span>
            <div className="text-[12px] leading-tight">
              <div className="font-semibold text-[var(--text-primary)]">{convo.booked}</div>
              <div className="text-[var(--text-tertiary)]">Added to your calendar · you&apos;ve been notified</div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-[12px] text-[rgba(245,240,230,0.5)]">
        Example conversation — how the AI handles a new lead
      </figcaption>
    </figure>
  );
}

const TRUST = ["AI replies in under 60 seconds", "Websites live in about a week", "No long-term contracts"];

export default function Hero({ cfg }: { cfg: MarketConfig }) {
  return (
    <section className="ink relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 opacity-[0.07] hidden lg:block" aria-hidden="true">
        <LogoMark size={720} />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-14 sm:pb-24 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,106,0.35)] px-3 py-1.5 text-[13px] font-medium tracking-wide text-[var(--gold)]">
            <span className="live-dot w-2 h-2 rounded-full bg-[var(--gold)]" aria-hidden="true" />
            AI automation · Websites · SEO
          </p>

          <h1 className="mt-5 font-display text-[clamp(44px,7.4vw,92px)] font-medium leading-[0.98] tracking-[-0.03em] text-balance">
            <Words text="More customers." />
            <br />
            <span className="gold-italic">
              <Words text="Less chasing." start={2} />
            </span>
          </h1>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[rgba(245,240,230,0.75)] max-w-[560px]">
            AI that answers every new lead from {cfg.leadSources} in under a
            minute, a website that turns visitors into enquiries, and SEO that
            gets you found — built and run by one team.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <CtaButton cta={cfg.primaryCta} location="hero" />
            <CtaButton cta={cfg.secondaryCta} variant="secondary" location="hero" />
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[rgba(245,240,230,0.7)]">
            {TRUST.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--gold)]" strokeWidth={2.5} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <Tilt>
          <PhoneMock cfg={cfg} />
        </Tilt>
      </div>
    </section>
  );
}
