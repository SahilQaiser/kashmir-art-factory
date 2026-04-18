const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

async function importKey(password: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function unb64url(str: string): ArrayBuffer {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? 0 : 4 - (padded.length % 4);
  const bytes = Uint8Array.from(atob(padded + "=".repeat(pad)), (c) => c.charCodeAt(0));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

export async function createSessionToken(password: string): Promise<string> {
  const payload = b64url(new TextEncoder().encode(JSON.stringify({ iat: Date.now() })));
  const key = await importKey(password);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${b64url(sig)}`;
}

export async function verifySessionToken(token: string, password: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);

    const key = await importKey(password);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      unb64url(sig),
      new TextEncoder().encode(payload)
    );
    if (!valid) return false;

    const { iat } = JSON.parse(new TextDecoder().decode(unb64url(payload) as ArrayBuffer));
    return Date.now() - iat < SESSION_MAX_AGE_MS;
  } catch {
    return false;
  }
}
