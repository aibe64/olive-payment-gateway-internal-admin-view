import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Make sure this path points to your `src` directory
    },
  },
  server: {
    port: 8095,
    host: "0.0.0.0",
  },
});