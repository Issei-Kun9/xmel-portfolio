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

/**
 * One template for every social preview (site default and each blog post),
 * drawn in the site's light theme so shared links look like the site.
 */
export function renderOg({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  const size = title.length > 70 ? 56 : title.length > 45 ? 64 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #F2EDE2 0%, #FAF7F0 55%)",
          color: "#0E1512",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori (next/og) requires <img>, not next/image */}
          <img src={MARK_DATA_URI} width={56} height={56} alt="" />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
            XMEL<span style={{ color: "#66706A", marginLeft: 10 }}>Automations</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#8A6A2F" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, color: "#46514B" }}>
          <div style={{ display: "flex" }}>{footer ?? "AI lead response · Websites · SEO · US & India"}</div>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 999,
              background: "#8A6A2F",
              color: "#FFFFFF",
              fontWeight: 600,
            }}
          >
            xmelautomations.xyz
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
