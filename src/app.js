const path = require('path');

// the Express library: exports a single function
const express = require('express');

// Handlebars directory
const hbs = require('hbs');

// initalize Express: call the express() main function
const app = express();

// path to /public: current path to /src, go one level up and go to /public
const publicDir = path.join(__dirname, '..', 'public');

// path to /templates (custom for Handlebars to find our views)
const viewsDir = path.join(__dirname, '..', 'templates', 'views');

// set path to /templates/partials for Handlebar partials
const partialsDir = path.join(__dirname, '..', 'templates', 'partials');

// inform Handlebars where our partials directory is located
hbs.registerPartials(partialsDir);

// use Handlebars as the view engine
app.set('view engine', 'hbs');

// set Express to search for dynamic views on /templates
app.set('views', viewsDir);

// express.static() to inform Express from where we will load the static assets
app.use(express.static(path.join(publicDir)));

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
        name: 'Alejandro Rodarte',
        helpMessage: 'How can I help you?'
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

// match any page that has not been matched yet and that starts with /help
// must go ALWAYS BEFORE the generic '*' app.get()
app.get('/help/*', (req, res) => {

    // render page-not-found.hbs with custom data
    res.render('page-not-found', {
        title: '404',
        name: 'Alejandro Rodarte',
        errorMessage: 'Help article not found'
    });

});

// match for all the rest of the routes (* wildcard)
// load 404 page
// this should always be the LAST app.get
app.get('*', (req, res) => {

    // render page-not-found.hbs with custom data
    res.render('page-not-found', {
        title: '404',
        name: 'Alejandro Rodarte',
        errorMessage: 'Page Not Found'
    });

});

// listen(): set up a server on a particular port
// accepts a callback to run some code when the server has been deployed
app.listen(3000, () => {
    console.log('Server is up and running on localhost:3000/')
});