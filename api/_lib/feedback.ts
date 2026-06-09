import { Resend } from "resend";
import { EmailTemplate } from "../../src/emails/emailTemplate.js";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MESSAGE =
  "Too many requests. Please wait a minute before trying again.";

const rateLimitStore = new Map<string, number[]>();

export type FeedbackPayload = {
  name: string;
  email: string;
  message: string;
};

export type FeedbackResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

type ServerEnv = {
  resendApiKey: string;
  contactEmail: string;
  domain: string;
};

export function isFeedbackFailure(
  result: FeedbackResult,
): result is Extract<FeedbackResult, { ok: false }> {
  return result.ok === false;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateLimitStore.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

function getServerEnv(): ServerEnv | null {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const contactEmail = process.env.CONTACT_EMAIL?.trim();
  const domain = process.env.DOMAIN?.trim();

  if (!resendApiKey || !contactEmail || !domain) {
    return null;
  }

  return { resendApiKey, contactEmail, domain };
}

function parseFeedbackBody(body: unknown): FeedbackPayload | null {
  if (!body || typeof body !== "object") return null;

  const { name, email, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  return { name, email, message };
}

function validateFeedback(body: FeedbackPayload): string | null {
  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();

  if (name.length < 2 || name.length > 60) {
    return "Name must be between 2 and 60 characters.";
  }

  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(name)) {
    return "Name contains invalid characters.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please provide a valid email address.";
  }

  if (message.length < 10 || message.length > 500) {
    return "Message must be between 10 and 500 characters.";
  }

  return null;
}

export async function handleFeedbackRequest(
  body: unknown,
  clientIp: string,
): Promise<FeedbackResult> {
  if (isRateLimited(clientIp)) {
    return { ok: false, status: 429, error: RATE_LIMIT_MESSAGE };
  }

  const env = getServerEnv();
  if (!env) {
    console.error("[feedback] Missing RESEND_API_KEY, CONTACT_EMAIL, or DOMAIN");
    return { ok: false, status: 500, error: "Server configuration error" };
  }

  const payload = parseFeedbackBody(body);
  if (!payload) {
    return { ok: false, status: 400, error: "Invalid request body" };
  }

  const validationError = validateFeedback(payload);
  if (validationError) {
    return { ok: false, status: 400, error: validationError };
  }

  const trimmedName = payload.name.trim();
  const trimmedEmail = payload.email.trim();
  const trimmedMessage = payload.message.trim();

  const resend = new Resend(env.resendApiKey);

  const { error } = await resend.emails.send({
    from: `JaviZone Feedback <feedback@${env.domain}>`,
    to: [env.contactEmail],
    ...(trimmedEmail ? { replyTo: trimmedEmail } : {}),
    subject: "Portfolio Feedback",
    html: EmailTemplate({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      domain: env.domain,
    }),
  });

  if (error) {
    console.error("[feedback] Resend error:", error);
    return { ok: false, status: 500, error: "Failed to send email" };
  }

  return { ok: true };
}
