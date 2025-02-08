document.getElementById('search-btn').addEventListener('click', getWeather);

// Default weather icon set when page loads
window.onload = function() {
    const iconUrl = `https://openweathermap.org/img/wn/01d@2x.png`; // Default sunny icon
    document.getElementById('weather-icon').src = iconUrl; // Set default icon
};

function getWeather() {
    const city = document.getElementById('search').value;  // Fetching city from input field
    const apiKey = '1e3e8f230b6064d27976e41163a82b77'; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch weather data
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or invalid API key');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log data to check the response
            if (data.cod === '404') {
                alert("City not found.");
            } else {
                // Current weather
                document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
                document.getElementById('temp').textContent = data.main.temp;
                document.getElementById('weather-condition').textContent = data.weather[0].description;
                document.getElementById('humidity').textContent = data.main.humidity;
                document.getElementById('wind-speed').textContent = data.wind.speed;
                document.getElementById('pressure').textContent = data.main.pressure;

                // Set weather icon based on condition
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById('weather-icon').src = iconUrl; // Set the weather icon
                document.getElementById('weather-icon').style.transform = 'scale(1.1)'; // Icon animation
            }
        })
        .catch(error => {
            console.error(error); // Log any errors to the console
            alert('Error fetching weather data: ' + error.message);
        });
}
