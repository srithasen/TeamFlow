import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({

  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {

    allowedHosts: [
      "teamflow-production-e26e.up.railway.app"
    ]

  }

});