"use strict";

function forecast(latitude, longitude, callback) {
  const parameters = [
    `latitude=${latitude}&longitude=${longitude}`,
    "daily=weather_code,apparent_temperature_min,apparent_temperature_max,precipitation_probability_max",
    "timezone=auto",
  ];

  fetch(`https://api.open-meteo.com/v1/forecast?${parameters.join("&")}`)
    .then((response) => response.json())
    .then((openMeteo) => callback(openMeteo))
    .catch((error) => console.log(`IP-API Error: ${error}`));
}

function geocode(query, callback) {
  fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}`,
  )
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
