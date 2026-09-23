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

function appendDayForecast(openMeteo, dayIndex, anchor) {
  const wd = normalizeWeatherData(openMeteo, dayIndex);

  const forecast = `    
    <i>${wd.relative ?? "<br />"}</i>
    <h3 class="day__title">${wd.weekday}</h3>
    <h4 class="day__subtitle">${wd.day}</h4>

    <br />

    <p class="day__code">${wd.code}</p>
    <p class="day__max">${wd.max}</p>
    <p class="day__min">${wd.min}</p>
    <p class="day__rain">${wd.rain} 🌧️</p>
  `;

  const day = document.createElement("article");

  day.className = "day";
  day.innerHTML = forecast.trim().replace(/\s+/g, " "); // trim, squeeze

  anchor.appendChild(day);
}

function normalizeWeatherData(openMeteo, dayIndex) {
  const givenDay = openMeteo.daily.time[dayIndex]; // YYYY-MM-DD

  return {
    code: WEATHER_DESCRIPTION[openMeteo.daily.weather_code[dayIndex]],
    day: givenDay.substring(8), // DD
    weekday: new Date(`${givenDay}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    max: `${Number(openMeteo.daily.apparent_temperature_max[dayIndex]).toFixed(1)} ${openMeteo.daily_units.apparent_temperature_max}`,
    min: `${Number(openMeteo.daily.apparent_temperature_min[dayIndex]).toFixed(1)} ${openMeteo.daily_units.apparent_temperature_min}`,
    rain: `${openMeteo.daily.precipitation_probability_max[dayIndex]} ${openMeteo.daily_units.precipitation_probability_max}`,
    relative: dayIndex === 0 ? "Today" : null,
  };
}

// -----------------------------------------------------------------------------

function renderForecast(latitude, longitude) {
  const title = document.getElementById("main__title");
  title.textContent = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const days = document.getElementById("main__days");

  getForecast(latitude, longitude, (openMeteo) => {
    days.innerHTML = "";

    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
      appendDayForecast(openMeteo, dayIndex, days);
    }
  });
}
