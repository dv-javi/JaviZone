import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  handleSendEmailRequest,
  isSendEmailFailure,
  parseJsonRequestBody,
} from "./_lib/send-email";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const parsedBody = parseJsonRequestBody(req.body);

    if (parsedBody === null) {
      return res.status(400).json({ error: "Invalid JSON body." });
    }

    const result = await handleSendEmailRequest(parsedBody);

    if (isSendEmailFailure(result)) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(200).json({ success: true, id: result.data.id });
  } catch (error) {
    console.error("send-email handler error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
