// src/js/map.js
import L from "leaflet";

export function initMap(containerId, lat = -6.2, lon = 106.8, zoom = 13) {
  const map = L.map(containerId).setView([lat, lon], zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  return map;
}

export function addMarker(map, lat, lon, popupText) {
  const marker = L.marker([lat, lon]).addTo(map);
  if (popupText) {
    marker.bindPopup(popupText).openPopup();
  }
  return marker;
}

export function onMapClick(map, callback) {
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    callback(lat, lng);
  });
}