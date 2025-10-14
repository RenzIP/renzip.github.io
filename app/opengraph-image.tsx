import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",          // gelap biar jelas
          color: "white",
          fontFamily: "Inter, ui-sans-serif, system-ui",
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        Renz — Backend Dev
      </div>
    ),
    size
  );
}
