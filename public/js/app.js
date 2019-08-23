console.log('Client-sided JavaScript file has been loaded');

// async function to get the forecast
// use our custom Express route to trigger the /weather related request with an address passed in as query param
// use async/await to return the final Promised JSON
async function getForecast(address) {
    const data = await fetch(`/weather?address=${address}`);
    const json = await data.json();
    return json;
}

// local references to the form and the input
const weatherForm = document.querySelector('form');
const search = document.querySelector('#location');

// local reference to all parapgraphs
const locationResult = document.querySelector('#location-result');
const forecastResult = document.querySelector('#forecast-result');
const errorResult = document.querySelector('#error-result');
const loading = document.querySelector('#loading');

// add submit event listener to the form
weatherForm.addEventListener('submit', (e) => {
    
    // prevent automatic reloading on form submission (natural HTML behavior)
    e.preventDefault();

    // make appear the loading... paragraph
    loading.style.display = 'block';

    // get the value from the input
    const location = search.value;

    // call the async function to wait for the resolved (forecast) data to come in
    getForecast(location)
        .then(json => {

            // when a response is provided, disappear the loading... paragraph again
            loading.style.display = 'none';

            // if error exists
            if (json.error) {

                // display the error paragraph and set its text
                errorResult.style.display = 'block';
                errorResult.textContent = json.error;

                // set a 3s timeout to disappear the alert box
                setTimeout(() => {
                    errorResult.style.display = 'none';
                }, 3000);

                return;

            }

            // if error does not exist, make appear the result boxes and set their text content with the
            // fetched data
            locationResult.style.display = 'block';
            forecastResult.style.display = 'block';
            locationResult.textContent = json.location;
            forecastResult.textContent = json.forecast;

        });

});

// get the Forecast Promise and use then() to access the final response and check for error property
// getForecast('Boston')
//     .then(json => {

//         if (json.error) {
//             return console.log(json.error);
//         }

//         console.log(`Location: ${json.location}`);
//         console.log(`Forecast: ${json.forecast}`);

//     });

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