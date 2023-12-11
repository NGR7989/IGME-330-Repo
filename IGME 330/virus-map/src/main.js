import * as ajax from "./ajax.js";
import * as classes from "./classes.js";

let geojson = {
  type: 'FeatureCollection',
  features: []
};
let map;
let dates;
let index;
//let regions;
let marker;

const addMarker = (coordinates, title, description, className) => {
  let el = document.createElement("div");
  el.className = className;

  new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup({offset: 25})
      .setHTML("<h3>" + title + "</h3><p>" + description + "</p>"))
      .addTo(map);
}

const addMarkersToMap = () =>
  {
    // Create a new marker.
    marker = new mapboxgl.Marker()
    .setLngLat([30.5, 50.5])
    .addTo(map);

  
    // add markers to map
    for (const feature of geojson.features) {
      // create a HTML element for each feature

    addMarker(
        feature.geometry.coordinates, 
        feature.properties.title,
        feature.properties.description,
        'marker'
        );
    }
  }

const makeGeoJSON = (regions) => {
  const geojson = {type: 'FeatureCollection', features: [] };

  for(let r of regions){
    const newFeature = {
      type: 'Feature',
      geometry: {
        type:'Point',
        coordinates: []
      },
      properties: {
        title: '',
        description: 'None'
      }
    };


    newFeature.geometry.coordinates = [+r.longitude, +r.latitude];

    newFeature.properties.title = r.provinceOrState ? r.provinceOrState + " - " + r.countryOrRegion : r.countryOrRegion;
  
    let numCases = r.data[index];

    newFeature.properties.numCases = numCases;
    newFeature.properties.allCases = r.data;

    newFeature.properties.description = numCases + " cases";

    geojson.features.push(newFeature);
  }

  return geojson;
}

const parseCSV = (string) => {
  let regions = [];

  let rows = string.trim().split("\n");

  let fieldNames = rows.shift().split(",");

  fieldNames.splice(0,4);

  dates = fieldNames;

  index = dates.length - 1;

  const regex = /,(?!(([^"]*"){2})*[^"]*$)/;
  for(let row of rows){
    row = row.replace(regex, " - ");
    row = row.replace(/"/g,"");

    row = row.split(",");
    regions.push(new classes.Region(row));
  }


  return regions;
}

// Gets our data from the csv file 
const loadData = () => {
  const url = "data/time_series_covid19_confirmed_global.csv";

  function dataLoaded(string){
    let regions = parseCSV(string);
    geojson = makeGeoJSON(regions);

    console.log(geojson);
    addMarkersToMap();
 }

  ajax.downloadFile(url, dataLoaded);
}





// Creates the mapbox groundwork for rendering it and initial data 
const initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmdyNzk4OSIsImEiOiJjbG9xYzdnYzEwZWR1MmlsbmJyZXc5M2o2In0.TbjIRqcD18l6z-07fmJjgg';
  
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-96, 37.8],
    zoom: 3
  });
}

const init = () =>
{
  initMap();
  loadData();
}


export {init};