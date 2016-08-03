var osmosis = require( 'osmosis' )
var fs = require( 'fs' )
var Promise = require( 'bluebird' )
var readFile = Promise.promisify( fs.readFile )
var addresses = [];

readFile( 'list.txt', 'utf8' )
  .then( ( urls ) => {
    var urlArray = urls.split( "\n" );
    return Promise.map( urlArray, ( url ) => {
      return getSchoolData( url ).then( ( result ) => {
          var schoolName = result.schoolName
          var singleAddress = result.address.split( "\r\n" ).map( str => str.trim() )
          addresses.push( {
            schoolName: schoolName,
            streetAddress: singleAddress[ 0 ],
            postalCode: singleAddress[ 1 ].split( " " )[ 2 ],
            city: singleAddress[ 1 ].split( ", " )[ 0 ],
            phone: singleAddress[ 2 ].split( ": " )[ 1 ],
            fax: singleAddress[ 3 ].split( ": " )[ 1 ],
          } )
          return addresses
        } )
        .done( ( res ) => {
          fs.appendFile( 'data.json', JSON.stringify( res ), function( err ) {
            if ( err ) {
              console.log( "err = ", err );
            } else {
              console.log( "Done." )
            }
          } )
        } )
    } )
  } );

var getSchoolData = function( url ) {
  return new Promise( function( resolve, reject ) {
    osmosis.get( url )
      .find( '#ctl00_PlaceHolderMain_ctl00_zlblSchoolName' )
      .set( 'schoolName' )
      .find( '.pc-scprofile-address' )
      .set( 'address' )
      .data( ( results ) => {
        resolve( results )
      } )
      .error( ( err ) => {
        reject( err )
      } )
      .done( () => {
        console.log( 'done' )
      } )
  } )
}
