const { getWeather } = require('./api');
const { formatWeatherData } = require('./utils');

function runCLI() {
    const location = process.argv[2];

    if (!location) {
        console.error('Please provide a location.');
        process.exit(1);
    }

    getWeather(location)
        .then(data => {
            const formattedData = formatWeatherData(data);
            console.log(formattedData);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
        });
}

module.exports = { runCLI };