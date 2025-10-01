const apiKey = "d0c4fec3e9fdc9c111b0261257e45ecc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);
    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
    document.getElementById("desc").innerHTML = data.weather[0].description;

    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
