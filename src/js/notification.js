// src/js/notification.js - Enhanced Notification Management

import { VAPID_PUBLIC_KEY } from "./constants.js";
import { subscribeNotifications, unsubscribeFromNotifications } from "./api.js";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.warn("Browser ini tidak mendukung notifikasi.");
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Izin notifikasi tidak diberikan oleh pengguna.");
    return false;
  }
  return true;
}

export async function getNotificationStatus() {
  const isSupported = isPushNotificationSupported();
  if (!isSupported) {
    return { isSupported: false, permission: "denied", isSubscribed: false };
  }

  const permission = Notification.permission;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  return {
    isSupported,
    permission,
    isSubscribed: !!subscription,
  };
}

export async function subscribePushNotification(token) {
  if (!isPushNotificationSupported()) {
    throw new Error("Push notification tidak didukung di browser ini.");
  }

  if (Notification.permission === "denied") {
    throw new Error(
      "Izin notifikasi telah ditolak. Ubah di pengaturan browser."
    );
  }

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
      throw new Error("Izin notifikasi tidak diberikan.");
    }

    const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
  }

  // Kirim subscription ke server.
  try {
    // =======================================================
    // PERBAIKAN DI SINI: Tambahkan .toJSON()
    // =======================================================
    await subscribeNotifications(subscription.toJSON(), token);
    console.log("Berhasil berlangganan push notification.");
    return subscription;
  } catch (serverError) {
    console.error(
      "Gagal mendaftar ke server, membatalkan subscription...",
      serverError
    );
    await subscription.unsubscribe();
    throw new Error(
      `Gagal mendaftarkan subscription ke server: ${serverError.message}`
    );
  }
}

export async function unsubscribePushNotification(token) {
  if (!isPushNotificationSupported()) {
    console.warn("Push notification tidak didukung.");
    return false;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    console.log("Tidak ada subscription aktif untuk dihentikan.");
    return true;
  }

  const unsubscribedSuccessfully = await subscription.unsubscribe();
  if (!unsubscribedSuccessfully) {
    console.error("Gagal berhenti berlangganan di sisi client.");
    return false;
  }

  try {
    await unsubscribeFromNotifications(subscription.endpoint, token);
    console.log("Berhasil berhenti berlangganan sepenuhnya.");
  } catch (serverError) {
    console.warn(
      "Berhasil berhenti di client, tapi gagal memberitahu server.",
      serverError
    );
  }

  return true;
}

export async function showStoryNotification(title, body, data = {}) {
  if (Notification.permission !== "granted") {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      body,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-96x96.png",
      tag: "story-notification",
      vibrate: [200, 100, 200],
      data,
    });
  } catch (error) {
    console.error("Gagal menampilkan notifikasi:", error);
  }
}
