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

type StoredEnquiry = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  property: string;
  message: string;
};

/**
 * Enquiry pipeline:
 *  1. Validate.
 *  2. Persist to Supabase when configured. Local development falls back to
 *     data/enquiries.json so the form remains testable without cloud secrets.
 *  3. If RESEND_API_KEY is set: email an acknowledgement to the enquirer and a
 *     notification to the team. Without the key (local demo), emails are skipped
 *     and logged instead - the form still works end-to-end.
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

  let stored = false;
  try {
    await saveEnquiry(enquiry);
    stored = true;
  } catch (err) {
    console.error("Could not persist enquiry:", err);
  }

  let emailed = false;
  try {
    emailed = await sendEmails(enquiry);
  } catch (err) {
    console.error("Email sending failed:", err);
  }

  if (!stored && !emailed) {
    // Nowhere to put the lead - surface the failure honestly.
    console.error(`Enquiry ${enquiry.id} could not be stored or emailed.`);
    return NextResponse.json(
      { error: "Could not submit your enquiry right now. Please WhatsApp or call us instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

async function saveEnquiry(enquiry: StoredEnquiry) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseSecretKey) {
    await saveEnquiryToSupabase(enquiry, supabaseUrl, supabaseSecretKey);
    return;
  }

  // Vercel's function filesystem is not durable. Refuse to report a database
  // save there unless Supabase is configured; Resend can still carry the lead.
  if (process.env.VERCEL) {
    throw new Error("Supabase storage is not configured for this deployment.");
  }

  await saveEnquiryToLocalFile(enquiry);
}

async function saveEnquiryToSupabase(enquiry: StoredEnquiry, url: string, secretKey: string) {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { error } = await supabase.from("enquiries").insert({
    id: enquiry.id,
    received_at: enquiry.receivedAt,
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    service: enquiry.service || null,
    property: enquiry.property || null,
    message: enquiry.message || null,
  });

  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

async function saveEnquiryToLocalFile(enquiry: StoredEnquiry) {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "enquiries.json");
  await fs.mkdir(dir, { recursive: true });
  let all: unknown[] = [];
  try {
    all = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    // first enquiry - file doesn't exist yet
  }
  all.push(enquiry);
  await fs.writeFile(file, JSON.stringify(all, null, 2), "utf8");
}

async function sendEmails(enquiry: StoredEnquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[enquiry] RESEND_API_KEY not set - skipping emails. Enquiry ${enquiry.id} from ${enquiry.email}`);
    return false;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || "Proofit <onboarding@resend.dev>";
  const teamInbox = process.env.ENQUIRY_INBOX || "info@proofitcompany.com";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.proofitcompany.com").replace(/\/$/, "");
  const logoAttachment = {
    path: `${siteUrl}/images/email-logo.png`,
    filename: "proofit-logo.png",
    contentType: "image/png",
    inlineContentId: "proofit-logo",
  };

  const customerEmail = await resend.emails.send({
    from,
    to: enquiry.email,
    subject: "We've received your enquiry - Proofit",
    text: `Thank you, ${enquiry.name}. We have received your enquiry${enquiry.service ? ` about ${enquiry.service}` : ""} and a Proofit team member will contact you shortly. For urgent assistance, call +91 98337 79955 or WhatsApp +91 95940 13666.`,
    attachments: [logoAttachment],
    html: `
      <!doctype html>
      <html lang="en">
        <body style="margin:0;background:#f3f1ed;font-family:Arial,Helvetica,sans-serif;color:#17181a">
          <div style="display:none;max-height:0;overflow:hidden;opacity:0">Your Proofit enquiry has been received.</div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f1ed;padding:24px 12px">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e7e2dc;border-radius:16px;overflow:hidden">
                  <tr>
                    <td align="center" style="padding:24px 28px 20px;border-bottom:6px solid #f7941d">
                      <img src="cid:proofit-logo" width="220" alt="Proofit" style="display:block;width:220px;max-width:72%;height:auto;border:0" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 32px 32px">
                      <p style="margin:0 0 10px;color:#f7941d;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase">Enquiry received</p>
                      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.25;color:#17181a">Thank you, ${escapeHtml(enquiry.name)}.</h1>
                      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#4f4f4f">We have received your enquiry${enquiry.service ? ` about <strong style="color:#17181a">${escapeHtml(enquiry.service)}</strong>` : ""}. A member of the Proofit team will contact you shortly.</p>
                      ${enquiry.message ? `<div style="margin:22px 0;padding:18px 20px;background:#f7f5f2;border-left:4px solid #f7941d;border-radius:8px"><p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#777">Your message</p><p style="margin:0;font-size:14px;line-height:1.6;color:#333">${escapeHtml(enquiry.message)}</p></div>` : ""}
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0 22px">
                        <tr>
                          <td style="border-radius:999px;background:#17181a">
                            <a href="https://wa.me/919594013666" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none">Message us on WhatsApp</a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:0;font-size:14px;line-height:1.7;color:#666">For urgent assistance, call <a href="tel:+919833779955" style="color:#f07f00;font-weight:700;text-decoration:none">+91 98337 79955</a>.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:22px 32px;background:#17181a;color:#ffffff">
                      <p style="margin:0 0 6px;font-size:14px;font-weight:700">Team Proofit</p>
                      <p style="margin:0;font-size:12px;line-height:1.6;color:#bdbdbd">Property inspections and technical assessments across Mumbai and neighbouring cities on request.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
  });
  if (customerEmail.error) throw new Error(`Customer email failed: ${customerEmail.error.message}`);

  const teamEmail = await resend.emails.send({
    from,
    to: teamInbox,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.service || "General"} - ${enquiry.name}`,
    text: `New website enquiry\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nService: ${enquiry.service || "Not provided"}\nProperty: ${enquiry.property || "Not provided"}\nMessage: ${enquiry.message || "Not provided"}\nReceived: ${enquiry.receivedAt}`,
    attachments: [logoAttachment],
    html: `
      <!doctype html>
      <html lang="en">
        <body style="margin:0;background:#f3f1ed;font-family:Arial,Helvetica,sans-serif;color:#17181a">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f1ed;padding:24px 12px">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e7e2dc;border-radius:16px;overflow:hidden">
                  <tr>
                    <td style="padding:20px 28px;border-bottom:6px solid #f7941d">
                      <img src="cid:proofit-logo" width="180" alt="Proofit" style="display:block;width:180px;max-width:64%;height:auto;border:0" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px 28px">
                      <p style="margin:0 0 8px;color:#f7941d;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase">New website lead</p>
                      <h1 style="margin:0 0 22px;font-size:25px;line-height:1.3">${escapeHtml(enquiry.name)}</h1>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse">
                        ${row("Name", enquiry.name)}
                        ${row("Email", enquiry.email)}
                        ${row("Phone", enquiry.phone)}
                        ${row("Service", enquiry.service)}
                        ${row("Property", enquiry.property)}
                        ${row("Message", enquiry.message)}
                        ${row("Received", enquiry.receivedAt)}
                      </table>
                      <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:#777">Reply directly to this email to respond to ${escapeHtml(enquiry.name)}.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
  });
  if (teamEmail.error) throw new Error(`Team email failed: ${teamEmail.error.message}`);

  return true;
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:11px 12px;border:1px solid #e8e4df;background:#f8f6f3;font-size:13px;font-weight:bold;width:110px;vertical-align:top">${label}</td><td style="padding:11px 12px;border:1px solid #e8e4df;font-size:13px;line-height:1.55;vertical-align:top">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
