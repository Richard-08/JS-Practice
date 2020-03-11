const days = document.querySelector('.days__number');
const hours = document.querySelector('.hours__number');
const minutes = document.querySelector('.minutes__number');
const seconds = document.querySelector('.seconds__number');
const eventDate = document.querySelector('.event-date');
const startBtn = document.querySelector('.start-btn');

function startTimer() {
    setInterval(timer, 1000);
}

function timer() {
    const date = new Date(eventDate.value);
    const todayDate = new Date();
    const difference = date - todayDate;

    const daysValue = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursValue = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesValue = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsValue = Math.floor((difference % (1000 * 60)) / 1000);
    
    days.innerText = daysValue;
    hours.innerText = hoursValue;
    minutes.innerText = minutesValue;
    seconds.innerText = secondsValue;
}

startBtn.addEventListener('click', startTimer);
