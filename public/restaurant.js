const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const currentRest = urlParams.get('restaurant')

let myMap = L.map('map').setView([44.4756979, -73.2151394], 17)

//fetching json with other restaurant info 
//"id" "name" "address" "coords" "category" "price" "phone" "website" "hours" "notes"
fetch(`https://yelpingtonapi.herokuapp.com/api/restaurants/${currentRest}`)
    .then((res) => {
        return res.json()
    }).then((restInfo) => {
       
        $("#rest-name a").text(restInfo.name)
        $("#rest-name a").attr("href", restInfo.website) // Set herf value
        $("#phone-price").text(`${restInfo.phone} | ${restInfo.price}`)
        $("#hours").text(restInfo.hours)
        if(restInfo.id==="the-friendly-toast") {
            restInfo.notes.push("Food is good for internal cleansing, interior is trying too hard to be cool")
        }
        restInfo.notes.forEach((note) => {
            $("#notes").append(`<p>${note}</p>`)

        })
        let restLink = `<div class="single-restaurant"><a href = "/restaurant.html?restaurant=${restInfo.id}"> ${restInfo.name}</a></div>`
        myMap.setView(JSON.parse(restInfo.coords), 17)
        placeMarker(restInfo.coords, restLink)
    }).catch(err => console.log(err))






L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap)

function placeMarker(latLongArray, pinLink) {

    latLongArray = JSON.parse(latLongArray)

    let spot = L.marker(latLongArray).addTo(myMap)
    spot.bindPopup(pinLink)
}