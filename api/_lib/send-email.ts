import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  /** Optional — empty string when not provided. */
  email: string;
  subject: string;
  message: string;
};

export type SendEmailResult =
  | { ok: true; data: { id: string } }
  | { ok: false; status: number; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }

  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }

  return "?";
}

function formatEmailTimestamp(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
}

function infoCard(label: string, value: string): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:12px;">
      <tr>
        <td style="padding:16px 18px;background:linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);border:1px solid rgba(255,255,255,0.08);border-radius:16px;">
          <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#a1a1aa;">${label}</p>
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.45;font-weight:500;color:#ffffff;word-break:break-word;">${value}</p>
        </td>
      </tr>
    </table>
  `.trim();
}

function buildEmailHtml(payload: ContactPayload): string {
  const { name, email, subject, message } = payload;
  const trimmedEmail = email.trim();
  const hasValidEmail =
    trimmedEmail.length > 0 && EMAIL_PATTERN.test(trimmedEmail);
  const displayEmail = hasValidEmail ? trimmedEmail : "Not provided";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(displayEmail);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  const initials = escapeHtml(getInitials(name));
  const timestamp = escapeHtml(formatEmailTimestamp());
  const mailtoHref = hasValidEmail
    ? `mailto:${encodeURIComponent(trimmedEmail)}`
    : "";

  const replyCta = hasValidEmail
    ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:32px 0 8px;">
      <tr>
        <td align="center">
          <a href="${mailtoHref}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.02em;color:#050505;text-decoration:none;background:linear-gradient(180deg, #f5f5f5 0%, #e4e4e7 100%);border:1px solid rgba(255,255,255,0.2);border-radius:14px;box-shadow:0 4px 24px rgba(0,0,0,0.4);">
            Reply to Sender
          </a>
        </td>
      </tr>
    </table>
  `.trim()
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>New Portfolio Feedback — JAVIZONE</title>
  </head>
  <body style="margin:0;padding:0;width:100% !important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      New feedback from ${safeName} — ${safeSubject}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#050505;background-image:radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255,255,255,0.04) 0%, transparent 50%);">
      <tr>
        <td align="center" style="padding:48px 20px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="padding:0;">
                <!-- Glass card -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(15,15,15,0.95) 100%);background-color:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06);">
                  <!-- Header -->
                  <tr>
                    <td style="padding:40px 36px 32px;border-bottom:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom:20px;">
                            <span style="display:inline-block;padding:6px 14px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#f5f5f5;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:999px;">NEW FEEDBACK</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:8px;">
                            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:#a1a1aa;">JAVIZONE</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;">
                            <h1 style="margin:0;font-size:28px;font-weight:600;line-height:1.2;letter-spacing:-0.02em;color:#ffffff;">New JaviZone Feedback</h1>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p style="margin:0;font-size:15px;line-height:1.55;color:#a1a1aa;">Someone submitted a message through itsjavizone.com</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Profile -->
                  <tr>
                    <td style="padding:32px 36px 8px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="center" style="padding-bottom:28px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                              <tr>
                                <td width="72" height="72" align="center" valign="middle" style="width:72px;height:72px;border-radius:50%;background:linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);border:1px solid rgba(255,255,255,0.12);font-size:22px;font-weight:600;letter-spacing:0.06em;color:#ffffff;text-align:center;">
                                  <!-- ${initials} --><img src="https://itsjavizone.com/JaviZone.svg" alt="JAVIZONE" width="44" height="44" style="display:block;width:44px;height:44px;margin:0 auto;border:0;outline:none;text-decoration:none;" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            ${infoCard("Name", safeName)}
                            ${infoCard("Email", safeEmail)}
                            ${infoCard("Subject", safeSubject)}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Message -->
                  <tr>
                    <td style="padding:8px 36px 32px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);border:1px solid rgba(255,255,255,0.08);border-radius:20px;">
                        <tr>
                          <td style="padding:24px 26px;">
                            <p style="margin:0 0 14px;font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#a1a1aa;">Message</p>
                            <p style="margin:0;font-size:17px;line-height:1.75;font-weight:400;color:#f5f5f5;white-space:pre-wrap;word-break:break-word;">${safeMessage}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Metadata -->
                  <tr>
                    <td style="padding:0 36px 36px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid rgba(255,255,255,0.08);">
                        <tr>
                          <td style="padding-top:28px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td style="padding-bottom:12px;">
                                  <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a1a1aa;">Timestamp</p>
                                  <p style="margin:4px 0 0;font-size:14px;line-height:1.5;color:#ffffff;">${timestamp}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:12px;">
                                  <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a1a1aa;">Source</p>
                                  <p style="margin:4px 0 0;font-size:14px;line-height:1.5;color:#ffffff;">JaviZone Website</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a1a1aa;">Domain</p>
                                  <p style="margin:4px 0 0;font-size:14px;line-height:1.5;color:#ffffff;">itsjavizone.com</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Reply CTA -->
                  ${hasValidEmail ? `<tr><td style="padding:0 36px;">${replyCta}</td></tr>` : ""}
                  <!-- Footer -->
                  <tr>
                    <td style="padding:36px 36px 40px;border-top:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.25);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="center" style="padding-bottom:16px;">
                            <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:#a1a1aa;">—</p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-bottom:12px;">
                            <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#ffffff;">JAVIZONE</p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-bottom:20px;">
                            <p style="margin:0;max-width:320px;font-size:14px;line-height:1.65;color:#a1a1aa;text-align:center;">
                              Building digital experiences with precision,<br />
                              performance and attention to detail.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <a href="https://itsjavizone.com" target="_blank" rel="noopener noreferrer" style="font-size:14px;font-weight:500;color:#f5f5f5;text-decoration:none;border-bottom:1px solid rgba(245,245,245,0.35);">itsjavizone.com</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}

export function validateContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || typeof message !== "string") return null;
  if (typeof email !== "string" || typeof subject !== "string") return null;

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const trimmedEmail = email.trim();
  const trimmedSubject = subject.trim();

  if (trimmedName.length < 2 || trimmedName.length > 60) return null;
  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(trimmedName)) return null;
  if (trimmedMessage.length < 10 || trimmedMessage.length > 500) return null;
  if (trimmedSubject.length > 120) return null;
  if (trimmedEmail.length > 254) return null;
  if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) return null;

  return {
    name: trimmedName,
    email: trimmedEmail,
    subject: trimmedSubject || "Portfolio Contact Form",
    message: trimmedMessage,
  };
}

export async function sendContactEmail(
  payload: ContactPayload,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: "Email service is not configured.",
    };
  }

  if (!contactEmail) {
    return {
      ok: false,
      status: 500,
      error: "Recipient email is not configured.",
    };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    return {
      ok: false,
      status: 500,
      error: "RESEND_FROM_EMAIL is not configured.",
    };
  }

  const resend = new Resend(apiKey);
  const replyTo =
    payload.email && EMAIL_PATTERN.test(payload.email)
      ? payload.email
      : undefined;

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: contactEmail,
    subject: "Portfolio Contact Form",
    html: buildEmailHtml(payload),
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      ok: false,
      status: 502,
      error: "Failed to send email. Please try again later.",
    };
  }

  if (!data?.id) {
    return {
      ok: false,
      status: 502,
      error: "Failed to send email. Please try again later.",
    };
  }

  return { ok: true, data: { id: data.id } };
}

export async function handleSendEmailRequest(
  body: unknown,
): Promise<SendEmailResult> {
  const payload = validateContactPayload(body);

  if (!payload) {
    return { ok: false, status: 400, error: "Invalid form data." };
  }

  return sendContactEmail(payload);
}
