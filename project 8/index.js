let key = "613e5ce4b2414b72ac065936251101";
let Cityinput = document.getElementById("Cityinput");
let btn = document.getElementById("search-btn");
let city = document.getElementById("city-name");
let weatherInfoCard = document.getElementById("weather-info");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let errorMessage = document.getElementById("error-message");
let icon = document.getElementById("weather-icon");
let loader = document.getElementById("loader");

window.onload = () => {
    Cityinput.focus();
};

btn.addEventListener("click", () => {
    const cityValue = Cityinput.value.trim();
    if (cityValue) {
        if (!/^[a-zA-Z\s]+$/.test(cityValue)) {
            showError("Please enter a valid city name (letters and spaces only).");
            return;
        }
        toggleLoader(true);
        getWeather(cityValue);
    } else {
        showError("Please enter a city name.");
    }
});

async function getWeather(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found or invalid API key.");
        }

        const data = await response.json();
        toggleLoader(false);
        displayWeather(data);
    } catch (error) {
        toggleLoader(false);
        showError(error.message || "Failed to fetch weather data. Please try again.");
    }
}

function displayWeather(data) {
    city.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description.toUpperCase();
    Cityinput.value = ''; 

    const iconCode = data.weather[0].icon;
    icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${iconCode}@2x.png)`;

    weatherInfoCard.style.display = "block";
    errorMessage.textContent = "";
}

function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        weatherInfoCard.style.display = "none";
    }
}

function toggleLoader(isLoading) {
    if (loader) {
        loader.style.display = isLoading ? "block" : "none";
    }
    btn.disabled = isLoading;
}

