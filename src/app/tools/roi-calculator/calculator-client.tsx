"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, Mail, ArrowRight, Check } from "lucide-react";
import MailtoLink from "@/components/shared/mailto-link";

const INDUSTRY_CLOSE_RATE = 0.08;
const AI_IMPROVEMENT = 0.34;

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
  "fastmail.com", "hushmail.com", "protonmail.com", "proton.me",
  "tutanota.com", "tutamail.com", "guerrillamail.com",
]);

const FAKE_PREFIXES = /^(test|demo|fake|sample|example|admin|user|guest|temp|tmp|noone|null|none|undefined|aaa|bbb|ccc|asdf|qwer|123|abc)/i;

function formatCurrency(value: number): string {
  if (value >= 1_00_000) {
    return `${(value / 1_00_000).toFixed(1)}L`;
  }
  return value.toLocaleString("en-IN");
}

function formatCurrencyFull(value: number): string {
  return value.toLocaleString("en-IN");
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
  if (FAKE_PREFIXES.test(localPart)) {
    return { valid: false, reason: "Please enter your real email" };
  }

  if (localPart.length < 3) {
    return { valid: false, reason: "Email seems too short" };
  }

  return { valid: true };
}

export default function CalculatorClient() {
  const [leads, setLeads] = useState(100);
  const [commission, setCommission] = useState(20000);
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const monthlyLost = Math.round(leads * INDUSTRY_CLOSE_RATE * AI_IMPROVEMENT * commission);
  const monthlyBaseline = Math.round(leads * INDUSTRY_CLOSE_RATE * commission);
  const monthlyWithAI = Math.round(leads * (INDUSTRY_CLOSE_RATE + INDUSTRY_CLOSE_RATE * AI_IMPROVEMENT) * commission);
  const annualLost = monthlyLost * 12;

  const WEB3FORMS_ACCESS_KEY = "00038c9b-dba4-4daa-8dc7-8d0a7aaec3ce";

  const handleUnlock = useCallback(async () => {
    const validation = isValidEmail(email);
    if (!validation.valid) {
      setEmailError(validation.reason || "Please enter a valid email");
      return;
    }
    setEmailError(null);
    setSubmitState("sending");
    try {
      const monthlyLost = Math.round(leads * INDUSTRY_CLOSE_RATE * AI_IMPROVEMENT * commission);
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
          subject: `ROI Calculator — New Lead Capture (${leads} leads/mo × $${commission.toLocaleString()})`,
          from_name: "ROI Calculator",
          message: `${email} used the ROI Calculator. Leads/mo: ${leads}, Avg commission: $${commission.toLocaleString()}, Monthly lost: $${monthlyLost.toLocaleString()}, Annual lost: $${annualLost.toLocaleString()}.`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitState("sent");
        window.gtag?.("event", "generate_lead", {
          value: 100,
          currency: "USD",
          event_category: "roi_calculator",
          leads_per_month: leads,
        });
        window.location.href = "/thank-you";
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  }, [email, leads, commission]);

  return (
    <div className="space-y-8">
      {/* Live result — always visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-2">
            LOST TO SLOW RESPONSE — EVERY MONTH
          </div>

          <div className="font-mono text-[clamp(36px,8vw,64px)] font-bold text-[var(--accent)] leading-none mb-4">
            ${formatCurrency(monthlyLost)}
          </div>

          <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg">
            At your volume ({leads} leads/mo × ${formatCurrencyFull(commission)} avg
            commission), slow lead response is costing you roughly{" "}
            <strong className="text-[var(--text-primary)]">
              ${formatCurrencyFull(monthlyLost)} per month
            </strong>{" "}
            in recoverable commission.
          </p>
        </div>
      </motion.div>

      {/* Sliders */}
      <div className="p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-6">
          <Calculator className="w-3 h-3 inline mr-1.5 -mt-0.5" />
          YOUR NUMBERS
        </div>

        <div className="space-y-8">
          {/* Leads slider */}
          <div>
            <div className="flex justify-between mb-3">
              <label htmlFor="calc-leads" className="font-mono text-xs text-[var(--text-secondary)]">
                LEADS / MONTH
              </label>
              <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                {leads}
              </span>
            </div>
            <input
              id="calc-leads"
              type="range"
              min={10}
              max={500}
              step={5}
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none bg-[var(--border-subtle)] cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(193,255,114,0.4)]"
            />
            <div className="flex justify-between mt-1.5">
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">10</span>
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">500</span>
            </div>
          </div>

          {/* Commission slider */}
          <div>
            <div className="flex justify-between mb-3">
              <label htmlFor="calc-commission" className="font-mono text-xs text-[var(--text-secondary)]">
                AVG COMMISSION ($)
              </label>
              <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                ${formatCurrencyFull(commission)}
              </span>
            </div>
            <input
              id="calc-commission"
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={commission}
              onChange={(e) => setCommission(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none bg-[var(--border-subtle)] cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(193,255,114,0.4)]"
            />
            <div className="flex justify-between mt-1.5">
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">$1,000</span>
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">$100,000</span>
            </div>
          </div>
        </div>

        {/* Context line */}
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
          <p className="font-mono text-[10px] text-[var(--text-tertiary)] leading-relaxed">
            METHODOLOGY — Industry avg close rate: 8%. AI response improves conversion by 34% (pilot data). Recovery = leads × 8% × 34% × commission.
          </p>
        </div>
      </div>

      {/* Gated deep-dive — email gate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]"
      >
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-4">
              <Mail className="w-3 h-3 inline mr-1.5 -mt-0.5" />
              GET YOUR FULL BREAKDOWN
            </div>

            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 max-w-lg">
              Enter your email to see your monthly, quarterly, and annual
              recovery projection — plus a case study on how one Mumbai real
              estate agent recovered $42K/year in lost commission.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUnlock();
              }}
              className="flex flex-col sm:flex-row gap-3"
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
                className={`flex-1 bg-transparent border-b ${emailError ? "border-[var(--warning)]" : "border-[var(--border-subtle)] focus:border-[var(--accent)]"} outline-none py-3 font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors`}
              />
              <button
                type="submit"
                disabled={!email || submitState === "sending"}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium rounded transition-all duration-300 whitespace-nowrap ${
                  submitState === "sent"
                    ? "bg-[var(--success)] text-[var(--bg-primary)]"
                    : submitState === "error"
                      ? "bg-[var(--warning)] text-[var(--bg-primary)]"
                      : !email
                        ? "bg-[var(--accent)] text-[var(--bg-primary)] opacity-40 cursor-not-allowed"
                        : "bg-[var(--accent)] text-[var(--bg-primary)] hover:shadow-[0_0_30px_rgba(193,255,114,0.2)]"
                }`}
              >
                {submitState === "idle" && (
                  <>
                    Unlock breakdown
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
                {submitState === "sending" && "Sending..."}
                {submitState === "sent" && (
                  <>
                    <Check className="w-4 h-4" />
                    Sent
                  </>
                )}
                {submitState === "error" && "Try again"}
              </button>
            </form>

            {emailError && (
              <p className="font-mono text-[11px] text-[var(--warning)] mt-2">
                {emailError}
              </p>
            )}

            <p className="font-mono text-[10px] text-[var(--text-tertiary)] mt-3">
              No spam. One email with your breakdown + one case study follow-up. Unsubscribe anytime.
            </p>
      </motion.div>
    </div>
  );
}
