//On test si la localisation est disponible :
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log("Nous pouvons récupperrer votre position")
  window.onload = function() {
  SetupPage();
  updatepage(); 
  }
  

} else {
  /* geolocation IS NOT available */
  let titre = document.getElementById("titre").innerHTML = "Désolé mais votre position n'est pas disponible";
}

//fonction qui crée les elements de la page HTML
function SetupPage() {
  const txtlat = document.createElement('p');
  txtlat.innerHTML = "Latitude : ";
  const vallat = document.createElement('span');
  vallat.id = "lat";
  txtlat.append(vallat);
  document.body.append(txtlat);
  
  const txtlon = document.createElement('p');
  txtlon.innerHTML = "Longitude : ";
  const vallon = document.createElement('span');
  vallon.id = "lon";
  txtlon.append(vallon);
  document.body.append(txtlon);
}

//fonction qui met a jour la page.
async function updatepage() {
  const boutton = document.createElement('button');
  boutton.onclick = function() { getlocation() };
  boutton.textContent = "Get position";
  document.body.append(boutton);
  console.log(boutton);
}

//fonction pour récup
async function getlocation() {
  navigator.geolocation.getCurrentPosition(  position => {
    console.log(position);
    document.getElementById('lat').textContent = position.coords.latitude;
    document.getElementById('lon').textContent = position.coords.longitude;
  });
}