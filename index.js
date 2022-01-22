const getCity = () => {
    const city = document.getElementById('search-by-city');
    return city.value;
}

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3b21d222488795c5ce2199c208c51c1b`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData.weather[0]["main"]);
    } catch(err) {
        console.log(err);
    }
}

const displayWeatherData = () => {
    const city = getCity();
    getWeatherData(city);
}

