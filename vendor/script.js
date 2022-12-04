let gallery= document.getElementById("gallery")
let content= document.getElementById("content")
let titles=[]
let descs= []
let dates= []
let long= []
let lati= []
let a=0
function initMap(longitude, latitude) {
    var coords=new google.maps.LatLng(longitude,latitude)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: coords,
    });
    const marker = new google.maps.Marker({
        position: coords,
        map: map,
    });
}


search=document.getElementById("search")
const load= (string)=> {
    while (gallery.firstChild) {
        gallery.removeChild(gallery.lastChild);
    }
    a=0
    titles=[]
    descs= []
    dates= []
    long= []
    lat= []
    fetch("../vendor/source.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(image => {
                if(image.title.indexOf(string)!==-1 || image.desc.indexOf(string)!==-1){
                    titles.push(`${image.title}`)
                    descs.push(`${image.desc}`)
                    dates.push(`${image.date_time}`)
                    long.push(`${image.GPS.longitude}`)
                    lati.push(`${image.GPS.latitude}`)
                    let img = document.createElement("img")
                    img.src = `${image.path}`
                    img.className = "img"
                    img.id = "img " + a
                    a++
                    console.log(img.id)
                    img.height = 350
                    img.width = 350
                    img.style = "object-fit: cover"
                    img.addEventListener('click', openModal)
                    gallery.appendChild(img)

                }

            })
        })
}

load("")

search.addEventListener('input', event=>{
    console.log(event.target.value)
    load(event.target.value)
})
function openModal(event) {
    document.getElementById("modal").style.display = "block";
    var source= event.target
    var sid=source.id
    var img= document.createElement("img")
    img.src=source.src
    img.id= source.id
    console.log(sid)
    console.log(img.id)
    content.appendChild(img)

    let index = -1;
    const children = gallery.children;
    console.log(children)

    for (let i = 0; i < children.length; i++) {
        if (children[i].id === img.id) {
            index = i;
            break;
        }
    }

    let title_= document.createElement("p")
    title_.innerHTML= titles[index]
    title_.className= "modal_text"
    let desc= document.createElement("p")
    desc.innerHTML= descs[index]
    desc.className= "modal_text"
    let date= document.createElement("p")
    date.innerHTML=dates[index]
    date.className= "modal_text"
    let gps= document.createElement("p")
    gps.innerHTML= "GPS: " + long[index]+", "+lati[index]
    gps.className= "modal_text"
    content.appendChild(title_)
    content.appendChild(desc)
    content.appendChild(date)
    content.appendChild(gps)

    window.initMap(long[index],lati[index]);

}

document.getElementById("close").addEventListener('click', closeModal)

function closeModal() {
    document.getElementById("modal").style.display = "none";
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
}



