import { Check, MessageSquareText, PhoneMissed, Sparkles } from "lucide-react";

type Step = { kind: "lead" | "missed" | "ai" | "booked"; label: string; time: string; text: string };

const ICON = {
  lead: MessageSquareText,
  missed: PhoneMissed,
  ai: Sparkles,
  booked: Check,
};

/**
 * Hero visual for the AI pages: the lead, the AI's reply and the booking as
 * three stacked notification cards on a gold thread, with the reply time in
 * between. Static markup; the cards pop in with the chat animation.
 */
export default function LeadFlow({ steps, replyIn }: { steps: [Step, Step, Step]; replyIn: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[440px]" role="img" aria-label={`${steps[0].label}, ${steps[1].label} in ${replyIn}, then ${steps[2].label}`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(201,168,106,0.22), transparent)" }} />
      <span aria-hidden="true" className="absolute left-[34px] top-10 bottom-10 w-px bg-[linear-gradient(var(--gold),transparent_45%,var(--gold))] opacity-60" />
      <ol aria-hidden="true" className="relative space-y-5">
        {steps.map((s, i) => {
          const Icon = ICON[s.kind];
          const booked = s.kind === "booked";
          return (
            <li key={s.label} className="chat-in" style={{ ["--d" as string]: `${0.3 + i * 0.45}s` }}>
              {i === 1 && (
                <p className="mb-3 ml-[60px] inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,106,0.35)] px-3 py-1 text-[12px] font-semibold text-[var(--gold)]">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  replied in {replyIn}
                </p>
              )}
              <div
                className={`flex gap-4 rounded-2xl p-4 backdrop-blur ${
                  booked
                    ? "bg-[var(--gold)] text-[var(--ink)] shadow-[0_24px_50px_-20px_rgba(201,168,106,0.6)]"
                    : "border border-[rgba(245,240,230,0.12)] bg-[rgba(30,30,34,0.85)] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]"
                }`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${booked ? "bg-[var(--ink)] text-[var(--gold)]" : "bg-[rgba(201,168,106,0.14)] text-[var(--gold)]"}`}>
                  <Icon className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <div className="min-w-0">
                  <p className={`flex items-baseline justify-between gap-3 text-[13px] font-semibold ${booked ? "" : "text-[var(--ivory)]"}`}>
                    {s.label}
                    <span className={`text-[11px] font-medium ${booked ? "text-[rgba(15,15,18,0.65)]" : "text-[rgba(245,240,230,0.55)]"}`}>{s.time}</span>
                  </p>
                  <p className={`mt-1 text-[14px] leading-snug ${booked ? "text-[rgba(15,15,18,0.8)]" : "text-[rgba(245,240,230,0.78)]"}`}>{s.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
