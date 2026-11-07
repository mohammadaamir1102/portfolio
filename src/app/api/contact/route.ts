import { NextResponse } from "next/server";
import { isEmailConfigured, sendContactEmail } from "@/lib/contact";
import { validateContact } from "@/lib/contact-validation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const limit = checkRateLimit(`contact:${ip}`, 5, 60_000);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: "Too many messages. Please try again shortly.",
        retryAfter: limit.retryAfter,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = validateContact(payload);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: "validation", errors: parsed.errors },
      { status: 400 },
    );
  }

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Email delivery is not configured. The form will fall back to a mailto link.",
      },
      { status: 501 },
    );
  }

  const result = await sendContactEmail(parsed.data);

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        message:
          "The email provider could not deliver the message. Please email directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
