"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type SubmitState = "idle" | "sending" | "sent";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("sent"), 2000);
  };

  const inputClasses =
    "w-full bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--accent)] outline-none py-3 font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors duration-200";

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                CONTACT
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6"
            >
              Let&apos;s build your lead-response system.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-lg mb-8"
            >
              Whether you&apos;re a real estate agent losing leads to slow response 
              times or a home services contractor missing calls — I can build the 
              system that fixes it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--success)] status-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--success)]">
                AVAILABLE FOR PROJECTS
              </span>
            </motion.div>
          </div>

          {/* Right — terminal form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-subtle)] p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono text-[var(--accent)]">$</span>
                <span className="font-mono text-[11px] text-[var(--text-tertiary)]">new_project_request</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="input-line">
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] block mb-1">
                    &gt; your_name:
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={inputClasses}
                    required
                  />
                </div>

                <div className="input-line">
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] block mb-1">
                    &gt; your_email:
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@company.com"
                    className={inputClasses}
                    required
                  />
                </div>

                <div className="input-line">
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] block mb-1">
                    &gt; project_type:
                  </label>
                  <input
                    type="text"
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    placeholder="real-estate / home-services / custom"
                    className={inputClasses}
                  />
                </div>

                <div className="input-line">
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] block mb-1">
                    &gt; message:
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder="Tell me about your lead flow and what's broken..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className={`w-full py-3.5 rounded font-mono text-sm font-medium transition-all duration-300 ${
                    state === "sent"
                      ? "bg-[var(--success)] text-[var(--bg-primary)]"
                      : state === "sending"
                        ? "bg-[var(--accent)] text-[var(--bg-primary)] opacity-70"
                        : "bg-[var(--accent)] text-[var(--bg-primary)] hover:shadow-[0_0_30px_rgba(193,255,114,0.2)]"
                  }`}
                >
                  {state === "idle" && "> send_message"}
                  {state === "sending" && "> sending..."}
                  {state === "sent" && "> message_sent ✓"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
