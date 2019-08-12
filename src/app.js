const express = require('express');
const hbs = require('hbs');
const path = require('path');

const geocode = require('./api/mapbox').geocode;
const forecast  =require('./api/darksky').forecast;

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alejandro Figueroa'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alejandro Figueroa'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'How can I help you?',
        name: 'Alejandro Figueroa'
    });
});

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404 - Not Found',
        msg: 'Help article not found.',
        name: 'Alejandro Figueroa'
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast({ latitude, longitude }, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                address,
                location,
                forecastData
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404 - Not Found',
        msg: 'Page not found.',
        name: 'Alejandro Figueroa'
    });
});

app.listen(port, () => {
    console.log('Server is running on port 42069');
});