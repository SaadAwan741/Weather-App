"use strict";

const apiKey = "1b85237f8f4d2a95e9f064f3bf2b1f5f";

const searchBtn = document.querySelector(".searchArea button");
const cityInput = document.getElementById("impTXT");

const weatherIcon = document.querySelector(".Weather-Icon");
const temp = document.querySelector(".temperature");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherBox = document.querySelector(".WeatherDisplay");

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        const data = await response.json();

        // Update UI
        cityName.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " km/h";

        const weatherMain = data.weather[0].main;

        // Better icon handling (clean if-else chain)
        if (weatherMain === "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "img/mist.png";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (weatherMain === "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (weatherMain === "Snow") {
            weatherIcon.src = "img/snow.png";
        } else if (weatherMain === "Haze") {
            weatherIcon.src = "img/haze.png";
        } else {
            weatherIcon.src = "img/clear.png";
        }

        weatherBox.style.display = "block";

    } catch (error) {
        alert(error.message);
    }
}

// Button click
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

// Enter key support (FIXED — removed duplicate + wrong variable)
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});