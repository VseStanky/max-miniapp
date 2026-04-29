import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const port = Number(process.env.PORT || 4173);
const basePath = process.env.BASE_PATH || "/max-miniapp/";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: basePath,
  server: {
    host: "0.0.0.0",
    port,
  },
  preview: {
    host: "0.0.0.0",
    port,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});