mapboxgl.accessToken = 'pk.eyJ1Ijoic29uYWxyIiwiYSI6ImI3ZGNmNTI1Mzc1NzFlYTExMGJkZTVlZDYxYWY4NzJmIn0.wxeViIZtMPq2IPoD9mB5qQ';

//globals for the choropleth
var COLORS = [ '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594' ],
  BREAKS = [ 0, 100, 200, 300, 400, 500, 600 ],
  FILTERUSE;

// Initialize new MapBox Map
var map = new mapboxgl.Map( {
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [ -79.801, 43.559 ],
  zoom: 10
} );
// URL for GeoJSON layers from GeoServer
var nhs_data = "https://raw.githubusercontent.com/MissHaltLHIN/MissHaltLHIN/master/data/geojson/misshalt_nhs_4326.geojson";
var schools = "https://raw.githubusercontent.com/MissHaltLHIN/MissHaltLHIN/master/data/geojson/misshalt_schools_4326.geojson";
var united_way_oakville = "https://raw.githubusercontent.com/MissHaltLHIN/MissHaltLHIN/master/data/geojson/misshalt_oakville_united_way.geojson";
var united_way_bur_ham = "https://raw.githubusercontent.com/MissHaltLHIN/MissHaltLHIN/master/data/geojson/misshalt_burlington_hamilton_united_way.geojson";
// Adding Line Type Layers to the Current Map, takes in the URL for the dataset, Color, and an ID string to name the
// the Layer
function addLineTypeLayer( data_url, id ) {

  //Add zoom and rotation controls to the map
  map.addControl( new mapboxgl.Navigation() );
  map.on( 'style.load', function() {
    map.addSource( id, {
      "type": "geojson",
      "data": data_url
    } );
    map.addLayer( {
      "id": id, // An id for this layer
      "type": "fill", //
      "source": id, // The source layer we defined above
      "paint": {
        "fill-color": {
          property: 'healthdat_all_Age at immigration 25 to 44 years',
          stops: [
            [ BREAKS[ 0 ], COLORS[ 0 ] ],
            [ BREAKS[ 1 ], COLORS[ 1 ] ],
            [ BREAKS[ 2 ], COLORS[ 2 ] ],
            [ BREAKS[ 3 ], COLORS[ 3 ] ],
            [ BREAKS[ 4 ], COLORS[ 4 ] ],
            [ BREAKS[ 5 ], COLORS[ 5 ] ],
            [ BREAKS[ 6 ], COLORS[ 6 ] ]
          ]
        },
        "fill-outline-color": "#ffffff",
        "fill-opacity": 0.7
      }
    } );

  } );

  // When a click event occurs near a polygon, open a popup at the location of
  // the feature, with description HTML from its properties.
  map.on( 'click', function( e ) {
    var features = map.queryRenderedFeatures( e.point, {
      layers: [ id ]
    } );
    if ( !features.length ) {
      return;
    }

    var censusTract = features[ 0 ];

    var rowTemplates = '';

    var returnRowTemplate = function( label, value ) {
      return '<tr align="left"><th>' + label + '</th><td align="right">' + value + '</td></tr>';
    };

    for ( var prop in censusTract.properties ) {
      rowTemplates += returnRowTemplate( prop.replace( 'healthdat_all_', '' ), censusTract.properties[ prop ] );
    }

    var popup = new mapboxgl.Popup()
      .setLngLat( map.unproject( e.point ) )
      .setHTML( '<table border="1"><tbody>' + rowTemplates + '</tbody></table>' )
      .addTo( map );
  } );

  // Use the same approach as above to indicate that the symbols are clickable
  // by changing the cursor style to 'pointer'.
  map.on( 'mousemove', function( e ) {
    var features = map.queryRenderedFeatures( e.point, {
      layers: [ id ]
    } );
  /*
    if ( features.length ) {
      //Show name and value in sidebar
      document.getElementById( 'tooltip-name' ).innerHTML = "Count: " + features[ 0 ].properties[ "healthdat_all_Age at immigration 25 to 44 years" ];
    } else {
      document.getElementById( 'tooltip-name' ).innerHTML = "";
      document.getElementById( 'tooltip' ).innerHTML = "";
    }*/
  } );
}

// Adds Point type layer to the map, takes in the URL for the dataset, color and an ID string to name the layer
function addPointTypeLayer( data_url, id ) {
  map.on( 'style.load', function() {
    map.addSource( id, {
      "type": "geojson",
      "data": data_url
    } );
    map.addLayer( {
      "id": id, // An id for this layer
      "type": "symbol", //
      "source": id, // The source layer we defined above
      "layout": {
        "icon-image": ( id === 'schools' ? "school-15" : "marker-15" )
      }
    } );
  } );
  
  // When a click event occurs near a polygon, open a popup at the location of
  // the feature, with description HTML from its properties.
  map.on( 'click', function( e ) {
    var features = map.queryRenderedFeatures( e.point, {
      layers: [ id ]
    } );
    if ( !features.length ) {
      return;
    }

    var censusTract = features[ 0 ];

    var popup = new mapboxgl.Popup()
      .setLngLat( map.unproject( e.point ) )
      .setHTML( '<b>Name: </b>' + censusTract.properties.name )
      .addTo( map );
  } );

  // Use the same approach as above to indicate that the symbols are clickable
  // by changing the cursor style to 'pointer'.
  // map.on( 'mousemove', function( e ) {
  //   var features = map.queryRenderedFeatures( e.point, {
  //     layers: [ id ]
  //   } );
  //   map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : '';
  // } );
}
//Call the functions that adds layers to the map.
addLineTypeLayer( nhs_data, 'nhs_data' );
addPointTypeLayer( schools, 'schools' );
addPointTypeLayer( united_way_oakville, 'united_way_oakville' );
addPointTypeLayer( united_way_bur_ham, 'united_way_bur_ham' );

//fit the map to bounds of the LHIN
//xMin,yMin -80.1604,43.3717 : xMax,yMax -79.513,43.7345
map.fitBounds([
    [-80.1604, 43.3717],
    [-79.513, 43.7345]
]);
map.addControl(new mapboxgl.Geocoder());