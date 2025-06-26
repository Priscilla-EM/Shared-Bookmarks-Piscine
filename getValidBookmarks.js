
import { getData } from "./storage.js";

export function getValidBookmarks(userId) {
  const rawData = getData(userId);
  if (Array.isArray(rawData)) {
    return rawData;
  } else {
    console.warn(
      `Invalid bookmarks data for user ${userId}. Using empty array.`
    );
    return [];
  }
}
