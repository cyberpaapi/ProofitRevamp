import { NextResponse } from "next/server";
import { adminCookieName, createAdminSession, verifyAdminPassword } from "@/lib/admin/auth";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const existing = attempts.get(key);
  const attempt = !existing || existing.resetAt < now ? { count: 0, resetAt: now + 10 * 60_000 } : existing;
  if (attempt.count >= 8) {
    return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const password = typeof body.password === "string" ? body.password : "";
  if (!verifyAdminPassword(password)) {
    attempts.set(key, { ...attempt, count: attempt.count + 1 });
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  attempts.delete(key);
  const session = createAdminSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, session.value, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: session.expires,
  });
  return response;
}
