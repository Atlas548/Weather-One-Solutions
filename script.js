// DOM Element References
var userLocation = document.querySelector('#location');
var todayTemp = document.querySelector('#today-temp');
var todayWind = document.querySelector('#today-wind');
var todayHumidity = document.querySelector('#today-humidity');
var searchCityForm = document.querySelector('#searchcityform');
var searchCityInput = document.querySelector('#searchcityinput');
var todayIcon = document.querySelector('#today-icon');
 
// Renders the daily forecast using the data parameter 
function dailyForcastRender(data) {
    var tempValue = data['main']['temp'];
    var locationValue = data['name'];
    var weatherIconToday = data['weather']['0']['icon'];
    var windValue = data['wind']['speed'];
    var humidityValue = data['main']['humidity'];   
    todayTemp.textContent = `Current Temp: ${tempValue} °F`;
    userLocation.textContent = `${locationValue}`;
    todayIcon.src = `http://openweathermap.org/img/wn/${weatherIconToday}@4x.png`;
    todayWind.textContent = `Wind: ${windValue} MPH`;
    todayHumidity.textContent = `Humidity: ${humidityValue}%`;
}

// function fiveDayForecastRender() {

// }


// Converts the input value from the user searching to a string value.
function searchFormSubmit() {
    var searchCity = searchCityInput.value.trim();
    fetchCityCoords(searchCity);
    searchCity.value = '';
}

// Fetches the weather location IE lat & Lon and is used as parameters for fetchWeather function
function fetchCityCoords(searchCity) {
    var apiLink = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=eecc46db8fa2385bac54dd8f8c273033`;
    console.log(apiLink);
    fetch(apiLink)
        .then(Response => Response.json())
        .then(data => {
            fetchWeather([data[0]]);
            console.log(data);
        })
}

// Uses the searched location from the fetchCityCoords function to fetch the data from the API
function fetchWeather (data) {
    var lat = data ['0']['lat'];
    var lon = data ['0']['lon'];
    var apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&metric&appid=eecc46db8fa2385bac54dd8f8c273033&units=imperial`;
    fetch(apiLink)
        .then(Response => Response.json())
        .then(data => {
            dailyForcastRender(data);
            console.log(data);
        })
}

searchCityForm.addEventListener('submit', searchFormSubmit)