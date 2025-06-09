// src/js/views/add-story.js
import AddStoryPresenter from "../presenters/add-story-presenter.js";
import { createElement } from "../utils/dom.js";
import {
  startCamera,
  captureImage,
  stopCamera,
  dataURLtoFile,
} from "../camera.js";
import { getToken } from "../utils/auth.js";

export default class AddStoryView {
  constructor() {
    this.presenter = new AddStoryPresenter(this);
    this.stream = null;
    this.photo = null;
    this.userLocation = null;
  }

  async init() {
    const token = getToken();
    if (!token) {
      this.showMessage("Silakan login terlebih dahulu!");
      window.location.hash = "#/login";
      return;
    }

    const content = createElement("div", { class: "add-story-container" });
    content.innerHTML = `
      <div class="form-header">
        <h2>Create New Story</h2>
        <p>Share your amazing experience with the community</p>
      </div>
      
      <form id="add-story-form" class="story-form">
        <div class="form-group">
          <label for="description">Story Description</label>
          <textarea 
            id="description" 
            required 
            aria-required="true" 
            placeholder="Tell us about your experience..."
            rows="4"
          ></textarea>
          <div class="char-counter">
            <span id="char-count">0</span>/500 characters
          </div>
        </div>
        
        <div class="form-group">
          <label for="photo">Photo</label>
          <div class="photo-section">
            <video id="camera" autoplay playsinline class="camera-preview"></video>
            <img id="preview" class="photo-preview" alt="Photo Preview" style="display:none;" />
            <canvas id="canvas" style="display:none;"></canvas>
            
            <div class="camera-controls">
              <button type="button" id="capture" class="btn btn-camera">
                <span class="btn-icon">📷</span>
                Capture Photo
              </button>
              <button type="button" id="retake" class="btn btn-outline" style="display:none;">
                <span class="btn-icon">🔄</span>
                Retake
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="location">Location</label>
          <p class="location-help">Click on the map to set your story's location (optional)</p>
          
          <div class="location-controls">
            <button type="button" id="use-my-location" class="btn btn-location">
              <span class="btn-icon">📍</span>
              Use My Location
            </button>
            <div class="location-inputs">
              <div class="input-group">
                <label for="latitude">Latitude</label>
                <input type="number" id="latitude" step="any" placeholder="Latitude" readonly>
              </div>
              <div class="input-group">
                <label for="longitude">Longitude</label>
                <input type="number" id="longitude" step="any" placeholder="Longitude" readonly>
              </div>
            </div>
          </div>
          
          <div id="location-info" class="location-info">
            <span class="location-icon">📍</span>
            <span class="location-text">No location selected</span>
          </div>
          
          <div id="map" class="story-map"></div>
        </div>
        
        <div class="form-actions">
          <button type="button" id="cancel-btn" class="btn btn-outline">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            <span class="btn-icon">📝</span>
            Share Story
          </button>
        </div>
      </form>
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    await this.initializeForm();
  }

  async initializeForm() {
    const video = document.getElementById("camera");
    
    try {
      this.stream = await startCamera(video);
    } catch (error) {
      this.showMessage(
        `Failed to access camera: ${error.message}. Please ensure camera is available and allow camera access in browser settings.`
      );
      return;
    }

    this.presenter.initMap("map");
    this.setupEventListeners();
  }

  setupEventListeners() {
    const descriptionTextarea = document.getElementById("description");
    const charCount = document.getElementById("char-count");
    const captureBtn = document.getElementById("capture");
    const retakeBtn = document.getElementById("retake");
    const useLocationBtn = document.getElementById("use-my-location");
    const cancelBtn = document.getElementById("cancel-btn");
    const form = document.getElementById("add-story-form");

    // Character counter
    descriptionTextarea.addEventListener("input", (e) => {
      const length = e.target.value.length;
      charCount.textContent = length;
      charCount.style.color = length > 500 ? '#ef476f' : '#6c757d';
    });

    // Camera controls
    captureBtn.addEventListener("click", () => {
      this.capturePhoto();
    });

    retakeBtn.addEventListener("click", () => {
      this.retakePhoto();
    });

    // Location controls
    useLocationBtn.addEventListener("click", () => {
      this.getCurrentLocation();
    });

    // Cancel button
    cancelBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to cancel? Your story will be lost.")) {
        this.stopCamera();
        window.location.hash = "#/stories";
      }
    });

    // Form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.submitStory();
    });
  }

  capturePhoto() {
    const video = document.getElementById("camera");
    const canvas = document.getElementById("canvas");
    const preview = document.getElementById("preview");
    const captureBtn = document.getElementById("capture");
    const retakeBtn = document.getElementById("retake");

    const dataURL = captureImage(video, canvas);
    this.photo = dataURLtoFile(dataURL, "story.jpg");
    
    preview.src = dataURL;
    preview.style.display = "block";
    video.style.display = "none";
    captureBtn.style.display = "none";
    retakeBtn.style.display = "inline-flex";
  }

  retakePhoto() {
    const video = document.getElementById("camera");
    const preview = document.getElementById("preview");
    const captureBtn = document.getElementById("capture");
    const retakeBtn = document.getElementById("retake");

    this.photo = null;
    preview.style.display = "none";
    video.style.display = "block";
    captureBtn.style.display = "inline-flex";
    retakeBtn.style.display = "none";
  }

  async getCurrentLocation() {
    const useLocationBtn = document.getElementById("use-my-location");
    const originalText = useLocationBtn.innerHTML;
    
    useLocationBtn.innerHTML = '<span class="spinner-small"></span> Getting location...';
    useLocationBtn.disabled = true;

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      this.updateLocationDisplay(latitude, longitude);
      this.presenter.setCoordinates(latitude, longitude);
      
      // Update map to show user's location
      this.presenter.updateMapLocation(latitude, longitude);
      
    } catch (error) {
      this.showMessage(`Failed to get location: ${error.message}`);
    } finally {
      useLocationBtn.innerHTML = originalText;
      useLocationBtn.disabled = false;
    }
  }

  updateLocationDisplay(lat, lon) {
    const locationInfo = document.getElementById("location-info");
    const latInput = document.getElementById("latitude");
    const lonInput = document.getElementById("longitude");
    
    locationInfo.innerHTML = `
      <span class="location-icon">📍</span>
      <span class="location-text">Location: ${lat.toFixed(6)}, ${lon.toFixed(6)}</span>
    `;
    locationInfo.classList.add("location-selected");
    
    latInput.value = lat.toFixed(6);
    lonInput.value = lon.toFixed(6);
  }

  async submitStory() {
    const description = document.getElementById("description").value.trim();
    const token = getToken();

    if (!description) {
      this.showMessage("Please enter a story description!");
      return;
    }

    if (description.length > 500) {
      this.showMessage("Story description must be 500 characters or less!");
      return;
    }

    if (!this.photo) {
      this.showMessage("Please capture a photo first!");
      return;
    }

    const { lat, lon } = this.presenter.getCoordinates();
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-small"></span> Sharing...';
    submitBtn.disabled = true;

    try {
      await this.presenter.addStory(description, this.photo, lat, lon, token);
    } catch (error) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  stopCamera() {
    stopCamera(this.stream);
  }

  showMessage(message) {
    alert(message);
  }
}