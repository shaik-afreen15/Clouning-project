const getUserKey = () => {
  const user = localStorage.getItem("currentUser");
  return user ? `recentlyWatched_${user}` : null;
};

export const getRecentlyWatched = () => {
  const key = getUserKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveRecentlyWatched = (movie) => {
  const key = getUserKey();
  if (!key) return;

  let recent = getRecentlyWatched();   

  // Remove duplicates
  recent = recent.filter((m) => m.id !== movie.id);

  // Add to front
  recent.unshift(movie);

  recent = recent.slice(0, 10);

  localStorage.setItem(key, JSON.stringify(recent));

  window.dispatchEvent(new Event("recently-updated"));
};

export const deleteRecentlyWatched = (id) => {
  const key = getUserKey();
  if (!key) return;

  const updated = getRecentlyWatched().filter((m) => m.id !== id);
  localStorage.setItem(key, JSON.stringify(updated));

  window.dispatchEvent(new Event("recently-updated"));
};
