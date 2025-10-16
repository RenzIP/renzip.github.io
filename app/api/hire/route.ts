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
    const payload = Body.parse(await req.json());
    if (payload.honey?.trim()) return NextResponse.json({ ok: true });

    const to = process.env.HIRE_TO_EMAIL || "zenkun.enterkill13@gmail.com";
    const from = process.env.HIRE_FROM_EMAIL || "onboarding@resend.dev";

    const html = /* sama seperti sebelumnya */ `
      <h2>New Hire Request</h2>
      <p><b>Name:</b> ${escapeHtml(payload.name)}</p>
      <p><b>Email:</b> ${escapeHtml(payload.email)}</p>
      <p><b>Business:</b> ${escapeHtml(payload.business)}</p>
      <p><b>Needs:</b> ${payload.needs.map(escapeHtml).join(", ")}</p>
      <p><b>Timeframe:</b> ${escapeHtml(payload.timeframe)}</p>
      <p><b>Notes:</b><br/>${escapeHtml(payload.notes || "-")}</p>
    `;

    await resend.emails.send({
      from: `Renz Portfolio <${from}>`,
      to,
      subject: `New Hire Request — ${payload.name}`,
      replyTo: payload.email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {                      // ⬅️ BUKAN any
    // bedakan ZodError vs error lain
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
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
