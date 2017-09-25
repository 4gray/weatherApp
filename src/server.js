const express = require('express');
const path = require('path');
const app = express();
const opn = require('opn');
const server = require('http').createServer(app);

require('es6-promise').polyfill();
require('isomorphic-fetch');

const PORT = '3000';

const API_KEY = '2f3819b2795ac93d947ceed9797ef3af'; // secret dark sky api key
const API_REQUEST_URI = 'https://api.darksky.net/forecast/' + API_KEY + '/';

// set path to the dist folder with a builded angular app
app.use(express.static(path.join(__dirname, '../dist')));

/**
 * Request forecast data
 */
app.get('/api/forecast', function (req, res) {
    const url = API_REQUEST_URI + req.query.lat + ',' + req.query.lon;
    fetchData(url, res);
});

/**
 * Request time machine data
 */
app.get('/api/time-machine', function (req, res) {
    const url = API_REQUEST_URI + req.query.lat + ',' + req.query.lon + ',' + req.query.time + '?exclude=' + req.query.exclude; // set url get parameters
    fetchData(url, res);
});

/**
 * Simple error handler
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(PORT, function () {
    console.log('... listening localhost on port ' + PORT);
    opn('http://localhost:' + PORT); // open page in the default web browser
});

/**
 * Fetch data from provided URL and return the results as JSON object
 * @param {string} url 
 * @param {object} res 
 */
function fetchData(url, res) {
    fetch(url)
        .then(response => {
            if (response.status != 200) {
                //res.json(response);
                res.status(response.status).json({ 'error': 'Error, bad server response' });
            }
            return response.json();
        })
        .then(response => res.status(200).json(response));
}


module.exports = app;