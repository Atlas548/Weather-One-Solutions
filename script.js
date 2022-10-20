// DOM Element References
var userLocation = document.querySelector('#location');
var todayTemp = document.querySelector('#today-temp');
var todayWind = document.querySelector('#today-wind');
var todayHumidity = document.querySelector('#today-humidity');
var todayUvindex = document.querySelector('#today-uvindex');
var searchCityForm = document.querySelector('#searchcityform');
// var searchCityInput = document.querySelector('#searchcityinput');



// function searchFormInput() {
//     const searchCityInput = document.getElementById("search").value;
//     return searchCityInput;
// }

function appendSearch() {
    var appendLocation = document.getElementById("search").value;
    document.getElementById("location").innerHTML = appendLocation;
}



