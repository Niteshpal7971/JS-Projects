document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input')
    const getWeatherBtn = document.querySelector('#get-weather-btn');
    const weatherInfo = document.querySelector('#weather-info')
    const cityNameDisplay = document.querySelector('.city-name')
    const tempDisplay = document.querySelector('.tempreture')
    const descriptionDisplay = document.querySelector('.description')
    const errorMessageDisplay = document.querySelector('#error-message')

    // API

    const KEY = "5b30504f05b9e96bd046e049fe4976a1";
    getWeatherBtn.addEventListener('click', async () => {
        let city = cityInput.value.toLowerCase().trim();
        if (!city) return;

        try {
            const weatherData = await fetchWheatherData(city)
            if (weatherData) {
                displayWheatherData(weatherData)
            }
        } catch (error) {
            console.log("Error fetching weatherData", error)
        }
        cityInput.value = "";
    });


    // // It may throw error
    // // seerver/database is always in different location

    // fetch wheatherData
    async function fetchWheatherData(city) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`
        try {
            const response = await fetch(URL)
            if (!response.ok) throw new Error("Error fetching Url");
            let weatherData = await response.json()
            return weatherData
        } catch (error) {
            showError()
        }
    }

    // Display wheatherData
    function displayWheatherData(weatherData) {
        console.log(weatherData)
        const { name, main, weather } = weatherData;
        cityNameDisplay.textContent = name;
        tempDisplay.textContent = `Tempreture: ${main.temp} degree`;
        descriptionDisplay.textContent = `weather: ${weather[0].description} icon : ${weather[0].icon}`;



        //unlock the display
        weatherInfo.classList.remove("hidden")
        errorMessageDisplay.classList.add("hidden");
        
    }

    // for display error
    function showError() {
        errorMessageDisplay.classList.remove("hidden")
        weatherInfo.classList.add("hidden")
    }

})  
