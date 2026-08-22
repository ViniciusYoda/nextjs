import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookieName, verifySessionToken } from "./session-token";

export async function getSession() {
  const token = (await cookies()).get(sessionCookieName)?.value;
  return verifySessionToken(token);
}

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}
