import { readFileSync } from "fs";
import path from "path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// The emblem as a data URI (Satori renders <img>, not raw inline <svg>).
// Geometry and colors mirror public/icon.svg and site/logo-mark.tsx exactly.
const MARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" width="112" height="112">' +
  '<defs><clipPath id="c"><rect x="-100" y="-61.8" width="200" height="123.6"/></clipPath></defs>' +
  '<circle r="100" fill="#0F0F12"/>' +
  '<g transform="scale(.764)"><g clip-path="url(#c)" stroke-width="19.1" fill="none">' +
  '<line x1="-47.4" y1="-99.6" x2="71" y2="99.6" stroke="#C9A86A"/>' +
  '<line x1="47.4" y1="-99.6" x2="-71" y2="99.6" stroke="#0F0F12" stroke-width="33.7"/>' +
  '<line x1="47.4" y1="-99.6" x2="-71" y2="99.6" stroke="#F5F0E6"/>' +
  "</g></g></svg>";
const MARK_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

// Real brand fonts (Satori needs TTF/OTF, not the site's woff2). Every OG
// route is prerendered at build time, so reading from the repo is safe.
const font = (f: string) => readFileSync(path.join(process.cwd(), "src/assets/fonts", f));
const FONTS = [
  { name: "Fraunces", data: font("Fraunces-wght-600.ttf"), weight: 600 as const, style: "normal" as const },
  { name: "Inter", data: font("Inter-wght-500.ttf"), weight: 500 as const, style: "normal" as const },
  { name: "Inter", data: font("Inter-wght-700.ttf"), weight: 700 as const, style: "normal" as const },
];

const INK = "#0F0F12";
const GOLD = "#C9A86A";
const IVORY = "#F5F0E6";

/**
 * One template for every social preview (site pages and each blog post),
 * drawn on the brand's ink with gold, like the site's dark bands.
 */
export function renderOg({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  const size = title.length > 70 ? 58 : title.length > 45 ? 68 : 80;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: INK,
          backgroundImage: `radial-gradient(circle at 88% 0%, rgba(201,168,106,0.28), transparent 45%), radial-gradient(circle at 0% 100%, rgba(201,168,106,0.12), transparent 40%)`,
          color: IVORY,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori (next/og) requires <img>, not next/image */}
          <img src={MARK_DATA_URI} width={60} height={60} alt="" style={{ border: `1.5px solid rgba(201,168,106,0.5)`, borderRadius: 999 }} />
          <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 32, fontWeight: 600 }}>
            XMEL<span style={{ color: GOLD, marginLeft: 10 }}>Automations</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: GOLD }}>
            <div style={{ display: "flex", width: 44, height: 2, backgroundColor: GOLD }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: size, fontWeight: 600, lineHeight: 1.06, letterSpacing: -1.5, maxWidth: 1050 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, fontWeight: 500, color: "rgba(245,240,230,0.7)" }}>
          <div style={{ display: "flex" }}>{footer ?? "AI Infrastructure · Websites · SEO · US & India"}</div>
          <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, backgroundColor: GOLD, color: INK, fontWeight: 700 }}>
            xmelautomations.xyz
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: FONTS }
  );
}

/** A route-segment `opengraph-image` for a fixed page. */
export function ogImage(eyebrow: string, title: string, footer?: string) {
  return function Image() {
    return renderOg({ eyebrow, title, footer });
  };
}
