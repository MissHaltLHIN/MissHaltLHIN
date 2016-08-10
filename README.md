# :sparkles: Project Atlas: Mississauga Halton Health Integration Network Map

In partnership with [Civic Tech Toronto](http://civictech.ca/) and the [Mississauga Halton Health Integration Network (LHIN)](http://www.mississaugahaltonlhin.on.ca/), we have produced a map to investigate supply and demand of health care resources.

## Maps

**NOTE**: Work in progress.

:zap: The map using Mapbox is [here](https://misshaltlhin.github.io/MissHaltLHIN/).

:zap: The map using Leaflet is [here](https://misshaltlhin.github.io/MissHaltLHIN/leafletMissHaltLHIN.html).


## Contributing

The project is separated into 3 parts

1. Data
  - JSON and GeoJSON - all data should be converted into geojson, using `geoJSONformatter.py`
2. Leaflet map in `js/map.js`
3. Mapbox map in `js/loadGeoJSON.js`
4. Scrapers
  - The scrapers are all based on Node.js. Install Node and `npm install` the dependencies.
  - `index.js` scrapes Halton Public Schools websites
  - `geocoder.js` adds longitude and latitude from postal codes (work in progress)

## Team

Oliver Blunn - ‎Project Lead at [Mississauga Halton Local Health Integration Network](http://www.mississaugahaltonlhin.on.ca/)

Jane Zhang - Project GIS lead

Sonal Ranjit - [GitHub](https://github.com/sonalranjit)

Alex Chen - [GitHub](https://github.com/alexaca79)

Michelle Lee - [GitHub](https://github.com/mi-lee)

Mackenzie Nichols - [GitHub](https://github.com/mackeynichols)

