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

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const issue = (body.issue || "").trim();

  if (!name || !phone || !issue) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const to = process.env.LEAD_TO_EMAIL || SITE.email;
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const apiKey = process.env.RESEND_API_KEY;

  const html = `
    <h2>New Estimate Request — ${SITE.name}</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0"><strong>Name:</strong></td><td>${esc(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Business:</strong></td><td>${esc(body.businessName)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Phone:</strong></td><td>${esc(phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Email:</strong></td><td>${esc(body.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Equipment:</strong></td><td>${esc(body.equipmentType)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;vertical-align:top"><strong>Issue:</strong></td><td>${esc(issue).replace(/\n/g, "<br>")}</td></tr>
    </table>
  `;

  const text =
    `New Estimate Request — ${SITE.name}\n\n` +
    `Name: ${name}\n` +
    `Business: ${body.businessName || ""}\n` +
    `Phone: ${phone}\n` +
    `Email: ${body.email || ""}\n` +
    `Equipment: ${body.equipmentType || ""}\n` +
    `Issue: ${issue}\n`;

  // If email isn't configured yet, log the lead so it isn't lost and return
  // success so the UX still works. Configure RESEND_API_KEY for delivery.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — lead not emailed. Lead:\n" + text
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${SITE.name} <${from}>`,
      to: [to],
      replyTo: body.email || undefined,
      subject: `New Estimate Request — ${name}${
        body.equipmentType ? ` (${body.equipmentType})` : ""
      }`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Email delivery failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
