export function formatWeatherData(data) {
    if (!data || !data.weather || !data.main) {
        return 'Weather data is not available.';
    }

    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    const location = data.name;

    return `Weather in ${location}:\n- Temperature: ${temp}°C\n- Humidity: ${humidity}%\n- Description: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
}