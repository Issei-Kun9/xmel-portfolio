import type { Metadata } from "next";
import CursorWrapper from "@/components/shared/cursor-wrapper";

const SITE_URL = "https://pro.xmelautomations.xyz";
const TITLE =
  "E-commerce Websites in Dubai & the UAE from AED 740 | XMEL Automations";
const DESCRIPTION =
  "Your own online store: products, cart, card and cash-on-delivery checkout, delivery and WhatsApp orders. E-commerce websites starting from AED 740. Message us on WhatsApp for a quote.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "E-commerce websites from AED 740",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "XMEL Automations",
    type: "website",
    locale: "en_AE",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce websites from AED 740",
    description: DESCRIPTION,
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
};

/**
 * Scoped dark palette for the online-store offer: XMEL ink, ivory type and
 * the brand gold as the one accent. Declared on the wrapper so the
 * var(--token) classes inside resolve here without touching globals.css or
 * anything on the main site. `--on-accent` is the text colour on gold.
 */
const PALETTE = {
  "--bg-primary": "#0B0B0E",
  "--bg-secondary": "#131317",
  "--bg-tertiary": "#1B1B21",
  "--border-subtle": "rgba(245, 240, 230, 0.09)",
  "--border-strong": "rgba(245, 240, 230, 0.18)",
  "--text-primary": "#F5F0E6",
  "--text-secondary": "rgba(245, 240, 230, 0.70)",
  "--text-tertiary": "rgba(245, 240, 230, 0.48)",
  "--accent": "#C9A86A",
  "--on-accent": "#0F0F12",
  "--accent-soft": "rgba(201, 168, 106, 0.10)",
  "--accent-line": "rgba(201, 168, 106, 0.40)",
  colorScheme: "dark",
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
