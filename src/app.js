const path = require('path');
const express = require('express');

const app = express();

// define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

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
        msg: 'How can I help you?'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'hot as fuck',
        location: 'Hell'
    });
});

app.listen(42069, () => {
    console.log('Server is running on port 42069');
});