// vite.config.js
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: "src",
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: "https://story-api.dicoding.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "../dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["leaflet", "idb"],
          workbox: ["workbox-window"],
        },
      },
    },
  },
  publicDir: "../public",
  plugins: [
    VitePWA({
      // =======================================================
      // PERBAIKAN UTAMA: Menggunakan strategi 'injectManifest'
      // untuk mengatasi error build di Netlify.
      // =======================================================
      strategies: "injectManifest",
      srcDir: ".", // Lokasi file sw.js Anda (relatif terhadap 'root')
      filename: "sw.js", // Nama file service worker custom Anda
      // =======================================================

      // Konfigurasi Anda yang lain dipertahankan
      registerType: "prompt",
      manifest: {
        name: "Dicoding Story App",
        short_name: "StoryApp",
        description: "Share your stories with photos and locations",
        theme_color: "#4361ee",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        icons: [
          { src: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
          { src: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Add New Story",
            short_name: "Add Story",
            description: "Create a new story with photos and location",
            url: "/#/add-story",
            icons: [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
          },
          {
            name: "View Stories",
            short_name: "Stories",
            description: "Browse all shared stories",
            url: "/#/stories",
            icons: [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  optimizeDeps: {
    include: ["leaflet", "idb", "workbox-window"],
  },
});
