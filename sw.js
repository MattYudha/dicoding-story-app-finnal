// sw.js - Enhanced Service Worker with Push Notification Support

// Import fungsi yang diperlukan dari Workbox
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// --- Lifecycle Events ---

// Service Worker akan segera aktif setelah instalasi
self.addEventListener("install", () => {
  console.log("Service Worker: Installing...");
  self.skipWaiting();
});

// Membersihkan cache lama saat Service Worker baru aktif
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(cleanupOutdatedCaches());
  self.clients.claim();
});

// --- Caching Strategies ---

// Precache semua aset statis yang didefinisikan dalam manifest Workbox
precacheAndRoute(self.__WB_MANIFEST);

// Cache API (Network First)
// Mencoba jaringan dulu, jika gagal atau lambat, gunakan cache.
registerRoute(
  ({ url }) =>
    url.origin === "https://story-api.dicoding.dev" ||
    url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "api-cache",
    networkTimeoutSeconds: 5, // Waktu tunggu sebelum beralih ke cache
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 3, // 3 Hari
      }),
    ],
  })
);

// Cache Gambar (Cache First)
// Gunakan cache dulu, jika tidak ada baru ambil dari jaringan.
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Hari
      }),
    ],
  })
);

// Cache Google Fonts
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({ cacheName: "google-fonts-stylesheets" })
);

registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Tahun
      }),
    ],
  })
);

// --- Push Notification Handling ---

// Event handler saat menerima push notification
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push Event Received.");

  let title = "Story App";
  let options = {
    body: "You have a new notification!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-96x96.png",
    tag: "story-notification",
    data: { url: "/#/stories" },
  };

  // Cek jika ada data payload dari server
  if (event.data) {
    try {
      const pushData = event.data.json();
      console.log("Push data:", pushData);

      title = pushData.title || title;
      options.body = pushData.body || options.body;
      if (pushData.data) {
        options.data = pushData.data;
      }
    } catch (error) {
      console.error("Failed to parse push data:", error);
      // Jika parsing gagal, kita tetap tampilkan notifikasi default
    }
  }

  // Menampilkan notifikasi
  event.waitUntil(self.registration.showNotification(title, options));
});

// Event handler saat notifikasi di-klik
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification Clicked.");

  const notification = event.notification;
  const targetUrl = notification.data.url || "/";

  // Tutup notifikasi
  notification.close();

  // Buka window atau tab baru ke URL target
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Jika ada window yang sudah terbuka, fokus ke sana
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        // Jika tidak, buka window baru
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

// --- Background Sync (jika diperlukan) ---
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync-story") {
    console.log("Service Worker: Background sync event triggered.");
    // event.waitUntil(handleBackgroundSync());
  }
});
