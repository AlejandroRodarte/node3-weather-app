console.log('Client-sided JavaScript file has been loaded');

// async function to get the forecast
// use our custom Express route to trigger the /weather related request with an address passed in as query param
// use async/await to return the final Promised JSON
async function getForecast(address) {
    const data = await fetch(`/weather?address=${address}`);
    const json = await data.json();
    return json;
}

// get the Forecast Promise and use then() to access the final response and check for error property
getForecast('Boston')
    .then(json => {

        if (json.error) {
            return console.log(json.error);
        }

        console.log(`Location: ${json.location}`);
        console.log(`Forecast: ${json.forecast}`);

    });

// async function: returns a promise
async function getPuzzle() {

    // run fetch(): returns Promise; use await to wait for resolve and assign resolved
    // value to 'data'
    const data = await fetch('http://puzzle.mead.io/puzzle');

    // run json(): returns Promise; use await to wait for resolve and assign resolved
    // value to 'json'
    const json = await data.json();

    // return final 'json'; returns a Promise
    return json;

}

// getPuzzle() async; returns Promise; access then() to access resolved value
getPuzzle()
    .then(json => console.log(json.puzzle));