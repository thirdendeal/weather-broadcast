"use strict";

// IP Geolocation
// -----------------------------------------------------------------------------

window.addEventListener("load", () => {
  ipAPI((json) => {
    document.getElementById("city").textContent = json.city;

    document.getElementById("latitude").textContent = json.lat;
    document.getElementById("longitude").textContent = json.lon;
  });
});

// Search
// -----------------------------------------------------------------------------

const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  // TODO: Immediately change text content while loading

  const query = document.getElementById("input").value;

  const city = document.getElementById("city");

  const lat = document.getElementById("latitude");
  const lon = document.getElementById("longitude");

  nominatimSearch(query, (json) => {
    if (json[0]) {
      city.textContent = json[0].name;

      lat.textContent = json[0].lat;
      lon.textContent = json[0].lon;
    } else {
      city.textContent = `"${query}" not found`;

      lat.textContent = "?";
      lon.textContent = "?";
    }
  });
});

const input = document.getElementById("input");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    document.getElementById("submit").click();
  }
});
