"use client";

const tools = [
  "n8n",
  "Twilio",
  "OpenAI GPT-4o-mini",
  "ElevenLabs",
  "Vapi",
  "Google Workspace",
  "Slack",
  "Google Sheets",
  "Google Calendar",
  "WhatsApp Business",
  "Supabase",
  "Salesforce",
  "PostgreSQL",
  "Webhooks",
  "Node.js",
  "REST APIs",
];

export default function TechStack() {
  return (
    <section className="relative py-16 border-y border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
          TOOLS &amp; INFRASTRUCTURE
        </span>
      </div>

      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="inline-flex items-center mx-6 font-mono text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] mr-3" />
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
