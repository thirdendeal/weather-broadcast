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

function display(latitude, longitude) {
  console.log(latitude, longitude);

  forecast(latitude, longitude, (openMeteo) => {
    const DAY = 0; // today

    const code = openMeteo.daily.weather_code[DAY];
    const min = `${openMeteo.daily.apparent_temperature_min[DAY]} ${openMeteo.daily_units.apparent_temperature_min}`;
    const max = `${openMeteo.daily.apparent_temperature_max[DAY]} ${openMeteo.daily_units.apparent_temperature_max}`;
    const rain = `${openMeteo.daily.precipitation_probability_max[DAY]} ${openMeteo.daily_units.precipitation_probability_max}`;

    document.getElementById(`code-${DAY}`).textContent = WMO_CODE[code];
    document.getElementById(`min-${DAY}`).textContent = min;
    document.getElementById(`max-${DAY}`).textContent = max;
    document.getElementById(`rain-${DAY}`).textContent = rain;
  });
}
