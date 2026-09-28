"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, CheckCheck, RotateCcw, Phone, Video, ChevronLeft, BellRing } from "lucide-react";
import type { Market } from "@/lib/market";
import { useClientValue } from "@/lib/use-client-value";
import { HOME_SERVICES, REAL_ESTATE, type Script, type ScriptSet } from "@/lib/chat-scripts";
import Flag from "@/components/shared/flag";

/** "2:14 AM" → asleep, "9:40 PM" → off the clock, "4:12 PM" → on a job. */
function busyWith(time: string) {
  const [, h, ap] = time.match(/^(\d+):\d+ (AM|PM)$/) ?? [];
  const hour = (Number(h) % 12) + (ap === "PM" ? 12 : 0);
  if (hour < 6) return "asleep";
  if (hour >= 19) return "off the clock";
  return "on a job";
}

/** Timeline beside the phone; each step lights up when the chat reaches it. */
function stepsFor(script: Script) {
  const n = script.messages.length;
  return [
    { at: 1, t: "0:00", title: `A lead messages at ${script.messages[0].time}`, body: `From ${script.source}, while you're busy, off the clock or asleep.` },
    { at: 2, t: "0:42", title: "The AI replies in 42 seconds", body: "Warm, natural, in your tone, and in the customer's language." },
    { at: 4, t: "2:10", title: "It qualifies them", body: `${script.qualifies}: the questions you'd ask.` },
    { at: n, t: "3:05", title: `It books ${script.books}`, body: "Straight into your calendar, with a reminder sent." },
    { at: n + 1, t: "3:06", title: "You get a booked, qualified lead", body: "A summary lands on your phone. You just show up." },
  ];
}

const TYPING_MS = 1100;
const GAP_MS = 900;

export default function ChatDemo({
  market: initial = "us",
  variant = "real-estate",
  scripts,
  eyebrow = "Watch it work",
}: {
  market?: Market;
  variant?: "real-estate" | "home-services";
  /** Overrides `variant` with a specific conversation (industry pages). */
  scripts?: ScriptSet;
  eyebrow?: string;
}) {
  const [market, setMarket] = useState<Market>(initial);
  const script = (scripts ?? (variant === "home-services" ? HOME_SERVICES : REAL_ESTATE))[market];
  const steps = stepsFor(script);
  const total = script.messages.length + 1; // + the booked/notify step
  const [played, setShown] = useState(0);
  // Reduced motion: show the whole conversation at once, no scroll trigger.
  const reduce = useClientValue(() => matchMedia("(prefers-reduced-motion: reduce)").matches, false);
  const shown = reduce ? total : played;
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [notifDone, setNotifDone] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const chat = useRef<HTMLDivElement>(null);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const play = useCallback(() => {
    clear();
    // Every state change runs from a timer, so starting from an effect never
    // renders synchronously.
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    timers.current.push(window.setTimeout(() => { setShown(reduce ? total : 0); setTyping(false); setNotifDone(false); }, 0));
    if (reduce) return;
    let t = 400;
    script.messages.forEach((m, i) => {
      if (m.from === "ai") {
        timers.current.push(window.setTimeout(() => setTyping(true), t));
        t += TYPING_MS;
      }
      timers.current.push(window.setTimeout(() => { setTyping(false); setShown(i + 1); }, t));
      t += GAP_MS + Math.min(m.text.length * 12, 900);
    });
    timers.current.push(window.setTimeout(() => setShown(total), t + 300));
  }, [script, total]);

  // Start the first time the demo scrolls into view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => { if (started) play(); return clear; }, [started, play]);

  // Keep the newest message in view inside the phone.
  useEffect(() => { chat.current?.scrollTo({ top: chat.current.scrollHeight, behavior: "smooth" }); }, [shown, typing]);

  const wa = market === "in";
  const done = shown >= total;
  // The "to you" notification drops in when the booking lands, then slides away.
  const notif = done && !notifDone;
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setNotifDone(true), 4200);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <section id="demo" className="ink scroll-mt-20 py-16 sm:py-24" aria-label="Demo: the AI answering a lead">
      <div ref={box} className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">{eyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(32px,4.8vw,56px)] font-medium leading-[1.04] tracking-[-0.02em] max-w-2xl">
              {script.messages[0].time}. A lead messages. <span className="gold-italic">You&apos;re {busyWith(script.messages[0].time)}.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div role="group" aria-label="Demo market" className="inline-flex rounded-full border border-[var(--border-strong)] p-1 text-[13px] font-semibold">
              {(["us", "in"] as const).map((m) => (
                <button key={m} type="button" aria-pressed={market === m}
                  onClick={() => { setMarket(m); setStarted(true); }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${market === m ? "bg-[#C9A86A] text-[#0F0F12]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
                  <Flag market={m} /><span className="sm:hidden">{m === "us" ? "US" : "India"}</span><span className="hidden sm:inline">{m === "us" ? "Text · US" : "WhatsApp · India"}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={play} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-2 text-[13px] font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Replay
            </button>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
          {/* Phone */}
          <div className="mx-auto w-full max-w-[360px]">
            <div className="rounded-[44px] border border-[rgba(201,168,106,0.45)] bg-[#0F0F12] p-2.5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
              <div className="relative overflow-hidden rounded-[36px]">
                {/* Header */}
                <div className={`flex items-center gap-3 px-4 pb-3 pt-9 ${wa ? "bg-[#008069] text-white" : "bg-[#F6F6F6] text-[#0F0F12] border-b border-black/10"}`}>
                  <ChevronLeft className="h-5 w-5 opacity-80" aria-hidden="true" />
                  <span className={`grid h-9 w-9 place-items-center rounded-full text-[14px] font-semibold ${wa ? "bg-white/20" : "bg-[#C9C9CE] text-white"}`}>{script.contact[0]}</span>
                  <div className="flex-1 leading-tight">
                    <p className="text-[15px] font-semibold">{script.contact}</p>
                    <p className={`text-[11px] ${wa ? "text-white/80" : "text-black/50"}`}>{typing ? "typing…" : `via ${script.source}`}</p>
                  </div>
                  {wa && <><Video className="h-5 w-5 opacity-90" aria-hidden="true" /><Phone className="h-[18px] w-[18px] opacity-90" aria-hidden="true" /></>}
                </div>
                {/* Chat */}
                <div
                  ref={chat}
                  className={`h-[440px] overflow-y-auto px-3 py-4 space-y-2 ${wa ? "bg-[#EFEAE2]" : "bg-white"}`}
                  style={wa ? { backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)", backgroundSize: "14px 14px" } : undefined}
                  aria-live="polite"
                >
                  <p className="mx-auto w-fit rounded-md bg-black/5 px-2 py-0.5 text-[11px] text-black/55">{script.channel} · Today</p>
                  {script.messages.slice(0, shown).map((m, i) => {
                    const mine = m.from === "ai";
                    return (
                      <div key={`${market}-${i}`} className={`chat-in flex ${mine ? "justify-end" : "justify-start"}`} style={{ ["--d" as string]: "0s" }}>
                        <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-[14px] leading-snug shadow-sm ${
                          mine
                            ? wa ? "bg-[#D9FDD3] text-[#111B21] rounded-tr-sm" : "bg-[#0A84FF] text-white rounded-br-sm"
                            : wa ? "bg-white text-[#111B21] rounded-tl-sm" : "bg-[#E9E9EB] text-[#0F0F12] rounded-bl-sm"
                        }`}>
                          {mine && <span className="sr-only">AI: </span>}
                          {m.text}
                          <span className={`ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[10px] ${mine && !wa ? "text-white/75" : "text-black/45"}`}>
                            {m.time}
                            {mine && (wa ? <CheckCheck className="h-3.5 w-3.5 text-[#53BDEB]" aria-hidden="true" /> : null)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {typing && (
                    <div className="flex justify-end">
                      <div className={`inline-flex gap-1 rounded-2xl px-3 py-3 ${wa ? "bg-[#D9FDD3]" : "bg-[#0A84FF]"}`} aria-label="AI is typing">
                        {[0, 1, 2].map((d) => (
                          <i key={d} className={`block h-1.5 w-1.5 animate-bounce rounded-full ${wa ? "bg-[#111B21]/50" : "bg-white/80"}`} style={{ animationDelay: `${d * 120}ms` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  {done && (
                    <div className="chat-in mx-auto mt-3 flex w-fit items-center gap-2 rounded-xl border border-[rgba(138,106,47,0.4)] bg-white px-3 py-2 text-[12px] font-semibold text-[#0F0F12] shadow-sm" style={{ ["--d" as string]: "0s" }}>
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#7D5F27] text-white"><Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /></span>
                      {script.booked}
                    </div>
                  )}
                </div>
                {/* Agent notification slides in over the chat */}
                <div
                  className={`absolute inset-x-3 top-3 rounded-2xl bg-[rgba(30,30,34,0.92)] p-3 text-white shadow-xl backdrop-blur transition-all duration-500 ${notif ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}`}
                  aria-hidden={!notif}
                >
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#C9A86A]"><BellRing className="h-3.5 w-3.5" aria-hidden="true" /> XMEL · to you</p>
                  <p className="mt-1 text-[13px] font-semibold">{script.booked}</p>
                  <p className="text-[12px] text-white/70">{script.notify}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-[12px] text-[var(--text-tertiary)]">Simulated demo — how the AI handles a real enquiry.</p>
          </div>

          {/* Timeline */}
          <ol className="relative space-y-7 border-l border-[var(--border-subtle)] pl-8">
            {steps.map((s) => {
              const on = shown >= s.at;
              return (
                <li key={s.title} className={`relative transition-opacity duration-500 ${on ? "opacity-100" : "opacity-35"}`}>
                  <span className={`absolute -left-[39px] top-1 grid h-5 w-5 place-items-center rounded-full border transition-colors duration-500 ${on ? "border-[#C9A86A] bg-[#C9A86A]" : "border-[var(--border-strong)] bg-[#0F0F12]"}`} aria-hidden="true">
                    {on && <Check className="h-3 w-3 text-[#0F0F12]" strokeWidth={3} />}
                  </span>
                  <p className="font-display text-[14px] tracking-[0.18em] text-[var(--gold)]">{s.t}</p>
                  <h3 className="mt-1 font-display text-[24px] leading-tight">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
