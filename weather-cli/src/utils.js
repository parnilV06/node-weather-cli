function formatWeatherData(data, units = 'metric') {
    if (!data || !data.current || !data.location) {
        return 'Weather data is not available.';
    }

    const { temp_c } = data.current;
    const { name: location } = data.location;

    const unitSymbol = units === 'imperial' ? '°F' : units === 'kelvin' ? 'K' : '°C';

    return `Weather in ${location}:\n- Temperature: ${temp_c}${unitSymbol}\n- Description: Current weather data (humidity not available)`;
}

module.exports = { formatWeatherData };