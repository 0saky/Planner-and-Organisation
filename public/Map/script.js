let lat;
let lon;
let mymap;
let marker;

//On test si la localisation est disponible :
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log("Nous pouvons récupperrer votre position")
  window.onload = function() {
    creatleaflet();
    updatepage();

    
    
  }

} else {
  /* geolocation IS NOT available */
  let titre = document.getElementById("titre").innerHTML = "Désolé mais votre position n'est pas disponible";
}



//fonction qui met a jour la page.
async function updatepage() {
  const boutton = document.getElementById('Boutton');
  boutton.onclick = function() { getlocation() };
}

//fonction pour récup
async function getlocation() {
  navigator.geolocation.getCurrentPosition(  position => {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude
    document.getElementById('lat').textContent = lat;
    document.getElementById('lon').textContent = lon;

    marker = L.marker([lat, lon]).addTo(mymap);
    
    mymap.flyTo(new L.LatLng(lat, lon),  18);
  }); 

}

async function creatleaflet(){
  
  mymap = L.map('mapid').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(mymap);

  
}