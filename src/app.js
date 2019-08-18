const express = require('express');
const hbs = require('hbs');
const path = require('path');

const geocode = require('./api/mapbox').geocode;
const forecast = require('./api/darksky').forecast;

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

app.get('', (_req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alejandro Figueroa'
    });
});

app.get('/about', (_req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alejandro Figueroa'
    });
});

app.get('/help', (_req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'How can I help you?',
        name: 'Alejandro Figueroa'
    });
});

app.get('/help/*', (_req, res) => {
    res.render('notfound', {
        title: '404 - Not Found',
        msg: 'Help article not found.',
        name: 'Alejandro Figueroa'
    });
});

app.get('/weather', async (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    try {
        const address = req.query.address;
        const { latitude, longitude, location } = await geocode(address);
        const forecastData = await forecast({ latitude, longitude });

        res.send({
            address,
            location,
            forecastData
        });
    } catch (error) {
        res.send(error);
    }
});

app.get('*', (_req, res) => {
    res.render('notfound', {
        title: '404 - Not Found',
        msg: 'Page not found.',
        name: 'Alejandro Figueroa'
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});