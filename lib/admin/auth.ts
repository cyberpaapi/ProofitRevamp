import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "proofit_admin_session";
const sessionLifetimeSeconds = 60 * 60 * 12;

function configuredPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== "production") return "proofit-admin";
  return "";
}

function sessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  if (process.env.NODE_ENV !== "production") return "proofit-local-admin-session-secret";
  return "";
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function verifyAdminPassword(password: string) {
  const expected = Buffer.from(configuredPassword());
  const received = Buffer.from(password);
  return expected.length > 0 && expected.length === received.length && timingSafeEqual(expected, received);
}

export function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + sessionLifetimeSeconds;
  const payload = String(expires);
  return { value: `${payload}.${sign(payload)}`, expires: new Date(expires * 1000) };
}

export function verifyAdminSession(value?: string) {
  if (!value || !sessionSecret()) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(sign(expires));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(adminCookieName)?.value);
}
