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

  nominatimSearch(query, (json) => {
    document.getElementById("city").textContent = json[0].name;

    document.getElementById("latitude").textContent = json[0].lat;
    document.getElementById("longitude").textContent = json[0].lon;
  });
});

const input = document.getElementById("input");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    document.getElementById("submit").click();
  }
});
