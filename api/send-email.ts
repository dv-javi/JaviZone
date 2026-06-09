import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  handleFeedbackRequest,
  isFeedbackFailure,
} from "./_lib/feedback.js";

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  if (Array.isArray(forwarded)) {
    return forwarded[0]?.split(",")[0]?.trim() ?? "unknown";
  }

  return req.socket?.remoteAddress ?? "unknown";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const result = await handleFeedbackRequest(req.body, getClientIp(req));

  if (isFeedbackFailure(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.status(200).json({ success: true });
}
