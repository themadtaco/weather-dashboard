var searchFormEl = document.querySelector("#search");
var apiKey = "d35dfaab0c2da2d1c3dcb0514127ce3f";

var getCurrentWeather = async function(city) {
    // get lat & lon of city
    var latLongApi = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey);

    var latLongData = await latLongApi.json();
    var latitude = latLongData[0].lat;
    var longitude = latLongData[0].lon;

    // get current weather for city
    var apiResponse = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +"&units=imperial&exclude=alerts,minutely&appid=" + apiKey);
    var data = await apiResponse.json();

    console.log(data);

    // HTML variables
    var currentDate = document.querySelector('#city');
    var currentTemperature = document.querySelector('#temp');
    var currentWind = document.querySelector('#wind');
    var currentHumiity = document.querySelector('#humidity');
    var currentUV = document.querySelector('#uv');

    // setting HTML elements to current weather
    currentDate.textContent = data.current.dt * 1000;
    currentTemperature.textContent = "Temp: " + data.current.temp + " °F";
    currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
    currentHumiity.textContent = "Humidity: " + data.current.humidity + " %";
    currentUV.textContent = "UV Index: " + data.current.uvi;

    
};

getCurrentWeather("Dallas");

// var formSubmitHandler = function(event) {
//     // prevent page from refreshing
//     event.preventDefault();

//     // get value from input element
//     var city = searchFormEl.value.trim();

//     if (city) {
//         getCurrentWeather(city);
//     }
// };