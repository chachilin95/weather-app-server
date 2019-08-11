const path = require('path');
const express = require('express');

const app = express();
const publicDir = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
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