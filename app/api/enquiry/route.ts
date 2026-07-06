import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  service?: string;
  property?: string;
  message?: string;
};

/**
 * Enquiry pipeline:
 *  1. Validate.
 *  2. Persist to the local database file (data/enquiries.json). Swap `saveEnquiry`
 *     for a hosted DB (Postgres/Supabase/etc.) at deploy time — it's the only
 *     storage touchpoint.
 *  3. If RESEND_API_KEY is set: email an acknowledgement to the enquirer and a
 *     notification to the team. Without the key (local demo), emails are skipped
 *     and logged instead — the form still works end-to-end.
 */
export async function POST(req: Request) {
  let body: Enquiry;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!/^[+\d][\d\s\-()]{7,17}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const enquiry = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone,
    service: (body.service || "").slice(0, 200),
    property: (body.property || "").slice(0, 500),
    message: (body.message || "").slice(0, 5000),
  };

  try {
    await saveEnquiry(enquiry);
  } catch (err) {
    console.error("Failed to store enquiry:", err);
    return NextResponse.json({ error: "Could not save your enquiry. Please try again." }, { status: 500 });
  }

  await sendEmails(enquiry).catch((err) => {
    // Email failure must not lose the lead — it's already stored.
    console.error("Email sending failed (enquiry is saved):", err);
  });

  return NextResponse.json({ ok: true });
}

async function saveEnquiry(enquiry: Record<string, string>) {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "enquiries.json");
  await fs.mkdir(dir, { recursive: true });
  let all: unknown[] = [];
  try {
    all = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    // first enquiry — file doesn't exist yet
  }
  all.push(enquiry);
  await fs.writeFile(file, JSON.stringify(all, null, 2), "utf8");
}

async function sendEmails(enquiry: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[enquiry] RESEND_API_KEY not set — skipping emails. Enquiry ${enquiry.id} from ${enquiry.email} stored in data/enquiries.json`);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || "Proofit <onboarding@resend.dev>";
  const teamInbox = process.env.ENQUIRY_INBOX || "info@proofitcompany.com";

  // Acknowledgement to the enquirer
  await resend.emails.send({
    from,
    to: enquiry.email,
    subject: "We've received your enquiry — Proofit",
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#17181A">
        <div style="background:#17181A;padding:24px;text-align:center">
          <span style="color:#fff;font-size:24px;font-weight:bold">proof<span style="color:#F7941D">it</span></span>
        </div>
        <div style="padding:28px 24px">
          <h2 style="margin:0 0 12px">Thank you, ${escapeHtml(enquiry.name)}.</h2>
          <p style="line-height:1.6">We've received your enquiry${enquiry.service ? ` about <strong>${escapeHtml(enquiry.service)}</strong>` : ""} and will get back to you within one working day.</p>
          <p style="line-height:1.6">If it's urgent, call us on <a href="tel:+919594013666" style="color:#F7941D">+91-9594013666</a> or message us on WhatsApp.</p>
          <p style="margin-top:24px;line-height:1.6">— Team Proofit<br/><span style="color:#888;font-size:13px">Residential property inspection · Mumbai</span></p>
        </div>
      </div>`,
  });

  // Notification to the team
  await resend.emails.send({
    from,
    to: teamInbox,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.service || "General"} — ${enquiry.name}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
        <h2>New website enquiry</h2>
        <table style="border-collapse:collapse;width:100%">
          ${row("Name", enquiry.name)}
          ${row("Email", enquiry.email)}
          ${row("Phone", enquiry.phone)}
          ${row("Service", enquiry.service)}
          ${row("Property", enquiry.property)}
          ${row("Message", enquiry.message)}
          ${row("Received", enquiry.receivedAt)}
        </table>
      </div>`,
  });
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;width:110px">${label}</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
