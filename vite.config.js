import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      ui: path.resolve(__dirname, "src/ui"),
      features: path.resolve(__dirname, "src/features"),
      services: path.resolve(__dirname, "src/services"),
      hooks: path.resolve(__dirname, "src/hooks"),
      utils: path.resolve(__dirname, "src/utils"),
      data: path.resolve(__dirname, "src/data"),
    },
  },
});
