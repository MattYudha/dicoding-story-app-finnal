// vite.config.js - Fixed configuration for PWA and Service Worker
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: "src",
  server: {
    port: 3000,
    host: true, // Memungkinkan akses dari network

    // =======================================================
    // PENYESUAIAN UTAMA: Menambahkan konfigurasi proxy
    // =======================================================
    proxy: {
      // Semua permintaan yang dimulai dengan '/api' akan diteruskan
      "/api": {
        target: "https://story-api.dicoding.dev", // Server tujuan
        changeOrigin: true, // Diperlukan untuk virtual hosting
        // Menulis ulang path: '/api/v1/stories' menjadi '/v1/stories'
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    // =======================================================
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
      registerType: "prompt",
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2}",
        ],
        // runtimeCaching untuk API tidak lagi diperlukan saat development karena sudah ditangani proxy,
        // namun tetap berguna untuk mode offline saat production.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 3, // 3 hari
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              },
            },
          },
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
              },
            },
          },
        ],
      },
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
        // ... sisa manifest Anda
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
