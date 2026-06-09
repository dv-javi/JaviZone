import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { apiDevPlugin } from "./vite-plugin-api-dev";

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,
    port: 5173,
    allowedHosts: [".ngrok-free.dev"],
  },
});
