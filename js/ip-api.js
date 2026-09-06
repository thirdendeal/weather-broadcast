"use strict";

function ipAPI(callback) {
  fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.log(error));
}
