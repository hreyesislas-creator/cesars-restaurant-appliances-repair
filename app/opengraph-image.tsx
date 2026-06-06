import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Cesar's Restaurant Appliances Repair — Houston, TX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f1113 0%, #1a1d21 55%, #262a30 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#f43f4d",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 14,
              background: "#e11d2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 46,
              fontWeight: 800,
            }}
          >
            C
          </div>
          24/7 Emergency Service
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 36,
            maxWidth: 1000,
          }}
        >
          Commercial Restaurant Equipment Repair
        </div>
        <div style={{ fontSize: 44, fontWeight: 700, color: "#cbd5e1", marginTop: 12 }}>
          Houston, TX
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#9ca3af",
            marginTop: 40,
            display: "flex",
            gap: 24,
          }}
        >
          Free Estimates • Same-Day Repairs • (832) 545-2389
        </div>
      </div>
    ),
    { ...size }
  );
}
