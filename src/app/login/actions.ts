"use server";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, sessionCookieName } from "../../lib/session-token";

export type LoginState = { error?: string };

function safelyMatches(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer);
}

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const expectedEmail = process.env.DEMO_EMAIL ?? "";
  const expectedPassword = process.env.DEMO_PASSWORD ?? "";

  if (!safelyMatches(email, expectedEmail) || !safelyMatches(password, expectedPassword)) {
    return { error: "E-mail ou senha incorretos." };
  }

  const expiresAt = Date.now() + 60 * 60 * 1000;
  const token = await createSessionToken(email, expiresAt);
  (await cookies()).set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });

  const next = String(formData.get("next") ?? "/dashboard");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard");
}

export async function logout() {
  (await cookies()).delete(sessionCookieName);
  redirect("/login");
}
