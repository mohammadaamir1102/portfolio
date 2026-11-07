import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/profile";

export const alt = `${siteConfig.name} — Java Backend Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          color: "#f4f4f2",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(229,181,126,0.22), rgba(229,181,126,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -120,
            width: 600,
            height: 600,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(147,167,255,0.14), rgba(147,167,255,0) 68%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              border: "1px solid rgba(229,181,126,0.35)",
              background: "rgba(229,181,126,0.1)",
              color: "#e5b57e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            MA
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#9aa1ab",
              }}
            >
              Java Backend Engineer
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 74,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 900,
              fontWeight: 500,
            }}
          >
            <span>Backend systems,</span>
            <div style={{ display: "flex", gap: 14 }}>
              <span>engineered to</span>
              <span style={{ color: "#e5b57e", fontStyle: "italic" }}>
                scale.
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a1a7b3",
              maxWidth: 780,
              lineHeight: 1.45,
            }}
          >
            Java 21 · Spring Boot · Apache Kafka · Redis · Docker · Kubernetes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
            fontSize: 16,
            color: "#9aa1ab",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#34d399",
              }}
            />
            Open to exciting opportunities
          </div>
          <div style={{ display: "flex", gap: 26 }}>
            <span>Riyadh, Saudi Arabia</span>
            <span style={{ color: "#e5b57e" }}>Portfolio</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
