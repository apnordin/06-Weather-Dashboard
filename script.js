// Set initial variables
var APIkey = "4add3f52cecb0be27920f2537ea37116";
var queryURL = "";
var citySearch = "";
var today = moment();

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&APPID=" + APIkey;





// Create addList function to generate list of cities
function addList() {
    citySearch = localStorage.getItem("citySearch");
    var cityBtn = $("<button>");
    cityBtn.text(citySearch.substr(0, 1).toUpperCase() + citySearch.substr(1).replace('+', ' '));
    cityBtn.addClass("btn btn-outline-dark my-1");
    $(".citylist").append(cityBtn);
    $(".citylist").append($("<br>"));

    $(cityBtn).on("click", function () {
        console.log('button clicked');
        console.log(citySearch);

        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&APPID=" + APIkey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log('forecast response for ' + citySearch, response);

            // Create a function to append content to main card

            function cardContent() {

                $("#city-name").text(citySearch.substr(0, 1).toUpperCase() + citySearch.substr(1).replace('+', ' ') + (moment(today).format(' (l)')));

                $("#temperature").text('Temperature: ' + (Math.round((response.list[0].main.temp) * 9 / 5 - 459.67)) + "°F");

                $("#humidity").text('Humidity: ' + response.list[0].main.humidity);

                $("#wind-speed").text('Wind Speed: ' + response.list[0].wind.speed + ' MPH');

                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;

                var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

                $.ajax({
                    url: uvURL,
                    method: "GET"
                }).then(function (uvResponse) {

                    console.log('UV Index: ', uvResponse.value);

                    var uvDisplay = $("<span>");
                    uvDisplay.addClass("badge");
                    uvDisplay.text(uvResponse.value)

                    if (uvResponse.value < 4) {
                        uvDisplay.addClass("badge-success")
                    } else if (uvResponse.value > 6) {
                        uvDisplay.addClass("badge-danger")
                    } else {
                        uvDisplay.addClass("badge-warning")
                    }

                    $("#uv-index").text('UV Index: ').append(uvDisplay);
                })

            }

            cardContent();


            // Create a function to append 5-day forecasts. Use with 8:, 16:, 24:, 32:, 39: Data needed: Date, temp, humidity

            function fiveDay() {


                $("#5-day").text("5-Day Forecast:");

                $(".forecast").addClass("forecast col-2 m-2 card text-white bg-primary");

                $("#day1date").text(response.list[8].dt_txt.slice(5, 10));
                $("#day2date").text(response.list[16].dt_txt.slice(5, 10));
                $("#day3date").text(response.list[24].dt_txt.slice(5, 10));
                $("#day4date").text(response.list[32].dt_txt.slice(5, 10));
                $("#day5date").text(response.list[39].dt_txt.slice(5, 10));

                $("#day1temp").text('Temp: ' + (Math.round((response.list[8].main.temp) * 9 / 5 - 459.67)) + "°F");
                $("#day2temp").text('Temp: ' + (Math.round((response.list[16].main.temp) * 9 / 5 - 459.67)) + "°F");
                $("#day3temp").text('Temp: ' + (Math.round((response.list[24].main.temp) * 9 / 5 - 459.67)) + "°F");
                $("#day4temp").text('Temp: ' + (Math.round((response.list[32].main.temp) * 9 / 5 - 459.67)) + "°F");
                $("#day5temp").text('Temp: ' + (Math.round((response.list[39].main.temp) * 9 / 5 - 459.67)) + "°F");

                $("#day1hum").text('Humidity: ' + response.list[8].main.humidity);
                $("#day2hum").text('Humidity: ' + response.list[16].main.humidity);
                $("#day3hum").text('Humidity: ' + response.list[24].main.humidity);
                $("#day4hum").text('Humidity: ' + response.list[32].main.humidity);
                $("#day5hum").text('Humidity: ' + response.list[39].main.humidity);


            }

            fiveDay();

        })

    })
}



//Search button onclick with all relevant functions
$("#search-btn").on("click", function () {
    event.preventDefault();


    citySearch = $("#search-input").val().trim();
    citySearch = citySearch.replace(' ', '+');
    console.log('city search: ', citySearch)

    localStorage.setItem('citySearch', citySearch)

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&APPID=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log('forecast response for ' + citySearch, response);

        // Create a function to append content to main card

        function cardContent() {

            $("#city-name").text(citySearch.substr(0, 1).toUpperCase() + citySearch.substr(1).replace('+', ' ') + (moment(today).format(' (l)')));

            $("#temperature").text('Temperature: ' + (Math.round((response.list[0].main.temp) * 9 / 5 - 459.67)) + "°F");

            $("#humidity").text('Humidity: ' + response.list[0].main.humidity);

            $("#wind-speed").text('Wind Speed: ' + response.list[0].wind.speed + ' MPH');

            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (uvResponse) {

                console.log('UV Index: ', uvResponse.value);

                var uvDisplay = $("<span>");
                uvDisplay.addClass("badge");
                uvDisplay.text(uvResponse.value)

                if (uvResponse.value < 4) {
                    uvDisplay.addClass("badge-success")
                } else if (uvResponse.value > 6) {
                    uvDisplay.addClass("badge-danger")
                } else {
                    uvDisplay.addClass("badge-warning")
                }

                $("#uv-index").text('UV Index: ').append(uvDisplay);
            })

        }

        cardContent();


        // Create a function to append 5-day forecasts. Use with 8:, 16:, 24:, 32:, 39: Data needed: Date, temp, humidity

        function fiveDay() {


            $("#5-day").text("5-Day Forecast:");

            $(".forecast").addClass("forecast col-2 m-2 card text-white bg-primary");

            $("#day1date").text(response.list[8].dt_txt.slice(5, 10));
            $("#day2date").text(response.list[16].dt_txt.slice(5, 10));
            $("#day3date").text(response.list[24].dt_txt.slice(5, 10));
            $("#day4date").text(response.list[32].dt_txt.slice(5, 10));
            $("#day5date").text(response.list[39].dt_txt.slice(5, 10));

            $("#day1temp").text('Temp: ' + (Math.round((response.list[8].main.temp) * 9 / 5 - 459.67)) + "°F");
            $("#day2temp").text('Temp: ' + (Math.round((response.list[16].main.temp) * 9 / 5 - 459.67)) + "°F");
            $("#day3temp").text('Temp: ' + (Math.round((response.list[24].main.temp) * 9 / 5 - 459.67)) + "°F");
            $("#day4temp").text('Temp: ' + (Math.round((response.list[32].main.temp) * 9 / 5 - 459.67)) + "°F");
            $("#day5temp").text('Temp: ' + (Math.round((response.list[39].main.temp) * 9 / 5 - 459.67)) + "°F");

            $("#day1hum").text('Humidity: ' + response.list[8].main.humidity);
            $("#day2hum").text('Humidity: ' + response.list[16].main.humidity);
            $("#day3hum").text('Humidity: ' + response.list[24].main.humidity);
            $("#day4hum").text('Humidity: ' + response.list[32].main.humidity);
            $("#day5hum").text('Humidity: ' + response.list[39].main.humidity);


        }

        fiveDay();

    })

    addList();

})

addList();


