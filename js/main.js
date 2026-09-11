"use strict";

// -----------------------------------------------------------------------------

const city = document.getElementById("city");

// Geolocation By IP (Automatic)
// -----------------------------------------------------------------------------

window.addEventListener("load", () => {
  ipGeocode((ipAPI) => {
    city.textContent = ipAPI.city;

    display(ipAPI.lat, ipAPI.lon);
  });
});

// Geolocation By Search
// -----------------------------------------------------------------------------

const input = document.getElementById("input");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  city.textContent = "...";

  geocode(input.value, (nominatim) => {
    if (nominatim[0]) {
      city.textContent = nominatim[0].name;

      const p = document.createElement("p");

      city.after(p);
      p.textContent = nominatim[0].display_name;

      display(nominatim[0].lat, nominatim[0].lon);
    } else {
      city.textContent = `"${input.value}" not found`;
    }
  });
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    submit.click();
  }
});
