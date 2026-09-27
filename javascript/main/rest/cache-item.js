// Cache
// -----------------------------------------------------------------------------

function getCacheItem(key) {
  const now = new Date().getTime();
  const expiration = Number(localStorage.getItem(`expire:${key}`));

  if (now < expiration) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.removeItem(key);
    localStorage.removeItem(`expire:${key}`);
  }
}

function setCacheItem(key, value, duration) {
  const expiration = new Date().getTime() + duration; // milliseconds

  localStorage.setItem(key, JSON.stringify(value));
  localStorage.setItem(`expire:${key}`, expiration);
}

// -----------------------------------------------------------------------------

export { getCacheItem, setCacheItem };
