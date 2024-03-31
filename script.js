const apiKey = '9a55ddebd70b578979ec24fa6a5fc0ec';
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

async function displayWeatherData(city) {
    const weatherData = await fetchWeatherData(city);
    const container = document.getElementById('weather-container');

    
    container.innerHTML = '';

    if (weatherData.cod === "404") {
        
        container.textContent = "City not found!";
    } else {
        const weatherInfo = document.createElement('div');
        weatherInfo.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Current Weather: ${weatherData.weather[0].description}</p>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
        `;

        
        const weatherIcon = document.createElement('img');
        const iconCode = weatherData.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/w/${iconCode}.png`;
        weatherInfo.appendChild(weatherIcon);

        container.appendChild(weatherInfo);
    }
}

function searchWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    if (city !== '') {
        displayWeatherData(city);
    } else {
        alert('Please enter a city name!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayWeatherData('Jakarta');
});