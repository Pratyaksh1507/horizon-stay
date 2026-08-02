import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path";

export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      ui: path.resolve(__dirname, "src/ui"),
      features: path.resolve(__dirname, "src/features"),
      services: path.resolve(__dirname, "src/services"),
      hooks: path.resolve(__dirname, "src/hooks"),
      utils: path.resolve(__dirname, "src/utils"),
      data: path.resolve(__dirname, "src/data"),
      components: path.resolve(__dirname, "src/components"),
      lib: path.resolve(__dirname, "src/lib"),
    },
  },
});
