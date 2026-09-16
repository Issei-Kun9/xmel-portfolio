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

export default function SitesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
