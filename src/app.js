const express = require('express');
const path = require('path');

const app = express();
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'hot as fuck',
        location: 'Hell'
    });
});

app.listen(42069, () => {
    console.log('Server is running on port 42069');
});