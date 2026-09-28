// Main
// -----------------------------------------------------------------------------

import { renderOpenMeteo } from "./main/render.js";
import { getIP_API, getNominatim, getOpenMeteo } from "./main/rest.js";

// -----------------------------------------------------------------------------

const input = document.getElementById("input");
const submit = document.getElementById("submit");

const place = document.getElementById("place");
const address = document.getElementById("address");

const days = document.getElementById("days");

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
  getIP_API((ipAPI) => {
    input.value = "";
    place.innerHTML = ipAPI.city;

    getOpenMeteo(ipAPI.lat, ipAPI.lon, (openMeteo) => {
      renderOpenMeteo(openMeteo);
    });
  });
});

// Geolocation By Search
// -----------------------------------------------------------------------------

submit.addEventListener("click", () => {
  // Clear data (instant response and load hint)

  place.innerHTML = "<br />";
  address.innerHTML = "<br />";

  days.innerHTML = "";

  getNominatim(input.value, (nominatim) => {
    if (nominatim[0]) {
      place.innerHTML = nominatim[0].name;
      address.innerHTML = nominatim[0].display_name;

      getOpenMeteo(
        parseFloat(nominatim[0].lat),
        parseFloat(nominatim[0].lon),
        (openMeteo) => {
          renderOpenMeteo(openMeteo);
        },
      );
    } else {
      place.innerHTML = `"${input.value}" not found`;
    }
  });
});

// TV
// -----------------------------------------------------------------------------

const tv = document.getElementById("tv");

tv.draggable = true;

document.querySelectorAll(".tv-position").forEach((tvPosition) => {
  tvPosition.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  tvPosition.addEventListener("dragenter", () => {
    if (tvPosition === tv.parentElement) return;

    tvPosition.style = "background-color: whitesmoke";
  });

  tvPosition.addEventListener("dragleave", () => {
    if (tvPosition === tv.parentElement) return;

    tvPosition.style = "";
  });

  tvPosition.addEventListener("drop", (event) => {
    if (tvPosition === tv.parentElement) return;

    event.target.style = "";
    event.target.appendChild(tv);
  });
});
