var weatherAPI = "https://fcc-weather-api.glitch.me/api/current?";
var currentTemp = 0;
var weatherCode = 0;
var umbrella;

var myLocation = document.getElementById("myLocation");
var temp = document.getElementById("myTemp");
var answer = document.getElementById("answer");
var myCurrentWeather = document.getElementById("myCurrentWeather");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    weatherAPI += "lat=" + lat + "&lon=" + lon;

    fetch(weatherAPI).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          myLocation.innerHTML = data["name"];

          myCurrentWeather.innerHTML = data["weather"][0]["description"];

          currentTemp = data["main"]["temp"];

          weatherCode = data["weather"][0]["id"];

          toCelsius();
          chooseIcon();
        });
      }
    });
  });
}

function toCelsius() {
  myTemp.setAttribute("onClick", "javascript: toFahreinheit();");
  myTemp.innerHTML = currentTemp + String.fromCharCode(176) + "C";
}

function toFahreinheit() {
  myTemp.setAttribute("onClick", "javascript: toCelsius();");
  myTemp.innerHTML =
    Math.floor(currentTemp * 1.8 + 32) + String.fromCharCode(176) + "F";
}

function chooseIcon() {
  //Thunderstorm
  if (weatherCode >= 200 && weatherCode <= 232) {
    answer.innerHTML = "Yes!";
    document.getElementById("thunder-storm").classList.remove("hidden");
  }
  //Drizzle
  else if (weatherCode >= 300 && weatherCode <= 321) {
    answer.innerHTML = "Yes!";
    document.getElementById("sun-shower").classList.remove("hidden");
  }
  //Rain
  else if (weatherCode >= 500 && weatherCode <= 531) {
    answer.innerHTML = "Yes!";
    document.getElementById("rainy").classList.remove("hidden");
  }
  //Snow
  else if (weatherCode >= 600 && weatherCode <= 622) {
    myIcon.src = "this";
    answer.innerHTML = "Yes!";
    document.getElementById("flurries").classList.remove("hidden");
  }
  //Atmosphere
  else if (weatherCode >= 700 && weatherCode <= 781) {
    myIcon.src = "this";
    answer.innerHTML = "No!";
    document.getElementById("sunny").classList.remove("hidden");
  }
  //Clear
  else if (weatherCode == 800) {
    answer.innerHTML = "No!";
    document.getElementById("sunny").classList.remove("hidden");
  }
  //Clouds
  else if (weatherCode >= 801 && weatherCode <= 804) {
    answer.innerHTML = "No!";
    document.getElementById("cloudy").classList.remove("hidden");
  }
}

//todo adjust the icon choosing method if statements to be more bullet proof and specific...

//it needs to have a night mode including icons

//use flex to re organize the icon positioning
//why does the footer disappear on mobiles!!!!! check above^
