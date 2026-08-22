export const sessionCookieName = "agenda_session";

type SessionPayload = {
  email: string;
  expiresAt: number;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET não está configurado.");
  return new TextEncoder().encode(secret);
}

function encode(value: string | Uint8Array) {
  return Buffer.from(value).toString("base64url");
}

export async function createSessionToken(email: string, expiresAt: number) {
  const payload = encode(JSON.stringify({ email, expiresAt } satisfies SessionPayload));
  const key = await crypto.subtle.importKey("raw", getSecret(), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${encode(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  try {
    const key = await crypto.subtle.importKey("raw", getSecret(), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      Buffer.from(signature, "base64url"),
      new TextEncoder().encode(payload),
    );
    if (!valid) return null;

    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionPayload;
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}
