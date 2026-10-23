// Server side of the Cloudflare Turnstile bot check used by every public form.
//
// Turnstile is switched on by setting TURNSTILE_SECRET_KEY (and the matching
// NEXT_PUBLIC_TURNSTILE_SITE_KEY) in Vercel. Until the secret is set this check
// does nothing, so the forms keep working exactly as before.

const DEFAULT_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * True if the form may go ahead. False only when Turnstile is on and the token
 * is missing or rejected. If Cloudflare itself cannot be reached we let the
 * form through, so a Cloudflare outage never blocks a prayer request.
 */
export async function verifyTurnstile(
  form: FormData,
  ip: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const token = String(form.get("cf-turnstile-response") ?? "");
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(
      process.env.TURNSTILE_VERIFY_URL || DEFAULT_VERIFY_URL,
      { method: "POST", body, signal: AbortSignal.timeout(5000) }
    );
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch (err) {
    console.error("Turnstile verification unavailable", err);
    return true;
  }
}
