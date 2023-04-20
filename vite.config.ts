import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Theseus: The Game",
        short_name: "Theseus",
        description: "Play as Theseus as he dates the Marathonian Bull",
        theme_color: "#ffffff",
        icons: [
          {
            src: "rendered/icon.webp",
            sizes: "512x512",
            type: "image/webp",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
