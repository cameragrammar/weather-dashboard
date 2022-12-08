//call variables

var contentEl = document.querySelector("#content");
var weatherEl = document.querySelector("#weather-data");
var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-input");

var APIkey = "d064d50bdad3977fc6ae9d07fb12482e";

//local storage
function searchHistory(city) {
    var history = JSON.parse(window.localStorage.getItem("search")) || [];
    if (history.indexOf(city) === -1) {
        history.push(city);
        window.localStorage.setItem("search", JSON.stringify(history));
    }
}

//geo location
function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getWeather(lat, lon);
    });
}

//search button event listener
searchFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    var city = searchInputEl.value.trim();
    if (city) {
        getWeather(city);
        searchHistory(city);
        searchInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
});




//display current weather
function displayWeather(data, city) {
    //clear old content
    weatherEl.textContent = "";
    contentEl.textContent = "";

    //create date element
    var currentDate = document.createElement("span");
    currentDate.textContent = " (" + moment(data.dt.value).format("MMM D, YYYY") + ") ";
    contentEl.appendChild(currentDate);

    //create an image element
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    contentEl.appendChild(weatherIcon);

    //create a span element to hold temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + data.main.temp + " °F";
    temperatureEl.classList = "list-group-item";

    //create a span element to hold humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    humidityEl.classList = "list-group-item";

    //create a span element to hold wind speed data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item";

    //append to container
    contentEl.appendChild(temperatureEl);

    //append to container
    contentEl.appendChild(humidityEl);

    //append to container
    contentEl.appendChild(windSpeedEl);

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    getUvIndex(lat, lon);
}

//get current weather
function getWeather(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, city);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
}

//get 5 day forecast
function getForecast(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForecast(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    }
    );
}





