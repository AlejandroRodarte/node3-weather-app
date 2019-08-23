const request = require('request');

// address: Mapbox required input data
// callback: Dark Sky continued request with fetched longitude and latitude
const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm9kYXJ0ZTg4NTAiLCJhIjoiY2p6a20yamF1MDQ3ZDNqcDE0NWE0eHUxcCJ9.oXAGCoxKznXbYY1dZ315gA&limit=1`

    // Mapbox Request
    request(

        url, 

        // parse the body automatically as JSON
        {
            json: true
        }, 
        
        // destructuring: access the response and access quickly the body property
        (error, { body }) => {

            // low-level error handling: send the custom error message to the callback function
            // (set the 'data' parameter undefined since an error occured)
            // remember: callbacks are the async way to use the 'return' statement
            if (error) {
                callback('No internet connection has been provided.', undefined);
            }

            // bad input: no results have been found by Mapbox: use callback to make the callback handle what to do with
            // the error message
            else if (body.features.length === 0) {
                callback('No matching results for the given query exist.', undefined);
            }

            // correct input: send to the callback the response payload in a JSON format
            // set the 'error' argument as undefined since this is the happy path
            else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }

        }

    );

};

module.exports = geocode;