import { openDB } from 'idb';

const DB_NAME = 'story-app-db';
const DB_VERSION = 1;
const STORY_STORE = 'stories';

export async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORY_STORE)) {
        const storyStore = db.createObjectStore(STORY_STORE, { keyPath: 'id' });
        storyStore.createIndex('createdAt', 'createdAt');
      }
    },
  });
  return db;
}

export async function saveStories(stories) {
  const db = await initDB();
  const tx = db.transaction(STORY_STORE, 'readwrite');
  await Promise.all([
    ...stories.map(story => tx.store.put(story)),
    tx.done
  ]);
}

export async function getStoredStories() {
  const db = await initDB();
  return db.getAllFromIndex(STORY_STORE, 'createdAt');
}

export async function deleteStory(id) {
  const db = await initDB();
  await db.delete(STORY_STORE, id);
}

export async function clearStories() {
  const db = await initDB();
  await db.clear(STORY_STORE);
}