// Render
// -----------------------------------------------------------------------------

import { createDayElement } from "./render/day.js";
import { createTV_Element } from "./render/tv.js";

import { normalizeOpenMeteoDay } from "./render/normalize.js";

// -----------------------------------------------------------------------------

const title = document.getElementById("month-year");
const days = document.getElementById("days");

// -----------------------------------------------------------------------------

function renderOpenMeteo(payload) {
  title.innerHTML = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  days.innerHTML = ""; // prevent concurrent rendering
  for (let index = 0; index < 5; index++) {
    const normalizedDay = normalizeOpenMeteoDay(payload, index);

    days.appendChild(createDayElement(normalizedDay, `day-${index}`)); // 5-day forecast
  }

  document
    .querySelector("#day-1 .tv-placement")
    .appendChild(createTV_Element());
}

// -----------------------------------------------------------------------------

export { renderOpenMeteo };
