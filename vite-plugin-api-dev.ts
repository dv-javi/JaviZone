import type { Plugin } from "vite";
import { loadEnv } from "vite";
import {
  handleSendEmailRequest,
  isSendEmailFailure,
} from "./api/_lib/send-email";

function readJsonBody(req: import("http").IncomingMessage): Promise<unknown> {
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

export function apiDevPlugin(): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, "");

      Object.assign(process.env, env);

      server.middlewares.use("/api/send-email", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Allow", "POST");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed." }));
          return;
        }

        try {
          const body = await readJsonBody(req);
          const result = await handleSendEmailRequest(body);

          res.setHeader("Content-Type", "application/json");

          if (isSendEmailFailure(result)) {
            res.statusCode = result.status;
            res.end(JSON.stringify({ error: result.error }));
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, id: result.data.id }));
        } catch (error) {
          console.error("Dev API error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Internal server error." }));
        }
      });

    },
  };
}
