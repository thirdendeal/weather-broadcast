// Day
// -----------------------------------------------------------------------------

function createDayHTML(day) {
  return `
    <div class="tv-placement"></div>

    <i>${day.today ?? "<br />"}</i>

    <h3 class="day__weekday">${day.weekday}</h3>
    <h4 class="day__number">${day.number}</h4>
    
    <br />
    
    <p class="day__code">${day.code}</p>
    <p class="day__max">${day.max}</p>
    <p class="day__min">${day.min}</p>
    <p class="day__rain">${day.rain} 🌧️</p>
    <p class="day__uv">
      UV 
      <span class="day__uv-index" style="background-color: ${day.uvColor}">
        ${day.uv}
      </span>
    </p>
    <p class="day__sunrise">${day.sunrise} ☀️↑</p>
    <p class="day__sunset">${day.sunset} ☀️↓</p>
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
