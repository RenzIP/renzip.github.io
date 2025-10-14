import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", background: "linear-gradient(135deg,#111827 0%,#0b1220 60%)",
          fontSize: 64, fontWeight: 800, fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        Renz — Backend Dev
      </div>
    ),
    size
  );
}
