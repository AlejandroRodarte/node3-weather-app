const path = require('path');

// the Express library
const express = require('express');

// initalize Express
const app = express();

// path to /public: current path to /src, go one level up and go to /public
const publicDir = path.join(__dirname, '..', 'public');

// use hbs as the view engine
app.set('view engine', 'hbs');

// express.static() to inform Express from where we will load the static assets
app
    .use(
        express.static(
            path.join(publicDir)
        )
    );

// GET request on /
app.get('', (req, res) => {

    // render index.hbs with dynamic data
    res.render('index', {
        title: 'Weather App',
        name: 'Alejandro Rodarte'
    });

});

// GET request on /about; render about.hbs with dynamic data
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alejandro Rodarte'
    });
});

// GET request on /help; render help.hbs with dynamic data
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'How can I help you in this wonderful day?'
    })
});

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