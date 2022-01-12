var searchFormEl = document.querySelector("#search");

var getCurrentWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.518589&lon=-86.810356&exclude=alerts,minutely&appid=d35dfaab0c2da2d1c3dcb0514127ce3f";

    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok){
                response.json().then(function(data) {
                    console.log(data);
                })
            } else {
                alert("Error: " + response.statusText);
            }
        });
};

var displayCurrentWeather = function() {
    
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