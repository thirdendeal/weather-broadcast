"use strict";

function geocode(query, callback) {
  const ENDPOINT = "https://nominatim.openstreetmap.org/search";

  fetch(`${ENDPOINT}?format=jsonv2&q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((nominatim) => callback(nominatim))
    .catch((error) => console.log(`Nominatim Error: ${error}`));
}

function ipGeocode(callback) {
  fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((ipAPI) => callback(ipAPI))
    .catch((error) => console.log(`IP-API Error: ${error}`));
}
