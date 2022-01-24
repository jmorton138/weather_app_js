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
    let temp = tempController(weatherData.main.temp);
    let feels = tempController(weatherData.main.feels_like);
    const weather = {
        city: weatherData.name,
        conditions: weatherData.weather[0]["description"],
        temperature: temp,
        feelsLike: feels,
        id: weatherData.weather[0]["id"]
    }
    return weather;
}

async function processWeatherData() {
    const city = await getCity();
    const weather = await getWeatherData(city);
    console.log(weather)
    const weatherObj = await buildWeatherDataObj(weather);
    displayWeatherData(weatherObj);
}

const displayWeatherData = (weatherObj) => {
    const body = document.getElementById('content');
    body.innerHTML = "";
    const div = document.createElement('div');
    div.className = "container weather-data";
    const city = document.createElement('h1');
    city.innerHTML = weatherObj.city;
    div.appendChild(city);

    const wrapper = document.createElement('div');
    wrapper.className = "wrapper";

    const image = document.createElement('i');
    image.className = `wi wi-owm-${weatherObj.id} weather-icon`;
    wrapper.appendChild(image);

    var units;
    if (tempUnits.celsius === true) {
        units = "C";
    } else {
        units = "F";
    }

    const tempwrapper = document.createElement('div');
    const temperature = document.createElement('div');
    temperature.innerHTML = `${weatherObj.temperature} ${units}`;
    tempwrapper.appendChild(temperature);

    const feel = document.createElement('div');
    feel.innerHTML = `Feels like ${weatherObj.feelsLike} ${units}`;
    tempwrapper.appendChild(feel);
    wrapper.appendChild(tempwrapper);
    div.appendChild(wrapper);

    const conditions = document.createElement('div');
    conditions.innerHTML = weatherObj.conditions;
    div.appendChild(conditions);

    body.appendChild(div);
    

}

const changeBackground = (weather) => {
    const html = document.querySelector('html');
    html.styles.background = "grey";
}



const tempUnits = (() => {
    let celsius = true;
    let kelvin = true;
    return {celsius, kelvin};
})();



const toggleTempUnits = () => {
    if (tempUnits.celsius === true) {
        tempUnits.celsius = false;
    } else {
        tempUnits.celsius = true;
    }
    console.log(tempUnits.celsius);
} 

const toggleClass = () => {
    const element = document.querySelector('.temp-toggle');
    if (element.classList.contains("fahr")) {
        element.classList.remove("fahr");
    } else {
        element.classList.add("fahr");
    }

}
const toggleTempUnitsStyles = () => {
    var cels = document.querySelector('.cels-icon');
    var fahr = document.querySelector('.fahr-icon');
    toggleClass();
    if (tempUnits.celsius === true) {
        cels.style.color = "white";
        fahr.style.color = "blueviolet";
    } else {
        fahr.style.color = "white";
        cels.style.color = "blueviolet";
    }

}


const toggleTempUnitsDisplay = () => {
    toggleTempUnitsStyles();
    toggleTempUnits();
    processWeatherData();
}

const convertKelvToFahr = (kelv) => {
    const fahrenheight = Math.round(((kelv - 273.15) * (9/5)) + 32);
    console.log(fahrenheight);

    return fahrenheight;
}

const convertKelvToCels = (kelv) => {
    const celsius = Math.round(kelv - 273.15);
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

const tempController = (temp) => {
    if (tempUnits.celsius === true) {
        return convertKelvToCels(temp);
    } else if (tempUnits.celsius === false) {
        return convertKelvToFahr(temp);
    } 
    
}


