import { ImageResponse } from "next/og";

// Next akan render gambar 1200x630 di route /opengraph-image
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", padding: 72,
          display: "flex", flexDirection: "column", justifyContent: "center",
          color: "white",
          background: "linear-gradient(135deg, #0b1220 0%, #111827 55%, rgba(236,72,153,.35) 100%)",
          fontFamily: "Inter, ui-sans-serif, system-ui", position: "relative",
        }}
      >
        <div style={{ fontSize: 28, opacity: .85 }}>Renz — Backend Dev</div>
        <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.1, marginTop: 8 }}>
          Gamer • Anime Enthusiast • Tech Lover
        </div>
        <div style={{ marginTop: 14, fontSize: 26, opacity: .9 }}>
          Next.js • Tailwind • Golang
        </div>

        {/* badge kecil kanan bawah */}
        <div
          style={{
            position: "absolute", right: 72, bottom: 72,
            border: "2px solid rgba(255,255,255,0.35)", borderRadius: 16,
            width: 160, height: 160, display: "grid", placeItems: "center",
            background: "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.25), transparent 60%)",
          }}
        >
          <div style={{ fontSize: 64 }}>レンツ</div>
        </div>
      </div>
    ),
    size
  );
}
