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

// Tempo
// -----------------------------------------------------------------------------

const tvScreen = document.getElementById("tv-screen");

let timeouts = [];

tv.addEventListener("click", () => {
  const dataPoints = document.querySelectorAll(".day p");

  const tvPosition = Number(tv.parentElement.id.split("-").at(-1));

  const columns = document.querySelectorAll(`.day`).length;
  const rows = dataPoints.length / columns;

  const multiColumn = document.getElementById("checkbox").checked;

  if (tv.draggable == false) {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    timeouts = [];

    for (let count = 1; count <= dataPoints.length; count++) {
      tvScreen.classList.remove(`tv-screen-card-${count}`);
    }

    tv.draggable = true;

    return;
  }

  tv.draggable = false;

  tvScreen.classList.add("tv-screen-card-1"); // instant card 1

  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    if (!multiColumn && columnIndex != tvPosition) continue;

    dataPoints[columnIndex * rows].classList.remove("invisible"); // instant info row 1
  }

  for (let count = 1; count <= rows; count++) {
    timeouts.push(
      setTimeout(() => {
        tvScreen.classList.remove(`tv-screen-card-${count}`);

        if (count == rows) {
          tv.draggable = true;
        } else {
          tvScreen.classList.add(`tv-screen-card-${count + 1}`); // card 2 up to n

          for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
            if (!multiColumn && columnIndex != tvPosition) continue;

            dataPoints[columnIndex * rows + count].classList.remove(
              "invisible",
            ); // info row 2 up to n
          }
        }
      }, count * 1000),
    );
  }
});
