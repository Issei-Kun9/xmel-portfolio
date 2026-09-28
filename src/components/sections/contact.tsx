"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Check, Loader2, Mail } from "lucide-react";
import { useClientValue } from "@/lib/use-client-value";
import MailtoLink from "@/components/shared/mailto-link";
import { PHONE_DISPLAY, whatsappHref } from "@/lib/market";

type SubmitState = "idle" | "sending" | "sent" | "error";

const WEB3FORMS_ACCESS_KEY = "00038c9b-dba4-4daa-8dc7-8d0a7aaec3ce";

const CONTACT_EMAIL = "yashwardhan@xmelautomations.xyz";

const NEEDS = ["AI Infrastructure", "A website", "SEO", "Not sure yet"];

const NEXT = [
  { title: "I read it myself", body: "A personal reply within 24 hours, usually sooner." },
  { title: "A 15-minute call", body: "Where your customers come from, and what's getting missed." },
  { title: "A written plan, fixed price", body: "What we'd build, how long, what it costs. You decide." },
];

export default function Contact() {
  // message stays null until the visitor types, so it can default to the plan
  // they built on the homepage (?plan=…).
  const [form, setForm] = useState<{ name: string; email: string; project: string; message: string | null }>({ name: "", email: "", project: "", message: null });
  const [needs, setNeeds] = useState<string[]>([]);
  const [state, setState] = useState<SubmitState>("idle");
  const plan = useClientValue(() => new URLSearchParams(window.location.search).get("plan") ?? "", "");
  const message = form.message ?? (plan ? `I'm interested in: ${plan}.\n\n` : "");

  const toggleNeed = (n: string) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const projectType = [needs.join(", "), form.project].filter(Boolean).join(" · ");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          project_type: projectType,
          message,
          subject: `New Project Inquiry — ${projectType || "General"}`,
          from_name: "XMEL Automations Portfolio",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setState("sent");
        window.gtag?.("event", "generate_lead", {
          value: 100,
          currency: "USD",
          event_category: "contact_form",
          project_type: projectType || "general",
        });
        window.location.assign("/thank-you");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const field =
    "w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-[border-color,box-shadow] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(201,168,106,0.2)]";
  const label = "mb-1.5 block text-[14px] font-semibold text-[var(--text-primary)]";

  return (
    <section id="contact" className="paper relative py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
        {/* Form */}
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 sm:p-9 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-[clamp(28px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)]">
            Send a message
          </h2>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)]">Two minutes. A real reply from the person who&apos;d build it.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="botcheck" hidden />

            <fieldset>
              <legend className={label}>What do you need?</legend>
              <div className="flex flex-wrap gap-2">
                {NEEDS.map((n) => {
                  const on = needs.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleNeed(n)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                        on ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)]" : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {on && <Check className="h-3.5 w-3.5 text-[var(--gold)]" strokeWidth={3} aria-hidden="true" />}
                      {n}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className={label}>Your name</label>
                <input id="contact-name" type="text" name="name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={field} required />
              </div>
              <div>
                <label htmlFor="contact-email" className={label}>Email</label>
                <input id="contact-email" type="email" name="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className={field} required />
              </div>
            </div>

            <div>
              <label htmlFor="contact-project" className={label}>
                Your business <span className="font-normal text-[var(--text-tertiary)]">(optional)</span>
              </label>
              <input id="contact-project" type="text" name="project_type" autoComplete="organization" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} placeholder="e.g. Roofing in Austin, interior studio in Pune" className={field} />
            </div>

            <div>
              <label htmlFor="contact-message" className={label}>Message</label>
              <textarea id="contact-message" name="message" value={message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Where do your customers come from, and what happens to their enquiries today?" className={`${field} resize-y min-h-[120px]`} required />
            </div>

            <button
              type="submit"
              disabled={state === "sending" || state === "sent"}
              className="shine-sweep inline-flex w-full items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--ink)] text-[15px] font-semibold text-[var(--ivory)] hover:bg-black disabled:opacity-80 transition-colors"
            >
              {state === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : state === "sent" ? (
                <>
                  <Check className="h-4 w-4 text-[var(--gold)]" aria-hidden="true" /> Sent
                </>
              ) : (
                <>
                  Send message <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
            <p role="status" className="min-h-5 text-center text-[13px]">
              {state === "error" ? (
                <span className="text-[#A0432E]">That didn&apos;t go through. Please try again, or message on WhatsApp.</span>
              ) : (
                <span className="text-[var(--text-tertiary)]">No mailing list. Your details are only used to reply to you.</span>
              )}
            </p>
          </form>
        </div>

        {/* Faster ways + what happens next */}
        <aside className="space-y-4">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Prefer something faster?</p>
          <a
            href={whatsappHref("Hi Yashwardhan, I'd like to talk about my business.")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            data-cta-location="contact"
            className="lift flex items-center gap-4 rounded-2xl bg-[var(--whatsapp)] p-5 text-[#06300E] hover:brightness-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>
              <span className="block text-[16px] font-semibold">Message on WhatsApp</span>
              <span className="block text-[14px] opacity-80">{PHONE_DISPLAY} · usually the fastest</span>
            </span>
          </a>
          <a href="/#book" data-cta="book" data-cta-location="contact" className="ink lift flex items-center gap-4 rounded-2xl p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)]">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[16px] font-semibold">Book a 15-minute call</span>
              <span className="block text-[14px] text-[var(--text-secondary)]">Pick a time in your own timezone</span>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--bg-secondary)] text-[var(--accent)]">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[16px] font-semibold text-[var(--text-primary)]">Email</span>
              <MailtoLink email={CONTACT_EMAIL} className="block py-1 break-all text-[14px] font-medium text-[var(--accent)] underline underline-offset-4" />
            </span>
          </div>

          <div className="!mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6">
            <p className="text-[15px] font-semibold text-[var(--text-primary)]">What happens next</p>
            <ol className="mt-4 space-y-4">
              {NEXT.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--ink)] font-display text-[13px] text-[var(--gold)]">{i + 1}</span>
                  <span>
                    <span className="block text-[15px] font-semibold text-[var(--text-primary)]">{s.title}</span>
                    <span className="block text-[14px] leading-snug text-[var(--text-secondary)]">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <a href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/yashwardhan.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
              Instagram
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
