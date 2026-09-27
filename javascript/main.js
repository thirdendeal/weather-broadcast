// Main
// -----------------------------------------------------------------------------

import { renderForecast } from "./main/render.js";
import { getIPAPI, getNominatim } from "./main/rest.js";

// -----------------------------------------------------------------------------

const city = document.getElementById("header__city");

const input = document.getElementById("header__input");
const submit = document.getElementById("header__submit");

// -----------------------------------------------------------------------------

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    submit.click();
  }
});

// Geolocation By IP (Automatic)
// -----------------------------------------------------------------------------

window.addEventListener("load", () => {
  getIPAPI((ipAPI) => {
    input.value = "";
    city.textContent = ipAPI.city;

    renderForecast(ipAPI.lat, ipAPI.lon);
  });
});

// Geolocation By Search
// -----------------------------------------------------------------------------

submit.addEventListener("click", () => {
  city.textContent = "...";

  getNominatim(input.value, (nominatim) => {
    if (nominatim[0]) {
      city.textContent = nominatim[0].name;

      document.getElementById("header__city-detail").textContent =
        nominatim[0].display_name;

      renderForecast(
        parseFloat(nominatim[0].lat),
        parseFloat(nominatim[0].lon),
      );
    } else {
      city.textContent = `"${input.value}" not found`;
    }
  });
});
