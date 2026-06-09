import type { IncomingMessage, ServerResponse } from "http";
import type { Plugin } from "vite";
import { loadEnv } from "vite";
import {
  handleFeedbackRequest,
  isFeedbackFailure,
} from "./api/_lib/feedback";

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: Buffer | string) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body) as unknown);
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });

    req.on("error", reject);
  });
}

function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  if (Array.isArray(forwarded)) {
    return forwarded[0]?.split(",")[0]?.trim() ?? "unknown";
  }

  return req.socket.remoteAddress ?? "unknown";
}

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export function apiDevPlugin(): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, "");
      Object.assign(process.env, env);

      server.middlewares.use("/api/send-email", async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Method not allowed" });
          return;
        }

        try {
          const body = await readJsonBody(req);
          const result = await handleFeedbackRequest(body, getClientIp(req));

          if (isFeedbackFailure(result)) {
            sendJson(res, result.status, { error: result.error });
            return;
          }

          sendJson(res, 200, { success: true });
        } catch (error) {
          console.error("[api-dev] Feedback handler error:", error);
          sendJson(res, 500, { error: "Internal server error" });
        }
      });
    },
  };
}
