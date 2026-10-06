"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

/**
 * "Don't have WhatsApp? Leave your email or number — we'll call you": for
 * visitors without WhatsApp, who won't message a stranger first, or who have
 * nothing prepared. A number is required unless they choose Email.
 *
 * Submits from the browser to Web3Forms, the same service and inbox as the
 * main site's contact form, and records a GA4 generate_lead with
 * method "form" so it can be compared with WhatsApp taps.
 */
const WEB3FORMS_ACCESS_KEY = "00038c9b-dba4-4daa-8dc7-8d0a7aaec3ce";

const METHODS = ["Call", "WhatsApp", "Email"] as const;
type Method = (typeof METHODS)[number];
type State = "idle" | "sending" | "sent" | "error";

export default function CallbackForm({ where }: { where: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+971 ");
  const [sells, setSells] = useState("");
  const [method, setMethod] = useState<Method>("Call");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bot = new FormData(e.currentTarget).get("botcheck");
    if (bot) return;
    // Email chosen: the email is enough. Otherwise we need a number to call.
    const hasPhone = phone.replace(/\D/g, "").length >= 8;
    if (method !== "Email" && !hasPhone) {
      setError("Please enter your full number, with the country code.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `UAE e-commerce lead — ${name} (contact by ${method})`,
          from_name: "pro.xmelautomations.xyz",
          name,
          phone: hasPhone ? phone : "—",
          sells: sells || "—",
          contact_by: method,
          ...(method === "Email" ? { email } : {}),
          page: location.href,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "failed");
      setState("sent");
      window.gtag?.("event", "generate_lead", {
        method: "form",
        cta: "callback_form",
        location: where,
        contact_by: method.toLowerCase(),
        page: location.pathname,
        host: location.hostname,
      });
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-[var(--accent-line)] bg-[var(--bg-primary)] p-6 sm:p-8 text-left" role="status">
        <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] mb-4">
          <Check className="w-5 h-5" strokeWidth={3} aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-1.5">
          Got it{name ? `, ${name.split(" ")[0]}` : ""}.
        </h3>
        <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
          We&apos;ll get in touch {method === "Call" ? "by phone" : method === "Email" ? "by email" : "on WhatsApp"} shortly
          with a few questions and your quote. Nothing to prepare in the meantime.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-3 text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-[border-color,box-shadow] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(201,168,106,0.18)]";
  const label = "mb-1.5 block text-[13px] font-semibold text-[var(--text-primary)]";
  const id = (k: string) => `cb-${where}-${k}`;

  return (
    <form onSubmit={submit} className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-primary)] p-5 sm:p-7 text-left space-y-4">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={id("name")} className={label}>Your name</label>
          <input id={id("name")} type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone number{method === "Email" && <span className="font-normal text-[var(--text-tertiary)]"> (optional)</span>}
          </label>
          <input id={id("phone")} type="tel" inputMode="tel" autoComplete="tel" required={method !== "Email"} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+971 50 123 4567" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor={id("sells")} className={label}>
          What do you sell? <span className="font-normal text-[var(--text-tertiary)]">(optional)</span>
        </label>
        <input id={id("sells")} type="text" value={sells} onChange={(e) => setSells(e.target.value)} placeholder="e.g. abayas, perfumes, phone accessories" className={field} />
      </div>

      <fieldset>
        <legend className={label}>How should we reach you?</legend>
        <div className="flex flex-wrap gap-2">
          {METHODS.map((m) => {
            const on = method === m;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={on}
                onClick={() => setMethod(m)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                  on
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                    : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-line)] hover:text-[var(--text-primary)]"
                }`}
              >
                {on && <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />}
                {m}
              </button>
            );
          })}
        </div>
      </fieldset>

      {method === "Email" && (
        <div>
          <label htmlFor={id("email")} className={label}>Email</label>
          <input id={id("email")} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={field} />
        </div>
      )}

      {error && <p className="text-[13px] text-[#F2A99A]" role="alert">{error}</p>}
      {state === "error" && (
        <p className="text-[13px] text-[#F2A99A]" role="alert">
          That didn&apos;t send. Please try again, or tap the WhatsApp button instead.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 min-h-[54px] rounded-xl bg-[var(--accent)] text-[var(--on-accent)] font-semibold text-[15px] hover:brightness-105 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] transition-[filter]"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Contact me with a quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="text-[12px] text-[var(--text-tertiary)] text-center">
        Free and no obligation. Your details are only used to send your quote.
      </p>
    </form>
  );
}
