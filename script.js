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

// Fetches the weather data from the (searchCity Parameter) 
function fetchCityCoords(searchCity) {
    var apiLink = 
}

searchCityForm.addEventListener('submit', searchFormSubmit);



