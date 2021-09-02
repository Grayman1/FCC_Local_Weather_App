$(window).load(function () {

   // Links to Alternative Background Images
   var clouds_Day = "url('http://www.zastavki.com/pictures/1920x1200/2011/Nature_Mountains_Overcast_sky_above_the_mountains_031613_.jpg')";
   var clear_Day ="url('https://images.pexels.com/photos/1775862/pexels-photo-1775862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
   var clear_Night = "url('http://wallpapercave.com/wp/FjnZ25X.jpg')";
   var clouds_Night = "url('https://images.pexels.com/photos/6369354/pexels-photo-6369354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
   var scattered_Clouds = "url('https://images.pexels.com/photos/86695/sky-clouds-outdoors-scenic-86695.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
   var storms_Day = "url('https://images.pexels.com/photos/2080964/pexels-photo-2080964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
   var storms_Night = "url('https://images.pexels.com/photos/6312533/pexels-photo-6312533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
   var misty =        "url('https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1287075.jpg&fm=jpg')";
   var rain_Day = "url('https://images.pexels.com/photos/4420454/pexels-photo-4420454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
   var rain_Night = "url('https://images.pexels.com/photos/2618980/pexels-photo-2618980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
   var snow = "url('https://res.cloudinary.com/dannycoder/image/upload/v1450159983/snow_omwufo.jpg')";
   var defaultImage = "url('http://www.zastavki.com/pictures/1920x1200/2011/Nature_Mountains_Overcast_sky_above_the_mountains_031613_.jpg')";
   
   //Set default input values on page load 
    //Set Default Coordinates set to Cleveland, OH, US
   var openWeatherMapAPI = "https://api.openweathermap.org/data/2.5/weather?q=Cleveland,us&units=imperial&appid=2e6db706185bdf4047111248445e023e",
   $temp = $("#temp"),
   $tempMax = $("#temp-max"),
   $tempMin = $("#temp-min");
    
   // Use geolocation if enabled
   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {     
         openWeatherMapAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude  + "&lon=" + 
         position.coords.longitude + "&units=imperial&appid=2e6db706185bdf4047111248445e023e";
             //only calls API if geolocation is enabled
         fetchWeather(openWeatherMapAPI); 
      });
   }
  
    //initialize temperature switch
    $("#switch-temp").bootstrapSwitch();
        
    //Fetch Weather from OpenWeatherMap by Geografic Coordinates
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
   function fetchWeather(API) {
      $.getJSON(API, function(json){
         $("#feels-like").html(parseInt(json.main.feels_like));
         $temp.html(parseInt(json.main.temp));
         $tempMax.html(parseInt(json.main.temp_max));
         $tempMin.html(parseInt(json.main.temp_min));
         $("#city span").html(json.name + ", " + json.sys.country);
         $("#condition").html(json.weather[0].description);
         $("#humidity").html(json.main.humidity + "%");
         $("#wind").html(json.wind.speed + " mph");
         $("#hpa").html(convertHPATPressure(json.main.pressure) + " mmHg");
         $("#prec").html(json.clouds.all + " %");

         cityName = json.name;
         weatherId = json.weather[0].id;
         weatherIcon = json.weather[0].icon;
         suffixDN = weatherIcon.slice(2); 
         if (suffixDN == 'd') {
            dayNight = 'day-'
         } else {
            dayNight = 'night-'
         }

         // Change background Image based on Weather Type from Weather Icon
         $("body").css("background-image", getBackgroundImage(weatherIcon));          
         console.log(suffixDN, dayNight, weatherId, weatherIcon, cityName, getBackgroundImage(weatherIcon));
         // Use Day and Night Weather Icons when available
         $("#weather-icon i").removeClass('wi-rain').addClass('wi-owm-' + dayNight + weatherId);
          
         //init temperature variables
         //feels-like = $feels-like.html();
         temp = $temp.html();
         tempMax = $tempMax.html();
         tempMin = $tempMin.html(); 
           
      });
   }    
    
   $("#switch-temp").on('switchChange.bootstrapSwitch', function(event, state) {

      if(state){
         $temp.html(convertToCelsius(temp));
         $tempMax.html(convertToCelsius(tempMax));
         $tempMin.html(convertToCelsius(tempMin)); 
         $("#metric").html("C");  
      } else {
         $temp.html(temp);  
         $tempMax.html(tempMax);
         $tempMin.html(tempMin);
         $("#metric").html("F"); 
      }
   });  
// Select Background Using Weather Icon Code
   function getBackgroundImage(id){
      switch(id){
       case "01d":
         return clear_Day;
         break;
       case "01n":
         return clear_Night;
         break;
       case "02d":
         return clouds_Day;
         break;
       case "02n":
         return clouds_Night;
         break;
       case "03d":
         return scattered_Clouds;
         break;
       case "03n":
         return clouds_Night;
         break; 
       case "04d":
         return clouds_Day;
         break;
       case "04n":
         return clouds_Night;
         break;
       case "09d":
         return rain_Day;
         break;
       case "09n":
         return rain_Night;
         break;
       case "10d":
         return rain_Day;
         break;
       case "10n":
         return rain_Night;
         break;
       case "11d":
         return storms_Day;
         break;
       case "11n":
         return storms_Night;
         break;
       case "13d":
         return snow;
         break;
       case "13n":
         return snow;
         break;
       case "50d":
         return misty;
         break;
       case "50n":
         return misty;
         break;
       default:
         return defaultImage;
      }
   }

   function convertHPATPressure(pressure){
  return parseInt(pressure / 1.33322387415);
   }
   // Conversion from HPAT to inch Hg / 33.8638866667
   
   function convertToCelsius(f){
      return parseInt((5 / 9) * (f - 32));
   }  
   
   // Get Current Date and Time
   var dt = new Date();
   // Format minutes to force 2 digit display 0-9 minutes
   var minutes = dt.getMinutes();
   minutes = minutes > 9 ? minutes : '0' + minutes;

   $("#dateTime").html((dt.getMonth()+1)  + "/" + dt.getDate() + "/" +  dt.getFullYear() + " "+ dt.getHours() + ":" + minutes);
  
});