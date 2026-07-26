"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Mail, ArrowRight, Check, TrendingUp } from "lucide-react";

type Step = "calculator" | "gated";

const INDUSTRY_CLOSE_RATE = 0.08;
const AI_IMPROVEMENT = 0.34;

function formatCurrency(value: number): string {
  if (value >= 1_00_000) {
    return `${(value / 1_00_000).toFixed(1)}L`;
  }
  return value.toLocaleString("en-IN");
}

function formatCurrencyFull(value: number): string {
  return value.toLocaleString("en-IN");
}

export default function CalculatorClient() {
  const [leads, setLeads] = useState(100);
  const [commission, setCommission] = useState(20000);
  const [step, setStep] = useState<Step>("calculator");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const monthlyLost = Math.round(leads * INDUSTRY_CLOSE_RATE * AI_IMPROVEMENT * commission);
  const monthlyBaseline = Math.round(leads * INDUSTRY_CLOSE_RATE * commission);
  const monthlyWithAI = Math.round(leads * (INDUSTRY_CLOSE_RATE + INDUSTRY_CLOSE_RATE * AI_IMPROVEMENT) * commission);
  const annualLost = monthlyLost * 12;
  const quarterlyLost = monthlyLost * 3;

  const handleUnlock = useCallback(async () => {
    if (!email) return;
    setSubmitState("sending");
    try {
      const res = await fetch("/api/roi-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, leads, commission }),
      });
      if (res.ok) {
        setSubmitState("sent");
        setTimeout(() => setStep("gated"), 400);
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
              <label className="font-mono text-xs text-[var(--text-secondary)]">
                LEADS / MONTH
              </label>
              <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                {leads}
              </span>
            </div>
            <input
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
              <label className="font-mono text-xs text-[var(--text-secondary)]">
                AVG COMMISSION ($)
              </label>
              <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                ${formatCurrencyFull(commission)}
              </span>
            </div>
            <input
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
      <AnimatePresence mode="wait">
        {step === "calculator" ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--accent)] outline-none py-3 font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors"
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

            <p className="font-mono text-[10px] text-[var(--text-tertiary)] mt-3">
              No spam. One email with your breakdown + one case study follow-up. Unsubscribe anytime.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Unlocked label */}
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--accent)]">
              <Check className="w-4 h-4" />
              <span>DETAILED BREAKDOWN — UNLOCKED</span>
            </div>

            {/* Recovery cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "MONTHLY", value: monthlyLost, icon: TrendingUp },
                { label: "QUARTERLY", value: quarterlyLost, icon: TrendingUp },
                { label: "ANNUALLY", value: annualLost, icon: TrendingUp },
              ].map((card) => (
                <div
                  key={card.label}
                  className="p-5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] text-center"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-2">
                    {card.label} RECOVERY
                  </div>
                  <div className="font-mono text-2xl lg:text-3xl font-bold text-[var(--accent)]">
                    ${formatCurrency(card.value)}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary breakdown */}
            <div className="p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-4">
                YOUR PROJECTION
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                  <span className="text-sm text-[var(--text-secondary)]">Leads / month</span>
                  <span className="font-mono text-sm text-[var(--text-primary)]">{leads}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                  <span className="text-sm text-[var(--text-secondary)]">Avg commission</span>
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    ${formatCurrencyFull(commission)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                  <span className="text-sm text-[var(--text-secondary)]">Baseline close rate</span>
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    {(INDUSTRY_CLOSE_RATE * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                  <span className="text-sm text-[var(--text-secondary)]">
                    AI conversion improvement
                  </span>
                  <span className="font-mono text-sm text-[var(--accent)]">
                    +{(AI_IMPROVEMENT * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    Annual commission recovered
                  </span>
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">
                    ${formatCurrencyFull(annualLost)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 lg:p-8 bg-[var(--accent)] rounded-xl text-[var(--bg-primary)]">
              <h3 className="font-display text-xl font-semibold mb-2">
                Ready to stop losing this revenue?
              </h3>
              <p className="text-sm opacity-80 mb-6 max-w-lg">
                I build AI lead-response systems that respond in under 50 seconds
                and recover the commission you&apos;re currently leaving on the table.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-primary)] text-[var(--accent)] font-mono text-sm font-medium rounded hover:opacity-90 transition-opacity"
                >
                  Book a pilot call
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:yashwwardhanai@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--bg-primary)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:bg-[rgba(10,10,11,0.1)] transition-colors"
                >
                  Email me directly
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
