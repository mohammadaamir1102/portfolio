import type { ContactInput } from "@/lib/contact-validation";

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.CONTACT_TO_EMAIL,
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Sends the enquiry through Resend's HTTP API. No SDK is required.
 * Returns a discriminated result so the route can answer honestly.
 */
export async function sendContactEmail(
  data: ContactInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return { ok: false, error: "not_configured" };
  }

  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    subject: escapeHtml(data.subject),
    message: escapeHtml(data.message).replaceAll("\n", "<br />"),
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
        html: `
          <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: #111;">
            <h2 style="margin: 0 0 16px;">New portfolio enquiry</h2>
            <p><strong>Name:</strong> ${safe.name}<br />
            <strong>Email:</strong> ${safe.email}<br />
            <strong>Subject:</strong> ${safe.subject}</p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <p>${safe.message}</p>
          </div>
        `,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { ok: false, error: "provider_error" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
