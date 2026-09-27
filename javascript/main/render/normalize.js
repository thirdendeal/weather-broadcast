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

function normalizeOpenMeteoDay(payload, index) {
  const uv = payload.daily.uv_index_max[index].toFixed(1);

  return {
    code: WEATHER_DESCRIPTION[payload.daily.weather_code[index]],
    number: payload.daily.time[index].substring(8), // DD
    weekday: new Date(
      `${payload.daily.time[index]}T00:00:00`,
    ).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    max: `${payload.daily.apparent_temperature_max[index].toFixed(0)} ${payload.daily_units.apparent_temperature_max}`,
    min: `${payload.daily.apparent_temperature_min[index].toFixed(0)} ${payload.daily_units.apparent_temperature_min}`,
    rain: `${payload.daily.precipitation_probability_max[index]} ${payload.daily_units.precipitation_probability_max}`,
    today: index === 0 ? "Today" : null,
    uv,
    uvColor: uvColor(uv),
    sunrise: payload.daily.sunrise[index].substring(11), // HH:MM
    sunset: payload.daily.sunset[index].substring(11), // HH:MM
  };
}

// -----------------------------------------------------------------------------

export { normalizeOpenMeteoDay };
