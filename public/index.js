let restList = document.getElementById('restaurant')
let markerArray = []

let myMap = L.map('map').setView([44.47945238700768, -73.2185983657837], 15)
myMap.on('load', loadMapData());

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap)


function loadMapData() {
    //first fetch json with coordinates
    fetch('https://yelpingtonapi.herokuapp.com/api/restaurants')
        .then((res) => {
            return res.json()
        })
        .then((obj) => {
            console.log(obj)
            obj.forEach((restaurant) => {
                //fetching json with other restaurant info 
                //"id" "name" "address" "coords" "category" "price" "phone" "website" "hours" "notes"  
                fetch(restaurant.infoUrl)
                    .then((res) => {
                        return res.json()
                    }).then((restMap) => {
                        console.log(restMap.coords)


                        let restLink = `<div class="single-restaurant"><a href = "/restaurant.html?restaurant=${restMap.id}"> ${restMap.name}</a></div>`
                        restList.innerHTML += restLink //build the list of restaurants w/links
                        placeMarker(restMap.coords, restLink)
                    }).catch(err => console.log(err))

            });

        }).finally(() => {
            //center map in middle of markers, cool map movement feature!
            //can be commented out to use fixed set view coordinates but this allows for adjustments if new restaurants are added and brings a fun movement feature upon app opening!
            setTimeout(function () {
                let group = L.featureGroup(markerArray)
                console.log(group.getBounds())
                myMap.fitBounds(group.getBounds());
            }, 2000);

        });

}


function placeMarker(latLongArray, pinLink) {

    latLongArray = JSON.parse(latLongArray)



    let spot = L.marker(latLongArray).addTo(myMap)
    spot.bindPopup(pinLink)
    markerArray.push(spot)


    spot.addEventListener('mouseover', () => {
        spot.openPopup()
    })



}


