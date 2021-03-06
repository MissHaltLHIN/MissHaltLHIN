// Styling Globals
var COLORS = [ "#fff", "#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#7fcdbb", "#1d91c0", "#225ea8", "#253494", "#081d58", "#000" ];

var BREAKS = [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

// This changes the property value of the map - used to filter for a specific property on the page.
var changePropertyObject = function( property ) {
  var propertyObject = {
    property: 'healthdat_all_' + property,
    stops: [
      [ BREAKS[ 0 ], COLORS[ 0 ] ],
      [ BREAKS[ 1 ], COLORS[ 1 ] ],
      [ BREAKS[ 2 ], COLORS[ 2 ] ],
      [ BREAKS[ 3 ], COLORS[ 3 ] ],
      [ BREAKS[ 4 ], COLORS[ 4 ] ],
      [ BREAKS[ 5 ], COLORS[ 5 ] ],
      [ BREAKS[ 6 ], COLORS[ 6 ] ],
      [ BREAKS[ 7 ], COLORS[ 7 ] ],
      [ BREAKS[ 8 ], COLORS[ 8 ] ],
      [ BREAKS[ 9 ], COLORS[ 9 ] ],
      [ BREAKS[ 10 ], COLORS[ 10 ] ],
    ]
  };
  map.setPaintProperty( 'nhs_data', 'fill-color', propertyObject );
};

// Render sidebar and adds event listeners for property layer filtering
var renderSidebar = function() {
  var NHS_VARIABLES = window.NHS_VARIABLES;
  var NHS_CATEGORY_VARS = window.NHS_CATEGORY_VARIABLES;

  var $sidebar = $( '#sidebar .collapsible' );

  // Adds category as header of the collapsable menu
  NHS_CATEGORY_VARS.map( function( categoryName ) {
    // Creates a Category header on the sidebar
    var $liHeader = $( '<li><div class="collapsible-header"><i class="material-icons">layers</i>' + categoryName + '</div><div class="collapsible-body"><p></p></div></li>' );

    $liHeader.addClass( _.camelCase( categoryName.replace( 'healthdat_all_', '' ) ) );
    $sidebar.append( $liHeader );
    return;
  } );

  // Adds the sub-variables per each category on the sidebar
  NHS_VARIABLES.map( function( variableName ) {
    variableName = variableName.replace( 'healthdat_all_', '' );

    // Searches if it belongs to a parent category
    var category = NHS_CATEGORY_VARS.filter( function( name ) {
      return variableName.indexOf( name ) === 0;
    } )[ 0 ];

    if ( !category ) {
      console.error( "There is no parent category for this variable " + variableName );
      return;
    }

    var cleanVariableName = variableName.replace( category, '' ).trim();
    $link = $( '<a href="#">' + cleanVariableName + '</a></br>' );

    // Change the layer property on click
    $link.on( 'click', function( e ) {
      e.preventDefault();
      changePropertyObject( variableName );
    } );

    // Appends the variable filter under Category filter within the sidebar
    $sidebar.find( '.' + _.camelCase( category ) + ' .collapsible-body p' ).append( $link );
    return;
  } );
};

$( document ).ready( function() {
  renderSidebar();

  // Initialize Materialize collapsable menu
  $( '.collapsible' ).collapsible( {
    accordion: false
  } );
} );
