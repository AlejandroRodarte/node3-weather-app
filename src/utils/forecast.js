const request = require('request');

// forecast function with the data required to work with and a callback to return values
const forecast = (latitude, longitude, callback) => {

    // base url
    const url = `https://api.darksky.net/forecast/066c66a48de4464716ad62ff0ac5cd1b/${latitude},${longitude}`;

    // request
    request(
        
        url,

        {
            json: true
        },

        // destructuring: access the response and access quickly the body property
        (error, { body }) => {

            // low-level error handling: send error to callback for handling
            if (error) {
                callback('No internet connection has been provided.', undefined);
            }

            // coordinate error handling: send error to callback for handling
            else if (body.error) {
                callback('No matching results for the given query exist.', undefined);
            }

            // correct input and response: send data to callback for handling
            else {
                callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
            }

        }
        
    );

}

module.exports = forecast;