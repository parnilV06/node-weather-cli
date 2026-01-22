const axios = require('axios');

const GEOCODE_URL = 'https://nominatim.openstreetmap.org/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function getWeather(location, units = 'metric') {
    try {
        // First, geocode the location to get lat/lon
        const geocodeResponse = await axios.get(GEOCODE_URL, {
            params: {
                q: location,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'weather-cli/1.0.0'
            }
        });

        if (!geocodeResponse.data || geocodeResponse.data.length === 0) {
            throw new Error('Location not found. Please check the spelling.');
        }

        const { lat, lon } = geocodeResponse.data[0];

        // Now, get weather data
        const weatherResponse = await axios.get(WEATHER_URL, {
            params: {
                latitude: lat,
                longitude: lon,
                current_weather: true,
                temperature_unit: units === 'imperial' ? 'fahrenheit' : 'celsius'
            },
            headers: {
                'User-Agent': 'weather-cli/1.0.0'
            }
        });

        if (weatherResponse.status !== 200) {
            throw new Error(`Weather API responded with status ${weatherResponse.status}`);
        }

        // Structure the data to match expected format
        const data = {
            location: { name: location },
            current: {
                temp_c: weatherResponse.data.current_weather.temperature,
                humidity: null, // Open-Meteo doesn't provide humidity in current_weather
                condition: { text: 'Current weather' } // Placeholder
            }
        };

        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(`API error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('Network error: Unable to reach the weather API.');
        } else {
            throw new Error('Error fetching weather data: ' + error.message);
        }
    }
}

module.exports = { getWeather };