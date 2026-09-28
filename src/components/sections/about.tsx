import fs from "fs";
import path from "path";
import { Bot, Code2, MessageCircle, Workflow } from "lucide-react";
import LogoMark from "@/components/site/logo-mark";

const LINKEDIN = "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/";

/** Drop a portrait at public/founder.jpg and the card uses it; until then, a monogram. */
const PHOTO = ["founder.jpg", "founder.webp", "founder.png"].find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));

export function FounderCard() {
  return (
    <figure className="relative mx-auto w-full max-w-[400px]">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(201,168,106,0.25), transparent)" }} />
      <div className="overflow-hidden rounded-[28px] border border-[rgba(201,168,106,0.45)] bg-[#141417] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
        {PHOTO ? (
          // eslint-disable-next-line @next/next/no-img-element -- local portrait, sized by the card
          <img src={`/${PHOTO}`} alt="Yashwardhan Chauhan, founder of XMEL Automations" className="aspect-[4/5] w-full object-cover" />
        ) : (
          <div className="relative grid aspect-[4/5] place-items-center overflow-hidden" role="img" aria-label="Yashwardhan Chauhan monogram">
            <span aria-hidden="true" className="absolute inset-[10%] rounded-full border border-[rgba(201,168,106,0.25)]" />
            <span aria-hidden="true" className="absolute inset-[20%] rounded-full border border-dashed border-[rgba(201,168,106,0.2)]" />
            <span aria-hidden="true" className="font-display text-[120px] leading-none italic text-[var(--gold)]">YC</span>
            <span aria-hidden="true" className="absolute bottom-6 left-6"><LogoMark size={36} /></span>
          </div>
        )}
        <figcaption className="flex items-center justify-between gap-4 border-t border-[rgba(245,240,230,0.1)] p-5">
          <span>
            <span className="block font-display text-[20px] text-[var(--ivory)]">Yashwardhan Chauhan</span>
            <span className="block text-[13px] text-[rgba(245,240,230,0.65)]">Founder &amp; engineer · India, working with the US &amp; India</span>
          </span>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Yashwardhan on LinkedIn" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(201,168,106,0.4)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </figcaption>
      </div>
    </figure>
  );
}

const story = [
  { title: "It started with WhatsApp chatbots", body: "Small automations that answered customers when the owner couldn't." },
  { title: "Then full lead-response systems", body: "Workflows that read each lead, qualify it, call or message within a minute and book the appointment." },
  { title: "Then the rest of the journey", body: "Websites and SEO, so how customers find you, trust you and get answered is built by one person who sees all of it." },
  { title: "Today: the US and India", body: "Real estate, home services and local businesses, with calls scheduled in your timezone." },
];

const toolkit = [
  { icon: Bot, group: "AI & voice", tools: ["GPT-4o", "Vapi", "ElevenLabs", "Voice AI"] },
  { icon: Workflow, group: "Automation", tools: ["n8n", "Webhooks", "REST APIs", "CRM integration"] },
  { icon: MessageCircle, group: "Messaging & calls", tools: ["Twilio", "WhatsApp Business", "Slack API", "Google Workspace"] },
  { icon: Code2, group: "Web & data", tools: ["TypeScript", "Node.js", "Python", "PostgreSQL", "Supabase"] },
];

export default function About() {
  return (
    <>
      <section id="founder" className="paper py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">The founder</p>
            <h2 className="mt-3 font-display text-[clamp(32px,4.6vw,54px)] font-medium leading-[1.04] tracking-[-0.02em] text-[var(--text-primary)]">
              Hi, I&apos;m Yashwardhan. <span className="italic text-[var(--accent)]">I build every system myself.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[var(--text-secondary)]">
              <p>
                I&apos;m the founder and the engineer behind every XMEL system. I design, build and deploy each one myself, from the
                first lead source to the monitoring that keeps it running, so you deal with one person who knows your setup end to end.
              </p>
              <p>
                I&apos;m based in India and work with businesses in the United States and India, with calls scheduled in your timezone.
              </p>
            </div>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="link-grow mt-6 inline-block text-[15px] font-semibold text-[var(--accent)]">
              Connect on LinkedIn →
            </a>
          </div>

          <ol className="relative ml-4 border-l border-[var(--gold)]/40">
            {story.map((s, i) => (
              <li key={s.title} className="relative pl-9 pb-9 last:pb-0">
                <span className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 ${i === story.length - 1 ? "border-[var(--gold)] bg-[var(--gold)]" : "border-[var(--gold)] bg-[var(--bg-primary)]"}`} />
                <h3 className="font-display text-[22px] leading-tight text-[var(--text-primary)]">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="paper bg-[var(--bg-secondary)] py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">The toolkit</p>
          <h2 className="mt-3 font-display text-[clamp(30px,4.2vw,48px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
            Established tools, <span className="italic text-[var(--accent)]">not a black box.</span>
          </h2>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolkit.map(({ icon: Icon, group, tools }) => (
              <li key={group} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 shadow-[var(--shadow-card)]">
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-[var(--ink)] text-[var(--gold)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold text-[var(--text-primary)]">{group}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">{tools.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
