const skills = [
  "n8n", "GPT-4o", "Twilio", "Vapi", "ElevenLabs", "Python", "Node.js",
  "TypeScript", "PostgreSQL", "Supabase", "Google Workspace", "Slack API",
  "REST APIs", "Webhooks", "WhatsApp Business", "CRM Integration", "Voice AI",
];

export default function About() {
  return (
    <section id="founder" className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
      <div>
        <h2 className="font-display text-[clamp(24px,3.5vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] mb-5">
          Hi, I&apos;m Yashwardhan.
        </h2>
        <div className="space-y-4 text-[16px] text-[var(--text-secondary)] leading-relaxed">
          <p>
            I&apos;m the founder and the engineer behind every XMEL system. I design,
            build and deploy each one myself — from the first lead source to the
            monitoring that keeps it running — so you deal with one person who
            knows your setup end to end.
          </p>
          <p>
            I started with WhatsApp chatbots and now build full lead-response
            systems: n8n workflows with GPT-4o-mini qualification, Twilio voice
            calls and real-time booking that replies to new leads in under a
            minute.
          </p>
          <p>
            I&apos;m based in India and work with businesses in the United States and
            India, with calls scheduled in your timezone.
          </p>
          <a
            href="https://www.linkedin.com/in/yashwardhan-chauhan-075684414/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-[var(--accent)] hover:underline underline-offset-4"
          >
            Connect on LinkedIn →
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 self-start">
        <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">What I build with</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <li key={s} className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-[13px] text-[var(--text-secondary)]">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
