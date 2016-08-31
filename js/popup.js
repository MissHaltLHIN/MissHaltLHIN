// When a click event occurs near a polygon/point, query the ID of the clicked element and open a popup at the location of the feature, with description HTML from its properties.
var renderPopup = function( id, dataType ) {

  return function( e ) {
    var features = map.queryRenderedFeatures( e.point, {
      layers: [ id ]
    } );
    if ( !features.length ) {
      return;
    }
    var popup = new mapboxgl.Popup()
      .setLngLat( map.unproject( e.point ) )
      .setHTML( renderPopupTable( filterPropertiesByDataType( features[ 0 ].properties, dataType ) ) )
      .addTo( map );
  };
};

var filterPropertiesByDataType = function( properties, dataType ) {
  // if ( dataType === 'lineType' ) {
    // return _.pick( properties, CT_SPECIFIC_VARS );
  // } else {
    return properties;
  // }
};

// Converts census tract properties into a simple table in HTML.
var renderPopupTable = function( censusTractProperties ) {
  var rowTemplates = '';
  var returnRowTemplate = function( label, value ) {
    return '<tr><th>' + label + '</th><td>' + value + '</td></tr>';
  };

  for ( var prop in censusTractProperties ) {
    rowTemplates += returnRowTemplate( prop.replace( 'healthdat_all_', '' ), censusTractProperties[ prop ] );
  }
  return '<table><tbody>' + rowTemplates + '</tbody></table>';
};
