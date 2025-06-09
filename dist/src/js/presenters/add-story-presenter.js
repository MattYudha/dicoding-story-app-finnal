// src/js/presenters/add-story-presenter.js
import StoryModel from "../models/story-model.js";
import { initMap, onMapClick, addMarker } from "../map.js";
import { showStoryNotification } from "../notification.js";

export default class AddStoryPresenter {
  constructor(view) {
    this.view = view;
    this.model = new StoryModel();
    this.coordinates = {};
    this.currentMarker = null;
    this.map = null;
  }

  initMap(containerId) {
    this.map = initMap(containerId);
    
    onMapClick(this.map, (lat, lon) => {
      this.setCoordinates(lat, lon);
      this.view.updateLocationDisplay(lat, lon);
    });
    
    return this.map;
  }

  setCoordinates(lat, lon) {
    this.coordinates = { lat, lon };
    
    // Remove existing marker if any
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    
    // Add new marker
    this.currentMarker = addMarker(this.map, lat, lon, "Selected location");
    
    console.log("Coordinates selected:", lat, lon);
  }

  updateMapLocation(lat, lon) {
    if (this.map) {
      this.map.setView([lat, lon], 15);
      this.setCoordinates(lat, lon);
    }
  }

  getCoordinates() {
    return this.coordinates;
  }

  async addStory(description, photo, lat, lon, token) {
    try {
      const response = await this.model.addStory({
        description,
        photo,
        lat: lat || this.coordinates.lat,
        lon: lon || this.coordinates.lon,
        token,
      });
      
      await showStoryNotification(description);
      this.view.showMessage("Story shared successfully!");
      this.view.stopCamera();
      window.location.hash = "#/stories";
    } catch (error) {
      this.view.showMessage(`Failed to share story: ${error.message}`);
    }
  }
}