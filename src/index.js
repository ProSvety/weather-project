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
const weatherIcons = {
  rain: "☔︎",
  snow: "❅",
  extreme: "E",
  clear: "☀",
  clouds: "☁️",
};
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

function searchByCity(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(function (response) {
    let data = response.data;
    console.log(response);
    let icon = weatherIcons[data.weather[0].main.toString().toLowerCase()];
    icon = icon ? icon : "";
    let currentCity = document.querySelector("h2.city");
    currentCity.innerHTML = data.name;
    let celsiusTemperature = response.data.main.temp;
    let temp = document.querySelector("h2.currenttemp");
    temp.innerHTML = icon + Math.round(celsiusTemperature) + "°C";
    let maxTemp = document.querySelector("span.maxtemperature");
    maxTemp.innerHTML = Math.round(data.main.temp_max) + "°C";
    let minTemp = document.querySelector("span.mintemperature");
    minTemp.innerHTML = Math.round(data.main.temp_min) + "°C";
    let windspeed = document.querySelector("span.additional.windspeed");
    windspeed.innerHTML = "Wind: " + data.wind.speed + "m/s";
    let humidity = document.querySelector("span.additional.humidity");
    humidity.innerHTML = "Humidity:" + data.main.humidity;
    let description = document.querySelector("span.currentdescription");
    description.innerHTML = data.weather[0].description;
  });
}

function searchByCoords(lat, lon) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(function (response) {
    let data = response.data;
    console.log(data);
    let icon = weatherIcons[data.weather[0].main.toString().toLowerCase()];
    icon = icon ? icon : "";
    let currentCity = document.querySelector("h2.city");
    currentCity.innerHTML = data.name;
    let temp = document.querySelector("h2.currenttemp");
    temp.innerHTML = icon + Math.round(celsiusTemperature) + "°C";
    let maxTemp = document.querySelector("span.maxtemperature");
    maxTemp.innerHTML = Math.round(data.main.temp_max) + "°C";
    let minTemp = document.querySelector("span.mintemperature");
    minTemp.innerHTML = Math.round(data.main.temp_min) + "°C";
    let windspeed = document.querySelector("span.additional.windspeed");
    windspeed.innerHTML = "Wind: " + data.wind.speed + "m/s";
    let humidity = document.querySelector("span.additional.humidity");
    humidity.innerHTML = "Humidity:" + data.main.humidity;
    let description = document.querySelector("span.currentdescription");
    description.innerHTML = data.weather[0].description;
  });
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("currentTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

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
