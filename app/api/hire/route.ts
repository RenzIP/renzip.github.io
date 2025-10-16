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

// ---------- ANIME THEME EMAIL TEMPLATE ----------
type Payload = z.infer<typeof Body>;

function emailHtmlAnime(p: Payload) {
  const badge = (s: string) =>
    `<span style="
      display:inline-block;padding:6px 10px;margin:4px 6px 0 0;
      border:1px solid #f5c2d7;border-radius:999px;
      background:linear-gradient(135deg,#ffe4ee,#ffd6e7);
      color:#7f1d1d;font-size:12px;line-height:1;font-weight:600
    ">${escapeHtml(s)}</span>`;

  return `
  <div style="background:#f7f7fb;padding:24px 0;
              font-family: Inter, 'Zen Maru Gothic', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width:640px;margin:0 auto;border:1px solid #f3e2f8;border-radius:16px;overflow:hidden;background:#ffffff;
                box-shadow:0 8px 24px rgba(236,72,153,.12)">
      
      <!-- Header sakura -->
      <div style="padding:22px 26px;color:#fff;
                  background:linear-gradient(135deg,#ec4899 0%,#8b5cf6 100%);
                  position:relative;">
        <div style="font-size:14px;opacity:.9;letter-spacing:.04em">レンツ • ポートフォリオ</div>
        <div style="font-size:22px;font-weight:900;margin-top:2px;display:flex;align-items:center;gap:8px">
          <span>🌸 New Hire Request</span>
        </div>
        <div style="position:absolute;inset:0;pointer-events:none;opacity:.25">
          <div style="position:absolute;top:-8px;left:24px;width:14px;height:12px;background:#ffd6e7;border-radius:70% 30% 70% 30%;"></div>
          <div style="position:absolute;top:10px;right:48px;width:12px;height:10px;background:#ffe4ee;border-radius:70% 30% 70% 30%;"></div>
        </div>
      </div>

      <!-- Body -->
      <div style="padding:26px">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111827">
          <tr>
            <td style="padding:10px 0;width:150px;color:#6b7280">Name</td>
            <td style="padding:10px 0;font-weight:700">${escapeHtml(p.name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280">Email</td>
            <td style="padding:10px 0">
              <a href="mailto:${escapeHtml(p.email)}" style="color:#2563eb;text-decoration:none">
                ${escapeHtml(p.email)}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;vertical-align:top">Business</td>
            <td style="padding:10px 0">${escapeHtml(p.business)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;vertical-align:top">Needs</td>
            <td style="padding:10px 0">
              ${p.needs.length ? p.needs.map(badge).join("") : "-"}
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280">Timeframe</td>
            <td style="padding:10px 0">
              ${p.timeframe === "asap" ? "ASAP" :
                p.timeframe === "2-4w" ? "2–4 weeks" :
                p.timeframe === "1-2m" ? "1–2 months" : "Just exploring"}
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;vertical-align:top">Notes</td>
            <td style="padding:10px 0;white-space:pre-wrap">${escapeHtml(p.notes || "-")}</td>
          </tr>
        </table>

        <div style="margin-top:18px;padding-top:16px;border-top:1px dashed #f3e2f8;color:#6b7280;font-size:12px">
          Balas email ini untuk menghubungi <b>${escapeHtml(p.name)}</b>. <span style="opacity:.8">いつでもどうぞ。</span>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:14px 26px;background:#fff7fb;border-top:1px solid #f3e2f8;color:#6b7280;font-size:12px">
        Sent from <a href="https://renz.my.id" style="color:#ec4899;text-decoration:none;font-weight:600">renz.my.id</a> • <span style="opacity:.8">ありがとう 🌸</span>
      </div>
    </div>
  </div>`;
}

function emailTextAnime(p: Payload) {
  return [
    `New Hire Request (Renz Portfolio)`,
    ``,
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Business: ${p.business}`,
    `Needs: ${p.needs.join(", ") || "-"}`,
    `Timeframe: ${p.timeframe}`,
    `Notes:`,
    `${p.notes || "-"}`,
    ``,
    `renz.my.id`,
  ].join("\n");
}
// ------------------------------------------------

export async function POST(req: Request) {
  try {
    const payload = Body.parse(await req.json());
    if (payload.honey?.trim()) return NextResponse.json({ ok: true });

    const to = process.env.HIRE_TO_EMAIL || "zenkun.enterkill13@gmail.com";
    const from = process.env.HIRE_FROM_EMAIL || "onboarding@resend.dev";

    const html = emailHtmlAnime(payload);
    const text = emailTextAnime(payload);

    await resend.emails.send({
      from: `Renz Portfolio <${from}>`,
      to,
      subject: `New Hire Request — ${payload.name}`,
      replyTo: payload.email,
      html,
      text, // fallback plaintext
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
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
