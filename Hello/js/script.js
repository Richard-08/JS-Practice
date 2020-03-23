const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.querySelector('.login');
const logoutBtn = document.querySelector('.logout');
const greeting = document.querySelector('.greeting');

///////////////// Form Validation //////////////////////

loginBtn.addEventListener('click', e => {
    e.preventDefault();

    checkInputs();
    userGreeting();
});

function checkInputs() {
    // trim to remove whitespaces
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/////////////////////////////////////////////////////////

let endpoint = 'http://ip-api.com/json/?fields=status,message,countryCode,country,region,regionName,city,zip,lat,lon,timezone';

async function getGreeting() {
    let locationData = {};

    let response = await fetch(endpoint)
        .then(blob => blob.json())
        .then(data => Object.assign(locationData, data));

    let helloURL = `https://fourtonfish.com/hellosalut/?lang=${locationData.countryCode}`;

    let greeting = {};

    let promice = await fetch(helloURL)
        .then(response => response.json())
        .then(data => Object.assign(greeting, data));

    return greeting;
}

let json = {};

getGreeting().then(data => Object.assign(json, data));


/* //////////////////// Show User greeting //////////////////////// */

function userGreeting() {
    if (username.value !== '' && password.value !== '') {
        greeting.classList.add('active');
        greeting.innerHTML = `${json.hello}, ${username.value} you have successfully logged in!`;
    }

    setTimeout(() => {
        greeting.classList.remove('active');
    }, 3000);
}

/* //////////////////////// Show user Bye //////////////////////// */


function userBye() {
    if (username.value !== '' && password.value !== '') {
        greeting.classList.add('active');
        greeting.innerHTML = `Have a great day ${username.value}!`;
    }

    setTimeout(() => {
        greeting.classList.remove('active');
        username.value = '';
        password.value = '';
    }, 3000);
}

logoutBtn.addEventListener('click', e => {
    e.preventDefault();

    userBye();
});