// src/js/presenters/detail-presenter.js
import StoryModel from "../models/story-model.js"; // dari src/js/presenters/ ke src/js/models/story-model.js
import { initMap, addMarker } from "../map.js"; // dari src/js/presenters/ ke src/js/map.js

export default class DetailPresenter {
  constructor(view) {
    this.view = view;
    this.model = new StoryModel();
  }

  async getStoryDetail(id, token) {
    try {
      const story = await this.model.getStoryDetail(id, token);
      return story;
    } catch (error) {
      throw new Error(`Gagal mengambil detail cerita: ${error.message}`);
    }
  }

  initMap(containerId, lat, lon, popupText) {
    if (lat && lon) {
      const map = initMap(containerId, lat, lon, 13);
      addMarker(map, lat, lon, popupText);
    }
  }
}
