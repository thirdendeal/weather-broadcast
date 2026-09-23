"use strict";

// Cache
// -----------------------------------------------------------------------------

function getCache(key) {
  const now = new Date().getTime();
  const expiration = Number(localStorage.getItem(`expire:${key}`));

  if (now < expiration) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.removeItem(key);
    localStorage.removeItem(`expire:${key}`);
  }
}

function setCache(key, value, duration) {
  const expiration = new Date().getTime() + duration; // milliseconds

  localStorage.setItem(key, JSON.stringify(value));
  localStorage.setItem(`expire:${key}`, expiration);
}

// Fetch
// -----------------------------------------------------------------------------

function fetchIPAPI(callback) {
  // IP-API Limit: 45 hits / min (64_800 hits / day)

  fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((ipAPI) => callback(ipAPI))
    .catch((error) => console.log(`IP-API Error: ${error}`));
}

function fetchNominatim(query, callback) {
  // Nominatim Limit
  //
  // Not Continous: 1 hit / s (86_400 hits / day)
  // Continous: 4 hits / min (5_760 hits / day)

  const q = encodeURIComponent(query);

  fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${q}`)
    .then((response) => response.json())
    .then((nominatim) => callback(nominatim))
    .catch((error) => console.log(`Nominatim Error: ${error}`));
}

function fetchOpenMeteo(latitude, longitude, callback) {
  // Open-Meteo Limit: 6.9444... hits / min (10_000 hits / day)

  const openMeteoEndpoint = `    
    https://api.open-meteo.com/v1/forecast
      ?forecast_days=5
      &latitude=${latitude}
      &longitude=${longitude}
      &daily=
        weather_code,
        apparent_temperature_min,
        apparent_temperature_max,
        precipitation_probability_max,
      &timezone=auto
  `;

  fetch(openMeteoEndpoint.replace(/\s+/g, ""))
    .then((response) => response.json())
    .then((openMeteo) => callback(openMeteo))
    .catch((error) => console.log(`Open-Meteo Error: ${error}`));
}

// API
// -----------------------------------------------------------------------------

function getCoordinates(query, callback) {
  const key = `nominatim:${encodeURIComponent(query)}`;
  const nominatimCache = getCache(key);

  if (nominatimCache) {
    console.log(`Nominatim cache hit (query: ${query})`);

    callback(nominatimCache);
  } else {
    fetchNominatim(query, (nominatim) => {
      setCache(key, nominatim, 30000); // 30 s => 2 hits / min

      callback(nominatim);
    });
  }
}

function getCoordinatesByIP(callback) {
  const ipAPICache = getCache("ipAPI");

  if (ipAPICache) {
    console.log("IP-API cache hit");

    callback(ipAPICache);
  } else {
    fetchIPAPI((ipAPI) => {
      setCache("ipAPI", ipAPI, 2000); // 2 s => 30 hits / min

      callback(ipAPI);
    });
  }
}

function getForecast(latitude, longitude, callback) {
  const key = `openMeteo:${latitude}:${longitude}`;
  const openMeteoCache = getCache(key);

  if (openMeteoCache) {
    console.log(`Open-Meteo cache hit (${latitude}, ${longitude})`);

    callback(openMeteoCache);
  } else {
    fetchOpenMeteo(latitude, longitude, (openMeteo) => {
      setCache(key, openMeteo, 30000); // 30 s => 2 hits / min (2 routes => 4 hits / min)

      callback(openMeteo);
    });
  }
}
