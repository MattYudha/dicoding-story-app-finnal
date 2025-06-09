// src/js/constants.js

// Secara otomatis memilih URL berdasarkan lingkungan (development vs production)
const API_URL_PROD = "https://story-api.dicoding.dev/v1";
const API_URL_DEV = "/api/v1"; // URL untuk proxy saat development

// import.meta.env.DEV adalah variabel khusus dari Vite.
// Nilainya 'true' saat menjalankan 'npm run dev', dan 'false' saat 'npm run build'.
export const BASE_URL = import.meta.env.DEV ? API_URL_DEV : API_URL_PROD;

// Mengambil VAPID key dari environment variable
export const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

console.log(`Current API Base URL: ${BASE_URL}`); // Untuk membantu debugging
