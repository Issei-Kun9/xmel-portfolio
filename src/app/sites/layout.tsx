import type { Metadata, Viewport } from "next";
import CtaTracker from "@/components/home/cta-tracker";

const SITE_URL = "https://sites.xmelautomations.xyz";
const TITLE = "Vantmere — Private estates on still water · A 3D concept by XMEL Automations";
const DESCRIPTION =
  "An interactive architectural film: scroll through a lakeside house where every word lives inside the world. A real-estate website concept designed and built by XMEL Automations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Vantmere — a 3D real-estate website concept",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "XMEL Automations",
    type: "website",
    images: ["/estate/stills/og.webp"],
  },
  twitter: { card: "summary_large_image", title: "Vantmere — a 3D real-estate website concept", description: DESCRIPTION, images: ["/estate/stills/og.webp"] },
};

export const viewport: Viewport = { themeColor: "#0b0e14" };

/** Brand faces for the HTML layer; the 3D scene loads the same files for its textures. */
const FONTS = `
@font-face{font-family:"Instrument Serif";src:url(/estate/fonts/InstrumentSerif-Regular.ttf) format("truetype");font-weight:400;font-display:swap}
@font-face{font-family:"Instrument Serif";src:url(/estate/fonts/InstrumentSerif-Italic.ttf) format("truetype");font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:"Schibsted Grotesk";src:url(/estate/fonts/SchibstedGrotesk-Variable.ttf) format("truetype");font-weight:400 900;font-display:swap}
`;

export default function SitesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="estate-root min-h-screen bg-[#0b0e14] text-[#efe7da]" style={{ colorScheme: "dark" }}>
      <style dangerouslySetInnerHTML={{ __html: FONTS }} />
      <CtaTracker />
      {children}
    </div>
  );
}
