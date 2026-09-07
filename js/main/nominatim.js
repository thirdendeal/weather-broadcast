"use strict";

function nominatim(query, callback) {
  const endpoint = "https://nominatim.openstreetmap.org/search";

  fetch(`${endpoint}?format=jsonv2&q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.log(`Nominatim Error: ${error}`));
}
