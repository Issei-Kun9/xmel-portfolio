import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ScrollReset from "@/components/shared/scroll-reset";
import MotionLayer from "@/components/motion/motion-layer";
import JsonLd from "@/components/shared/json-ld";
import { OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // "optional": body text paints immediately in the size-matched fallback
  // and never re-flows late, which was delaying Largest Contentful Paint.
  display: "optional",
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
  preload: false, // only small labels use it; don't compete with body fonts
});

/**
 * Defaults only. Every main-site page sets its own title, description,
 * canonical and social cards (see src/lib/seo.ts); nothing here may carry a
 * page-specific URL, or pages that forget to override would inherit it.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://xmelautomations.xyz"),
  title: "XMEL Automations — AI Lead Response for Real Estate & Home Services",
  description:
    "AI that replies to every new lead in under 60 seconds, qualifies it and books the appointment, 24/7 — for real estate and home-service businesses in the US and India.",
  applicationName: "XMEL Automations",
  authors: [{ name: "Yashwardhan Chauhan", url: "https://xmelautomations.xyz/about" }],
  creator: "Yashwardhan Chauhan",
  publisher: "XMEL Automations",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    siteName: "XMEL Automations",
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
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
        <meta name="theme-color" content="#FAF7F0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta name="msvalidate.01" content="E9481E7B32B8AF471E3115827525D3C9" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E4SKKVBHM1"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E4SKKVBHM1');
          `}
        </Script>
        <ScrollReset />
        <MotionLayer />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
