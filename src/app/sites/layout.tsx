import type { Metadata } from "next";

const SITE_URL = "https://sites.xmelautomations.xyz";

export const metadata: Metadata = {
  title: "Website for ₹2,500 — Book Your Spot | XMEL",
  description:
    "A complete, fast, mobile-ready website for ₹2,500. Pay ₹500 to book your spot — limited slots at this price. Live in 7 days.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Your website for ₹2,500 — limited spots",
    description:
      "A complete, mobile-ready website for ₹2,500. ₹500 books your spot. Live in 7 days.",
    url: SITE_URL,
    siteName: "XMEL Automations",
    type: "website",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your website for ₹2,500 — limited spots",
    description:
      "A complete, mobile-ready website for ₹2,500. ₹500 books your spot. Live in 7 days.",
    images: ["https://xmelautomations.xyz/og-image.png"],
  },
};

export default function SitesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
