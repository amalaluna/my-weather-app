function formatDayTime(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function showCityTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempHeading = document.querySelector("span.degree-value");
  tempHeading.innerHTML = temp;
  let currentCloudiness = document.querySelector(".col-place-date .cloudiness");
  currentCloudiness.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windSpeed}km/h`;
}

function showCoords(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiWeatherUrl).then(showCityTemp);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiCityCoordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&&appid=${apiKey}`;
  axios.get(apiCityCoordsUrl).then(showCoords);
}

function findCityName(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data[0].name;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiWeatherUrl).then(showCityTemp);
  let apiCityNameUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&&appid=${apiKey}`;
  axios.get(apiCityNameUrl).then(findCityName);
}

function getCurrentData() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let now = new Date();
let currentDayTime = document.querySelector(".col-place-date .time-now");
currentDayTime.innerHTML = formatDayTime(now);

let city = document.querySelector("#search-sity-form");
city.addEventListener("submit", showCity);

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getCurrentData);

// function switchFahrenheit() {
//   let changeDegrees = document.querySelector("#degree-value");
//   changeDegrees.innerHTML = Math.round((22 * 9) / 5 + 32);
// }
// let unitsFahrenheit = document.querySelector("#fahrenheit");
// unitsFahrenheit.addEventListener("click", switchFahrenheit);

// function switchCelsius() {
//   let changeDegrees = document.querySelector("#degree-value");
//   changeDegrees.innerHTML = Math.round(((72 - 32) * 5) / 9);
// }
// let unitsCelsius = document.querySelector("#celsius");
// unitsCelsius.addEventListener("click", switchCelsius);
