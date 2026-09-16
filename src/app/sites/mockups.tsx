/**
 * Business-type previews for the "Imagine your business here" section.
 *
 * These are CSS/SVG compositions, not images or screenshots — they are clearly
 * illustrative rather than photos of real client sites, and they cost zero
 * network requests. No real business names, logos or testimonials appear here.
 */

type Preview = {
  type: string;
  headline: string;
  blurb: string;
  accent: string;
  nav: string[];
};

const PREVIEWS: Preview[] = [
  {
    type: "Restaurant & cafe",
    headline: "Menu, timings, table enquiries",
    blurb:
      "Customers check the menu, find you on the map and message you to book a table.",
    accent: "#E8A33D",
    nav: ["Menu", "Timings", "Contact"],
  },
  {
    type: "Salon & barber",
    headline: "Services, prices, appointments",
    blurb:
      "Your service list and prices up front, with a WhatsApp button for appointments.",
    accent: "#C77DD4",
    nav: ["Services", "Prices", "Book"],
  },
  {
    type: "Real estate",
    headline: "Listings, areas, enquiries",
    blurb:
      "Show the properties you handle and let buyers reach you without a phone call.",
    accent: "#5AA9E6",
    nav: ["Listings", "Areas", "Enquire"],
  },
  {
    type: "Local services",
    headline: "What you do, where you work",
    blurb:
      "Electrician, plumber, tutor, photographer — your work and your number in one place.",
    accent: "#0F4C9C",
    nav: ["Work", "Areas", "Call"],
  },
];

function PreviewFrame({ preview }: { preview: Preview }) {
  return (
    <div
      aria-hidden="true"
      className="rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
    >
      {/* address bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)]" />
        <span className="flex-1 ml-1.5 h-3 rounded-sm bg-[var(--bg-secondary)]" />
      </div>

      {/* page skeleton */}
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-3">
          <span
            className="h-2 w-10 rounded-full"
            style={{ backgroundColor: preview.accent }}
          />
          <span className="flex gap-1.5">
            {preview.nav.map((n) => (
              <span
                key={n}
                className="h-1.5 w-6 rounded-full bg-[var(--border-strong)]"
              />
            ))}
          </span>
        </div>

        <div
          className="h-14 rounded-md mb-3"
          style={{
            background: `linear-gradient(135deg, ${preview.accent}26 0%, transparent 70%)`,
            borderLeft: `2px solid ${preview.accent}`,
          }}
        />

        <span className="block h-1.5 w-4/5 rounded-full bg-[var(--border-strong)] mb-1.5" />
        <span className="block h-1.5 w-3/5 rounded-full bg-[var(--border-subtle)] mb-3" />

        <div className="flex gap-1.5">
          <span className="h-5 w-16 rounded bg-[#25D366]" />
          <span className="h-5 w-10 rounded border border-[var(--border-strong)]" />
        </div>
      </div>
    </div>
  );
}

export default function BusinessPreviews() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {PREVIEWS.map((p) => (
        <div
          key={p.type}
          className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
        >
          <PreviewFrame preview={p} />
          <div className="mt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] block mb-1.5">
              {p.type}
            </span>
            <h3 className="font-display text-[15px] font-semibold text-[var(--text-primary)] mb-1">
              {p.headline}
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              {p.blurb}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
