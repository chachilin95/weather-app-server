const dotenv = require('dotenv');
const request = require('request');

// get API key
dotenv.config();
const apiKey = process.env.MAPBOX_API_KEY;

const generateURL = (place) => (
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${apiKey}`
);

const geocode = (place) => new Promise((resolve, reject) => {
    const url = generateURL(place);

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            return reject('Unable to connect to location services.');
        } else if (body.features.length === 0) {
            return reject('Unable to find location, try another search term');
        }

        const location = body.features[0].place_name
        const [longitude, latitude] = body.features[0].center;
        resolve({
            longitude,
            latitude,
            location
        });
    });
});

module.exports = {
    geocode
};