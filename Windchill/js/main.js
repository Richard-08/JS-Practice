/* -------------------------------Measurment Radio Input---------------------------- */

const measureInput = document.querySelectorAll('.measure');
const temperatureMeasure = document.querySelector('.temperature-measure');
const windMeasure = document.querySelector('.wind-measure');

/* Listener */

measureInput.forEach(measure => {
    measure.addEventListener('input', () => {
        if (measure.value === 'metric') {
            temperatureMeasure.innerText = 'C°';
            windMeasure.innerText = 'km/h';
        } else {
            temperatureMeasure.innerText = 'F°';
            windMeasure.innerText = 'mph';
        }
    })
});


/* -----------------------------------Wind chill calculate-------------------------- */

const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind');
const calculateBtn = document.querySelector('.windchill__calculate-btn');

const resultModal = document.querySelector('.result');
const closeBtn = document.querySelector('.result__close-btn');
const resultTemperature = document.querySelector('.result__temperature-value');
const resultWindSpeed = document.querySelector('.result__wind-value');
const resultWindChill = document.querySelector('.result__windchill-value');


/* ---------------------Calculate Wind Chill Index---------------------------- */

function windChillIndex(temperature, speed, measure) {
    if (measure === 'metric') {
        return Math.round(13.12 + (0.6215 * temperature) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temperature * Math.pow(speed, 0.16)));
    } else {
        return Math.round(35.74 + (0.6215 * temperature) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temperature * Math.pow(speed, 0.16)));
    }
}

/* ----------------------------Show Result------------------------------ */

function showResult(wci) {
    resultTemperature.innerText = `${temperature.value} ${temperatureMeasure.textContent}`;
    resultWindSpeed.innerText = `${windSpeed.value} ${windMeasure.textContent}`;
    resultWindChill.innerText = `${wci} ${temperatureMeasure.textContent}`;
    resultModal.classList.add('show');
}

/* ----------------------Get measurement system-------------------------*/

function getMeasurement() {
    let measureValue;
    for (let i = 0; i < measureInput.length; i += 1) {
        if (measureInput[i].checked) {
            measureValue = measureInput[i].value;
        }
    }
    return measureValue;
}

/* -------------------------Close result modal------------------------ */

function closeResultModal() {
    resultModal.classList.remove('show');
}

/* Listener */

calculateBtn.addEventListener('click', event => {
    const measure = getMeasurement();
    const windChillIndexValue = windChillIndex(temperature.value, windSpeed.value, measure);
    showResult(windChillIndexValue);
});

closeBtn.addEventListener('click', closeResultModal);