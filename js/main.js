"use strict";

let city = document.getElementById("city");

setTimeout(() => {
  ipAPI((json) => {
    city.innerHTML = json.city;
  });
}, 50); // throttle (live) reload usage
