let key = "95881de5947a3737d7a45fcfaad07c6f";

let Cityinput = document.getElementById("Cityinput");
let btn = document.getElementById("search-btn");
let city = document.getElementById("city-name");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let errorMessage = document.getElementById("error-message");
let icon = document.querySelector(".weather-icon");
let weatherInfoCard = document.querySelector(".weather-info");

btn.addEventListener("click", () => {
    const cityValue = Cityinput.value.trim();
    if (cityValue) {
        if (!/^[a-zA-Z\s]+$/.test(cityValue)) {
            showError("Please enter a valid city name (letters and spaces only).");
            return;
        }
        getWeather(cityValue);
    } else {
        showError("Please enter a city name.");
    }
});

async function getWeather(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityValue)}&units=metric&appid=${key}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "City not found.");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message || "Failed to fetch weather data. Please try again.");
    }
}

function displayWeather(data) {
    city.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description.toUpperCase();
    Cityinput.value = '';

    const iconCode = data.weather[0].icon;
    icon.style.backgroundImage = `url('https://openweathermap.org/img/wn/${iconCode}@2x.png')`;

    weatherInfoCard.style.display = "block";
    errorMessage.textContent = "";
}

function showError(message) {
    errorMessage.textContent = message;
    weatherInfoCard.style.display = "none";
}
