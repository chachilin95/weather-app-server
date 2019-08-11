const fs = require('fs');
const request = require('request');

const apiKey = fs.readFileSync('./keys/mapbox.secret.key').toString();

const generateURL = (place) => (
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${apiKey}`
);

const geocode = (place, callback) => {
    const url = generateURL(place);

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            return callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            return callback('Unable to find location, try another search term', undefined);
        }

        const location = body.features[0].place_name
        const [longitude, latitude] = body.features[0].center;
        callback(undefined, {
            longitude,
            latitude,
            location
        });
        
    });
};

module.exports = {
    geocode
};