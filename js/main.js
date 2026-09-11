"use strict";

// -----------------------------------------------------------------------------

const city = document.getElementById("header__city");

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

const input = document.getElementById("header__input");
const submit = document.getElementById("header__submit");

submit.addEventListener("click", () => {
  city.textContent = "...";

  geocode(input.value, (nominatim) => {
    if (nominatim[0]) {
      city.textContent = nominatim[0].name;

      document.getElementById("header__city-detail").textContent =
        nominatim[0].display_name;

      display(parseFloat(nominatim[0].lat), parseFloat(nominatim[0].lon));
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
