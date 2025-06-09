// src/js/main.js - Enhanced main entry point with all improvements
import { initRouter } from "./router.js";
import { initDB } from "./db.js";
import { Workbox } from "workbox-window";
import {
  getNotificationStatus,
  subscribePushNotification,
  unsubscribePushNotification,
} from "./notification.js";
import { getToken } from "./utils/auth.js";
import { PerformanceMonitor } from "./utils/performance.js";
import { ErrorHandler } from "./utils/error-handler.js";
import { analytics } from "./utils/analytics.js";
import { accessibilityManager } from "./utils/accessibility.js";

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();
const errorHandler = new ErrorHandler();

async function init() {
  const pageLoadMetric = performanceMonitor.measurePageLoad("app-init");

  try {
    // Initialize core systems
    await initDB();
    initRouter();

    // Setup PWA features
    setupInstallPrompt();
    setupNotificationUI();

    // Initialize performance optimizations
    performanceMonitor.preloadCriticalResources();
    performanceMonitor.lazyLoadImages();
    performanceMonitor.monitorWebVitals();

    // Setup Service Worker
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");

      wb.addEventListener("installed", (event) => {
        if (event.isUpdate) {
          showUpdateNotification(wb);
        }
        analytics.trackEvent("sw_installed", { isUpdate: event.isUpdate });
      });

      wb.addEventListener("waiting", (event) => {
        showUpdateNotification(wb);
        analytics.trackEvent("sw_waiting");
      });

      wb.addEventListener("controlling", (event) => {
        window.location.reload();
        analytics.trackEvent("sw_controlling");
      });

      wb.register();
    }

    // Track successful initialization
    analytics.trackEvent("app_initialized");
  } catch (error) {
    errorHandler.logError({
      type: "initialization",
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  } finally {
    pageLoadMetric.end();
  }
}

function setupInstallPrompt() {
  let deferredPrompt;
  const installBtn = document.getElementById("install-app-btn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
      installBtn.style.display = "flex";
    }

    analytics.trackEvent("install_prompt_available");
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;

        analytics.trackEvent("install_prompt_result", {
          outcome: result.outcome,
        });

        if (result.outcome === "accepted") {
          installBtn.style.display = "none";
        }
        deferredPrompt = null;
      }
    });
  }

  // Hide install button if app is already installed
  if (window.matchMedia("(display-mode: standalone)").matches) {
    if (installBtn) {
      installBtn.style.display = "none";
    }
    analytics.trackEvent("app_running_standalone");
  }
}

function setupNotificationUI() {
  const header = document.querySelector("header nav ul");
  if (!header) return;

  // Create notification button container
  const notificationContainer = document.createElement("li");
  notificationContainer.id = "notification-container";
  notificationContainer.style.display = "none";

  const notificationBtn = document.createElement("button");
  notificationBtn.id = "notification-btn";
  notificationBtn.className = "notification-btn";
  notificationBtn.innerHTML =
    '<span class="btn-icon">🔔</span><span class="btn-text">Notifications</span>';
  notificationBtn.setAttribute("aria-label", "Toggle push notifications");

  notificationContainer.appendChild(notificationBtn);

  // Insert before install button
  const installBtn = document.getElementById("install-app-btn");
  if (installBtn && installBtn.parentElement) {
    header.insertBefore(notificationContainer, installBtn.parentElement);
  } else {
    header.appendChild(notificationContainer);
  }

  // Setup notification button click handler
  notificationBtn.addEventListener("click", handleNotificationToggle);

  // Update notification UI based on current status
  updateNotificationUI();
}

async function handleNotificationToggle() {
  const token = getToken();
  if (!token) {
    showToast("Please login first to enable notifications", "warning");
    window.location.hash = "#/login";
    return;
  }

  const notificationBtn = document.getElementById("notification-btn");
  if (!notificationBtn) return;

  try {
    notificationBtn.innerHTML =
      '<span class="spinner-small"></span> Processing...';
    notificationBtn.disabled = true;

    const status = await getNotificationStatus();

    if (status.isSubscribed) {
      // Unsubscribe
      await unsubscribePushNotification(token);
      showToast("Notifications disabled successfully", "success");
      analytics.trackEvent("notifications_disabled");
    } else {
      // Subscribe
      await subscribePushNotification(token);
      showToast("Notifications enabled successfully", "success");
      analytics.trackEvent("notifications_enabled");
    }
  } catch (error) {
    console.error("Error toggling notifications:", error);
    showToast(`Error: ${error.message}`, "error");
    analytics.trackEvent("notification_toggle_error", {
      error: error.message,
    });
  } finally {
    // Cukup panggil updateNotificationUI untuk mengembalikan status tombol ke kondisi yang benar
    // (termasuk menonaktifkannya jika perlu).
    await updateNotificationUI();
  }
}

async function updateNotificationUI() {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notificationBtn = document.getElementById("notification-btn");

  if (!notificationContainer || !notificationBtn) return;

  try {
    const status = await getNotificationStatus();
    const token = getToken();

    // Show notification button only if user is logged in and notifications are supported
    if (token && status.isSupported) {
      notificationContainer.style.display = "block";
      notificationBtn.disabled = false;

      if (status.isSubscribed) {
        notificationBtn.innerHTML =
          '<span class="btn-icon">🔕</span><span class="btn-text">Disable</span>';
        notificationBtn.className = "notification-btn subscribed";
        notificationBtn.setAttribute(
          "aria-label",
          "Disable push notifications"
        );
      } else if (status.permission !== "denied") {
        notificationBtn.innerHTML =
          '<span class="btn-icon">🔔</span><span class="btn-text">Enable</span>';
        notificationBtn.className = "notification-btn unsubscribed";
        notificationBtn.setAttribute("aria-label", "Enable push notifications");
      } else {
        notificationBtn.innerHTML =
          '<span class="btn-icon">🚫</span><span class="btn-text">Blocked</span>';
        notificationBtn.className = "notification-btn blocked";
        notificationBtn.setAttribute(
          "aria-label",
          "Notifications blocked in browser settings"
        );
        notificationBtn.disabled = true;
      }
    } else {
      notificationContainer.style.display = "none";
    }
  } catch (error) {
    console.error("Error updating notification UI:", error);
    notificationContainer.style.display = "none";
  }
}

function showUpdateNotification(wb) {
  const updateBanner = document.createElement("div");
  updateBanner.className = "update-banner";
  updateBanner.setAttribute("role", "alert");
  updateBanner.setAttribute("aria-live", "assertive");
  updateBanner.innerHTML = `
    <div class="update-content">
      <span>🔄 App update available!</span>
      <button id="update-btn" class="btn btn-primary" aria-label="Update app now">Update Now</button>
      <button id="dismiss-update" class="btn btn-outline" aria-label="Update later">Later</button>
    </div>
  `;

  document.body.appendChild(updateBanner);

  document.getElementById("update-btn").addEventListener("click", () => {
    wb.messageSkipWaiting();
    updateBanner.remove();
    analytics.trackEvent("app_update_accepted");
  });

  document.getElementById("dismiss-update").addEventListener("click", () => {
    updateBanner.remove();
    analytics.trackEvent("app_update_dismissed");
  });
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast-notification ${type}`;
  toast.textContent = message;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Update notification UI when auth state changes
window.addEventListener("hashchange", () => {
  setTimeout(updateNotificationUI, 100);
  analytics.trackPageView(window.location.hash);
});

// Listen for storage changes (login/logout in other tabs)
window.addEventListener("storage", (e) => {
  if (e.key === "token") {
    setTimeout(updateNotificationUI, 100);
    analytics.trackEvent("auth_state_changed", {
      source: "storage_event",
    });
  }
});

// Listen for online/offline events
window.addEventListener("online", () => {
  showToast("Connection restored", "success");
  analytics.trackEvent("connection_restored");
});

window.addEventListener("offline", () => {
  showToast("You are offline. Some features may be limited.", "warning");
  analytics.trackEvent("connection_lost");
});

// Performance monitoring
window.addEventListener("load", () => {
  // Measure and report performance metrics
  setTimeout(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    if (navigation) {
      analytics.trackPerformance(
        "page_load_time",
        navigation.loadEventEnd - navigation.loadEventStart
      );
      analytics.trackPerformance(
        "dom_content_loaded",
        navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart
      );
    }
  }, 0);
});

// Initialize the app
init();
