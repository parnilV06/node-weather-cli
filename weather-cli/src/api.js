const axios = require('axios');

const API_KEY = 'your_api_key_here'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(location) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: location,
                appid: API_KEY,
                units: 'metric' // You can change to 'imperial' for Fahrenheit
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data: ' + error.message);
    }
}

module.exports = {
    getWeather
};