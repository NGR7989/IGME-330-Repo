import * as map from "./map"
import * as ajax from "./ajax";

let poi;

const loadPOI = () => {
  const url = "https://people.rit.edu/~acjvks/shared/330/igm-points-of-interest.php";

  const poiLoaded = (jsonString) =>{
    poi = JSON.parse(jsonString);
    console.log(poi);

    for(let p of poi)
    {
      map.addMarker(p.coordinates, p.title, "A POI!", "poi");
    }
  }

  ajax.downloadFile(url, poiLoaded);
}

const setupUI = () => {
  // it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
  const lnglatRIT = [-77.67454147338866, 43.08484339838443];
  const lnglatIGM = [-77.67990589141846, 43.08447511795301];

  // Rit Zoom 15.5 as HTMLButtonElement
  let btn1 = document.getElementById("btn1") as HTMLButtonElement;
  (btn1 as HTMLButtonElement).onclick = () => {
    map.setZoomLevel(15.5);
    map.setPitchAndBearing(0,0);
    map.flyTo(lnglatRIT);
  }

  // RIT isometric view 
  let btn2 = document.getElementById("btn2") as HTMLButtonElement;
  btn2.onclick = () => {
    map.setZoomLevel(15.5);
    map.setPitchAndBearing(45, 0);
    map.flyTo(lnglatRIT);
    console.log("btn2");
  }

  // World zoom 0
  let btn3 = document.getElementById("btn3") as HTMLButtonElement;
  btn3.onclick = () => {
    map.setZoomLevel();
    map.setPitchAndBearing(0,0);
    map.flyTo();
  }

  // IGM zoom 18
  let btn4 = document.getElementById("btn4") as HTMLButtonElement;
  btn4.onclick = () => {
    map.setZoomLevel(18);
    map.setPitchAndBearing(0,0);
    map.flyTo(lnglatIGM);
  }

  let btn5 = document.getElementById("btn5") as HTMLButtonElement;
  btn5.onclick = () => {
    if(!poi){
      loadPOI();
    }
  }
}



const init = () =>
{
  if(map == null)
    return;

  map.initMap();
  map.loadMarkers();
  map.addMarkersToMap();

  setupUI();
}


export {init};