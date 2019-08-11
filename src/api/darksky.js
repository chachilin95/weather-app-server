const fs = require('fs');
const path = require('path');
const request = require('request');

const apiKeyPath = path.join(__dirname, './keys/darksky.secret.key');
const apiKey = fs.readFileSync(apiKeyPath).toString();

const generateURL = ({ latitude, longitude }) => (
    `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`
);

const forecast = (location, callback) => {
    const url = generateURL(location);

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            return callback('Unable to connect to weather service.', undefined);
        } else if (error = body.error) {
            return callback(error, undefined);
        }

        const { currently, daily } = body;
        const { temperature, precipProbability } = currently;
        const todaySummary = daily.data[0].summary;

        callback(
            undefined,
            `${todaySummary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`
        );

    });
};

module.exports = {
    forecast
};