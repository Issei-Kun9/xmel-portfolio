import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XMEL Automations | AI Automation for Real Estate & Home Services",
  description:
    "AI systems that answer leads before your competitors wake up. Autonomous voice agents, n8n automations, and the AI Inside Sales Agent — built by Yashwardhan Chauhan.",
  keywords: [
    "AI automation agency",
    "real estate AI",
    "lead response automation",
    "AI inside sales agent",
    "n8n automation",
    "voice AI agents",
    "WhatsApp bot",
    "Twilio automation",
    "GPT-4o-mini",
    "home services automation",
  ],
  authors: [{ name: "Yashwardhan Chauhan" }],
  openGraph: {
    title: "XMEL Automations | AI Automation for Real Estate & Home Services",
    description:
      "Autonomous AI agents and automation systems that eliminate slow lead response.",
    type: "website",
    url: "https://xmelautomations.dpdns.org",
    siteName: "XMEL Automations",
  },
  twitter: {
    card: "summary_large_image",
    title: "XMEL Automations | AI Automation for Real Estate & Home Services",
    description:
      "Autonomous AI agents and automation systems that eliminate slow lead response.",
  },
  metadataBase: new URL("https://xmelautomations.dpdns.org"),
  robots: {
    index: true,
    follow: true,
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
      <body className="grain">{children}</body>
    </html>
  );
}
