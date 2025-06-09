// src/js/views/landing.js
import { createElement } from "../utils/dom.js";
import { getToken } from "../utils/auth.js";

export default class LandingView {
  constructor() {
    this.installPrompt = null;
  }

  async init() {
    const token = getToken();
    
    const content = createElement("div", { 
      class: "landing-container",
      role: "main"
    });
    
    content.innerHTML = `
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Share Your Stories</h1>
          <p class="hero-subtitle">Capture and share your special moments with the Dicoding community</p>
          <div class="hero-actions">
            <a href="#/add-story" class="btn btn-primary">Create New Story</a>
            <a href="#/stories" class="btn btn-secondary">Browse Stories</a>
          </div>
        </div>
        <div class="hero-image">
          <div class="story-preview">
            <div class="story-card">
              <div class="story-placeholder"></div>
              <h3>Your Story Here</h3>
              <p>Share your amazing experiences</p>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Why Choose StoryApp?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📸</div>
              <h3>Photo Stories</h3>
              <p>Capture moments with your camera and share them instantly</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🗺️</div>
              <h3>Location Sharing</h3>
              <p>Add location data to your stories and explore places</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">❤️</div>
              <h3>Save Favorites</h3>
              <p>Keep your favorite stories for offline reading</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔔</div>
              <h3>Push Notifications</h3>
              <p>Get notified when new stories are shared</p>
            </div>
          </div>
        </div>
      </section>

      <section class="install-section">
        <div class="install-card">
          <div class="install-content">
            <h3>Install StoryApp for a better experience!</h3>
            <p>Get the full app experience with offline access and push notifications</p>
            <div class="install-actions">
              <button id="install-btn" class="btn btn-install">Install</button>
              <button id="not-now-btn" class="btn btn-outline">Not Now</button>
            </div>
          </div>
          <div class="install-icon">📱</div>
        </div>
      </section>

      ${token ? `
        <section class="featured-stories-section">
          <div class="container">
            <h2 class="section-title">Featured Stories</h2>
            <div id="featured-stories" class="stories-preview"></div>
            <div class="view-all-container">
              <a href="#/stories" class="btn btn-outline">View All Stories</a>
            </div>
          </div>
        </section>
      ` : ''}
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    this.setupInstallPrompt();
    
    if (token) {
      await this.loadFeaturedStories();
    }
  }

  setupInstallPrompt() {
    const installBtn = document.getElementById("install-btn");
    const notNowBtn = document.getElementById("not-now-btn");
    const installSection = document.querySelector(".install-section");

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e;
      installSection.style.display = 'block';
    });

    installBtn.addEventListener("click", async () => {
      if (this.installPrompt) {
        this.installPrompt.prompt();
        const result = await this.installPrompt.userChoice;
        if (result.outcome === 'accepted') {
          installSection.style.display = 'none';
        }
        this.installPrompt = null;
      } else {
        // Fallback for browsers that don't support PWA installation
        this.showMessage("To install this app, use your browser's 'Add to Home Screen' option in the menu.");
      }
    });

    notNowBtn.addEventListener("click", () => {
      installSection.style.display = 'none';
    });

    // Hide install section if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      installSection.style.display = 'none';
    }
  }

  async loadFeaturedStories() {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch('https://story-api.dicoding.dev/v1/stories?page=1&size=3&location=1', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.listStory && data.listStory.length > 0) {
        this.displayFeaturedStories(data.listStory);
      }
    } catch (error) {
      console.error('Error loading featured stories:', error);
    }
  }

  displayFeaturedStories(stories) {
    const container = document.getElementById("featured-stories");
    if (!container) return;

    container.innerHTML = stories.map(story => `
      <div class="featured-story-card">
        <div class="story-image-container">
          <img src="${story.photoUrl}" alt="${story.description.substring(0, 50)}..." loading="lazy">
        </div>
        <div class="story-content">
          <h3>${story.name}</h3>
          <p class="story-date">${new Date(story.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
          <p class="story-description">${story.description.substring(0, 100)}...</p>
          <a href="#/detail/${story.id}" class="view-details-btn">View Details</a>
        </div>
      </div>
    `).join('');
  }

  showMessage(message) {
    alert(message);
  }
}