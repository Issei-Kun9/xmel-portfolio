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
  title: "ISA Systems | AI Automation for Real Estate & Home Services",
  description:
    "I build AI systems that answer leads before your competitors wake up. Autonomous voice agents, n8n automations, and the AI Inside Sales Agent.",
  keywords: [
    "AI automation",
    "real estate AI",
    "lead response automation",
    "AI inside sales agent",
    "n8n automation",
    "voice AI agents",
  ],
  openGraph: {
    title: "ISA Systems | AI Automation for Real Estate & Home Services",
    description:
      "Autonomous AI agents and automation systems that eliminate slow lead response.",
    type: "website",
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
