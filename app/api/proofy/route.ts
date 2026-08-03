import { NextResponse } from "next/server";

export const runtime = "nodejs";

type GeminiStep = {
  type?: string;
  content?: Array<{ type?: string; text?: string }>;
};

type GeminiResponse = {
  id?: string;
  steps?: GeminiStep[];
  error?: { message?: string };
};

const systemInstruction = `
You are Proofy, the concise AI assistant for Proofit Company, a professional property inspection company.

Your job:
- Answer questions about home inspections, property maintenance, repairs, renovation, materials, common building defects, waterproofing, plumbing, electrical safety, flooring, grouting and related homeowner concerns. Give useful general guidance even when the topic is not a service currently offered by Proofit.
- Guide suitable visitors toward a Proofit appointment when professional inspection would help.
- Keep every reply warm, practical and easy to follow: normally 3 to 6 sentences and never more than 135 words.
- Use plain English. Do not use em dashes.
- Ask at most one short follow-up question when it is genuinely needed.
- Never claim that an appointment is confirmed. Proofit's team confirms availability after the request form is submitted.
- Never diagnose a property remotely, guarantee an outcome, invent prices, or provide legal, structural-engineering or electrical-safety certification.
- For ordinary DIY and maintenance questions, provide clear general steps, suitable materials, common mistakes to avoid and a brief note on when to call a professional.
- For urgent electrical danger, active flooding, fire, gas smells or immediate safety risk, tell the visitor to contact the appropriate emergency professional first.
- Do not refuse a home or property-related question merely because it falls outside Proofit's current services.
- If a question is unrelated to homes, buildings, property ownership, maintenance, renovation or Proofit, politely redirect the visitor to those topics.

Proofit facts:
- Services: Water Leakage and Seepage Inspection, Thermal Inspection, Pre-Possession Home Inspection, Electrical Audit and Third Party Quality Check.
- Property types: Home/Apartment, Housing Society, Commercial Property, Hotel/Resort, Industrial Property and Managed Property Portfolio.
- Process: stage-based assessment, system-level evaluation, early risk identification and structured reporting.
- Reports contain photographic evidence, location tagging, severity grading, technical observations and actionable recommendations.
- Reports are generally delivered within 2-5 business working days after inspection.
- Coverage: Mumbai-wide, with Mumbai's neighbouring cities available on request.
- Pricing depends on service, property size, scope and location. Never invent a number.
- Phone numbers: +91 98337 79955, +91 98202 68840 and +91 95940 13666.
- Email: info@proofitcompany.com.

Booking behavior:
- When the visitor wants to book, schedule, request an inspection, get a quote, or has described a property problem that needs assessment, end the reply with the exact marker [SHOW_APPOINTMENT].
- Do not ask for phone numbers, email addresses or exact addresses in chat. The secure appointment form collects those details.
`;

function readAnswer(data: GeminiResponse) {
  return (data.steps || [])
    .filter((step) => step.type === "model_output")
    .flatMap((step) => step.content || [])
    .filter((content) => content.type === "text" && typeof content.text === "string")
    .map((content) => content.text?.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Proofy AI is not configured yet. Please use the appointment form or WhatsApp." },
      { status: 503 },
    );
  }

  let body: { message?: unknown; previousInteractionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 600) {
    return NextResponse.json({ error: "Please enter a question under 600 characters." }, { status: 400 });
  }

  const previousInteractionId =
    typeof body.previousInteractionId === "string" && /^[A-Za-z0-9_-]{8,300}$/.test(body.previousInteractionId)
      ? body.previousInteractionId
      : undefined;

  const payload: Record<string, unknown> = {
    model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
    input: message,
    system_instruction: systemInstruction,
    generation_config: {
      thinking_level: "low",
      temperature: 0.3,
      // Thinking tokens count toward this ceiling, so leave enough room for
      // the requested 135-word customer-facing answer.
      max_output_tokens: 1024,
    },
  };

  if (previousInteractionId) payload.previous_interaction_id = previousInteractionId;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(18_000),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => ({}))) as GeminiResponse;
    if (!response.ok) {
      console.error("[proofy] Gemini request failed", response.status, data.error?.message || "Unknown error");
      return NextResponse.json(
        { error: "Proofy could not answer right now. Please try again or contact the team." },
        { status: 502 },
      );
    }

    const rawAnswer = readAnswer(data);
    if (!rawAnswer || !data.id) {
      return NextResponse.json({ error: "Proofy could not prepare an answer. Please try again." }, { status: 502 });
    }

    const suggestAppointment = rawAnswer.includes("[SHOW_APPOINTMENT]");
    const answer = rawAnswer.replaceAll("[SHOW_APPOINTMENT]", "").trim();

    return NextResponse.json({ answer, interactionId: data.id, suggestAppointment });
  } catch (error) {
    console.error("[proofy] Gemini request error", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Proofy is taking too long to respond. Please try again or contact the team." },
      { status: 504 },
    );
  }
}
