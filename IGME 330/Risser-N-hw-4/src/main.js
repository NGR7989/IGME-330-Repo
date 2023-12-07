import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as fire from "./firebase.js";
import * as local from "./local.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = [];

let currentFeature;

const getUserId = () => {
	return "TestHW4";
}

const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
	<span class="panel-icon">
		<i class="fas fa-map-pin"></i>
	</span>
	${feature.properties.title}
	`;
	return a;
}

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for(const id of favoriteIds) {
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
}

// II. Functions
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatNYS);
	}
	
	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45,0);
		map.flyTo(lnglatNYS);
	}
	
	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatUSA);
	}

	// Favorite
	document.querySelector("#btn4").onclick = () => {
		if(currentFeature == undefined || favoriteIds.includes(currentFeature.id))
			return;

		favoriteIds.push(currentFeature.id);
		fire.writeUserDataInc(currentFeature.id);
		local.writeToLocalStorage(getUserId(), favoriteIds);

		refreshFavorites();
		document.querySelector("#btn4").disabled = true;
		document.querySelector("#btn5").disabled = false;
		
	}

	// Unfavorite 
	document.querySelector("#btn5").onclick = () => {
		if(currentFeature == undefined  || !favoriteIds.includes(currentFeature.id))
			return;

		let index = favoriteIds.indexOf(currentFeature.id);
		favoriteIds = favoriteIds.slice(0, index).concat(favoriteIds.slice(index + 1));

		fire.writeUserDataDec(currentFeature.id);
		local.writeToLocalStorage(getUserId(), favoriteIds);

		refreshFavorites();

		document.querySelector("#btn4").disabled = false;
		document.querySelector("#btn5").disabled = true;
	}

	refreshFavorites();
}



const getFeatureById = (id) => {
	return geojson.features.find( (element) => element.id == id );
}

const showFeatureDetails = (id) => {
	console.log(`showFeatureDetails - id=${id}`);
	currentFeature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${currentFeature.properties.title}`;	
	document.querySelector("#details-2").innerHTML = 
	`<p>Address: ${currentFeature.properties.address}<p>
	<p>Phone: ${currentFeature.properties.phone}<p>
	<p>Website: ${currentFeature.properties.url}<p>`;
	
	document.querySelector("#details-3").innerHTML = `Info for ${currentFeature.properties.description}`;	

	// Update ui
	if(favoriteIds.includes(currentFeature.id))
	{
		document.querySelector("#btn4").disabled = true;
		document.querySelector("#btn5").disabled = false;
	}
	else
	{
		document.querySelector("#btn4").disabled = false;
		document.querySelector("#btn5").disabled = true;
	}
};

const init = () => {


	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) =>{
		geojson = JSON.parse(str);

		map.addMarkersToMap(geojson, showFeatureDetails);


		favoriteIds = local.readFromLocalStorage(getUserId());
		if(!Array.isArray(favoriteIds)) favoriteIds = [];

		setupUI();
		fire.SetUpFireBase();
	})
};

init();