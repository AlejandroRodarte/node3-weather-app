const path = require('path');

// the Express library
const express = require('express');

// initalize Express
const app = express();

// path to /public: current path to /src, go one level up and go to /public
const publicDir = path.join(__dirname, '..', 'public');

// express.static() to inform Express from where we will load the static assets
app
    .use(
        express.static(
            path.join(publicDir)
        )
    );

// @GetMapping on the /weather path
app.get('/weather', (req, res) => {

    // sending JSON
    res.send({
        forecast: 'Rainy',
        location: 'Chihuahua, Chihuahua, Mexico'
    });
    
});

// listen(): set up a server on a particular port
// accepts a callback to run some code when the server has been deployed
app.listen(3000, () => {
    console.log('Server is up and running on localhost:3000/')
});