"use strict";

function nominatimSearch(query, callback) {
  const endpoint = "https://nominatim.openstreetmap.org/search";

  fetch(`${endpoint}?format=jsonv2&q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.log(`Nominatim Error: ${error}`));
}

function nominatimReverse(latitude, longitude, callback) {
  const endpoint = "https://nominatim.openstreetmap.org/reverse";

  fetch(`${endpoint}?format=jsonv2&lat=${latitude}&lon=${longitude}`)
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.log(`Nominatim Error: ${error}`));
}
