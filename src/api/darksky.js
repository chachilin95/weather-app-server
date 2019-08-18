const dotenv = require('dotenv');
const request = require('request');

// get API key
dotenv.config();
const apiKey = process.env.DARKSKY_API_KEY;

const generateURL = ({ latitude, longitude }) => (
    `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`
);

const forecast = (location) => new Promise((resolve, reject) => {
    const url = generateURL(location);

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            return reject('Unable to connect to weather service.', undefined);
        } else if (error = body.error) {
            return reject(error, undefined);
        }

        const { currently, daily } = body;
        const { humidity, temperature, precipProbability } = currently;
        const todaySummary = daily.data[0].summary;

        resolve(
            `${todaySummary}
            It is currently ${Math.round(temperature)}˚ out with a humidity of ${humidity * 100}%.
            There is a ${precipProbability}% chance of rain`
        );
    });
});

module.exports = {
    forecast
};