import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

interface LeadPayload {
  name?: string;
  businessName?: string;
  phone?: string;
  email?: string;
  equipmentType?: string;
  issue?: string;
  company_website?: string; // honeypot
}

// Lead delivery configuration. Recipients can be overridden via env, but the
// production defaults are the business owner (TO) + operator (CC).
const SUBJECT = "New Service Request - Cesar's Restaurant Appliances Repair";
const LEAD_TO = process.env.LEAD_TO_EMAIL || "cesaredgarmejia0603@gmail.com";
const LEAD_CC = process.env.LEAD_CC_EMAIL || "hreyesislas@gmail.com";
// Use a verified-domain sender in production (e.g. leads@yourdomain.com).
// onboarding@resend.dev works out of the box but has Resend test-mode limits.
const LEAD_FROM = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** A field with a sensible "not provided" fallback for optional inputs. */
function row(label: string, value: string, opts: { mono?: boolean; href?: string } = {}): string {
  const provided = value.trim().length > 0;
  const safe = provided ? esc(value) : "—";
  const display = provided && opts.href ? `<a href="${esc(opts.href)}" style="color:#e11d2a;text-decoration:none">${safe}</a>` : safe;
  return `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #ececef;font:600 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8b95a5;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:14px 20px;border-bottom:1px solid #ececef;font:${opts.mono ? "400 15px/1.6" : "600 15px/1.5"} Arial,Helvetica,sans-serif;color:${provided ? "#16181c" : "#b4bcc7"}">${display}</td>
    </tr>`;
}

function buildHtml(lead: {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  equipmentType: string;
  issue: string;
}): string {
  const issueHtml = lead.issue.trim()
    ? esc(lead.issue).replace(/\n/g, "<br>")
    : "—";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(SUBJECT)}</title></head>
<body style="margin:0;padding:0;background:#f4f5f7;-webkit-font-smoothing:antialiased">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">New service request from ${esc(lead.name)} — ${esc(lead.phone)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px -16px rgba(10,11,13,.35)">

        <!-- Header -->
        <tr><td style="background:#0a0b0d;padding:28px 28px 24px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;width:52px">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:48px;height:48px;background:#1a1d21;border-radius:12px;text-align:center;vertical-align:middle;font:800 20px/1 Arial,Helvetica,sans-serif;letter-spacing:-1px">
                <span style="color:#e7ebf0">C</span><span style="color:#e11d2a">R</span>
              </td></tr></table>
            </td>
            <td style="vertical-align:middle;padding-left:14px">
              <div style="font:800 17px/1.2 Arial,Helvetica,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#ffffff">Cesar<span style="color:#e11d2a">'</span>s</div>
              <div style="font:600 10px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#8b95a5;margin-top:3px">Restaurant Appliances Repair</div>
            </td>
          </tr></table>
        </td></tr>

        <!-- Accent bar -->
        <tr><td style="height:4px;background:#e11d2a;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Title -->
        <tr><td style="padding:30px 28px 8px">
          <div style="font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#e11d2a">New Service Request</div>
          <h1 style="margin:8px 0 0;font:800 24px/1.25 Arial,Helvetica,sans-serif;color:#16181c">You have a new lead</h1>
          <p style="margin:8px 0 0;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:#5b626c">Submitted through the website contact form. Reply directly to this email to reach the customer.</p>
        </td></tr>

        <!-- Details -->
        <tr><td style="padding:22px 28px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ececef;border-radius:12px;overflow:hidden">
            ${row("Name", lead.name)}
            ${row("Business", lead.businessName)}
            ${row("Phone", lead.phone, { href: `tel:${lead.phone.replace(/[^0-9+]/g, "")}` })}
            ${row("Email", lead.email, { href: lead.email.trim() ? `mailto:${lead.email.trim()}` : undefined })}
            ${row("Equipment", lead.equipmentType)}
          </table>
        </td></tr>

        <!-- Issue -->
        <tr><td style="padding:14px 28px 4px">
          <div style="font:600 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8b95a5;margin-bottom:8px">Issue Description</div>
          <div style="background:#f7f8fa;border-left:3px solid #e11d2a;border-radius:8px;padding:16px 18px;font:400 15px/1.7 Arial,Helvetica,sans-serif;color:#16181c">${issueHtml}</div>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:24px 28px 6px">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:10px;background:#e11d2a">
            <a href="tel:${esc(SITE.phoneHref.replace("tel:", ""))}" style="display:inline-block;padding:13px 26px;font:700 14px/1 Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none">Call ${esc(SITE.phone)}</a>
          </td></tr></table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:22px 28px 30px">
          <hr style="border:none;border-top:1px solid #ececef;margin:0 0 16px">
          <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#8b95a5">${esc(SITE.name)} &middot; ${esc(SITE.serviceArea)}<br>This lead notification was generated automatically from ${esc(SITE.domain)}.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: if the hidden field is filled, silently accept (drop spam).
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: (body.name || "").trim(),
    businessName: (body.businessName || "").trim(),
    phone: (body.phone || "").trim(),
    email: (body.email || "").trim(),
    equipmentType: (body.equipmentType || "").trim(),
    issue: (body.issue || "").trim(),
  };

  if (!lead.name || !lead.phone || !lead.issue) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Production: email delivery is required. If it isn't configured we must NOT
  // report success — return an error so the form shows the user-friendly
  // "call us" message instead of a false confirmation.
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set — cannot deliver lead. Set it in the environment."
    );
    return NextResponse.json(
      { error: "Email service not configured.", delivered: false },
      { status: 503 }
    );
  }

  const html = buildHtml(lead);
  const text =
    `New Service Request — ${SITE.name}\n\n` +
    `Name: ${lead.name}\n` +
    `Business Name: ${lead.businessName || "—"}\n` +
    `Phone: ${lead.phone}\n` +
    `Email: ${lead.email || "—"}\n` +
    `Equipment Type: ${lead.equipmentType || "—"}\n` +
    `Issue Description: ${lead.issue}\n`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${SITE.name} <${LEAD_FROM}>`,
      to: [LEAD_TO],
      cc: [LEAD_CC],
      replyTo: lead.email || undefined,
      subject: SUBJECT,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Email delivery failed.", delivered: false },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Server error.", delivered: false },
      { status: 500 }
    );
  }
}
