var NodeGeocoder = require( 'node-geocoder' )
var fs = require( 'fs' )
var Promise = require( 'bluebird' )

var readFile = Promise.promisify( fs.readFile )
var geocoder = NodeGeocoder( {
  provider: 'google'
} )
var pathName = '../data/json/'

var listOfFiles = fs.readdirSync( pathName ).filter( ( x ) => x !== '.DS_Store' ).slice( 0, 1 )
var results = [];

listOfFiles.map( ( fileName ) => {
  readFile( pathName + fileName, 'utf-8' )
    .then( ( data, err ) => {
      return JSON.parse( data ).map( ( schoolObj ) => {
        return geocoder.geocode( {
          address: schoolObj.address,
          country: 'Canada',
          province: 'Ontario',
          zipcode: schoolObj.postalCode
        } ).then( ( res ) => {
          results.push( Object.assign( JSON.parse( data ), {
            latitude: res[ 0 ].latitude,
            longitude: res[ 0 ].longitude
          } ) );
        } ).then(() => {
          console.log("results = ", results);
        })
      } ).then( ( res ) => {
        console.log( "Done" );
      } )
    } ).catch( console.error )
} )
