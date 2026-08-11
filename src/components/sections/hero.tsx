const terminalLines = [
  "> new_lead.trigger()",
  "> qualifying via GPT-4o-mini...",
  "> lead_score: 87/100",
  "> booking_confirmed: Tue 3:00 PM",
  "> slack.notify(agent) ✓",
];

const headlineLines = [
  "I build AI systems that",
  "answer leads before",
  "your competitors wake up.",
];

export default function Hero() {
  return (
    <section
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
      <div className="hidden sm:block absolute top-24 left-6 lg:left-12 z-10">
        <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] leading-relaxed">
          <div>LOCATION: REMOTE / INDIA</div>
          <div>TIMEZONE: IST (UTC+5:30)</div>
        </div>
      </div>

      <div className="hidden sm:block absolute top-24 right-6 lg:right-12 z-10">
        <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
          SYSTEMS SHIPPED: 04
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 sm:pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-16 items-center">
          {/* Left column — asymmetric, confident */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[var(--border-strong)] bg-[rgba(193,255,114,0.06)] mb-6 sm:mb-8"
              style={{ animation: "fade-slide-up 0.6s ease 0.3s both" }}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)]">
                AI Automation Agency — Voice AI &amp; n8n Workflows
              </span>
            </div>

            <h1 className="font-display text-[clamp(32px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] mb-6 sm:mb-8">
              {headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-10">
              I design and deploy autonomous AI agents, voice systems, and n8n 
              workflow automations that eliminate slow lead response — so real estate 
              agents and home services contractors never lose a deal to a faster 
              competitor again.
            </p>

            <div
              className="flex flex-wrap gap-3 sm:gap-4"
              style={{ animation: "fade-slide-up 0.6s ease 0.7s both" }}
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
            </div>
          </div>

          {/* Right column — terminal widget */}
          <div className="block">
            <div className="w-full max-w-md bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="font-mono text-[12px] text-[var(--text-tertiary)] ml-2">isa-system</span>
              </div>
              <div className="p-4 font-mono text-[12px] sm:text-[13px] leading-relaxed min-h-[140px] sm:min-h-[180px]">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex"
                    style={{ animation: `fade-slide-up 0.3s ease ${0.3 + i * 0.35}s both` }}
                  >
                    <span className="text-[var(--accent)] mr-2 select-none">$</span>
                    <span className="text-[var(--text-secondary)]">{line}</span>
                  </div>
                ))}
                <div
                  className="flex"
                  style={{ animation: "fade-slide-up 0.3s ease 2.1s both" }}
                >
                  <span className="text-[var(--accent)] mr-2 select-none">$</span>
                  <span className="text-[var(--accent)] cursor-blink">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ animation: "fade-slide-up 0.6s ease 2s both" }}
      >
        <div className="w-px h-6 bg-[var(--border-strong)] relative overflow-hidden">
          <div className="w-full h-2 bg-[var(--accent)] scroll-line" />
        </div>
        <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          SCROLL
        </span>
      </div>
    </section>
  );
}
