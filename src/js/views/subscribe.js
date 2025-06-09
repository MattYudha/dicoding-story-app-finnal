// src/js/views/subscribe.js
import { createElement } from "../utils/dom.js";
import { getToken } from "../utils/auth.js";
import { subscribePushNotification, requestNotificationPermission } from "../notification.js";

export default class SubscribeView {
  constructor() {
    this.isSubscribed = false;
    this.subscription = null;
  }

  async init() {
    const token = getToken();
    if (!token) {
      this.showMessage("Please login first!");
      window.location.hash = "#/login";
      return;
    }

    const content = createElement("div", { class: "subscribe-container" });
    content.innerHTML = `
      <div class="subscribe-header">
        <h2>Push Notifications</h2>
        <p>Stay updated with the latest stories from our community</p>
      </div>
      
      <div class="notification-info">
        <div class="info-card">
          <div class="info-icon">🔔</div>
          <div class="info-content">
            <h3>Why Enable Notifications?</h3>
            <ul>
              <li>Get notified when new stories are shared</li>
              <li>Never miss interesting content from the community</li>
              <li>Receive updates even when the app is closed</li>
              <li>Stay connected with your favorite storytellers</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="subscription-status-card">
        <div class="status-header">
          <h3>Notification Status</h3>
          <div id="status-indicator" class="status-indicator">
            <span class="status-dot"></span>
            <span id="status-text">Checking...</span>
          </div>
        </div>
        
        <div class="status-details">
          <div class="detail-item">
            <span class="detail-label">Browser Support:</span>
            <span id="browser-support" class="detail-value">Checking...</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Permission Status:</span>
            <span id="permission-status" class="detail-value">Checking...</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Subscription Status:</span>
            <span id="subscription-status" class="detail-value">Checking...</span>
          </div>
        </div>
      </div>

      <div class="subscription-actions">
        <button id="subscribe-btn" class="btn btn-primary" style="display: none;">
          <span class="btn-icon">🔔</span>
          Enable Notifications
        </button>
        <button id="unsubscribe-btn" class="btn btn-danger" style="display: none;">
          <span class="btn-icon">🔕</span>
          Disable Notifications
        </button>
        <button id="test-notification-btn" class="btn btn-outline" style="display: none;">
          <span class="btn-icon">🧪</span>
          Test Notification
        </button>
      </div>

      <div class="help-section">
        <h3>Troubleshooting</h3>
        <div class="help-content">
          <details>
            <summary>Notifications not working?</summary>
            <div class="help-text">
              <p>If notifications aren't working, try these steps:</p>
              <ol>
                <li>Make sure notifications are enabled in your browser settings</li>
                <li>Check that the website has permission to send notifications</li>
                <li>Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Try refreshing the page and subscribing again</li>
              </ol>
            </div>
          </details>
          
          <details>
            <summary>How to manage notifications</summary>
            <div class="help-text">
              <p>You can control notifications in several ways:</p>
              <ul>
                <li>Use the buttons above to enable/disable notifications</li>
                <li>Manage notification settings in your browser</li>
                <li>Block notifications from specific websites in browser settings</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    await this.initializeSubscription(token);
  }

  async initializeSubscription(token) {
    // Check browser support
    this.checkBrowserSupport();
    
    // Check permission status
    await this.checkPermissionStatus();
    
    // Check subscription status
    await this.checkSubscriptionStatus();
    
    // Setup event listeners
    this.setupEventListeners(token);
    
    // Update UI
    this.updateUI();
  }

  checkBrowserSupport() {
    const browserSupportEl = document.getElementById("browser-support");
    
    if ("serviceWorker" in navigator && "PushManager" in window) {
      browserSupportEl.textContent = "✅ Supported";
      browserSupportEl.className = "detail-value success";
    } else {
      browserSupportEl.textContent = "❌ Not Supported";
      browserSupportEl.className = "detail-value error";
    }
  }

  async checkPermissionStatus() {
    const permissionStatusEl = document.getElementById("permission-status");
    
    if ("Notification" in window) {
      const permission = Notification.permission;
      switch (permission) {
        case "granted":
          permissionStatusEl.textContent = "✅ Granted";
          permissionStatusEl.className = "detail-value success";
          break;
        case "denied":
          permissionStatusEl.textContent = "❌ Denied";
          permissionStatusEl.className = "detail-value error";
          break;
        default:
          permissionStatusEl.textContent = "⏳ Not Requested";
          permissionStatusEl.className = "detail-value warning";
      }
    } else {
      permissionStatusEl.textContent = "❌ Not Available";
      permissionStatusEl.className = "detail-value error";
    }
  }

  async checkSubscriptionStatus() {
    const subscriptionStatusEl = document.getElementById("subscription-status");
    
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        this.subscription = await registration.pushManager.getSubscription();
        
        if (this.subscription) {
          this.isSubscribed = true;
          subscriptionStatusEl.textContent = "✅ Active";
          subscriptionStatusEl.className = "detail-value success";
        } else {
          this.isSubscribed = false;
          subscriptionStatusEl.textContent = "❌ Not Subscribed";
          subscriptionStatusEl.className = "detail-value error";
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
        subscriptionStatusEl.textContent = "❌ Error";
        subscriptionStatusEl.className = "detail-value error";
      }
    } else {
      subscriptionStatusEl.textContent = "❌ Not Available";
      subscriptionStatusEl.className = "detail-value error";
    }
  }

  setupEventListeners(token) {
    const subscribeBtn = document.getElementById("subscribe-btn");
    const unsubscribeBtn = document.getElementById("unsubscribe-btn");
    const testBtn = document.getElementById("test-notification-btn");

    subscribeBtn.addEventListener("click", async () => {
      await this.handleSubscribe(token);
    });

    unsubscribeBtn.addEventListener("click", async () => {
      await this.handleUnsubscribe();
    });

    testBtn.addEventListener("click", () => {
      this.testNotification();
    });
  }

  async handleSubscribe(token) {
    const subscribeBtn = document.getElementById("subscribe-btn");
    const originalText = subscribeBtn.innerHTML;
    
    subscribeBtn.innerHTML = '<span class="spinner-small"></span> Subscribing...';
    subscribeBtn.disabled = true;

    try {
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        this.showMessage("Notification permission is required to subscribe.");
        return;
      }

      await subscribePushNotification(token);
      this.isSubscribed = true;
      await this.checkSubscriptionStatus();
      this.updateUI();
      this.showMessage("Successfully subscribed to notifications!");
    } catch (error) {
      console.error("Subscription error:", error);
      this.showMessage(`Failed to subscribe: ${error.message}`);
    } finally {
      subscribeBtn.innerHTML = originalText;
      subscribeBtn.disabled = false;
    }
  }

  async handleUnsubscribe() {
    const unsubscribeBtn = document.getElementById("unsubscribe-btn");
    const originalText = unsubscribeBtn.innerHTML;
    
    unsubscribeBtn.innerHTML = '<span class="spinner-small"></span> Unsubscribing...';
    unsubscribeBtn.disabled = true;

    try {
      if (this.subscription) {
        await this.subscription.unsubscribe();
        this.isSubscribed = false;
        this.subscription = null;
        await this.checkSubscriptionStatus();
        this.updateUI();
        this.showMessage("Successfully unsubscribed from notifications!");
      }
    } catch (error) {
      console.error("Unsubscription error:", error);
      this.showMessage(`Failed to unsubscribe: ${error.message}`);
    } finally {
      unsubscribeBtn.innerHTML = originalText;
      unsubscribeBtn.disabled = false;
    }
  }

  testNotification() {
    if (Notification.permission === "granted") {
      new Notification("Test Notification", {
        body: "This is a test notification from StoryApp!",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-96x96.png"
      });
    } else {
      this.showMessage("Notifications are not enabled. Please enable them first.");
    }
  }

  updateUI() {
    const statusIndicator = document.getElementById("status-indicator");
    const statusText = document.getElementById("status-text");
    const subscribeBtn = document.getElementById("subscribe-btn");
    const unsubscribeBtn = document.getElementById("unsubscribe-btn");
    const testBtn = document.getElementById("test-notification-btn");

    const canSubscribe = "serviceWorker" in navigator && 
                        "PushManager" in window && 
                        Notification.permission !== "denied";

    if (this.isSubscribed) {
      statusIndicator.className = "status-indicator active";
      statusText.textContent = "Active";
      subscribeBtn.style.display = "none";
      unsubscribeBtn.style.display = "inline-flex";
      testBtn.style.display = "inline-flex";
    } else if (canSubscribe) {
      statusIndicator.className = "status-indicator inactive";
      statusText.textContent = "Not Subscribed";
      subscribeBtn.style.display = "inline-flex";
      unsubscribeBtn.style.display = "none";
      testBtn.style.display = "none";
    } else {
      statusIndicator.className = "status-indicator error";
      statusText.textContent = "Not Available";
      subscribeBtn.style.display = "none";
      unsubscribeBtn.style.display = "none";
      testBtn.style.display = "none";
    }
  }

  showMessage(message) {
    // Create a toast notification
    const toast = createElement("div", { class: "toast-notification" });
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 4000);
  }
}