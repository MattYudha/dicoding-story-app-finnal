// src/js/api.js
import { BASE_URL } from "./constants.js";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.message || `Server error: ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
}

export async function register({ name, email, password }) {
  try {
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      throw new Error("Nama tidak boleh kosong");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Email tidak valid");
    }
    if (!password || password.length < 8) {
      throw new Error("Password harus minimal 8 karakter");
    }

    console.log("Mengirim data registrasi:", { name, email, password });

    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (register):", data);
    return data;
  } catch (error) {
    console.error("Error registering:", error.message);
    throw new Error(error.message);
  }
}

export async function login({ email, password }) {
  try {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Email tidak valid");
    }
    if (!password || password.length < 8) {
      throw new Error("Password harus minimal 8 karakter");
    }

    console.log("Mengirim data login:", { email, password });

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (login):", data);
    return data;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message);
  }
}

export async function addStory({ description, photo, lat, lon, token }) {
  try {
    if (!description || description.trim().length === 0) {
      throw new Error("Deskripsi tidak boleh kosong");
    }
    if (!photo) {
      throw new Error("Foto wajib diunggah");
    }
    if (!token) {
      throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat && lon) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    console.log("Mengirim data cerita:", { description, lat, lon, token });

    const response = await fetch(`${BASE_URL}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (addStory):", data);
    return data;
  } catch (error) {
    console.error("Error adding story:", error.message);
    throw new Error(error.message);
  }
}

export async function addGuestStory({ description, photo, lat, lon }) {
  try {
    if (!description || description.trim().length === 0) {
      throw new Error("Deskripsi tidak boleh kosong");
    }
    if (!photo) {
      throw new Error("Foto wajib diunggah");
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat && lon) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    console.log("Mengirim data cerita tamu:", { description, lat, lon });

    const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
      method: "POST",
      body: formData,
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (addGuestStory):", data);
    return data;
  } catch (error) {
    console.error("Error adding guest story:", error.message);
    throw new Error(error.message);
  }
}

export async function getStories({ token, page = 1, size = 10, location = 0 }) {
  try {
    if (!token) {
      throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");
    }

    const params = new URLSearchParams({ page, size, location });
    console.log("Mengambil daftar cerita dengan params:", params.toString());

    const response = await fetch(`${BASE_URL}/stories?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (getStories):", data);
    return data;
  } catch (error) {
    console.error("Error getting stories:", error.message);
    throw new Error(error.message);
  }
}

export async function getStoryDetail(id, token) {
  try {
    if (!id) {
      throw new Error("ID cerita tidak boleh kosong");
    }
    if (!token) {
      throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");
    }

    console.log("Mengambil detail cerita dengan ID:", id);

    const response = await fetch(`${BASE_URL}/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (getStoryDetail):", data);
    return data;
  } catch (error) {
    console.error("Error getting story detail:", error.message);
    throw new Error(error.message);
  }
}

export async function subscribeNotifications(subscription, token) {
  try {
    if (!subscription) {
      throw new Error("Data subscription tidak boleh kosong");
    }
    if (!token) {
      throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");
    }

    // Filter out expirationTime if it exists
    const filteredSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    };

    console.log(
      "Mengirim data subscription (tanpa expirationTime):",
      filteredSubscription
    );

    const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(filteredSubscription),
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (subscribeNotifications):", data);
    return data;
  } catch (error) {
    console.error("Error subscribing to notifications:", error.message);
    throw new Error(error.message);
  }
}

export async function unsubscribeFromNotifications(endpoint, token) {
  try {
    if (!endpoint) {
      throw new Error("Endpoint tidak boleh kosong");
    }
    if (!token) {
      throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");
    }

    console.log("Menghapus subscription dengan endpoint:", endpoint);

    const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ endpoint }),
    });

    const data = await handleResponse(response);
    console.log("Respons dari server (unsubscribeFromNotifications):", data);
    return data;
  } catch (error) {
    console.error("Error unsubscribing from notifications:", error.message);
    throw new Error(error.message);
  }
}
