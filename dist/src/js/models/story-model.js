// src/js/models/story-model.js
import { getStories, getStoryDetail, addStory, addGuestStory } from "../api.js"; // dari src/js/models/ ke src/js/api.js

export default class StoryModel {
  async getStories({ token, page = 1, size = 10, location = 1 }) {
    const response = await getStories({ token, page, size, location });
    if (response.error) throw new Error(response.message);
    return response.listStory;
  }

  async getStoryDetail(id, token) {
    const response = await getStoryDetail(id, token);
    if (response.error) throw new Error(response.message);
    return response.story;
  }

  async addStory({ description, photo, lat, lon, token }) {
    const response = await addStory({ description, photo, lat, lon, token });
    if (response.error) throw new Error(response.message);
    return response;
  }

  async addGuestStory({ description, photo, lat, lon }) {
    const response = await addGuestStory({ description, photo, lat, lon });
    if (response.error) throw new Error(response.message);
    return response;
  }
}
