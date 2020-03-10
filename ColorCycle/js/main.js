const red = document.querySelector('.red');
const redInc = document.querySelector('.red-increment');
const green = document.querySelector('.green');
const greenInc = document.querySelector('.green-increment');
const blue = document.querySelector('.blue');
const blueInc = document.querySelector('.blue-increment');
const view = document.querySelector('.wrapper');
const startStopBtn = document.querySelector('.btn-start-stop');
const reset = document.querySelector('.btn-reset');

let interval;
let isStarted = false;

function toggleStart() {
    console.log('start');
    if (!isStarted) {
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = 'coral';
        isStarted = true;
        interval = setInterval(changeColor, 250);
    } else {
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = 'springgreen';
        isStarted = false;
        clearInterval(interval);
    }

}

function resetAll() {
    red.value = '';
    redInc.value = '';
    green.value = '';
    greenInc.value = '';
    blue.value = '';
    blueInc.value = '';
}

function changeColor() {
    red.value = parseFloat(red.value) + parseFloat(redInc.value);
    green.value = parseFloat(green.value) + parseFloat(greenInc.value);
    blue.value = parseFloat(blue.value) + parseFloat(blueInc.value);

    if (red.value >= 255) {
        red.value = 255;
    }
    if (green.value >= 255) {
        green.value = 255;
    }
    if (blue.value >= 255) {
        blue.value = 255;
    }

    view.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
}


startStopBtn.addEventListener('click', toggleStart);
reset.addEventListener('click', resetAll);