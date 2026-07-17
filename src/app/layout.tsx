import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/shared/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title:
    "XMEL Automations | AI Automation Agency — Voice AI, n8n Workflows, Lead Response Automation for Real Estate & Home Services",
  description:
    "AI automation agency building autonomous lead response systems, voice AI agents, and n8n workflow automations for real estate agents and home services contractors. Respond to leads in under 50 seconds — 400x faster than the industry average.",
  keywords: [
    "AI automation agency",
    "AI automation for real estate",
    "lead response automation",
    "AI inside sales agent",
    "n8n automation",
    "n8n workflow automation",
    "voice AI agents",
    "AI voice calling",
    "WhatsApp automation bot",
    "Twilio voice AI",
    "GPT-4o-mini automation",
    "home services automation",
    "real estate lead automation",
    "AI phone agent",
    "autonomous lead qualification",
    "AI chatbot India",
    "n8n CRM integration",
    "AI appointment booking",
    "voice bot for real estate",
    "AI sales automation",
  ],
  authors: [{ name: "Yashwardhan Chauhan" }],
  creator: "Yashwardhan Chauhan",
  openGraph: {
    title:
      "XMEL Automations | AI Automation for Real Estate & Home Services",
    description:
      "Autonomous AI agents and n8n workflow automations that respond to leads in under 50 seconds. Voice AI, WhatsApp bots, and lead qualification — built for real estate and home services.",
    type: "website",
    url: "https://xmelautomations.dpdns.org",
    siteName: "XMEL Automations",
    locale: "en_IN",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "XMEL Automations | AI Automation for Real Estate & Home Services",
    description:
      "Autonomous AI agents that respond to leads in under 50 seconds. Voice AI, n8n workflows, and WhatsApp bots for real estate and home services.",
  },
  metadataBase: new URL("https://xmelautomations.dpdns.org"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://xmelautomations.dpdns.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="api.web3forms.com" />
        <meta name="theme-color" content="#0A0A0B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msvalidate.01" content="E9481E7B32B8AF471E3115827525D3C9" />
      </head>
      <body className="grain">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
