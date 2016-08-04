
mapboxgl.accessToken = 'pk.eyJ1Ijoic29uYWxyIiwiYSI6ImI3ZGNmNTI1Mzc1NzFlYTExMGJkZTVlZDYxYWY4NzJmIn0.wxeViIZtMPq2IPoD9mB5qQ';
// Initialize new MapBox Map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v8',
    center: [-79.801, 43.559],
    zoom: 10
});
// URL for GeoJSON layers from GeoServer
var nhs_data = "https://raw.githubusercontent.com/MissHaltLHIN/MissHaltLHIN/master/data/geojson/misshalt_nhs_4326.geojson";
// Adding Line Type Layers to the Current Map, takes in the URL for the dataset, Color, and an ID string to name the
// the Layer
function addLineTypeLayer(data_url,color,id){
    map.on('style.load', function() {
        map.addSource(id, {
            "type": "geojson",
            "data": data_url
        });
        map.addLayer({
            "id": id, // An id for this layer
            "type": "fill", //
            "source": id, // The source layer we defined above
            "paint": {
                "fill-color": color,
                "fill-outline-color":"#FFFFFF",
                "fill-opacity": 0.4
            }
        });

    })

    // When a click event occurs near a polygon, open a popup at the location of
    // the feature, with description HTML from its properties.
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: [id] });
        if (!features.length) {
            return;
        }

        var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML('<b>healthdat_all_field_1:  </b>'+feature.properties.healthdat_all_field_1)
            .addTo(map);
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: [id] });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });;
}
// Adds Point type layer to the map, takes in the URL for the dataset, color and an ID string to name the layer
function addPointTypeLayer(data_url,color,id){
    map.on('style.load', function() {
        map.addSource(id, {
            "type": "geojson",
            "data": data_url
        });
        map.addLayer({
            "id": id, // An id for this layer
            "type": "symbol", //
            "source": id, // The source layer we defined above
            "layout": {
                "text-field": "{textstring}",
                "text-size": 8
            },
            "paint": {
                'text-color': 'red'
            }
        });
    });
}
//Call the functions that adds layers to the map.
addLineTypeLayer(nhs_data,'#088','nhs_data');
//addLineTypeLayer(ceiling_plan,'#FF0000','ceiling_plan');
//addPointTypeLayer(label,'#FF0000','labels');
