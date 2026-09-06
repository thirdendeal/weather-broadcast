"use strict";

let city = document.getElementById("city");

setTimeout(() => {
  fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((json) => {
      city.innerHTML = json.city;
    })
    .catch((error) => {
      city.innerHTML = "Unknown place";

      console.log(error);
    });
}, 50); // throttle usage
