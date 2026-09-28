// Day
// -----------------------------------------------------------------------------

function createDayHTML(day) {
  return `
    <div class="tv-placement"></div>

    <i>${day.today ?? "<br />"}</i>

    <h3 class="day__weekday">${day.weekday}</h3>
    <h4 class="day__number">${day.number}</h4>
    
    <br />
    
    <p class="day__code invisible">${day.code}</p>
    <p class="day__max invisible">${day.max}</p>
    <p class="day__min invisible">${day.min}</p>
    <p class="day__rain invisible">${day.rain} 🌧️</p>
    <p class="day__uv invisible">
      UV 
      <span class="day__uv-index" style="background-color: ${day.uvColor}">
        ${day.uv}
      </span>
    </p>
    <p class="day__sunrise invisible">${day.sunrise} ☀️↑</p>
    <p class="day__sunset invisible">${day.sunset} ☀️↓</p>
  `;
}

// -----------------------------------------------------------------------------

function Day(day, id) {
  const element = document.createElement("article");

  element.className = "day";
  element.id = id;

  element.innerHTML = createDayHTML(day);

  return element;
}

// -----------------------------------------------------------------------------

export default Day;
