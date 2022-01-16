var searchFormEl = document.querySelector("#search");
var searchButtonEl = document.querySelector("#sBtn");
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

    // get 5 day forecast data
    var forecastResponse = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey);
    var forecastData = await forecastResponse.json();

    console.log(forecastData);

    // create 5 day forecast cards
    var forecastEl = document.querySelectorAll(".forecast");
    for (i = 0; i < forecastEl.length; i++) {
        forecastEl[i].innerHTML = "";
        var forecastElParent = document.querySelectorAll(".card");
        forecastElParent[i].setAttribute("class", "card bg-primary white");
        
        // create forecast date
        var forecastIndex = i * 8 + 4;
        var forecastDate = new Date(forecastData.list[forecastIndex].dt * 1000);
        var forecastDay = forecastDate.getDate();
        var forecastMonth = forecastDate.getMonth() + 1;
        var forecastYear = forecastDate.getFullYear();
        var forecastDateEl = document.createElement("h5");
        forecastDateEl.setAttribute("class", "card-title");
        forecastDateEl.innerHTML = forecastMonth + "/" +  forecastDay + "/" + forecastYear;
        forecastEl[i].append(forecastDateEl);

        // create forecast icon
        var forecastIcon = document.createElement("img");
        forecastIcon.setAttribute("src", " http://openweathermap.org/img/wn/" + forecastData.list[forecastIndex].weather[0].icon + "@2x.png");
        forecastIcon.setAttribute("alt", forecastData.list[forecastIndex].weather[0].description);
        forecastEl[i].append(forecastIcon);

        // create forecast content
        var forecastTemp = document.createElement("p");
        forecastTemp.setAttribute("class", "card-text");
        forecastTemp.innerHTML = "Temp: " + forecastData.list[forecastIndex].main.temp + "°F";
        forecastEl[i].append(forecastTemp);

        var forecastWind = document.createElement("p");
        forecastWind.setAttribute("class", "card-text");
        forecastWind.innerHTML = "Wind: " + forecastData.list[forecastIndex].wind.speed + " MPH";
        forecastEl[i].append(forecastWind);

        var forecastHumidity = document.createElement("p");
        forecastHumidity.setAttribute("class", "card-text");
        forecastHumidity.innerHTML = "Humidity: " + forecastData.list[forecastIndex].main.temp + "%";
        forecastEl[i].append(forecastHumidity);
    }

    // var forecast1Date = document.querySelector("#forecast1Date");
    // var forecast1Icon = document.querySelector("#forecast1Icon");
    // var forecast1Temp = document.querySelector("#forecast1Temp");
    // var forecast1Wind = document.querySelector("#forecast1Wind");
    // var forecast1Humidity = document.querySelector("#forecast1Humidity");

    // forecast1Date.textContent = forecastData.list[0].dt;
    // forecast1Icon.textContent = forecastData.list[0].weather.icon;
    // forecast1Temp.textContent = forecastData.list[0].main.temp;
    // forecast1Wind.textContent = forecastData.list[0].wind.speed;
    // forecast1Humidity.textContent = forecastData.list[0].main.humidity;
    
};

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var city = searchFormEl.value.trim();

    if (city) {
        getCurrentWeather(city);
    }
};

searchButtonEl.addEventListener("click", formSubmitHandler);