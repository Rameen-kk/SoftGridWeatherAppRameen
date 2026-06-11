const apiKey = "4d8fb5b93d4af21d66a2948710284366"; 

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherCard = document.getElementById('weatherCard');
const errorMsg = document.getElementById('error');

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
        errorMsg.textContent = "";
    } catch (error) {
        showError(error.message);
        weatherCard.style.display = "none";
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherCard.style.display = "block";
}

function showError(message) {
    errorMsg.textContent = message;
}
