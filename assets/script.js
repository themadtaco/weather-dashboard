var searchFormEl = document.querySelector("#search");

var getCurrentWeather = function() {
    // var lat 
    // var lon



    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.518589&lon=-86.810356&units=imperial&exclude=alerts,minutely&appid=d35dfaab0c2da2d1c3dcb0514127ce3f";

    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok){
                response.json().then(function(data) {
                    displayCurrentWeather(data);
                })
            } else {
                alert("Error: " + response.statusText);
            }
        });
};

var displayCurrentWeather = function(data) {
    var currentDate = document.querySelector('#city');
    var currentTemperature = document.querySelector('#temp');
    var currentWind = document.querySelector('#wind');
    var currentHumiity = document.querySelector('#humidity');
    var currentUV = document.querySelector('#uv');

    currentDate.textContent = data.current.dt * 1000;
    currentTemperature.textContent = "Temp: " + data.current.temp + " °F";
    currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
    currentHumiity.textContent = "Humidity: " + data.current.humidity + " %";
    currentUV.textContent = "UV Index: " + data.current.uvi;




    // for(var i = 0; i < 5; i++) {
    //     console.log(data.daily[i]);

        
    // };
};

getCurrentWeather();

// var formSubmitHandler = function(event) {
//     // prevent page from refreshing
//     event.preventDefault();

//     // get value from input element
//     var city = searchFormEl.value.trim();

//     if (city) {
//         getCurrentWeather(city);
//     }
// };