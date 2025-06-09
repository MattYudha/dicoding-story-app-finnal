// src/js/presenters/home-presenter.js
import StoryModel from "../models/story-model.js"; // dari src/js/presenters/ ke src/js/models/story-model.js
import { initMap, addMarker } from "../map.js"; // dari src/js/presenters/ ke src/js/map.js

export default class HomePresenter {
  constructor(view) {
    this.view = view;
    this.model = new StoryModel();
  }

  async loadStories() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        this.view.showMessage("Silakan login terlebih dahulu!", () => {
          window.location.hash = "#/login";
        });
        return;
      }

      const response = await this.getStories(token);
      if (response.error) {
        throw new Error(response.message);
      }

      this.view.displayStories(response);
    } catch (error) {
      this.view.showMessage(`Gagal memuat cerita: ${error.message}`, () => {
        this.loadStories();
      });
    }
  }

  async getStories(token) {
    return await this.model.getStories({
      token,
      page: 1,
      size: 10,
      location: 1,
    });
  }

  initMap(containerId, lat, lon, popupText) {
    if (lat && lon) {
      const map = initMap(containerId, lat, lon, 13);
      addMarker(map, lat, lon, popupText);
    }
  }
}
