"use client";

import { useState } from "react";
import Flag from "@/components/shared/flag";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";

const INDUSTRY_CLOSE_RATE = 0.08;
// Assumed lift from replying in under a minute instead of hours. An estimate
// for the calculator, not a measured client result.
const AI_IMPROVEMENT = 0.34;

type Currency = "USD" | "INR";

const CURRENCY: Record<Currency, { symbol: string; locale: string; min: number; max: number; step: number; start: number }> = {
  USD: { symbol: "$", locale: "en-US", min: 1000, max: 100000, step: 1000, start: 10000 },
  INR: { symbol: "₹", locale: "en-IN", min: 25000, max: 2500000, step: 25000, start: 200000 },
};

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "tempmail.com",
  "throwaway.email", "temp-mail.org", "fakeinbox.com", "sharklasers.com",
  "guerrillamailblock.com", "grr.la", "dispostable.com", "yopmail.com",
  "yopmail.fr", "maildrop.cc", "trashmail.com", "trashmail.me",
  "trashmail.net", "trashmail.org", "mailnator.com", "mailsac.com",
  "mailscrap.com", "harakirimail.com", "jetable.org", "nospam.ze.tc",
  "nomail.xl.cx", "nomail2me.com", "tmpmail.net", "tmpmail.org",
  "10minutemail.com", "20minutemail.com", "mintemail.com", "mohmal.com",
  "burnermail.io", "getnada.com", "emailondeck.com", "33mail.com",
  "mytemp.email", "tempinbox.com", "discard.email", "discardmail.com",
  "discardmail.org", "spamgourmet.com", "spam4.me", "bccto.me",
  "chacuo.net", "sogetthis.com", "soodonims.com", "spamfree24.org",
  "mysamp.de", "tmpmail.net", "tmpmail.org", "tempr.email",
  "tempestrami.com", "mailforspam.com", "spamavert.com", "spamfree.eu",
  "spamhole.com", "spamify.com", "spaminator.de", "spamoff.de",
  "guerrillamail.com",
]);

const FAKE_LOCAL_PARTS = /^(test|fake|sample|example|noone|null|none|undefined|asdf|qwer(ty)?|aaa+|123+)$/i;

function formatMoney(value: number, currency: Currency): string {
  const { symbol, locale } = CURRENCY[currency];
  return `${symbol}${value.toLocaleString(locale)}`;
}

function isValidEmail(email: string): { valid: boolean; reason?: string } {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { valid: false };
  if (trimmed.length > 254) return { valid: false, reason: "Email too long" };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return { valid: false, reason: "Invalid email format" };

  const domain = trimmed.split("@")[1];
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, reason: "Please use your work email, not a temporary one" };
  }

  const localPart = trimmed.split("@")[0];
  if (FAKE_LOCAL_PARTS.test(localPart)) {
    return { valid: false, reason: "Please enter your real email" };
  }

  if (localPart.length < 3) {
    return { valid: false, reason: "Email seems too short" };
  }

  return { valid: true };
}

export default function CalculatorClient() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [leads, setLeads] = useState(100);
  const [commission, setCommission] = useState(CURRENCY.USD.start);
  const range = CURRENCY[currency];

  const switchCurrency = (next: Currency) => {
    setCurrency(next);
    setCommission(CURRENCY[next].start);
  };
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const monthlyLost = Math.round(leads * INDUSTRY_CLOSE_RATE * AI_IMPROVEMENT * commission);

  const WEB3FORMS_ACCESS_KEY = "00038c9b-dba4-4daa-8dc7-8d0a7aaec3ce";

  const handleUnlock = async () => {
    const validation = isValidEmail(email);
    if (!validation.valid) {
      setEmailError(validation.reason || "Please enter a valid email");
      return;
    }
    setEmailError(null);
    setSubmitState("sending");
    try {
      const annualLost = monthlyLost * 12;
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          email,
          leads_per_month: leads,
          avg_commission: commission,
          monthly_revenue_lost: monthlyLost,
          annual_revenue_lost: annualLost,
          currency,
          subject: `ROI Calculator — New Lead Capture (${leads} leads/mo × ${formatMoney(commission, currency)})`,
          from_name: "ROI Calculator",
          message: `${email} used the ROI Calculator (${currency}). Leads/mo: ${leads}, Avg deal value: ${formatMoney(commission, currency)}, Monthly lost: ${formatMoney(monthlyLost, currency)}, Annual lost: ${formatMoney(annualLost, currency)}.`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitState("sent");
        window.gtag?.("event", "generate_lead", {
          event_category: "roi_calculator",
          calculator_currency: currency,
          leads_per_month: leads,
        });
        window.location.assign("/thank-you");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  const baseline = Math.round(leads * INDUSTRY_CLOSE_RATE * commission);
  const withAi = baseline + monthlyLost;
  const pct = (v: number, min: number, max: number) => `${((v - min) / (max - min)) * 100}%`;
  const slider =
    "roi-range w-full h-6 appearance-none cursor-pointer bg-transparent bg-[linear-gradient(90deg,var(--gold)_var(--p),var(--border-subtle)_var(--p))] bg-[length:100%_8px] bg-center bg-no-repeat";

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
      {/* Inputs */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 sm:p-8 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-[26px] leading-tight text-[var(--text-primary)]">Your numbers</h2>
          <div role="group" aria-label="Currency" className="inline-flex rounded-full border border-[var(--border-strong)] p-1 text-[13px] font-semibold">
            {(Object.keys(CURRENCY) as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => switchCurrency(c)}
                aria-pressed={currency === c}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-colors ${
                  currency === c ? "bg-[var(--ink)] text-[var(--gold)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Flag market={c === "USD" ? "us" : "in"} />
                {c === "USD" ? "USD" : "INR"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-9">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="calc-leads" className="text-[15px] font-semibold text-[var(--text-primary)]">New leads per month</label>
              <span className="font-display text-[28px] leading-none text-[var(--accent)] tabular-nums">{leads}</span>
            </div>
            <input id="calc-leads" type="range" min={10} max={500} step={5} value={leads} onChange={(e) => setLeads(Number(e.target.value))} className={`mt-4 ${slider}`} style={{ ["--p" as string]: pct(leads, 10, 500) }} />
            <div className="mt-2 flex justify-between text-[13px] text-[var(--text-tertiary)]">
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="calc-commission" className="text-[15px] font-semibold text-[var(--text-primary)]">Average deal value or commission</label>
              <span className="font-display text-[28px] leading-none text-[var(--accent)] tabular-nums">{formatMoney(commission, currency)}</span>
            </div>
            <input id="calc-commission" type="range" min={range.min} max={range.max} step={range.step} value={commission} onChange={(e) => setCommission(Number(e.target.value))} className={`mt-4 ${slider}`} style={{ ["--p" as string]: pct(commission, range.min, range.max) }} />
            <div className="mt-2 flex justify-between text-[13px] text-[var(--text-tertiary)]">
              <span>{formatMoney(range.min, currency)}</span>
              <span>{formatMoney(range.max, currency)}</span>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--border-subtle)] pt-5 text-[13px] leading-relaxed text-[var(--text-tertiary)]">
          An estimate, not a guarantee. Assumes an 8% baseline close rate and a 34% lift from replying within a minute instead of
          hours. Recovered = leads × 8% × 34% × deal value.
        </p>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-24 space-y-6">
        <div className="ink rounded-3xl p-6 sm:p-8" aria-live="polite">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">Lost to slow replies, every month</p>
          <p className="mt-3 font-display text-[clamp(48px,7vw,80px)] leading-none tracking-[-0.02em] text-[var(--ivory)] tabular-nums">{formatMoney(monthlyLost, currency)}</p>
          <p className="mt-3 text-[16px] text-[var(--text-secondary)]">
            That&apos;s about <strong className="text-[var(--gold)] tabular-nums">{formatMoney(monthlyLost * 12, currency)}</strong> a year you could win back.
          </p>

          <div className="mt-8 space-y-4" aria-hidden="true">
            {[
              { label: "Deals you win today", v: baseline, gold: false },
              { label: "With replies in under a minute", v: withAi, gold: true },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[var(--text-secondary)]">{b.label}</span>
                  <span className="tabular-nums text-[var(--ivory)]">{formatMoney(b.v, currency)}/mo</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-[rgba(245,240,230,0.08)]">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ${b.gold ? "bg-[linear-gradient(90deg,rgba(245,240,230,0.35)_0,rgba(245,240,230,0.35)_var(--base),var(--gold)_var(--base))]" : "bg-[rgba(245,240,230,0.35)]"}`}
                    style={{ width: `${(b.v / withAi) * 100}%`, ["--base" as string]: `${(baseline / withAi) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">
            At {leads} leads a month and {formatMoney(commission, currency)} a deal, the gold slice is what faster replies could add.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 sm:p-8 shadow-[var(--shadow-card)]">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-[var(--text-primary)]">
            <Mail className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" /> Get your full breakdown
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
            Monthly, quarterly and annual projections, plus a short note on how an AI lead responder would fit your lead sources.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUnlock();
            }}
            className="mt-5 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              aria-label="Email address for the breakdown"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              placeholder="you@company.com"
              required
              className={`flex-1 rounded-xl border bg-[var(--bg-primary)] px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-[border-color,box-shadow] focus:shadow-[0_0_0_4px_rgba(201,168,106,0.2)] ${
                emailError ? "border-[#A0432E]" : "border-[var(--border-strong)] focus:border-[var(--accent)]"
              }`}
            />
            <button
              type="submit"
              disabled={submitState === "sending" || submitState === "sent"}
              className="shine-sweep inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--ink)] px-6 py-3 text-[15px] font-semibold text-[var(--ivory)] hover:bg-black disabled:opacity-80 transition-colors whitespace-nowrap"
            >
              {submitState === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : submitState === "sent" ? (
                <>
                  <Check className="h-4 w-4 text-[var(--gold)]" aria-hidden="true" /> Sent
                </>
              ) : (
                <>
                  {submitState === "error" ? "Try again" : "Send my breakdown"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
          <p role="status" className="mt-3 text-[13px]">
            {emailError ? <span className="text-[#A0432E]">{emailError}</span> : <span className="text-[var(--text-tertiary)]">One email with your breakdown. No spam.</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
