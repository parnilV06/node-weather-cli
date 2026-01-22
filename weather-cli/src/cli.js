const { getWeather } = require('./api');
const { formatWeatherData } = require('./utils');

function runCLI() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        console.log(`
Usage: weather-cli <location> [options]

Options:
  --help, -h    Show this help message
  --units <u>   Temperature units: metric (default), imperial, kelvin

Examples:
  weather-cli London
  weather-cli "New York" --units imperial
        `);
        process.exit(0);
    }

    const location = args[0];
    let units = 'metric';

    const unitsIndex = args.indexOf('--units');
    if (unitsIndex !== -1 && args[unitsIndex + 1]) {
        units = args[unitsIndex + 1];
    }

    if (!location) {
        console.error('Error: Please provide a location.');
        process.exit(1);
    }

    if (!['metric', 'imperial', 'kelvin'].includes(units)) {
        console.error('Error: Invalid units. Use metric, imperial, or kelvin.');
        process.exit(1);
    }

    getWeather(location, units)
        .then(data => {
            const formattedData = formatWeatherData(data, units);
            console.log(formattedData);
        })
        .catch(error => {
            console.error('Error:', error.message);
            process.exit(1);
        });
}

module.exports = { runCLI };