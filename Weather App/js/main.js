/* ------------------------------Elements------------------------------- */

const form = document.querySelector('.form');
const searchInput = document.querySelector('.form__search-input');
const filterDropdown = document.querySelector('.cities-filter');

const apiKey = 'X2GnaCgq6krL3icRiYHvJQGiAORk11rY';

/* ----------------------------Get cities list API------------------------- */

async function getCitiesList(name) {
    let citiesList = [];

    let response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${name}`)
        .then(response => response.json())
        .then(data => citiesList.push(...data));

    renderListOfCities(citiesList);
}

/* ---------------------------Render list of cities------------------------------ */

const toHTML = city => {
    return `
    <li class="filter" data-key="${city.Key}">
        ${city.LocalizedName}, ${city.AdministrativeArea.LocalizedName}
    </li>`;
}

function renderListOfCities(cities) {
    const html = cities.map(toHTML).join('');
    filterDropdown.innerHTML = html;
    filterDropdown.classList.add('show');
}

/* Listener */

searchInput.addEventListener('input', event => {
    getCitiesList(searchInput.value);
});

filterDropdown.addEventListener('click', event => {
    if (event.target.dataset.key) {
        searchInput.value = event.target.textContent;
        searchInput.dataset.key = event.target.dataset.key;
        filterDropdown.classList.remove('show');
    }
});

/* ------------------------------Elements------------------------------- */

const weatherList = document.querySelector('.weather-box');


/* ------------------------Get weather info by API--------------------- */

async function getWeatherInfo(cityKey, cityName) {
    let weatherInfo = [];

    let response = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&details=true`)
        .then(response => response.json())
        .then(data => weatherInfo.push(...data));

    renderWeatherInfo(weatherInfo, cityName);
}

/* ------------------------Render weather info----------------------- */

const toHTMLWeatherInfo = (weather, cityName) => {
    return `
    <div class="weather">
        <div class="location">
            <h3 class="city-name">${cityName}</h3>
        </div>

        <div class="city-temp">
            <i class="fas fa-temperature-low"></i>
            <h2>${Math.round(weather.Temperature.Metric.Value)}</h2>
            <span>°C</span>
        </div>

        <div class="wind">
            <i class="fas fa-wind"></i>
            <h2>${Math.round((weather.Wind.Speed.Metric.Value * 1000) / 3600)}</h2>
            <span>m/s</span>
        </div>

        <p class="description">${weather.WeatherText}</p>
    </div>`;
}

function renderWeatherInfo(data, cityName) {
    const html = data.map(item => toHTMLWeatherInfo(item, cityName)).join('');
    weatherList.insertAdjacentHTML('beforeend', html);
}


/* ----------------------------Add current weahter info to Local Storage------------------------------- */


function addToLocalStorage(weather) {
    const all = getDataFromLocalStorage();
    all.push(weather);
    localStorage.setItem('weather', JSON.stringify(all));
}

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('weather') || '[]');
}

/* -----------------------------Render list weather info from localstorage---------------------------------------- */

function renderFromLocalStorage() {
    const weather = getDataFromLocalStorage();
    weather.forEach(data => getWeatherInfo(data.key, data.cityName));
}

/* -------------------------------------Listener-------------------------------- */

form.addEventListener('submit', event => {
    event.preventDefault();

    const weather = {
        key: searchInput.dataset.key,
        cityName: searchInput.value.trim()
    }

    addToLocalStorage(weather);
    getWeatherInfo(weather.key, weather.cityName);

    searchInput.value = '';
});

window.addEventListener('load', renderFromLocalStorage);
