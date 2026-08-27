import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0d",
          border: "2px solid #c6a15b",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 34,
            color: "#c6a15b",
            fontWeight: 700,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
