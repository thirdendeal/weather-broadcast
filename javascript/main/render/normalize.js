// Normalize
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

function normalizeOpenMeteoDay(response, index) {
  const givenDay = response.daily.time[index]; // YYYY-MM-DD

  return {
    code: WEATHER_DESCRIPTION[response.daily.weather_code[index]],
    day: givenDay.substring(8), // DD
    weekday: new Date(`${givenDay}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    max: `${Number(response.daily.apparent_temperature_max[index]).toFixed(0)} ${response.daily_units.apparent_temperature_max}`,
    min: `${Number(response.daily.apparent_temperature_min[index]).toFixed(0)} ${response.daily_units.apparent_temperature_min}`,
    rain: `${response.daily.precipitation_probability_max[index]} ${response.daily_units.precipitation_probability_max}`,
    relative: index === 0 ? "Today" : null,
    uv: Number(response.daily.uv_index_max[index]).toFixed(1),
    sunrise: response.daily.sunrise[index].substring(11), // YYYY-MM-DDTHH:MM -> HH:MM
    sunset: response.daily.sunset[index].substring(11),
  };
}

// -----------------------------------------------------------------------------

export { normalizeOpenMeteoDay };
