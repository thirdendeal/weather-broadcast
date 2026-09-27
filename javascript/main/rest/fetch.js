// Fetch
// -----------------------------------------------------------------------------

function fetchIPAPI(callback) {
  fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((ipAPI) => callback(ipAPI))
    .catch((error) => console.log(`IP-API Error: ${error}`));
}

function fetchNominatim(query, callback) {
  const q = encodeURIComponent(query);

  fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${q}`)
    .then((response) => response.json())
    .then((nominatim) => callback(nominatim))
    .catch((error) => console.log(`Nominatim Error: ${error}`));
}

function fetchOpenMeteo(latitude, longitude, callback) {
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
        uv_index_max,
        sunrise,
        sunset
      &timezone=auto
  `;

  fetch(openMeteoEndpoint.replace(/\s+/g, ""))
    .then((response) => response.json())
    .then((openMeteo) => callback(openMeteo))
    .catch((error) => console.log(`Open-Meteo Error: ${error}`));
}

// -----------------------------------------------------------------------------

export { fetchIPAPI, fetchNominatim, fetchOpenMeteo };
