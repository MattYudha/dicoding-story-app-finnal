// src/js/notification.js - Enhanced Notification Management
import { VAPID_PUBLIC_KEY } from "./constants.js";
import { subscribeNotifications, unsubscribeFromNotifications } from "./api.js";

// Convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Request notification permission
export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    console.warn("Notification permission denied");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
}

// Check if push notifications are supported
export function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

// Get current push subscription
export async function getCurrentPushSubscription() {
  if (!isPushNotificationSupported()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error("Error getting push subscription:", error);
    return null;
  }
}

// Check if currently subscribed
export async function isCurrentPushSubscriptionAvailable() {
  const subscription = await getCurrentPushSubscription();
  return subscription !== null;
}

// Subscribe to push notifications
export async function subscribePushNotification(token) {
  if (!isPushNotificationSupported()) {
    throw new Error("Push notifications are not supported in this browser");
  }

  // Request permission first
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    throw new Error("Notification permission not granted");
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // Create new subscription
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    // Send subscription to server
    try {
      await subscribeNotifications(subscription, token);
      console.log("Successfully subscribed to push notifications");
      return subscription;
    } catch (serverError) {
      // Rollback: unsubscribe from client if server registration fails
      console.error("Server subscription failed, rolling back:", serverError);
      await subscription.unsubscribe();
      throw new Error(`Failed to register subscription with server: ${serverError.message}`);
    }
  } catch (error) {
    console.error("Error subscribing to push notifications:", error);
    throw error;
  }
}

// Unsubscribe from push notifications
export async function unsubscribePushNotification(token) {
  if (!isPushNotificationSupported()) {
    throw new Error("Push notifications are not supported in this browser");
  }

  try {
    const subscription = await getCurrentPushSubscription();
    
    if (!subscription) {
      console.log("No active subscription found");
      return true;
    }

    // Unsubscribe from server first
    try {
      await unsubscribeFromNotifications(subscription.endpoint, token);
    } catch (serverError) {
      console.warn("Server unsubscription failed:", serverError);
      // Continue with client unsubscription even if server fails
    }

    // Unsubscribe from client
    const success = await subscription.unsubscribe();
    console.log("Successfully unsubscribed from push notifications");
    return success;
  } catch (error) {
    console.error("Error unsubscribing from push notifications:", error);
    throw error;
  }
}

// Show local notification (for immediate feedback)
export async function showStoryNotification(title, body, data = {}) {
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications");
    return;
  }

  if (Notification.permission !== "granted") {
    console.warn("Notification permission not granted");
    return;
  }

  try {
    // Use Service Worker to show notification if available
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body: body,
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-96x96.png",
        tag: "story-notification",
        data: data,
        requireInteraction: false,
        vibrate: [200, 100, 200],
        actions: [
          {
            action: "view",
            title: "View Stories"
          }
        ]
      });
    } else {
      // Fallback to regular notification
      new Notification(title, {
        body: body,
        icon: "/icons/icon-192x192.png",
        tag: "story-notification"
      });
    }
  } catch (error) {
    console.error("Error showing notification:", error);
  }
}

// Get notification subscription status for UI
export async function getNotificationStatus() {
  const isSupported = isPushNotificationSupported();
  const permission = "Notification" in window ? Notification.permission : "unsupported";
  const isSubscribed = await isCurrentPushSubscriptionAvailable();
  
  return {
    isSupported,
    permission,
    isSubscribed,
    canSubscribe: isSupported && permission !== "denied"
  };
}

// Initialize notification system
export async function initializeNotifications() {
  if (!isPushNotificationSupported()) {
    console.warn("Push notifications not supported");
    return false;
  }

  try {
    // Register service worker if not already registered
    if (!navigator.serviceWorker.controller) {
      await navigator.serviceWorker.register("/sw.js");
    }

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;
    console.log("Notification system initialized");
    return true;
  } catch (error) {
    console.error("Error initializing notifications:", error);
    return false;
  }
}

// Legacy function name for backward compatibility
export const subscribeUser = subscribePushNotification;