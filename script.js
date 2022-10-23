// DOM Element References
var userLocation = document.querySelector('#location');
var todayTemp = document.querySelector('#today-temp');
var todayWind = document.querySelector('#today-wind');
var todayHumidity = document.querySelector('#today-humidity');
var searchCityForm = document.querySelector('#searchcityform');
var searchCityInput = document.querySelector('#searchcityinput');
var todayIcon = document.querySelector('#today-icon');
var icon1 = document.querySelector('#icon1');
var icon2 = document.querySelector('#icon2');
var icon3 = document.querySelector('#icon3');
var icon4 = document.querySelector('#icon4');
var icon5 = document.querySelector('#icon5');

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

function fiveDayForecastRender(data) {
    // Variables for the 5 day forecast dates
    var dateOne = data['list']['1']['dt_txt'];
    var dateTwo = data['list']['9']['dt_txt'];
    var datethree = data['list']['17']['dt_txt'];
    var datefour = data['list']['25']['dt_txt'];
    var datefive = data['list']['33']['dt_txt'];
    // Variables for the 5 day forecast icons
    var iconone = data['list']['1']['weather']['0']['icon'];
    var icontwo = data['list']['9']['weather']['0']['icon'];
    var iconthree = data['list']['17']['weather']['0']['icon'];
    var iconfour = data['list']['25']['weather']['0']['icon'];
    var iconfive = data['list']['33']['weather']['0']['icon'];
    // Variables for the 5 day forecast temp
    var tempone = data['list']['1']['main']['temp'];
    var temptwo = data['list']['9']['main']['temp'];
    var tempthree = data['list']['17']['main']['temp'];
    var tempfour = data['list']['25']['main']['temp'];
    var tempfive = data['list']['33']['main']['temp'];
    // Variables for the 5 day forecast wind speed 
    var windone = data['list']['1']['wind']['speed'];
    var windtwo = data['list']['9']['wind']['speed'];
    var windthree = data['list']['17']['wind']['speed'];
    var windfour = data['list']['25']['wind']['speed'];
    var windfive = data['list']['33']['wind']['speed'];
    // Variables for the 5 day forecast Humidity 
    var humidityone = data['list']['1']['main']['humidity'];
    var humiditytwo = data['list']['9']['main']['humidity'];
    var humiditythree = data['list']['17']['main']['humidity'];
    var humidityfour = data['list']['25']['main']['humidity'];
    var humidityfive = data['list']['33']['main']['humidity'];
    // Uses the variables and appends the data to the HTML
    date1.textContent = `${dateOne}`;
    date2.textContent = `${dateTwo}`;
    date3.textContent = `${datethree}`;
    date4.textContent = `${datefour}`;
    date5.textContent = `${datefive}`;
    // Inserts the links to the HTML
    icon1.src = `http://openweathermap.org/img/wn/${iconone}@4x.png`;
    icon2.src = `http://openweathermap.org/img/wn/${icontwo}@4x.png`;
    icon3.src = `http://openweathermap.org/img/wn/${iconthree}@4x.png`;
    icon4.src = `http://openweathermap.org/img/wn/${iconfour}@4x.png`;
    icon5.src = `http://openweathermap.org/img/wn/${iconfive}@4x.png`;
    // Appends the information
    temp1.textContent = `Temp: ${tempone}°F`;
    temp2.textContent = `Temp: ${temptwo}°F`;
    temp3.textContent = `Temp: ${tempthree}°F`;
    temp4.textContent = `Temp: ${tempfour}°F`;
    temp5.textContent = `Temp: ${tempfive}°F`;
    // Appends the wind speed info
    wind1.textContent = `${windone} MPH`;
    wind2.textContent = `${windtwo} MPH`;
    wind3.textContent = `${windthree} MPH`;
    wind4.textContent = `${windfour} MPH`;
    wind5.textContent = `${windfive} MPH`;
    // Appends the Humidity information
    humidity1.textContent = `${humidityone}%`;
    humidity2.textContent = `${humiditytwo}%`;
    humidity3.textContent = `${humiditythree}%`;
    humidity4.textContent = `${humidityfour}%`;
    humidity5.textContent = `${humidityfive}%`;
}


// Converts the input value from the user searching to a string value.
function searchFormSubmit() {
    var searchCity = searchCityInput.value.trim();
    fetchCityCoords(searchCity);
    searchCity.value = '';
}

// Fetches the weather location IE lat & Lon and is used as parameters for fetchWeather function
function fetchCityCoords(searchCity) {
    var apiLink = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=eecc46db8fa2385bac54dd8f8c273033`;
    fetch(apiLink)
        .then(Response => Response.json())
        .then(data => {
            fetchWeather([data[0]]);
            fetchForecast([data[0]]);
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

function fetchForecast (data) {
    var lat = data ['0']['lat'];
    var lon = data ['0']['lon'];
    var apiLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=eecc46db8fa2385bac54dd8f8c273033&units=imperial`;
    fetch(apiLink)
        .then(Response => Response.json())
        .then(data => {
            fiveDayForecastRender(data);
            console.log(data);
        })
}


searchCityForm.addEventListener('submit', searchFormSubmit)