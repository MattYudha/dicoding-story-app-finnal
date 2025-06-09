// src/js/views/favorites.js
import { createElement } from "../utils/dom.js";
import { getStoredStories, deleteStory } from "../db.js";
import { initMap, addMarker } from "../map.js";

export default class FavoritesView {
  constructor() {
    this.stories = [];
  }

  async init() {
    const content = createElement("div", { 
      class: "home-container",
      role: "region",
      "aria-label": "Cerita Favorit"
    });
    
    content.innerHTML = `
      <h2 id="favorites-title">Cerita Favorit</h2>
      <div 
        id="favorites-list" 
        role="feed" 
        aria-labelledby="favorites-title"
      ></div>
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    await this.loadFavorites();
  }

  async loadFavorites() {
    try {
      this.stories = await getStoredStories();
      this.displayStories();
    } catch (error) {
      this.showMessage(`Gagal memuat cerita favorit: ${error.message}`);
    }
  }

  displayStories() {
    const favoritesList = document.getElementById("favorites-list");
    
    if (this.stories.length === 0) {
      favoritesList.innerHTML = `
        <div class="empty-state">
          <p>Belum ada cerita favorit.</p>
          <a href="#/home" class="back-home">Kembali ke Beranda</a>
        </div>
      `;
      return;
    }

    favoritesList.innerHTML = "";
    
    this.stories.forEach((story) => {
      const storyItem = createElement("div", { 
        class: "story-item",
        role: "article"
      });
      
      storyItem.innerHTML = `
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <img 
          src="${story.photoUrl}" 
          alt="Foto untuk cerita: ${story.description.substring(0, 50)}..." 
          loading="lazy"
          class="story-image"
        >
        <p>Dibuat pada: ${new Date(story.createdAt).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
        ${
          story.lat && story.lon
            ? `<div 
                id="map-${story.id}" 
                class="story-map" 
                role="complementary" 
                aria-label="Lokasi cerita di peta"
              ></div>`
            : ""
        }
        <div class="story-actions">
          <button 
            class="remove-favorite-btn" 
            data-story-id="${story.id}"
            aria-label="Hapus dari favorit"
          >
            Hapus dari Favorit
          </button>
        </div>
      `;
      
      favoritesList.appendChild(storyItem);

      if (story.lat && story.lon) {
        this.initMap(`map-${story.id}`, story.lat, story.lon, story.name);
      }
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const storyId = e.target.dataset.storyId;
        await this.removeFavorite(storyId);
      });
    });
  }

  async removeFavorite(storyId) {
    try {
      await deleteStory(storyId);
      await this.loadFavorites(); // Reload the list
      this.showMessage("Cerita berhasil dihapus dari favorit!");
    } catch (error) {
      this.showMessage(`Gagal menghapus cerita: ${error.message}`);
    }
  }

  initMap(containerId, lat, lon, popupText) {
    if (lat && lon) {
      const map = initMap(containerId, lat, lon, 13);
      addMarker(map, lat, lon, popupText);
    }
  }

  showMessage(message) {
    alert(message);
  }
}