import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname as pathDirname } from "path";

// Define __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);

// Vite configuration
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
