// DOM Element References
var userLocation = document.querySelector('#location');
var todayTemp = document.querySelector('#today-temp');
var todayWind = document.querySelector('#today-wind');
var todayHumidity = document.querySelector('#today-humidity');
var todayUvindex = document.querySelector('#today-uvindex');
var searchCityForm = document.querySelector('#searchcityform');
var searchCityInput = document.querySelector('#searchcityinput');
 
function dailyForcastRender() {
    console.log(city);
    console.log(data.timezone);
}

function fiveDayForecastRender() {

}

// Function to pass specific parameters to dailyForcastrender function & fiveDayForcastrender function 
function renderWeatherInfo(data, city) {
    dailyForcastRender(city, data.timezone, data.current);
    fiveDayForecastRender(data.daily, data.timezone);
}

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
    console.log(apiLink);
    console.log(lat);
    console.log(lon);

    fetch(apiLink)
        .then(Response => Response.json())
        .then(data => {
            renderWeatherInfo(data, city);
            console.log(city);
            console.log(data);
        })
}

searchCityForm.addEventListener('submit', searchFormSubmit)

// function locationTest() {
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(location => {
//             lat = location.coords.latitude;
//             lon = location.coords.longitude;
//             console.log(lat, lon)
//         })
//     }
// };

// locationTest();

