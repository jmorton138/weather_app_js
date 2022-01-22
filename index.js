const getCity = () => {
    const city = document.getElementById('search-by-city');
    return city.value;
}

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3b21d222488795c5ce2199c208c51c1b`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData.main);
        return weatherData.weather[0]["main"];
    } catch(err) {
        console.log(err);
    }
}

const processWeatherData = (weatherData) => {
    
}

const displayWeatherData = () => {
    const city = getCity();
    getWeatherData(city);
}

const changeBackground = (weather) => {
    const html = document.querySelector('html');
    html.styles.background = "grey";
}

const toggleTemperatureUnits = () => {

}

const convertTemperature = () => {

}

