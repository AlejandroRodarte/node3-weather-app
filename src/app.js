// the Express library
const express = require('express');

// initalize Express
const app = express();

// @GetMapping request: used to serve data a client requests
// first param: url path (root in this case)
// second param: handler for what to do when users accesses the path
// this callback receives two arguments: a request and a response
app.get('', (req, res) => {
    // send(): respond to the requester with some information
    res.send('Hello from an Express Application!');
});

// @GetMapping on the /help path
app.get('/help', (req, res) => {
    res.send('This is the help page.');
});

// @GetMapping on the /about path
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

// @GetMapping on the /weather path
app.get('/weather', (req, res) => {
    res.send('This is the weather page.');
});

// listen(): set up a server on a particular port
// accepts a callback to run some code when the server has been deployed
app.listen(3000, () => {
    console.log('Server is up and running on localhost:3000/')
});