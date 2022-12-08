//call variables for html elements
var searchBtn = document.querySelector("#searchBtn");
var searchInput = document.querySelector("#searchInput");
var cityList = document.querySelector("#cityList");
var city = document.querySelector("#city");
var temp = document.querySelector("#temp");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("#wind");
var uv = document.querySelector("#uv");
var forecast = document.querySelector("#forecast");

//var for api key
var apiKey = "d064d50bdad3977fc6ae9d07fb12482e"

//local storage


//display today's weather
function displayWeather(data, searchCity) {
    var today = document.querySelector("#today");
    var output = "";
    output += "<h2> Today's weather for " + searchCity + "</h2>";
    output += "Temperature " + data.main.temp + "°F <br>";
    output += "Humidity " + data.main.humidity + "% <br>";
    output += "Wind Speed " + data.wind.speed + "MPH <br>";
    today.innerHTML = output;
    getLatLon(data, searchCity);
}

//display extended forecast
function displayExtendedForecast(data, searchCity) {
    var output = "";
    output += "<h2> Extended Forecast for " + searchCity + "</h2>";
    output += "<div class='columns'>";
    for (var i = 0; i < 5; i++) {
        output += "<div class='column'>";
        output += "<div class='card'>";
        output += "<div class='card-content'>";
        output += "<div class='media'>";
        output += "<div class='media-content'>";
        output += "<p class='title is-5'> Day " + (i + 1) + "</p>";
        output += "</div>";
        output += "</div>";
        output += "<div class='content'>";
        var year= data.list[i].dt_txt.substring(0,4);
        var month= data.list[i].dt_txt.substring(5,7);
        var day= data.list[i].dt_txt.substring(8,10);
        var date = month+"/"+day+"/"+year;
        output += "<p class='subtitle is-6'> Date " + date + "</p>";
        output += "<p class='subtitle is-6'> Date " + data.list[i].dt_txt + "</p>";
        output += "<p class='subtitle is-6'> Temperature " + data.list[i].main.temp + "°F </p>";
        output += "<p class='subtitle is-6'> Humidity " + data.list[i].main.humidity + "% </p>";
        output += "</div>";
        output += "</div>";
        output += "</div>";
        output += "</div>";
        
    }
    output += "</div>";
   document.querySelector("#five-day-output").innerHTML = output;
}

//extract lat and lon from api
function getLatLon(data, cityName) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=imperial";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayExtendedForecast(data, cityName);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        }
        )
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        }
        );
}

//function to get weather data
function getWeather(cityName) {
    //fetch weather data
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, cityName);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        }
        )
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        }
        );
}

//search function
function searchCity(event) {
    event.preventDefault();
    var cityName = searchInput.value.trim();
    if (cityName) {
        getWeather(cityName);
        searchHistory.push(cityName);
        searchInput.value = "";
    } else {
        alert("Please enter a city");
    }
    saveSearch();
    pastSearch(cityName);
}

//save search history
function saveSearch() {
    localStorage.setItem("search", JSON.stringify(searchHistory));
}

document.querySelector("#searchBtn").addEventListener("click", searchCity);