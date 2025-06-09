// src/js/views/home.js
import HomePresenter from "../presenters/home-presenter.js";
import { createElement } from "../utils/dom.js";
import { saveStories } from "../db.js";

export default class HomeView {
  constructor() {
    this.presenter = new HomePresenter(this);
  }

  async init() {
    const content = createElement("div", { 
      class: "home-container",
      role: "region",
      "aria-label": "Daftar cerita"
    });
    
    content.innerHTML = `
      <h2 id="story-list-title">Daftar Cerita</h2>
      <div 
        id="story-list" 
        role="feed" 
        aria-labelledby="story-list-title"
        class="stories-container"
      ></div>
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    await this.presenter.loadStories();
  }

  displayStories(stories) {
    const storyList = document.getElementById("story-list");
    storyList.innerHTML = "";
    
    stories.forEach((story) => {
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
          <a 
            href="#/detail/${story.id}" 
            class="detail-link"
            aria-label="Lihat detail cerita dari ${story.name}"
          >Lihat Detail</a>
          <button 
            class="save-favorite-btn" 
            data-story='${JSON.stringify(story).replace(/'/g, "&apos;")}'
            aria-label="Simpan ke favorit"
          >
            ❤️ Simpan ke Favorit
          </button>
        </div>
      `;
      
      storyList.appendChild(storyItem);

      if (story.lat && story.lon) {
        this.presenter.initMap(
          `map-${story.id}`,
          story.lat,
          story.lon,
          story.name
        );
      }
    });

    // Add event listeners for save buttons
    document.querySelectorAll('.save-favorite-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const storyData = JSON.parse(e.target.dataset.story.replace(/&apos;/g, "'"));
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

  showMessage(message, retryCallback) {
    const storyList = document.getElementById("story-list");
    if (retryCallback) {
      storyList.innerHTML = `
        <div role="alert">
          <p>${message}</p>
          <button id="retry-btn" class="retry-button">Coba Lagi</button>
        </div>
      `;
      
      document
        .getElementById("retry-btn")
        .addEventListener("click", retryCallback);
    } else {
      alert(message);
    }
  }
}