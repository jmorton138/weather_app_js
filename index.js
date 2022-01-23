const getCity = () => {
    const city = document.getElementById('search-by-city');
    return city.value;
}

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3b21d222488795c5ce2199c208c51c1b`, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData;
    } catch(err) {
        console.log(err);
    }
}

const buildWeatherDataObj = (weatherData) => {
    const weather = {
        city: weatherData.name,
        conditions: weatherData.weather[0]["main"],
        temperature: weatherData.main.temp
    }
    return weather;
}

async function processWeatherData() {
    const city = await getCity();
    const weather = await getWeatherData(city);
    const weatherObj = await buildWeatherDataObj(weather);
    displayWeatherData(weatherObj);
}

const displayWeatherData = (weatherObj) => {
    const body = document.getElementById('content');
    const div = document.createElement('div');
    div.className = "container weather-data";
    const city = document.createElement('h1');
    city.innerHTML = weatherObj.city;
    div.appendChild(city);

    const conditions = document.createElement('div');
    conditions.innerHTML = weatherObj.conditions;
    div.appendChild(conditions);

    const temperature = document.createElement('div');
    temperature.innerHTML = weatherObj.temperature;
    div.appendChild(temperature);

    body.appendChild(div);
    
    // body.innerHTML = `${weatherObj.city} ${weatherObj.conditions} ${weatherObj.temperature}`;

}

const changeBackground = (weather) => {
    const html = document.querySelector('html');
    html.styles.background = "grey";
}



const tempUnits = (() => {
    let celsius = true;
    return {celsius};
})();



const toggleTempUnits = () => {
    if (tempUnits.celsius === true) {
        tempUnits.celsius = false;
    } else {
        tempUnits.celsius = true;
    }
    console.log(tempUnits.celsius)

} 


const toggleTempUnitsDisplay = () => {

}

const convertKelvToFahr = (kelv) => {
    const fahrenheight = ((kelv - 273.15) * (9/5)) + 32;
    console.log(fahrenheight);
    return fahrenheight;
}

const convertKelvToCels = (kelv) => {
    const celsius = kelv - 273.15;
    return celsius;
}

const convertCelsToFahr = (celsius) => {
    const fahrenheight = (celsius * 1.8) + 32;
    return fahrenheight;

}

const convertFahrToCels = (fahr) => {
    const celsius = (fahr - 32) * (5/9);
    return celsius;
}


