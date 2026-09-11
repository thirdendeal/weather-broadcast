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

function log(latitude, longitude) {
  document.getElementById("latitude").textContent = latitude;
  document.getElementById("longitude").textContent = longitude;

  forecast(latitude, longitude, (openMeteo) => {
    console.log(openMeteo.daily.time[0]);

    console.log(openMeteo.timezone);
    console.log(openMeteo.timezone_abbreviation);

    console.log(WMO_CODE[openMeteo.daily.weather_code[0]]);

    console.log(
      openMeteo.daily.apparent_temperature_min[0] +
        " " +
        openMeteo.daily_units.apparent_temperature_min,
    );

    console.log(
      openMeteo.daily.apparent_temperature_max[0] +
        " " +
        openMeteo.daily_units.apparent_temperature_max,
    );

    console.log(
      openMeteo.daily.precipitation_probability_max[0] +
        " " +
        openMeteo.daily_units.precipitation_probability_max,
    );
  });
}
