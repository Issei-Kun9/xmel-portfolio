"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const terminalScenarios = [
  [
    "> new_lead.trigger()",
    "> qualifying via GPT-4o-mini...",
    "> lead_score: 87/100",
    "> booking_confirmed: Tue 3:00 PM",
    "> slack.notify(agent) ✓",
  ],
  [
    "> whatsapp.message_received",
    "> bot.qualify(lead_info)",
    "> score: 92 → HIGH INTENT",
    "> calendar.book(thursday, 2pm)",
    "> crm.sync() ✓",
  ],
  [
    "> incoming_call → vapi.answer()",
    "> ai.converse(qualify_script)",
    "> sentiment: positive",
    "> twilio.send_sms(booking_link)",
    "> n8n.webhook() ✓",
  ],
  [
    "> lead.form_submit()",
    "> gpt.score(contextual_data)",
    "> response_time: < 47s",
    "> appointment_set ✓",
    "> follow_up.scheduled(24h) ✓",
  ],
];

function TerminalWidget() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    const scenario = terminalScenarios[scenarioIdx];
    if (lineIdx >= scenario.length) {
      const timer = setTimeout(() => {
        setScenarioIdx((prev) => (prev + 1) % terminalScenarios.length);
        setLineIdx(0);
        setCharIdx(0);
        setDisplayedLines([]);
      }, 3000);
      return () => clearTimeout(timer);
    }

    const currentLine = scenario[lineIdx];
    if (charIdx < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[lineIdx] = currentLine.slice(0, charIdx + 1);
          return updated;
        });
        setCharIdx(charIdx + 1);
      }, 18);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLineIdx(lineIdx + 1);
      setCharIdx(0);
    }, 200);
    return () => clearTimeout(timer);
  }, [scenarioIdx, lineIdx, charIdx]);

  return (
    <div className="w-full max-w-md bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] ml-2">isa-system</span>
      </div>
      <div className="p-4 font-mono text-[13px] leading-relaxed min-h-[180px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-[var(--accent)] mr-2 select-none">$</span>
            <span className="text-[var(--text-secondary)]">
              {line}
              {i === lineIdx && charIdx >= line.length && i === terminalScenarios[scenarioIdx].length - 1 && (
                <span className="text-[var(--accent)] cursor-blink ml-0.5">_</span>
              )}
            </span>
          </div>
        ))}
        {lineIdx < terminalScenarios[scenarioIdx].length && (
          <div className="flex">
            <span className="text-[var(--accent)] mr-2 select-none">$</span>
            <span className="text-[var(--text-secondary)]">
              {terminalScenarios[scenarioIdx][lineIdx].slice(0, charIdx)}
              <span className="text-[var(--accent)] cursor-blink">_</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const headlineLines = [
    "I build AI systems that",
    "answer leads before",
    "your competitors wake up.",
  ];

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.07] blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            animation: "mesh-drift 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full opacity-[0.04] blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            animation: "mesh-drift 30s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Corner HUD metadata */}
      <div className="absolute top-24 left-6 lg:left-12 z-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] leading-relaxed">
          <div>LOCATION: REMOTE / BASED IN INDIA</div>
          <div>TIMEZONE: IST (UTC+5:30)</div>
        </div>
      </div>

      <div className="absolute top-24 right-6 lg:right-12 z-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
          SYSTEMS SHIPPED: 04
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">
          {/* Left column — asymmetric, confident */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-strong)] bg-[rgba(193,255,114,0.06)] mb-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]">
                AI Automation Agency — Voice AI &amp; n8n Workflows
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(40px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] mb-8">
              {headlineLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                  transition={{
                    delay: 0.5 + i * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl mb-10"
            >
              I design and deploy autonomous AI agents, voice systems, and n8n 
              workflow automations that eliminate slow lead response — so real estate 
              agents and home services contractors never lose a deal to a faster 
              competitor again.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#isa-system"
                className="shine-sweep magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
              >
                See the ISA system
                <span className="text-lg leading-none">→</span>
              </a>
              <a
                href="#work"
                className="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-sm rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
              >
                View projects
              </a>
            </motion.div>
          </div>

          {/* Right column — terminal widget */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="hidden lg:block"
          >
            <TerminalWidget />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-px h-6 bg-[var(--border-strong)] relative overflow-hidden">
          <div className="w-full h-2 bg-[var(--accent)] scroll-line" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
