import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0d",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(198,161,91,0.16), transparent 45%), radial-gradient(circle at 75% 75%, rgba(198,161,91,0.12), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            border: "1px solid rgba(198,161,91,0.5)",
            padding: "18px 46px",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 64,
              color: "#c6a15b",
              letterSpacing: 4,
            }}
          >
            MIRAGE HOTEL
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 30,
            color: "#cfc9ba",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
