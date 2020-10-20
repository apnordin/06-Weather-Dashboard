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
}

// Create a function to append content to main card


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

                console.log('UV Response: ', uvResponse);
            })

            $("#uv-index").text('UV Index: ');


        }

        cardContent();

    })

    addList();

})

addList();
