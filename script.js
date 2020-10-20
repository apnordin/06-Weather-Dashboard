// Set initial variables
var APIkey = "4add3f52cecb0be27920f2537ea37116";
var queryURL = "";
var citySearch = "";

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&APPID=" + APIkey;

// Create addList function to generate list of cities
function addList() {
    var cityBtn = $("<button>");
    cityBtn.text(citySearch);
    $(".citylist").append(cityBtn);
}

//Search button onclick with all relevant functions
$("#search-btn").on("click", function () {
    event.preventDefault();
    console.log('jquery is working lol');

    citySearch = $("#search-input").val().trim();
    citySearch = citySearch.replace(' ', '+');
    console.log('city search: ', citySearch)

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&APPID=" + APIkey;


    // localStorage.setItem('')

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log('forecast response for ' + citySearch, response);

    })

    addList();
})