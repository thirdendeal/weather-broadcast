// Render
// -----------------------------------------------------------------------------

import { getOpenMeteo } from "./rest.js";
import { normalizeOpenMeteoDay } from "./render/normalize.js";

// -----------------------------------------------------------------------------

function uvColor(uv) {
  if (uv > 10) {
    return "purple";
  } else if (uv > 7) {
    return "red";
  } else if (uv > 5) {
    return "orange";
  } else if (uv > 2) {
    return "#FFDB58"; // yellow
  } else {
    return "green";
  }
}

// -----------------------------------------------------------------------------

function appendDayForecast(openMeteo, dayIndex, anchor) {
  const wd = normalizeOpenMeteoDay(openMeteo, dayIndex);

  const forecast = `    
    <i>${wd.relative ?? "<br />"}</i>
    <h3 class="day__title">${wd.weekday}</h3>
    <h4 class="day__subtitle">${wd.day}</h4>

    <br />

    <p class="day__code">${wd.code}</p>
    <p class="day__max">${wd.max}</p>
    <p class="day__min">${wd.min}</p>
    <p class="day__rain">${wd.rain} 🌧️</p>
    <p class="day__uv">
      UV 
      <b style="padding: 0 0.25rem; color: white; background-color: ${uvColor(wd.uv)}">
        ${wd.uv}
      </b>
    </p>
    <p>${wd.sunrise} ☀️↑</p>
    <p>${wd.sunset} ☀️↓</p>
  `;

  const day = document.createElement("article");

  day.className = "day";
  day.innerHTML = forecast.trim().replace(/\s+/g, " "); // trim, squeeze

  anchor.appendChild(day);
}

// -----------------------------------------------------------------------------

function renderForecast(latitude, longitude) {
  const title = document.getElementById("main__title");
  title.textContent = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const days = document.getElementById("main__days");

  getOpenMeteo(latitude, longitude, (openMeteo) => {
    days.innerHTML = "";

    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
      appendDayForecast(openMeteo, dayIndex, days);
    }
  });
}

// -----------------------------------------------------------------------------

export { renderForecast };
