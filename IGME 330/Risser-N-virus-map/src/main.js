import * as ajax from "./ajax.js";
import * as classes from "./classes.js";

let geojson = {
  type: 'FeatureCollection',
  features: []
};
let map;
let dates;
let index;
let marker;

let markers = [];

function removeAllMarkers(){
  for(let m of markers){
    m.remove();
  }
  markers = [];
}

function updateGeoJSON(geojson){
  // 1 - loop through array of features and update `numCases` to reflect current date
  for (let feature of geojson.features){
    const numCases = feature.properties.allCases[index];
    feature.properties.numCases = numCases;
    feature.properties.description = numCases + " cases";
  }
	
  // 2 - tell the map to reload the data, which will cause the symbol layer to refresh
  map.getSource('cases').setData(geojson);
}

function setupUI(){
	// 1 - clear out the <select>
	dateSelect.innerHTML = "";
	
	// 2 - loop through `dates` array
	for (let d of dates){
		// add an <option> for each date
		let option = document.createElement("option");
		option.innerText = d;
		dateSelect.appendChild(option);
	}
	
	// 3 - make the last date the selected one
	dateSelect.lastChild.selected = "selected"; // show last date
	
	// 4 - when the <select> is changed ...
	dateSelect.onchange = e => {
		// get the value (the text, in this case) of the current <option>
		let value = e.target.value.trim();
		
		// look for that value in the `dates` array
		index = dates.findIndex(el => el.trim() == value);
		console.log(`index is now ${index}`);

    updateGeoJSON(geojson);
	};
}

function createLayers(){
	// https://docs.mapbox.com/mapbox-gl-js/api/#map#loaded
	if(map.loaded()){
		addCircleAndTextLayers();
	}else{
		map.on('load',addCircleAndTextLayers);
	}
	
	function addCircleAndTextLayers() {
		// 1 - here we "bind" the map to our `geojson` data
		// later on when we change `geojson` data to point at a different date, we will
		// be able to easily tell the map to refresh itself and display the new data
		map.addSource('cases', {
			type: 'geojson',
			data: geojson
		});
	
	
		// 2 - the first layer we are adding is of the `circle` type
		// https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#circle
		// other layer types include "background", "fill", "symbol" and "heatmap"
		// here we are drawing "ornamental" red circles, all of the same size
		// but we could also vary the size of the circles based on number of cases
		// note our use of the "paint" property below
		map.addLayer({
      id: 'cases-circle-varying',
      type: 'circle',
      source: 'cases', // we bound the `geojson` object to the "cases" name with `map.addSource()` above
      minzoom: 3,
      "paint": {
      'circle-stroke-color': 'white',
      'circle-stroke-width': 0,
      'circle-opacity': 0.3,
      'circle-translate': [1,-4],
      'circle-radius': {
          property: 'numCases',
          stops: [
            [0, 18],  // if there are 0 cases, the circle radius is 18
            [50, 25], // if there are 50 cases, the circle radius is 25
            [1000, 40], // if there are 1000 cases, the circle radius is 40
            [10000, 50], // if there are 10000 or more cases, the circle radius is 50
            /*
            Between 0 & 50 cases, the radius of the circle will interpolate from 18 to 25
            Between 50 & 1000 cases, the radius of the circle will interpolate from 25 to 40
            Between 1000 & 10000 cases, the radius of the circle will interpolate from 40 to 50
            */
          ]
        },
        'circle-color': {
          property: 'numCases',
          stops: [
            [0, "#00FF00"], // if there are 0 cases, the circle is green
            [1, "#555555"], // if there is 1 case, the circle is gray
            [50, "#FFFF00"],// if there are 50 cases, the circle is yellow
            [10000, "#FF0000"] // if there are 10000 or more cases, the circle is red
            /*
            Between 1 & 50 cases, the color of the circle will interpolate from gray to yellow
            Between 50 & 10000 cases, the color of the circle will interpolate from yellow to red
            */
          ],
        }
      }
    });
	
	
	  // 3 - the second layer is a "symbol" layer that let's us draw text - here the 
	  // number of diagnosed cases
	  // Note that we are specifying both "paint" properties and "layout" properties
	  // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
	  // https://docs.mapbox.com/help/glossary/layout-paint-property/
		map.addLayer({
			id: 'num-cases-text',
			type: 'symbol',
			source: 'cases',
			'paint': {
				'text-color' : 'red',
				'text-translate' : [0,-29] // [x,y]
			},
			'layout':{
				'text-field': ['get','numCases'], // this is grabbing `feature.properties.numCases`
			}
		}); // end text layer code
		
  } // end inner function `addCircleAndTextLayers()`
  
} // end function `createLayers()`

const addMarker = (coordinates, title, description, className) => {
  let el = document.createElement("div");
  el.className = className;

  new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup({offset: 25})
      .setHTML("<h3>" + title + "</h3><p>" + description + "</p>"))
      .addTo(map);

  markers.push(marker);
}

const addMarkersToMap = () =>
  {
    removeAllMarkers();

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
    createLayers();
    setupUI();
 }

  ajax.downloadFile(url, dataLoaded);
}





// Creates the mapbox groundwork for rendering it and initial data 
const initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmdyNzk4OSIsImEiOiJjbG9xYzdnYzEwZWR1MmlsbmJyZXc5M2o2In0.TbjIRqcD18l6z-07fmJjgg';
  
  map = new mapboxgl.Map({
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