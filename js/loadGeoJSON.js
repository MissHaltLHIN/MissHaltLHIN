// This file initializes the Mapbox map and adds polygon and point data.

// Initialize new Mapbox map
var map = new mapboxgl.Map( {
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [ -79.801, 43.559 ],
  zoom: 10
} );

// Add Line Type Layers to the current map, takes in the URL for the dataset, Color, and an ID string to name the Layer
var addLineTypeLayer = function( data_url, id ) {
  map.addControl( new mapboxgl.Navigation() );
  map.on( 'style.load', function() {
    map.addSource( id, {
      "type": "geojson",
      "data": data_url
    } );
    map.addLayer( {
      "id": id,
      "type": "fill",
      "source": id,
      "paint": {
        "fill-color": '#aaa',
        "fill-outline-color": "#ffffff",
        "fill-opacity": 0.7
      }
    } );
  } );

  map.on( 'click', renderPopup( id, 'lineType' ) );
};

// Adds Point type layer to the map, takes in the URL for the dataset, color and an ID string to name the layer
var addPointTypeLayer = function( data_url, id ) {
  map.on( 'style.load', function() {
    map.addSource( id, {
      "type": "geojson",
      "data": data_url
    } );
    map.addLayer( {
      "id": id,
      "type": "symbol",
      "source": id,
      "layout": {
        "icon-image": ( id === 'schools' ? "school-15" : "marker-15" )
      }
    } );
  } );

  map.on( 'click', renderPopup( id, 'pointType' ) );
};

$( document ).ready( function() {
  addLineTypeLayer( window.URL_DATA.nhs_data, 'nhs_data' );
  addPointTypeLayer( window.URL_DATA.schools, 'schools' );
  addPointTypeLayer( window.URL_DATA.united_way_oakville, 'united_way_oakville' );
  addPointTypeLayer( window.URL_DATA.united_way_bur_ham, 'united_way_bur_ham' );

} );
//fit the map to bounds of the LHIN
//xMin,yMin -80.1604,43.3717 : xMax,yMax -79.513,43.7345
map.fitBounds( [
  [ -80.1604, 43.3717 ],
  [ -79.513, 43.7345 ]
] );
map.addControl( new mapboxgl.Geocoder( {
  position: 'top-right'
} ) );
