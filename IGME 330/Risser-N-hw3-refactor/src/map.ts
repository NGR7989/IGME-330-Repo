// import { Feature } from 'geojson';
// //import { mapboxgl } from "mapbox-gl"
// //import mapboxgl from 'mapbox-gl';
// import * as mapboxgl from 'mapbox-gl';
// const mutableMapboxgl = mapboxgl as any;
// Access the accessToken

import * as mapboxgl from 'mapbox-gl';


//import * as mapboxgl from "https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js";

interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    title: string;
    description: string;
  };
}

interface GeoJSON
{
    type: string,
    features: GeoJSONFeature[]
}

let geojson: GeoJSON = {
    type: 'FeatureCollection',
    features: []
  };
  let map;
  let marker;
  
  const initMap = () =>
  {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibmdyNzk4OSIsImEiOiJjbG9xYzdnYzEwZWR1MmlsbmJyZXc5M2o2In0.TbjIRqcD18l6z-07fmJjgg';

    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-77.67454147338866,43.08484339838443],
      zoom: 15.5
    });

    map.on('style.load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
         
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
        {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
         
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
        },
        labelLayerId
        );
        });
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

      let typed = feature as GeoJSONFeature;
      if(feature == null || typed.properties == null)
        continue;

      addMarker(
        typed.geometry.coordinates, 
        typed.properties.title,
        typed.properties.description,
          'marker'
          );
      }
  }
  
  const loadMarkers=()=>{
    const coffeeShops = [
          {
          latitude:43.084156,
          longitude:-77.67514,
          title:"Artesano Bakery & Cafe"
      },
  
      {
          latitude:43.083866,
          longitude:-77.66901,
          title:"Beanz"
      },
  
      {
          latitude:43.082520,
          longitude:-77.67980,
          title:"Starbucks"
      },
  
      {
          latitude:43.086678,
          longitude:-77.669014,
          title:"The College Grind"
      },
  
      {
          latitude:43.082634,
          longitude:-77.68004,
          title:"The Cafe & Market at Crossroads"
      },
  
      {
          latitude:43.08382,
          longitude:-77.674805,
          title:"RITZ Sports Zone"
      },
  
      {
          latitude:43.086502,
          longitude:-77.66912,
          title:"The Commons"
      },
  
      {
          latitude:43.08324,
          longitude:-77.68105,
          title:"The Market at Global Village"
      },
  
      {
          latitude:43.08384,
          longitude:-77.67457,
          title:"Brick City Cafe"
      },
  
      {
          latitude:43.084904,
          longitude:-77.6676,
          title:"Corner Store"
      },
  
      {
          latitude:43.08464,
          longitude:-77.680145,
          title:"CTRL ALT DELi"
      },
  
      {
          latitude:43.08359,
          longitude:-77.66921,
          title:"Gracie's"
      }
  ];
      
      // now convert this data to GeoJSON
    for(let shop of coffeeShops)
    {
      // const newFeature = {
      //   type: "Feature",
      //   geometry: {
      //     type: "Point",
      //     coordinates: []
      //   },
      //   properties: {
      //     title: "",
      //     description: "A place to get coffee!"
      //   }
      // };

      const newFeature: GeoJSONFeature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [shop.longitude, shop.latitude],
        },
        properties: {
          title: shop.title,
          description: "A place to get coffee!",
        },
      };
  
      // Push it on to the geojson array
      geojson.features.push(newFeature);
    }
    console.log(geojson.features);
  }

  const flyTo = (center = [0,0]) => {
    map.flyTo({center : center})
  }

  const setZoomLevel = (value = 0) =>{
    map.setZoom(value);
  }

  const setPitchAndBearing = (pitch = 0, bearing = 0) =>
  {
    map.setPitch(pitch);
    map.setBearing(bearing);
  }

  const addMarker = (coordinates, title, description, className) => {
    let el = document.createElement("div");
    el.className = className;

    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML("<h3>" + title + "</h3><p>" + description + "</p>"))
        .addTo(map);
  }

  export{addMarkersToMap, addMarker, initMap, loadMarkers, flyTo, setZoomLevel, setPitchAndBearing};