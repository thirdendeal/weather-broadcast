"use strict";

// -----------------------------------------------------------------------------

const RELATIVE_DATE = {
  0: "Today",
  1: "Tomorrow",
};

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

function appendDayForecast(openMeteo, day, anchor) {
  const article = document.createElement("article");
  article.className = "article";

  const wd = normalizeWeatherData(openMeteo, day);
  const innerHTML = `
    <h3 class="article__title">${wd.relative ?? wd.date}</h3>

    <p class="article__code">${wd.code}</p>
    <p class="article__minmax"><span class="article__min">${wd.min}</span> - <span class="article__max">${wd.max}</span></p>
    <p class="article__rain">${wd.rain} 🌧️</p>
  `;
  article.innerHTML = innerHTML.trim().replace(/\s+/g, " "); // trim squeeze whitespace

  anchor.appendChild(article);
}

function normalizeWeatherData(openMeteo, day) {
  return {
    date: openMeteo.daily.time[day].substring(8),
    relative: RELATIVE_DATE[day],
    code: WEATHER_DESCRIPTION[openMeteo.daily.weather_code[day]],
    min: `${openMeteo.daily.apparent_temperature_min[day]} ${openMeteo.daily_units.apparent_temperature_min}`,
    max: `${openMeteo.daily.apparent_temperature_max[day]} ${openMeteo.daily_units.apparent_temperature_max}`,
    rain: `${openMeteo.daily.precipitation_probability_max[day]} ${openMeteo.daily_units.precipitation_probability_max}`,
  };
}

// -----------------------------------------------------------------------------

function display(latitude, longitude) {
  console.log(latitude, longitude);

  const anchor = document.getElementById("main");
  anchor.innerHTML = "";

  forecast(latitude, longitude, (openMeteo) => {
    for (let day = 0; day < 4; day++) {
      appendDayForecast(openMeteo, day, anchor);
    }
  });
}
