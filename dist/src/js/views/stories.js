// src/js/views/stories.js
import HomePresenter from "../presenters/home-presenter.js";
import { createElement } from "../utils/dom.js";
import { saveStories } from "../db.js";

export default class StoriesView {
  constructor() {
    this.presenter = new HomePresenter(this);
  }

  async init() {
    const content = createElement("div", { 
      class: "stories-page-container",
      role: "region",
      "aria-label": "Daftar semua cerita"
    });
    
    content.innerHTML = `
      <div class="stories-header">
        <h1>All Stories</h1>
        <p>Discover amazing stories from our community</p>
      </div>
      
      <div class="stories-filters">
        <div class="filter-group">
          <label for="sort-select">Sort by:</label>
          <select id="sort-select">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div class="filter-group">
          <button id="refresh-btn" class="btn btn-outline">🔄 Refresh</button>
        </div>
      </div>
      
      <div 
        id="stories-list" 
        role="feed" 
        aria-label="Daftar cerita"
        class="stories-container"
      ></div>
      
      <div id="loading-indicator" class="loading-indicator" style="display: none;">
        <div class="spinner"></div>
        <p>Loading stories...</p>
      </div>
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    this.setupEventListeners();
    await this.presenter.loadStories();
  }

  setupEventListeners() {
    const refreshBtn = document.getElementById("refresh-btn");
    const sortSelect = document.getElementById("sort-select");

    refreshBtn.addEventListener("click", () => {
      this.presenter.loadStories();
    });

    sortSelect.addEventListener("change", (e) => {
      this.sortStories(e.target.value);
    });
  }

  displayStories(stories) {
    const storiesList = document.getElementById("stories-list");
    storiesList.innerHTML = "";
    
    if (stories.length === 0) {
      storiesList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📖</div>
          <h3>No Stories Yet</h3>
          <p>Be the first to share your story!</p>
          <a href="#/add-story" class="btn btn-primary">Create Story</a>
        </div>
      `;
      return;
    }
    
    stories.forEach((story) => {
      const storyItem = createElement("div", { 
        class: "story-item",
        role: "article"
      });
      
      storyItem.innerHTML = `
        <div class="story-header">
          <div class="story-author">
            <div class="author-avatar">
              ${story.name.charAt(0).toUpperCase()}
            </div>
            <div class="author-info">
              <h3>${story.name}</h3>
              <p class="story-date">${new Date(story.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>
        </div>
        
        <div class="story-content">
          <p class="story-description">${story.description}</p>
          <img 
            src="${story.photoUrl}" 
            alt="Foto untuk cerita: ${story.description.substring(0, 50)}..." 
            loading="lazy"
            class="story-image"
          >
        </div>
        
        ${story.lat && story.lon ? `
          <div class="story-location">
            <div class="location-info">
              <span class="location-icon">📍</span>
              <span>Location: ${story.lat.toFixed(4)}, ${story.lon.toFixed(4)}</span>
            </div>
            <div 
              id="map-${story.id}" 
              class="story-map" 
              role="complementary" 
              aria-label="Lokasi cerita di peta"
            ></div>
          </div>
        ` : ''}
        
        <div class="story-actions">
          <a 
            href="#/detail/${story.id}" 
            class="action-btn detail-btn"
            aria-label="Lihat detail cerita dari ${story.name}"
          >
            <span class="btn-icon">👁️</span>
            View Details
          </a>
          <button 
            class="action-btn favorite-btn" 
            data-story='${JSON.stringify(story).replace(/'/g, "&apos;")}'
            aria-label="Simpan ke favorit"
          >
            <span class="btn-icon">❤️</span>
            Save to Favorites
          </button>
        </div>
      `;
      
      storiesList.appendChild(storyItem);

      if (story.lat && story.lon) {
        this.presenter.initMap(
          `map-${story.id}`,
          story.lat,
          story.lon,
          story.name
        );
      }
    });

    // Add event listeners for favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const storyData = JSON.parse(e.target.closest('.favorite-btn').dataset.story.replace(/&apos;/g, "'"));
        await this.saveFavorite(storyData);
      });
    });
  }

  async saveFavorite(story) {
    try {
      await saveStories([story]);
      this.showMessage("Cerita berhasil disimpan ke favorit!");
    } catch (error) {
      this.showMessage(`Gagal menyimpan cerita: ${error.message}`);
    }
  }

  sortStories(sortType) {
    const storiesContainer = document.getElementById("stories-list");
    const storyItems = Array.from(storiesContainer.querySelectorAll('.story-item'));
    
    storyItems.sort((a, b) => {
      const dateA = new Date(a.querySelector('.story-date').textContent);
      const dateB = new Date(b.querySelector('.story-date').textContent);
      
      return sortType === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    storiesContainer.innerHTML = '';
    storyItems.forEach(item => storiesContainer.appendChild(item));
  }

  showMessage(message, retryCallback) {
    if (retryCallback) {
      const storiesList = document.getElementById("stories-list");
      storiesList.innerHTML = `
        <div class="error-state" role="alert">
          <div class="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>${message}</p>
          <button id="retry-btn" class="btn btn-primary">Try Again</button>
        </div>
      `;
      
      document.getElementById("retry-btn").addEventListener("click", retryCallback);
    } else {
      alert(message);
    }
  }
}