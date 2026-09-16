import type { Metadata } from "next";

const SITE_URL = "https://sites.xmelautomations.xyz";
const TITLE = "Business Website for ₹2,500 — ₹500 to Start | XMEL Automations";
const DESCRIPTION =
  "A professional, mobile-first website for your business. ₹2,500 total — pay ₹500 to start and ₹2,000 only after you see the finished site. Ready in 7 days, no monthly fee.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Your business deserves a proper website — ₹2,500",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "XMEL Automations",
    type: "website",
    locale: "en_IN",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your business deserves a proper website — ₹2,500",
    description: DESCRIPTION,
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
};

/**
 * Palette override, scoped to this route only.
 *
 * The main site is dark with a lime accent — right for the automation brand,
 * wrong for a page asking a stranger for money. This page runs light: paper
 * background, near-black ink, one deep blue accent. Blue and generous white
 * space are what people read as "legitimate business" rather than "hype".
 *
 * Declared as CSS custom properties on the wrapper so the existing
 * var(--token) classes inside the page pick them up without any change to the
 * global stylesheet or the rest of the site.
 */
const PALETTE = {
  "--bg-primary": "#FFFFFF",
  "--bg-secondary": "#F6F7F4",
  "--bg-tertiary": "#ECEEE8",
  "--border-subtle": "rgba(16, 24, 40, 0.10)",
  "--border-strong": "rgba(16, 24, 40, 0.22)",
  "--text-primary": "#0E1520",
  "--text-secondary": "#4A5567",
  "--text-tertiary": "#6B7687",
  "--accent": "#0F4C9C",
  "--accent-soft": "rgba(15, 76, 156, 0.07)",
  "--accent-line": "rgba(15, 76, 156, 0.30)",
  colorScheme: "light",
} as React.CSSProperties;

export default function SitesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      style={PALETTE}
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      {children}
    </div>
  );
}
