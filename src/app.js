let weatherAPI = "http://api.openweathermap.org/data/2.5/weather?";
let APIKey = "&appid=3d73064f60f81b00761e2dda00f26d7b";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(pos) {
    let lat = "lat=" + pos.coords.latitude;
    let lon = "lon=" + pos.coords.longitude;

    $.ajax({
      type: "POST",
      url: weatherAPI + lat + "&" + lon + APIKey + "&units=metric",
      dataType: "json",
      success: function(weather) {
        //remove loader
        $(".loader").addClass("hidden");
        $(".infoPane").removeClass("hidden");

        //set the location, temp and status
        $("#myLocation").html(weather.name);
        $("#myTemp").html(weather.main.temp + "&#8451;");
        $("#myCurrentWeather").html(weather.weather[0].main);

        //set weather code then display icon
        chooseIcon(weather.weather[0].id);
      },
      error: function(error) {
        alert("Failed to retrieve data");
        console.log(error);
      }
    });
  });
} else {
  alert("No Geolocation detected, please reload and enable");
}

function chooseIcon(weatherCode) {
  //Thunderstorm
  if (weatherCode >= 200 && weatherCode <= 232) {
    $("#answer").html("Yes!");
    $("#thunder-storm").removeClass("hidden");
  }
  //Drizzle
  else if (weatherCode >= 300 && weatherCode <= 321) {
    $("#answer").html("Yes!");
    $("#rainy").removeClass("hidden");
  }
  //Rain
  //Sun Shower
  else if (weatherCode >= 500 && weatherCode <= 504) {
    $("#answer").html("Yes!");
    $("#sun-shower").removeClass("hidden");
  }
  //Rain
  //Shower
  else if (weatherCode >= 511 && weatherCode <= 531) {
    $("#answer").html("Yes!");
    $("#rainy").removeClass("hidden");
  }
  //Snow
  else if (weatherCode >= 600 && weatherCode <= 622) {
    $("#answer").html("Yes!");
    $("#flurries").removeClass("hidden");
  }
  //Atmosphere
  else if (weatherCode >= 700 && weatherCode <= 781) {
    //TODO build this out correctly with relevant icons
    //includes fog, mist, smoke, haze...
    $("#answer").html("No!");
    $("#cloudy").removeClass("hidden");
  }
  //Clear
  else if (weatherCode == 800) {
    $("#answer").html("No!");
    $("#sunny").removeClass("hidden");
  }
  //Clouds
  else if (weatherCode >= 801 && weatherCode <= 804) {
    $("#answer").html("No!");
    $("#cloudy").removeClass("hidden");
  }
}
