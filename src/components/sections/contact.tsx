"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type SubmitState = "idle" | "sending" | "sent" | "error";

const WEB3FORMS_ACCESS_KEY = "00038c9b-dba4-4daa-8dc7-8d0a7aaec3ce";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          project_type: form.project,
          message: form.message,
          subject: `New Project Inquiry — ${form.project || "General"}`,
          from_name: "ISA Systems Portfolio",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setState("sent");
        setForm({ name: "", email: "", project: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
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
              className="mb-8"
            >
              <a
                href="mailto:yashwwardhanai@gmail.com"
                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group"
              >
                <span className="font-mono text-[11px] text-[var(--text-tertiary)] w-16">EMAIL</span>
                <span className="font-mono text-sm">yashwwardhanai@gmail.com</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-[11px] rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/yashwardhan.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-[11px] rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
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
                <input type="hidden" name="botcheck" style={{ display: "none" }} />

                <div className="input-line">
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] block mb-1">
                    &gt; your_name:
                  </label>
                  <input
                    type="text"
                    name="name"
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
                    name="email"
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
                    name="project_type"
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
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder="Tell me about your lead flow and what's broken..."
                    className={`${inputClasses} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className={`w-full py-3.5 rounded font-mono text-sm font-medium transition-all duration-300 ${
                    state === "sent"
                      ? "bg-[var(--success)] text-[var(--bg-primary)]"
                      : state === "error"
                        ? "bg-[var(--warning)] text-[var(--bg-primary)]"
                        : state === "sending"
                          ? "bg-[var(--accent)] text-[var(--bg-primary)] opacity-70"
                          : "bg-[var(--accent)] text-[var(--bg-primary)] hover:shadow-[0_0_30px_rgba(193,255,114,0.2)]"
                  }`}
                >
                  {state === "idle" && "> send_message"}
                  {state === "sending" && "> sending..."}
                  {state === "sent" && "> message_sent ✓"}
                  {state === "error" && "> error — try again"}
                </button>

                {state === "sent" && (
                  <p className="font-mono text-[11px] text-[var(--success)] text-center">
                    Message delivered. I&apos;ll respond within 24 hours.
                  </p>
                )}
                {state === "error" && (
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className="font-mono text-[11px] text-[var(--warning)] text-center w-full hover:underline"
                  >
                    Click to try again
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
