const seconds = document.querySelector('.seconds');
const minutes = document.querySelector('.minutes');
const startBtn = document.querySelector('[data-action="start"]');
const stopBtn = document.querySelector('[data-action="stop"]');
const resetBtn = document.querySelector('[data-action="reset"]');
let count = 0;
let interval;
let isRunning = false;

function startToggle() {
    if (isRunning) return;

    isRunning = true;
    interval = setInterval(incrementTimer, 1000);
}

function stopToggle() {
    if (!isRunning) return;

    isRunning = false;
    clearInterval(interval);
}

function resetToggle() {
    stopToggle();
    count = 0;
    
    seconds.textContent = '00';
    minutes.textContent = '00';
    
}

function incrementTimer() {
    count += 1;
    const numOfSeconds = count % 60;
    const numOfMinutes = Math.floor(count / 60);

    seconds.textContent = pad(numOfSeconds);
    minutes.textContent = pad(numOfMinutes);
}

function pad(num) {
    return num < 10 ? `0${num}` : num;
}

startBtn.addEventListener('click', startToggle);
stopBtn.addEventListener('click', stopToggle);
resetBtn.addEventListener('click', resetToggle);