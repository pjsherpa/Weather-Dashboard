var redirectUrl = "./404.html";
//for search
var searchInputEl = document.getElementById("searchforCity");
// and event target buttons for provided city
var cityButtonsEl = document.querySelector(".providedCity");

// var button = document.getElementsByClassName("btn");
var submit = document.getElementsByClassName("main");
var weatherContainerEl = document.getElementById("weatherContainer");

//this is for display
var cityDisplay = document.getElementsByClassName("cityDisplay");
init();

function init() {
  if (searchInputEl + submit) {
    var cityName = localStorage.getItem("cityName");
    weatherContainerEl.textContent = cityName;
  } else if (cityButtonsEl) {
    var selectCity = localStorage.getItem("selectCity");
    weatherContainerEl.textContent = selectCity;
  }
}

// this one is for the search button
var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = searchInputEl.value.trim();

  if (cityName) {
    getCitySearch(cityName);
    weatherContainerEl.textContent = "";

    searchInputEl.value = "";
    console.log(searchInputEl);
    console.log(cityName);
  } else {
    alert("Please enter a City name");
  }
};

//only recognises Austin atm which is the first data-city, try a loop maybe?
var buttonClickHandler = function (event) {
  event.preventDefault();
  //the name of city choices given on the beginning
  var selectCity = event.target.getAttribute("data-city");

  if (selectCity) {
    getCitySelect(selectCity);
    //haven't linked this yet or created on HTML
    weatherContainerEl.textContent = "";
  }
};

// This is for the search submit
function getCitySearch(search) {
  //ref https://openweathermap.org/current for api call for just city name
  // in the below url we are trying to pass a string of city name with the api url
  // https://openweathermap.org/

  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    search +
    "&units=imperial&appid=f2c131fc5bc12a5320fc9c5062b3a515";

  // localStorage.setItem("cityName", JSON.stringify(cityName));
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data, search) {
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;
      console.log(latitude, longitude);
      console.log(data);

      var urlForecast =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=imperial&appid=f2c131fc5bc12a5320fc9c5062b3a515&cnt=5";

      fetch(urlForecast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data, search) {
          for (i = 0; i < data.daily.length; i++) {
            console.log(data.daily[i].temp);
            console.log(data.daily[i].humidity);
            console.log(data.daily[i].weather);
            console.log(data.daily[i].wind_speed);

            // var temp = data.list[i].main.temp;
            // weatherContainerEl.textContent = `Temp Today:${temp};`;
          }
        });
    });
}
//this API is for the provided city
getCitySelect = function (selectCity) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&appid=f2c131fc5bc12a5320fc9c5062b3a515&cnt=5`;
  localStorage.setItem("selectCity", JSON.stringify(selectCity));
  //Which data's are required?
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data, selectCity) {
      console.log(data);
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;
      console.log(latitude, longitude);
      console.log(data);

      var apiurlForecast =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=imperial&appid=f2c131fc5bc12a5320fc9c5062b3a515&cnt=5";
      console.log(apiurlForecast);
      console.log(data);

      fetch(apiurlForecast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data, search) {
          console.log(data);

          for (i = 0; i < data.daily.length; i++) {
            var date = data.daily[i].dt;
            var date = moment.unix(date).format("MM/DD/YYYY");

            temp = data.daily[i].temp.day;
            icon = data.daily[i].weather[0].icon;
            wind = data.daily[i].wind_speed;
            humidity = data.daily[i].humidity;

            weatherContainerEl.textContent = `Temp icon:${icon};
          Temp Today:${temp};
          Temp wind:${wind};
          Temp humidity:${humidity};`;
          }
        });
    });
};

// var displayWeather = function (weather, search) {};
//the bit we need now is to make the api to work and how to get the 5 days information within the columns provided or will we create new columns for this?

submit[0].addEventListener("click", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);

// display and visualisation part left

// https://openweathermap.org/weather-conditions how to include the images?
