$(function () {
    var active_position = 0;
    var sliderWrapper = $("#slider");
    var sliderList = $("#slide-list");
    var sliderItems = $(".calendar");
    var buttons = $(".button");
    var imageWidth = sliderItems.width();

    var imageCount = sliderItems.length;


    var animateSlider = function (shift, duration) {

         
        sliderList.stop(true, true).animate({

                "margin-left": "+=" + shift + "px"


            },
            duration);
    };

    var isAtStart = function () {

        return parseInt(sliderList.css("margin-left"), 10) > -imageWidth;

    };

    var isAtEnd = function () {



        var maxMargin = -1 * (imageWidth * (imageCount - 2));

        return parseInt(sliderList.css("margin-left"), 10) < maxMargin;



        /*
                        return parseInt(sliderList.css("margin-left"), 10) === -680;
        */


    };






    buttons.on("click", function () {


        var $this = $(this);

        var isBackBtn = $this.hasClass("back");
        if ((isBackBtn && isAtStart()) || (!isBackBtn && isAtEnd())) {
            return;
        }
        /*(isBackBtn ? (active_position - 1) : (active_position + 1));*/
        if (isBackBtn) {
            active_position -= 1;
        } else {
            active_position += 1;
        }

        console.log(active_position);

        $(".carousel-indicators li").removeClass("active");
        $(".carousel-indicators li").eq(active_position).addClass("active")

        animateSlider((isBackBtn ? imageWidth : (-1) * imageWidth), 1000);
        addDayWeather(cache, localTime, active_position);
        changeBackground();
        if (active_position === 0) {
        addWeather(cache5, localTime5);
        }
    });


    /*
        console.log(imageWidth);
    */
    /*
        console.log($(".carousel-indicators li.active").index());
    */



    $(".carousel-indicators li").on("click", function () {

        $(".carousel-indicators li").removeClass("active");
        $(this).addClass("active");

        /*console.log($(this).index() - active_position);*/
        var shift = active_position - $(this).index();
        active_position = $(".carousel-indicators li.active").index();
        console.log(active_position);
        animateSlider(shift * imageWidth, 1000);
        addDayWeather(cache, localTime, active_position);
        changeBackground();   
        if (active_position === 0) {
        addWeather(cache5, localTime5);
        }
        /*
                animateSlider(340, 1000);
        */
    });








    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        hoursWeather(lat, lng);
        //currentWeather(lat, lng);
        dayWeather(lat, lng);
    });



    function hoursWeather(lat, lng) {

        /*var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude +
            '&lon=' + position.coords.longitude + '&&units=metric' + '&callback=?';*/

        var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat +
            '&lon=' + lng + '&APPID=3d466d469e59af81d6677439320c2426' + '&&units=metric' + '&callback=?';
        $.getJSON(weatherAPI, function (response) {

            // Store the cache
            localStorage.weatherCache = JSON.stringify({
                timestamp: (new Date()).getTime(), // getTime() returns milliseconds
                data: response
            });
            /*locationSuccess(position);*/

        });

         cache5 = JSON.parse(localStorage.weatherCache);
        /*console.log(cache.data.city.name);
        $("#city").html(cache.data.city.name);
        console.log(cache.data.list[0].dt_txt);
        console.log(parseInt(cache.data.list[0].main.temp));*/
        //console.log(cache.data.list[0].weather[0].icon);
        //console.log("assets/img/" + cache.data.list[0].weather[0].icon);
        /*
                $("#calendar1 .day:first").html(moment(localTime).format('dddd'));
        */
        var d = new Date();
        var offset = -d.getTimezoneOffset() * 60 * 1000;
         localTime5 = new Date(cache5.data.list[0].dt * 1000 - offset);
        /*console.log(moment(localTime).format('MMMM'));
        console.log(moment(localTime).format('dddd'));
        console.log(moment(localTime).format('D'));*/
       /* while (moment(localTime).format('h:mm a') == "6:00 am"); {
            var i = 0;
            var localTime = new Date(cache.data.list[i].dt * 1000 - offset);
            console.log(moment(localTime).format('h:mm a'));
            i++;
        }*/
        
       
           /* console.log(cache.data.list[0].dt_txt);
            console.log(cache.data.list[1].dt_txt);
            console.log(cache.data.list[2].dt_txt == "2015-07-20 18:00:00");*/
        
/*for (k = 0; k < 8; k++) {
    console.log(cache.data.list[k].dt_txt);
     if (cache.data.list[k].dt_txt.split(/\s/)[1] == "09:00:00") {
        $('#morntempimg').attr("src", "assets/img/img_small/" + cache.data.list[k].weather[0].icon + ".png");
     } else if (cache.data.list[k].dt_txt.split(/\s/)[1] == "15:00:00") {
        $('#daytempimg').attr("src", "assets/img/img_small/" + cache.data.list[k].weather[0].icon + ".png");
    } else if (cache.data.list[k].dt_txt.split(/\s/)[1] == "21:00:00") {
         $('#evetempimg').attr("src", "assets/img/img_small/" + cache.data.list[k].weather[0].icon + ".png");
    } else if (cache.data.list[k].dt_txt.split(/\s/)[1] == "00:00:00") {
        $('#nighttempimg').attr("src", "assets/img/img_small/" + cache.data.list[k].weather[0].icon + ".png");
    }
    
   
    else if (cache.data.list[k].dt_txt.split(/\s/)[1] == "03:00:00")
        break;
    
    
}*/
        //console.log(k);
        
        
        //console.log(moment(localTime).format('h:mm a'));
            addWeather(cache5, localTime5);
        
        /*switch ($("#precipitation").attr("src")) {
        case "assets/img/01n.png":
        case "assets/img/02n.png":
        case "assets/img/03n.png":
        case "assets/img/04n.png":
        case "assets/img/09n.png":
        case "assets/img/10n.png":
        case "assets/img/11n.png":
        case "assets/img/13n.png":
        case "assets/img/50n.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/night.jpg');
            break;
        case "assets/img/01d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/sun.jpg');
            break;

        case "assets/img/02d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/sun&cloud.jpg');
            break;

        case "assets/img/03d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/cloud2.jpg');
            break;
        case "assets/img/04d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/cloud1.jpg');
            break;
        case "assets/img/09d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/rain.jpg');
            break;
        case "assets/img/10d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/rain.jpg');
            break;
        case "assets/img/11d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/thunderstorm.jpg');
            break;
        case "assets/img/50d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/mist.jpg');
            break;
        }*/

        //console.log($("#precipitation").attr("src"));

    }

    function currentWeather(lat, lng) {
        var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +
            '&lon=' + lng + '&APPID=3d466d469e59af81d6677439320c2426' + '&&units=metric' + '&callback=?';

        $.getJSON(weatherAPI, function (response) {

            // Store the cache
            localStorage.currentCache = JSON.stringify({
                timestamp: (new Date()).getTime(), // getTime() returns milliseconds
                data: response
            });
            /*locationSuccess(position);*/

        });

        var cache = JSON.parse(localStorage.currentCache);

        var d = new Date();
        var offset = d.getTimezoneOffset() * 60 * 1000;
        var localTime = new Date(cache.data.dt * 1000 + offset);

        //addCurrentWeather(cache, localTime);
        //console.log(cache.data.dt);
        //addCurrentWeather(cache);
    }

    function dayWeather(lat, lng) {
        var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat +
            '&lon=' + lng + '&cnt=' + 3 + '&APPID=3d466d469e59af81d6677439320c2426' + '&&units=metric' + '&callback=?';
        $.getJSON(weatherAPI, function (response) {

            // Store the cache
            localStorage.dayCache = JSON.stringify({
                timestamp: (new Date()).getTime(), // getTime() returns milliseconds
                data: response
            });
            /*locationSuccess(position);*/

        });

        cache = JSON.parse(localStorage.dayCache);

        /* var d = new Date();
         var offset = -d.getTimezoneOffset() * 60 * 1000;*/
        //
        /*
                var localTime = new Date(cache.data.list[0].dt * 1000 - offset);
        */
        localTime = function getLocalTime(i) {
            var d = new Date();
            var offset = -d.getTimezoneOffset() * 60 * 1000;
            return new Date(cache.data.list[i].dt * 1000 - offset);
        }
        addDayWeather(cache, localTime, active_position);
        changeBackground();
    }

    function changeBackground() {
        switch ($("#precipitation").attr("src")) {
        case "assets/img/01n.png":
        case "assets/img/02n.png":
        case "assets/img/03n.png":
        case "assets/img/04n.png":
        case "assets/img/09n.png":
        case "assets/img/10n.png":
        case "assets/img/11n.png":
        case "assets/img/13n.png":
        case "assets/img/50n.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/night.jpg');
            break;
        case "assets/img/01d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/sun.jpg');
            break;

        case "assets/img/02d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/sun&cloud.jpg');
            break;

        case "assets/img/03d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/cloud2.jpg');
            break;
        case "assets/img/04d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/cloud1.jpg');
            break;
        case "assets/img/09d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/rain.jpg');
            break;
        case "assets/img/10d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/rain.jpg');
            break;
        case "assets/img/11d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/thunderstorm.jpg');
            break;
        case "assets/img/50d.png":
            $('#bg img:first-child').attr('src', 'assets/img/bcgrnd/mist.jpg');
            break;
        }
    }
    function addCurrentWeather(cache, localTime) {
        $("#city").html(cache.data.name);
        $("#temperature").html(cache.data.main.temp + "&deg;");
        $("#time").html(moment(localTime).format('h:mm a'));
        
        
       /* $("#calendar_1 .day").html(moment(localTime).format('dddd'));
        $("#calendar_1 .date").html(moment(localTime).format('D'));
        $("#calendar_1 .month").html(moment(localTime).format('MMMM'));
*/

    }

    function addDayWeather(cache, localTime, active_position) {
        if (active_position > 0) {
        $("#city").html(cache.data.city.name);
        $("#temperature").html(parseInt(cache.data.list[active_position].temp.day) + "&deg;");
        //$("#time").html(moment(localTime(active_position)).format('h:mm a'));
        $("#time").html("");
        $("#precipitation").attr("src", "assets/img/" + cache.data.list[active_position].weather[0].icon + ".png");
            /*$('#morntempimg').attr("src", "");
             $('#daytempimg').attr("src", "");
            $('#evetempimg').attr("src", "");
            $('#nighttempimg').attr("src", "");*/
        } 

        $("#morntemp").html(parseInt(cache.data.list[active_position].temp.morn) + "&deg;");
        //console.log(parseInt(cache.data.list[active_position].temp.morn));
        $('#morntempimg').attr("src", "assets/img/img_small/" + cache.data.list[active_position].weather[0].icon + ".png");

        $("#daytemp").html(parseInt(cache.data.list[active_position].temp.day) + "&deg;");
        $('#daytempimg').attr("src", "assets/img/img_small/" + cache.data.list[active_position].weather[0].icon + ".png");

        $("#evetemp").html(parseInt(cache.data.list[active_position].temp.eve) + "&deg;");
        $('#evetempimg').attr("src", "assets/img/img_small/" + cache.data.list[active_position].weather[0].icon + ".png");

        $("#nighttemp").html(parseInt(cache.data.list[active_position].temp.night) + "&deg;");
        $('#nighttempimg').attr("src", "assets/img/img_small/" + cache.data.list[active_position].weather[0].icon + ".png");

        for (var i = 0; i < 3; i++) {
            $("#calendar_" + active_position + " .day").html(moment(localTime(active_position)).format('dddd'));
            $("#calendar_" + active_position + " .date").html(moment(localTime(active_position)).format('D'));
            $("#calendar_" + active_position + " .month").html(moment(localTime(active_position)).format('MMMM'));
        }


    }

    function addWeather(cache, localTime) {
        $("#city").html(cache.data.city.name);
        $("#temperature").html(parseInt(cache.data.list[0].main.temp) + "&deg;"); //&deg;
        $("#time").html(moment(localTime).format('h:mm a'));
        $("#precipitation").attr("src", "assets/img/" + cache.data.list[0].weather[0].icon + ".png");
        /*$("#calendar_0 .day").html(moment(localTime).format('dddd'));
        $("#calendar_0 .date").html(moment(localTime).format('D'));
        $("#calendar_0 .month").html(moment(localTime).format('MMMM'));
        console.log(moment(localTime).format('D'));*/
        


    }

});