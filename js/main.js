"use strict";

// -----------------------------------------------------------------------------

const city = document.getElementById("city");

// IP Geolocation
// -----------------------------------------------------------------------------

window.addEventListener("load", () => {
  ipAPI((json) => {
    city.textContent = json.city;

    forecast(json.lat, json.lon);
  });
});

// Search
// -----------------------------------------------------------------------------

const input = document.getElementById("input");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  city.textContent = "...";

  nominatim(input.value, (json) => {
    const top = json[0];

    if (top) {
      city.textContent = top.name;

      const p = document.createElement("p");

      city.after(p);
      p.textContent = top.display_name;

      forecast(top.lat, top.lon);
    } else {
      city.textContent = `"${input.value}" not found`;
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
