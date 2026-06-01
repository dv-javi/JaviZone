import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleSendEmailRequest } from "./_lib/send-email";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<VercelResponse | void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const result = await handleSendEmailRequest(req.body);

    if (!result.ok) {
      const status = "status" in result ? result.status : 500;

      return res.status(status).json({
        error: result.error,
      });
    }

    res.status(200).json({ success: true, id: result.data.id });
  } catch (error) {
    console.error("send-email handler error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
