import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message Received | XMEL Automations",
  description: "Thank you — your message has been received. XMEL Automations will respond within 24 hours.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden flex items-center justify-center px-6">
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
          <div>STATUS: RECEIVED</div>
          <div>RESPONSE: WITHIN 24H</div>
        </div>
      </div>

      <div className="hidden sm:block absolute top-24 right-6 lg:right-12 z-10">
        <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
          XMEL AUTOMATIONS
        </div>
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center py-32">
        {/* Logo mark */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] mb-8">
          <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <path
              d="M8 8L16 16L8 24"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 8L16 16L24 24"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Terminal-style confirmation */}
        <div className="bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-subtle)] p-6 lg:p-8 text-left mb-10">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)] -mx-6 -mt-6 mb-6 rounded-t-xl">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="font-mono text-[12px] text-[var(--text-tertiary)] ml-2">xmel-system</span>
          </div>

          <div className="font-mono text-[13px] leading-relaxed space-y-1.5">
            <div className="flex">
              <span className="text-[var(--accent)] mr-2 select-none">$</span>
              <span className="text-[var(--text-secondary)]">new_project_request</span>
            </div>
            <div className="flex">
              <span className="text-[var(--accent)] mr-2 select-none">$</span>
              <span className="text-[var(--text-secondary)]">validating → status: <span className="text-[var(--success)]">received ✓</span></span>
            </div>
            <div className="flex">
              <span className="text-[var(--accent)] mr-2 select-none">$</span>
              <span className="text-[var(--text-secondary)]">owner_notified → response <span className="text-[var(--accent)]">&lt; 24h</span></span>
            </div>
            <div className="flex">
              <span className="text-[var(--accent)] mr-2 select-none">$</span>
              <span className="text-[var(--text-secondary)]">status: <span className="text-[var(--success)]">✓</span><span className="cursor-blink text-[var(--accent)] ml-0.5">_</span></span>
            </div>
          </div>
        </div>

        <h1 className="font-display text-[clamp(28px,6vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-4">
          Message delivered.
        </h1>

        <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-10">
          Thanks for reaching out. I&apos;ll review your project details and get
          back to you within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
          >
            <span>←</span>
            Back to home
          </a>
          <a
            href="/tools/roi-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-sm rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
          >
            Try the ROI calculator
          </a>
        </div>
      </div>
    </main>
  );
}
