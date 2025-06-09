// src/js/views/detail.js
import DetailPresenter from "../presenters/detail-presenter.js";
import { createElement } from "../utils/dom.js";
import { getToken } from "../utils/auth.js";
import { saveStories } from "../db.js";

export default class DetailView {
  constructor() {
    this.presenter = new DetailPresenter(this);
  }

  async init({ id }) {
    const token = getToken();
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    const content = createElement("div", { class: "detail-container" });
    content.innerHTML = `
      <div class="detail-header">
        <button id="back-btn" class="btn btn-outline">
          <span class="btn-icon">←</span>
          Back to Stories
        </button>
        <div class="detail-actions">
          <button id="save-favorite" class="btn btn-outline">
            <span class="btn-icon">❤️</span>
            Save to Favorites
          </button>
          <button id="share-story" class="btn btn-outline">
            <span class="btn-icon">📤</span>
            Share
          </button>
        </div>
      </div>
      
      <div id="story-detail" class="story-detail-content">
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading story...</p>
        </div>
      </div>
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    this.setupEventListeners();

    try {
      const story = await this.presenter.getStoryDetail(id, token);
      this.displayStory(story);
    } catch (error) {
      this.showError(error.message);
    }
  }

  setupEventListeners() {
    const backBtn = document.getElementById("back-btn");
    const saveFavoriteBtn = document.getElementById("save-favorite");
    const shareBtn = document.getElementById("share-story");

    backBtn.addEventListener("click", () => {
      window.history.back();
    });

    saveFavoriteBtn.addEventListener("click", () => {
      if (this.currentStory) {
        this.saveFavorite(this.currentStory);
      }
    });

    shareBtn.addEventListener("click", () => {
      if (this.currentStory) {
        this.shareStory(this.currentStory);
      }
    });
  }

  displayStory(story) {
    this.currentStory = story;
    const storyDetail = document.getElementById("story-detail");
    
    storyDetail.innerHTML = `
      <article class="story-article">
        <header class="story-header">
          <div class="author-section">
            <div class="author-avatar">
              ${story.name.charAt(0).toUpperCase()}
            </div>
            <div class="author-info">
              <h1 class="story-author">${story.name}</h1>
              <time class="story-date" datetime="${story.createdAt}">
                ${new Date(story.createdAt).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
          </div>
        </header>

        <div class="story-content">
          <div class="story-image-container">
            <img 
              src="${story.photoUrl}" 
              alt="Story photo by ${story.name}" 
              class="story-image"
              loading="lazy"
            >
          </div>
          
          <div class="story-text">
            <p class="story-description">${story.description}</p>
          </div>

          ${story.lat && story.lon ? `
            <div class="story-location-section">
              <h3 class="location-title">
                <span class="location-icon">📍</span>
                Story Location
              </h3>
              <div class="location-coordinates">
                <span class="coordinate">
                  <strong>Latitude:</strong> ${story.lat.toFixed(6)}
                </span>
                <span class="coordinate">
                  <strong>Longitude:</strong> ${story.lon.toFixed(6)}
                </span>
              </div>
              <div id="map-detail" class="story-map-detail"></div>
            </div>
          ` : ''}
        </div>

        <footer class="story-footer">
          <div class="story-stats">
            <span class="stat-item">
              <span class="stat-icon">👁️</span>
              <span class="stat-text">Story viewed</span>
            </span>
          </div>
        </footer>
      </article>
    `;

    if (story.lat && story.lon) {
      setTimeout(() => {
        this.presenter.initMap("map-detail", story.lat, story.lon, story.name);
      }, 100);
    }
  }

  async saveFavorite(story) {
    try {
      await saveStories([story]);
      this.showMessage("Story saved to favorites!");
      
      // Update button state
      const saveBtn = document.getElementById("save-favorite");
      saveBtn.innerHTML = '<span class="btn-icon">✅</span> Saved';
      saveBtn.disabled = true;
      setTimeout(() => {
        saveBtn.innerHTML = '<span class="btn-icon">❤️</span> Save to Favorites';
        saveBtn.disabled = false;
      }, 2000);
    } catch (error) {
      this.showMessage(`Failed to save story: ${error.message}`);
    }
  }

  shareStory(story) {
    if (navigator.share) {
      navigator.share({
        title: `Story by ${story.name}`,
        text: story.description,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        this.showMessage("Story link copied to clipboard!");
      }).catch(() => {
        this.showMessage("Unable to share story. Please copy the URL manually.");
      });
    }
  }

  showError(message) {
    const storyDetail = document.getElementById("story-detail");
    storyDetail.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Unable to Load Story</h3>
        <p>${message}</p>
        <button id="retry-btn" class="btn btn-primary">Try Again</button>
        <a href="#/stories" class="btn btn-outline">Back to Stories</a>
      </div>
    `;

    document.getElementById("retry-btn").addEventListener("click", () => {
      window.location.reload();
    });
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
    }, 3000);
  }
}