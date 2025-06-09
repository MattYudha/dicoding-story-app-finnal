// src/js/presenters/add-story-presenter.js

import StoryModel from "../models/story-model.js";
import { initMap, onMapClick, addMarker } from "../map.js";
import { showStoryNotification } from "../notification.js";
import { triggerStoryNotification } from "../api.js";
import { getToken } from "../utils/auth.js"; // Import getToken

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
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    this.currentMarker = addMarker(this.map, lat, lon, "Selected location");
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

  /**
   * Fungsi utama untuk menambah cerita.
   * Logika trigger notifikasi dipisahkan agar tidak memblokir UI.
   */
  async addStory(description, photo, lat, lon) {
    const token = getToken();
    if (!token) {
      this.view.showMessage(
        "Authentication error. Please login again.",
        "error"
      );
      return;
    }

    try {
      // Panggil metode di view untuk menampilkan state loading
      this.view.showLoading(true);

      const response = await this.model.addStory({
        description,
        photo,
        lat: lat || this.coordinates.lat,
        lon: lon || this.coordinates.lon,
        token,
      });

      // Tampilkan notifikasi lokal bahwa cerita berhasil di-share
      await showStoryNotification(
        "Story Shared Successfully!",
        `Your story "${description.substring(0, 30)}..." has been shared.`
      );

      this.view.showMessage("Story shared successfully!", "success");

      // Arahkan ke halaman stories setelah sukses
      window.location.hash = "#/stories";

      // Jalankan trigger notifikasi di latar belakang (tanpa 'await')
      // Jika ini gagal, tidak akan mempengaruhi alur utama.
      this.triggerNotificationInBackground(token);
    } catch (error) {
      this.view.showMessage(`Failed to share story: ${error.message}`, "error");
    } finally {
      // Pastikan state loading selalu dihentikan, baik sukses maupun gagal
      this.view.showLoading(false);
    }
  }

  /**
   * Fungsi helper untuk men-trigger notifikasi secara asynchronous
   * dan menangani error-nya secara terpisah.
   */
  async triggerNotificationInBackground(token) {
    try {
      console.log("Attempting to trigger push notification to other users...");
      await triggerStoryNotification(token); // Menggunakan token yang sudah ada
      console.log("Push notification triggered successfully.");
    } catch (notificationError) {
      // Jika gagal, cukup catat di console. Pengguna tidak perlu tahu.
      console.warn(
        "Could not trigger push notification:",
        notificationError.message
      );
    }
  }
}
