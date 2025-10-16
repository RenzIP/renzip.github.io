import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const Body = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  business: z.string().min(2),
  needs: z.array(z.string()).min(1),
  timeframe: z.enum(["asap", "2-4w", "1-2m", "exploring"]),
  notes: z.string().optional().default(""),
  honey: z.string().optional().default(""), // honeypot
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = Body.parse(json);

    // honeypot: jika diisi → abaikan diam-diam
    if (data.honey && data.honey.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const to = process.env.HIRE_TO_EMAIL || "zenkun.enterkill13@gmail.com";
    const from = process.env.HIRE_FROM_EMAIL || "onboarding@resend.dev";

    const html = `
      <h2>New Hire Request</h2>
      <p><b>Name:</b> ${escapeHtml(data.name)}</p>
      <p><b>Email:</b> ${escapeHtml(data.email)}</p>
      <p><b>Business:</b> ${escapeHtml(data.business)}</p>
      <p><b>Needs:</b> ${data.needs.map(escapeHtml).join(", ")}</p>
      <p><b>Timeframe:</b> ${escapeHtml(data.timeframe)}</p>
      <p><b>Notes:</b><br/>${escapeHtml(data.notes || "-")}</p>
    `;

    // >>> hanya kirim ke kamu (TIDAK ada auto-reply) <<<
    await resend.emails.send({
      from: `Renz Portfolio <${from}>`,
      to,
      subject: `New Hire Request — ${data.name}`,
      replyTo: data.email, // supaya bisa langsung reply dari inbox
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
