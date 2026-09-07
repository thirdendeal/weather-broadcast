"use strict";

// -----------------------------------------------------------------------------

const city = document.getElementById("city");

const lat = document.getElementById("latitude");
const lon = document.getElementById("longitude");

// IP Geolocation
// -----------------------------------------------------------------------------

window.addEventListener("load", () => {
  ipAPI((json) => {
    city.textContent = json.city;

    lat.textContent = json.lat;
    lon.textContent = json.lon;
  });
});

// Search
// -----------------------------------------------------------------------------

const input = document.getElementById("input");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  city.textContent = "...";

  lat.textContent = "...";
  lon.textContent = "...";

  nominatim(input.value, (json) => {
    if (json[0]) {
      city.textContent = json[0].name;

      lat.textContent = json[0].lat;
      lon.textContent = json[0].lon;

      const p = document.createElement("p");

      city.after(p);
      p.textContent = json[0].display_name;
    } else {
      city.textContent = `"${input.value}" not found`;

      lat.textContent = "?";
      lon.textContent = "?";
    }
  });
});

// Enter -> Submit

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    submit.click();
  }
});
