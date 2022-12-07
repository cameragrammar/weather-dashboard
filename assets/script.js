const dateEl = document.getElementById('date');
const timeEl = document.getElementById('time');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='d064d50bdad3977fc6ae9d07fb12482e';

var cityHistory = [];
if (localStorage.getItem("cityHistory")) {
  cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
  createHistoryList(cityHistory);
}


 else {
  
        $("#main").removeAttr("style");
  if (cityHistory[0]) {
    getCurrentWeather(cityHistory[cityHistory.length -1]);
    getFiveDayForecast(cityHistory[cityHistory.length-1]);
  } else {
    getCurrentWeather("Salt Lake City");
    getFiveDayForecast("Salt Lake City");
  }
}

function createHistoryList(historyArray) {
  for (var i = 0; i < historyArray.length; i++) {
    var newA = $("<a>");
    newA.attr("class", "panel-block");
    newA.text(historyArray[i]);
    newA.attr("id", historyArray[i]);
    $("#cityHistoryContainer").prepend(newA);
  }
}

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + ' ' + months[month] + ' ' + date

}, 1000);


getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
      
      let {latitude, longitude } = success.coords;

      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_Key}').then(res => res.json()).then(data => {

      console.log(data)
      showWeatherData(data);
      })
    })
}

function showWeatherData (data){
  let {temp, pressure, wind_speed, uvi} = data.current;

  currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
          <div>Temperature</div>
          <div>${temp}</div>
        </div>
        <div class="weather-item">
          <div>Pressure</div>
          <div>${pressure}</div>
        </div>
        <div class="weather-item">
          <div>Wind Speed</div>
          <div>${wind_speed}</div>
        </div>
        <div class="weather-item">
          <div>UV Index</div>
          <div>${uvi}</div>
        </div>`;

}