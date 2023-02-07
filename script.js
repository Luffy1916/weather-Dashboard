var userSearch = [];

const searchBtn = $("#search-button")
// let apiKey = "a0822daa77d2fe015266567cae2f77a3"
const tempKey = "d91f911bcf2c0f925fb6535547a5ddc9"
function renderButtons() {
    const userSearchHistory = $('#history');
    userSearchHistory.empty();
    userSearch.forEach(function (search) {
        const HistoryButton = $('<button>');
        HistoryButton.text(search);
        HistoryButton.addClass("search");
        HistoryButton.attr("data-City", search)
        userSearchHistory.append(HistoryButton);

    })
}



$("#search-button").on("click", function (event) {
    event.preventDefault()
    const newcity = $('#search-input').val().trim();
    userSearch.push(newcity);
    renderButtons();
    $("search-input").val("");
})

$("#history").on("click", ".search", function (event) {
    console.log("button was clicked");
    const searchBtn = $(event.target);
    const citysearch = searchBtn.attr("data-City");
    console.log(citysearch);


    let geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + citysearch + "&appid=" + tempKey
    console.log(geoQueryURL)

    // This is calling the data off the api once the api is called the response function done
    $.ajax({
        url: geoQueryURL,
        method: "GET"
    }).then(function (response) {
        // Then we log the response funtion 
        console.log(response);

        // once we have the log of the response we transverse through the objects and store the variables that will be used in the next api.
        let latitude = response[0].lat.toFixed(2);
        let longitude = response[0].lon.toFixed(2);

        let weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&cnt=3&appid=" + tempKey;
        console.log(weatherQueryURL);
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);


        })
    })
})
renderButtons()

