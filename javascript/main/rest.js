// REST
// -----------------------------------------------------------------------------

import { getCacheItem, setCacheItem } from "./rest/cache-item.js";
import { fetchIP_API, fetchNominatim, fetchOpenMeteo } from "./rest/fetch.js";

// -----------------------------------------------------------------------------

function getIP_API(callback) {
  const ipAPICache = getCacheItem("ipAPI");

  if (ipAPICache) {
    console.log("IP-API cache hit");

    callback(ipAPICache);
  } else {
    fetchIP_API((ipAPI) => {
      // IP-API: 45 hits / min limit
      setCacheItem("ipAPI", ipAPI, 2000); // 2 s => 30 hits / min

      callback(ipAPI);
    });
  }
}

function getNominatim(query, callback) {
  const key = `nominatim:${encodeURIComponent(query)}`;
  const nominatimCache = getCacheItem(key);

  if (nominatimCache) {
    console.log(`Nominatim cache hit (query: ${query})`);

    callback(nominatimCache);
  } else {
    fetchNominatim(query, (nominatim) => {
      // Nominatim: 4 hits / min (continuous) limit
      setCacheItem(key, nominatim, 30000); // 30 s => 2 hits / min

      callback(nominatim);
    });
  }
}

function getOpenMeteo(latitude, longitude, callback) {
  const key = `openMeteo:${latitude}:${longitude}`;
  const openMeteoCache = getCacheItem(key);

  if (openMeteoCache) {
    console.log(`Open-Meteo cache hit (${latitude}, ${longitude})`);

    callback(openMeteoCache);
  } else {
    fetchOpenMeteo(latitude, longitude, (openMeteo) => {
      // Open-Meteo: 6.9 hits / min limit
      setCacheItem(key, openMeteo, 30000); // 30 s => 2 hits / min (2 routes => 4 hits / min)

      callback(openMeteo);
    });
  }
}

// -----------------------------------------------------------------------------

export { getIP_API, getNominatim, getOpenMeteo };
