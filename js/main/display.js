"use strict";

// -----------------------------------------------------------------------------

const WMO_CODE = {
  0: "Clear Sky",

  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",

  45: "Fog",
  48: "Depositing Rime Fog",

  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Intensity Drizzle",

  56: "Light Freezing Drizzle",
  57: "Dense Intensity Freezing Drizzle",

  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Intensity Rain",

  66: "Light Freezing Rain",
  67: "Heavy Intensity Freezing Rain",

  71: "Slight Snow Fall",
  73: "Moderate Snow Fall",
  75: "Heavy Intensity Snow Fall",

  77: "Snow Grains",

  80: "Slight Rain Showers",
  81: "Moderate Rain Showers",
  82: "Violent Rain Showers",

  85: "Slight Snow Showers",
  86: "Heavy Snow Showers",

  95: "Thunderstorm",

  96: "Slight Hail Thunderstorm",
  99: "Heavy Hail Thunderstorm",
};

// -----------------------------------------------------------------------------

function appendDayForecast(openMeteo, day, anchor) {
  const date = openMeteo.daily.time[day].substring(8);
  const code = WMO_CODE[openMeteo.daily.weather_code[day]];
  const min = `<span class="article__min">${openMeteo.daily.apparent_temperature_min[day]}</span> ${openMeteo.daily_units.apparent_temperature_min}`;
  const max = `<span class="article__max">${openMeteo.daily.apparent_temperature_max[day]}</span> ${openMeteo.daily_units.apparent_temperature_max}`;
  const rain = `${openMeteo.daily.precipitation_probability_max[day]} ${openMeteo.daily_units.precipitation_probability_max}`;

  const article = document.createElement("article");
  article.className = "article";

  const innerHTML = `
    <h3 class="article__title">${date}</h3>

    <p class="article__code">${code}</p>
    <p class="article__minmax">${min} - ${max}</p>
    <p class="article__rain">${rain} 🌧️</p>
  `;
  article.innerHTML = innerHTML.trim().replace(/\s+/g, " "); // trim squeeze whitespace

  anchor.appendChild(article);
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
