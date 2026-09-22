import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

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
          background: "linear-gradient(160deg, #F6F7F4 0%, #FFFFFF 55%)",
          color: "#0E1512",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#0E1512",
              color: "#C1FF72",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            X
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
            XMEL<span style={{ color: "#66706A", marginLeft: 10 }}>Automations</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#3A7D0E" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, color: "#46514B" }}>
          <div style={{ display: "flex" }}>{footer ?? "AI lead response · Real estate & home services · US & India"}</div>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 999,
              background: "#3A7D0E",
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
