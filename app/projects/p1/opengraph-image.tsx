import { ImageResponse } from "next/og";
import { projects } from "@/lib/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: { id: string } }) {
  const p = projects.find((x) => x.id === params.id);

  const title = p?.title ?? "Project";
  const summary = p?.summary ?? "";
  const tags = p?.tags?.join(" • ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          fontFamily: "Inter, ui-sans-serif, system-ui",
          background:
            "linear-gradient(135deg,#0b1220 0%,#111827 55%,rgba(236,72,153,.35) 100%)",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85 }}>Renz — Project</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 26, opacity: 0.9, marginTop: 10, maxWidth: 950 }}>
          {summary}
        </div>
        <div style={{ fontSize: 22, opacity: 0.75, marginTop: 16 }}>{tags}</div>
      </div>
    ),
    size
  );
}
