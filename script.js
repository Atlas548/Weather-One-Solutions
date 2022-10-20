// DOM Element References
var userLocation = document.querySelector('#location');
var todayTemp = document.querySelector('#today-temp');
var todayWind = document.querySelector('#today-wind');
var todayHumidity = document.querySelector('#today-humidity');
var todayUvindex = document.querySelector('#today-uvindex');
var searchCityForm = document.querySelector('#searchcityform');
var searchCityInput = document.querySelector('#searchcityinput');

// Converts the input value from the user searching to a string value.
function searchFormSubmit() {
    var searchCity = searchCityInput.value.trim();
    fetchCityCoords(searchCity);
    searchCity.value = '';
    console.log(searchCity);
}

// Fetches the weather location IE lat & Lon and is used as parameters for fetchWeather function
function fetchCityCoords(searchCity) {
    var apiLink = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=eecc46db8fa2385bac54dd8f8c273033`;
    fetch(apiLink)
        .then(function (res) {
// Returns the json File
            return res.json();
        })
// Send the data as a parameter to the fetchWeather function
        .then(function (data) {
            fetchWeather(data[0]);
        })
}

// Uses the searched location from the fetchCityCoords function to fetch the data from the API
function fetchWeather (location) {
    var apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=eecc46db8fa2385bac54dd8f8c273033`;
    var city = location.name;
    var {lat} = location;
    var {lon} = location;

    fetch(apiLink)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        renderWeatherInfo(city, data)
    })
}

searchCityForm.addEventListener('submit', searchFormSubmit);



