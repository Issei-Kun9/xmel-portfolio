"use client";

import { motion } from "framer-motion";

const skills = [
  "n8n", "GPT-4o", "Twilio", "Vapi", "ElevenLabs", "Python", "Node.js",
  "TypeScript", "PostgreSQL", "Supabase", "Google Workspace", "Slack API",
  "REST APIs", "Webhooks", "Docker", "Linux", "Git", "WhatsApp Business",
  "Real Estate", "Lead Gen", "CRM Integration", "Voice AI", "Automation",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                ABOUT
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-8"
            >
              I build systems, not slides.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-[var(--text-secondary)] leading-relaxed"
            >
              <p>
                Solo founder building AI automation systems for real estate agents 
                and home services contractors. Every system is designed, built, and 
                deployed by me — from the first webhook trigger to the production 
                monitoring dashboard.
              </p>
              <p>
                I started with simple chatbots and automations. Now I build 67-node 
                n8n systems with GPT-4o-mini reasoning, Twilio voice calling, and 
                real-time lead qualification that responds in under 50 seconds.
              </p>
              <p>
                Based in India, working with clients globally. Systems are built to
                run 24/7 without babysitting. If you need a lead-response system that
                actually works — let&apos;s talk.
              </p>

              <div className="pt-4">
                <a
                  href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-[var(--accent)] hover:underline"
                >
                  CONNECT ON LINKEDIN
                  <span className="text-base">→</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — terminal + skill cloud */}
          <div className="space-y-8">
            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="font-mono text-[10px] text-[var(--text-tertiary)] ml-2">terminal</span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <div className="text-[var(--text-tertiary)]">$ whoami</div>
                <div className="text-[var(--text-secondary)] mt-1">AI automation engineer.</div>
                <div className="text-[var(--text-secondary)]">Builder of the ISA system.</div>
                <div className="text-[var(--text-secondary)]">67 nodes, 7 webhooks, 0 babysitting.</div>
                <div className="text-[var(--text-secondary)] mt-2">Currently shipping for real estate</div>
                <div className="text-[var(--text-secondary)]">and home services clients.</div>
                <div className="text-[var(--accent)] mt-2 cursor-blink">$</div>
              </div>
            </motion.div>

            {/* Skill cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-4">
                STACK & SKILLS
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const rotation = (Math.random() * 4 - 2).toFixed(1);
                  const size = skill.length > 10 ? "text-[11px]" : "text-[12px]";
                  return (
                    <span
                      key={skill}
                      className={`inline-block px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono ${size} text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-200`}
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
