import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { EmailTemplate } from "../src/emails/emailTemplate.tsx";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MESSAGE =
  "Too many requests. Please wait a minute before trying again.";

const rateLimitStore = new Map<string, number[]>();

type FeedbackBody = {
  name: string;
  email: string;
  message: string;
};

type ServerEnv = {
  resendApiKey: string;
  contactEmail: string;
  domain: string;
};

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0]?.trim() ?? "unknown";
  }
  return req.socket?.remoteAddress ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitStore.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

function getServerEnv(): ServerEnv | null {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const domain = process.env.DOMAIN;

  if (!resendApiKey || !contactEmail || !domain) {
    return null;
  }

  return { resendApiKey, contactEmail, domain };
}

function parseBody(req: VercelRequest): FeedbackBody | null {
  if (!req.body || typeof req.body !== "object") {
    return null;
  }

  const { name, email, message } = req.body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  return { name, email, message };
}

function validateFeedback(body: FeedbackBody): string | null {
  const trimmedName = body.name.trim();
  const trimmedEmail = body.email.trim();
  const trimmedMessage = body.message.trim();

  if (trimmedName.length < 2 || trimmedName.length > 60) {
    return "Name must be between 2 and 60 characters.";
  }

  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(trimmedName)) {
    return "Name contains invalid characters.";
  }

  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return "Please provide a valid email address.";
  }

  if (trimmedMessage.length < 10 || trimmedMessage.length > 500) {
    return "Message must be between 10 and 500 characters.";
  }

  return null;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    res.status(429).json({ error: RATE_LIMIT_MESSAGE });
    return;
  }

  const env = getServerEnv();
  if (!env) {
    res.status(500).json({ error: "Server configuration error" });
    return;
  }

  const body = parseBody(req);
  if (!body) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const validationError = validateFeedback(body);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const resend = new Resend(env.resendApiKey);
  const fromAddress = `JaviZone Feedback <feedback@${env.domain}>`;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: [env.contactEmail],
    replyTo: body.email.trim() || undefined,
    subject: "Portfolio Feedback",
    react: EmailTemplate({
      name: body.name.trim(),
      email: body.email.trim(),
      message: body.message.trim(),
    }),
  });

  if (error) {
    console.error("Resend send failed:", error);
    res.status(500).json({ error: "Failed to send email" });
    return;
  }

  res.status(200).json({ success: true });
}
