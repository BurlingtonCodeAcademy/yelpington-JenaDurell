restList = document.getElementById('restaurant')
let name = document.getElementById('name')
let address = document.getElementById('address')
let phone = document.getElementById('phone')
let website = document.getElementById('website')
let hours = document.getElementById('hours')
let notes = document.getElementById('notes')

let myMap = L.map('map').setView([44.5, -73.21], 12)
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
                        restList.innerHTML += `<li class="single-restaurant"><a href = ${restMap.website}> ${restMap.name}</a></li>` //build the list of restaurants 
                        placeMarker(restMap.coords)
                    })

            });

        });

}
//     .then((res) => {            //gets result 
//         return res.json()
//     })
//     .then((obj) => {            //makes json obj
//         console.log(obj)
//         obj.results.forEach((restaurant) => {
//             
//         })

//         let listArray = Array.from(document.getElementsByClassName('single-restaurant'))  //clicking on the list of restaurants
//         listArray.forEach((restaurant) => {
//             restaurant.addEventListener('click', fetchData)
//         })
//     })
//     .catch(err => console.log(err))
// }

function placeMarker(latLongArray) {
    
           latLongArray = JSON.parse(latLongArray)
    
            

            let spot = L.marker(latLongArray).addTo(myMap)
            spot.bindPopup()

            // marker.bindPopup('<h4>This is the center</h4>')

            // marker.addEventListener('mouseover', () => {
            //     marker.openPopup()
            // })

        }


placeMarker('161 Church St. Burlington Vermont 05401')

