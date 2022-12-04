let titles=[]
let descs= []
let dates= []
let long= []
let lati= []
let a=0
let map;


const load= () => {
    a = 0
    titles = []
    descs = []
    dates = []
    long = []
    lati = []
    fetch("../vendor/source.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(image => {
                titles.push(`${image.title}`)
                descs.push(`${image.desc}`)
                dates.push(`${image.date_time}`)
                long.push(`${image.GPS.longitude}`)
                lati.push(`${image.GPS.latitude}`)
            })
        });
}
function initMap() {
    console.log(long.at(1))
    var coords={ lat: 0, lng: 0 }
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: coords,
    });
    for(var i=0;i<long.length;i++) {
        let pos = new google.maps.LatLng(long.at(i), lati.at(i))
        let marker = new google.maps.Marker({
            position: pos,
        });
        marker.addEventListener('click',)//Todo
        marker.setMap(map)
    }
}

function addMarkers(){


}

load()
console.log(long.at(0))
setTimeout(window.initMap=initMap,100);
