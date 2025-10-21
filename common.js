// Sort bookmarks from newest to oldest
export function sortBookMarksByNewest(userData) {
  return [...userData].sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));
}
