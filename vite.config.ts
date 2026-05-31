import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      filename: "stats.html",
    }),
  ],
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
