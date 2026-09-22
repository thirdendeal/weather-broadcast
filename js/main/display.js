"use strict";

// -----------------------------------------------------------------------------

const WEATHER_DESCRIPTION = {
  0: "Clear Sky",

  1: "Mainly Clear",
  2: "Cloudy",
  3: "Overcast",

  45: "Fog",
  48: "Rime Fog",

  51: "Light Drizzle",
  53: "Drizzle",
  55: "Dense Drizzle",

  56: "Freezing Drizzle",
  57: "Dense Freezing Drizzle",

  61: "Slight Rain",
  63: "Rain",
  65: "Heavy Rain",

  66: "Light Freezing Rain",
  67: "Heavy Freezing Rain",

  71: "Slight Snow Fall",
  73: "Snow Fall",
  75: "Heavy Snow Fall",

  77: "Snow Grains",

  80: "Slight Rain Showers",
  81: "Rain Showers",
  82: "Violent Rain Showers",

  85: "Snow Showers",
  86: "Heavy Snow Showers",

  95: "Thunderstorm",

  96: "Hail Thunderstorm",
  99: "Heavy Hail Thunderstorm",
};

// -----------------------------------------------------------------------------

function squeeze(string) {
  return string.replace(/\s+/g, " "); // whitespace: \s
}

// -----------------------------------------------------------------------------

function appendDay(openMeteo, dayIndex, anchor) {
  const article = document.createElement("article");
  article.className = "day";

  const wd = normalizeWeatherData(openMeteo, dayIndex);
  const innerHTML = `    
    <h3 class="day__title">${wd.weekday}</h3>
    <h4 class="day__subtitle">${wd.day}</h4>

    <br />

    <p class="day__code">${wd.code}</p>
    <p class="day__minmax">
      <span class="day__min">${wd.min}</span> - <span class="day__max">${wd.max}</span>
    </p>
    <p class="day__rain">${wd.rain} 🌧️</p>
  `;
  article.innerHTML = squeeze(innerHTML.trim());

  anchor.appendChild(article);
}

function normalizeWeatherData(openMeteo, dayIndex) {
  const ymd = openMeteo.daily.time[dayIndex]; // YYYY-MM-DD
  const weekday = new Date(`${ymd}T00:00:00`).toLocaleString("en-US", {
    weekday: "long",
  });

  return {
    code: WEATHER_DESCRIPTION[openMeteo.daily.weather_code[dayIndex]],
    day: ymd.substring(8),
    weekday: dayIndex === 0 ? "Today" : weekday,
    max: `${openMeteo.daily.apparent_temperature_max[dayIndex]} ${openMeteo.daily_units.apparent_temperature_max}`,
    min: `${openMeteo.daily.apparent_temperature_min[dayIndex]} ${openMeteo.daily_units.apparent_temperature_min}`,
    rain: `${openMeteo.daily.precipitation_probability_max[dayIndex]} ${openMeteo.daily_units.precipitation_probability_max}`,
  };
}

// -----------------------------------------------------------------------------

function display(latitude, longitude) {
  const anchor = document.getElementById("days");
  anchor.innerHTML = "";

  forecast(latitude, longitude, (openMeteo) => {
    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
      appendDay(openMeteo, dayIndex, anchor);
    }
  });
}
