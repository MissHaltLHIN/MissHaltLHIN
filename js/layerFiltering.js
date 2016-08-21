// Styling Globals
var COLORS = [ '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594' ];
var BREAKS = [ 0, 100, 200, 300, 400, 500, 600 ];

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
      [ BREAKS[ 6 ], COLORS[ 6 ] ]
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
    var $liHeader = $( '<li><div class="collapsible-header"><i class="material-icons">layers</i>' + categoryName + '</div><div class="collapsible-body"><p></p></div></li>' );
    $liHeader.addClass( _.camelCase( categoryName.replace( 'healthdat_all_', '' ) ) );
    $sidebar.append( $liHeader );
    return;
  } );

  // Adds the sub-variables per each category on the sidebar
  NHS_VARIABLES.map( function( variableName ) {
    variableName = variableName.replace( 'healthdat_all_', '' );
    var category = NHS_CATEGORY_VARS.filter( function( name ) {
      return variableName.indexOf( name ) === 0;
    } )[ 0 ];

    if ( !category ) {
      console.error( "There is no parent category for this variable " + variableName );
      return;
    }

    $link = $( '<a href="#" class="active">' + variableName + '</a></br>' );
    $link.on( 'click', function( e ) {
      e.preventDefault();
      changePropertyObject( variableName );
    } );
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
