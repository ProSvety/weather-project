let data = [];
const cities = [
  {
    name: "Kyiv",
    temperatureC: 26.6,
    temperatureF: 79.88,
    humidity: 80,
  },
  {
    name: "London",
    temperatureC: 21.2,
    temperatureF: 70.16,
    humidity: 67,
  },
  {
    name: "Rome",
    temperatureC: 41.5,
    temperatureF: 106.7,
    humidity: 67,
  },
];
const apiKey = "3b976f4fbd14763ef2aa8d3fb06f5136";
//weatherIcons = {
//  rain: "☔︎",
//  snow: "❅",
//  extreme: "E",
//  clear: "☀",
//  clouds: "☁️",
//};
//let city = prompt("Enter the city");
//let currentCity;
//for (let i = cities.length - 1; i >= 0; i--) {
// if (
//  city.toString().toLowerCase() === cities[i].name.toString().toLowerCase()
//) {
//  currentCity = cities[i];
//  break;
//}
//}
//if (currentCity) {
//  alert(
//    "It is currently " +
//      Math.round(currentCity.temperatureC) +
//     "°C (" +
//     Math.round(currentCity.temperatureF) +
//      "°F) in " +
//      currentCity.name +
//     " with a humidity of " +
//      currentCity.humidity +
//      "%"
//  );
//} else {
//  alert(
//    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
//      city
//  );
//}
function formatDate(date) {
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]}, ${hours}:${minutes}`;
}

function submittedСity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h2 = document.querySelector("h2.city");
  // h2.innerHTML = searchInput.value;
  searchByCity(searchInput.value);
}

const responseListener = function (response) {
  data = response.data;
  console.log(response);
  fillCurrentWheather();
};

const fillCurrentWheather = function () {
  let icon = document.querySelector("img.icon");
  icon.src =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  let currentCity = document.querySelector("h2.city");
  currentCity.innerHTML = data.name;
  displayTemperature();
  let maxTemp = document.querySelector("span.maxtemperature");
  maxTemp.innerHTML = Math.round(data.main.temp_max) + "°C";
  let minTemp = document.querySelector("span.mintemperature");
  minTemp.innerHTML = Math.round(data.main.temp_min) + "°C";
  let windspeed = document.querySelector("div.additional span.windspeed");
  windspeed.innerHTML = "Wind: " + Math.round(data.wind.speed) + "m/s";
  let humidity = document.querySelector("div.additional span.humidity");
  humidity.innerHTML = "Humidity:" + Math.round(data.main.humidity) + "%";
  let description = document.querySelector("div.currentdescription");
  description.innerHTML = data.weather[0].description;
};

function searchByCity(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(responseListener);
}

function searchByCoords(lat, lon) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(responseListener);
}

function convertToFahrenheit(temp) {
  return (temp * 9) / 5 + 32;
}

let changeTemperatureUnit = function (event) {
  let activeClass = "active";
  event.preventDefault();
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove(activeClass);
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.remove(activeClass);
  event.target.classList.add(activeClass);
  displayTemperature();
};

function displayTemperature() {
  let temp = data.main.temp;
  let activeUnit = document.querySelector(".units .active");
  if (activeUnit && activeUnit.id === "fahrenheit-link") {
    temp = convertToFahrenheit(temp);
  }
  let temperatureElement = document.querySelector("h2.currenttemp");
  temperatureElement.innerHTML = Math.round(temp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeTemperatureUnit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeTemperatureUnit);

function onload() {
  let h1 = document.querySelector("h1");
  h1.innerHTML = formatDate(new Date());
  let submit = document.querySelector(".choosecitybutton");
  submit.addEventListener("click", submittedСity);
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    searchByCoords(latitude, longitude);
  });
}

window.addEventListener("load", onload);
