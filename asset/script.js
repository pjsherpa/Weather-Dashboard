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
  localStorage.setItem("cityName", JSON.stringify(cityName));
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
  localStorage.setItem("selectCity", JSON.stringify(selectCity));

  if (selectCity) {
    getCitySelect(selectCity);
    //haven't linked this yet or created on HTML
    weatherContainerEl.textContent = "";
  }
};

// This is for the search submit
function getCitySearch(search) {
  //api key is checked and working

  //ref https://openweathermap.org/current for api call for just city name
  // in the below url we are trying to pass a string of city name with the api url
  /* var url =
    "https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=f2c131fc5bc12a5320fc9c5062b3a515";*/

  // https://openweathermap.org/forecast5

  //template literal try this first
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=f2c131fc5bc12a5320fc9c5062b3a515`;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data, search) {
      console.log(data.list);
      // console.log(data.main.temp);
      // console.log(data.main.humidity);
      // console.log(data.main.pressure);
    });
}
//this API is for the provided city
getCitySelect = function (selectCity) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectCity}&appid=f2c131fc5bc12a5320fc9c5062b3a515&cnt=5`;

  //what actually do we need from data's
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data, selectCity) {
      console.log(data);

      for (i = 0; i < data.list.length; i++) {
        d = new Date();
        console.log(d);
        console.log(data.city.name);
        console.log(data.list[i].dt_txt);
        console.log(data.list[i].main.temp);
        console.log(data.list[i].main.humidity);
        console.log(data.list[i].wind.speed);
        console.log(data.list[i].main.humidity);

        var temp = data.list[i].main.temp;
        weatherContainerEl.textContent = `Temp Today:${temp};`;
      }
    });
};
// var displayWeather=function(weather,search)

//the bit we need now is to make the api to work and how to get the 5 days information within the columns provided or will we create new columns for this?

//has everything been linked
submit[0].addEventListener("click", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);

// display and visualisation part left
