let oldWeatherAPI = "https://fcc-weather-api.glitch.me/api/current?";
let ExampleWeatherAPI =
  "api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}";
let weatherAPI = "http://api.openweathermap.org/data/2.5/weather?";
let APIKey = "&appid=3d73064f60f81b00761e2dda00f26d7b";
let currentTemp = 0;
let weatherCode = 0;
let umbrella;

//let myLocation = document.getElementById("myLocation");
//let temp = document.getElementById("myTemp");
//let answer = document.getElementById("answer");
//let myCurrentWeather = document.getElementById("myCurrentWeather");

let myLocation = $("#myLocation");
let temp = $("#myTemp");
let answer = $("#answer");
let myCurrentWeather = $("#myCurrentWeather");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(pos) {
    let lat = "lat=" + pos.coords.latitude;
    let lon = "lon=" + pos.coords.longitude;

    $.ajax({
      type: "POST",
      url: weatherAPI + lat + "&" + lon + APIKey + "&units=metric",
      dataType: "json",
      success: function(weather) {
        alert("it worked");
        console.log(weather);
        //set the location, temp and status
        $("#myLocation").html(weather.name);
        $("#myTemp").html(weather.main.temp);
        $("#myCurrentWeather").html(weather.weather[0].main);
      },
      error: function(error) {
        alert("Failed to retrieve data");
        console.log(error);
      }
    });
  });
} else {
  //display error message about no geolocation
  //maybe a message to always remember umbrella anyways #lolamiright
}

/*
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

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
*/

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
