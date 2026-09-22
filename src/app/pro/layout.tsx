import type { Metadata } from "next";
import CursorWrapper from "@/components/shared/cursor-wrapper";

const SITE_URL = "https://pro.xmelautomations.xyz";
const TITLE =
  "Multi-Page Business Website for ₹4,000 — ₹500 to Start | XMEL Automations";
const DESCRIPTION =
  "A full multi-page website for your business — services, about, gallery and contact. ₹4,000 total: ₹500 to start, ₹3,500 when it goes live. No monthly fee.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "A full multi-page website for your business — ₹4,000",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "XMEL Automations",
    type: "website",
    locale: "en_IN",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A full multi-page website for your business — ₹4,000",
    description: DESCRIPTION,
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
};

/**
 * Same scoped light palette as the ₹2,500 offer page: paper background,
 * near-black ink, one deep blue accent. Declared on the wrapper so the
 * var(--token) classes inside resolve here without touching globals.css or
 * anything on the main site.
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

export default function ProLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      style={PALETTE}
      className="grain custom-cursor min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      <CursorWrapper />
      {children}
    </div>
  );
}
