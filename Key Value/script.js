
/* ///////////////// Elements ////////////////// */

const keyDownName = document.querySelector('.keydown-name');
const keyDownCode = document.querySelector('.keydown-code');
const keyDownChar = document.querySelector('.keydown-char');

const keyPressName = document.querySelector('.keypress-name');
const keyPressCode = document.querySelector('.keypress-code');
const keyPressChar = document.querySelector('.keypress-char');

const keyUpCode = document.querySelector('.keyup-code');
const keyUpName = document.querySelector('.keyup-name');
const keyUpChar = document.querySelector('.keyup-char');

const shiftKeyPress = document.querySelector('.shiftKeyPress');
const ctrlKeyPress = document.querySelector('.ctrlKeyPress');
const altKeyPress = document.querySelector('.altKeyPress');
const metaKeyPress = document.querySelector('.metaKeyPress');

const resetBtn = document.querySelector('.reset-btn');

/* /////////////////// KeyDown Listen ///////////////////// */

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const keyCode = event.keyCode;
    const shiftKey = event.shiftKey;
    const ctrlKey = event.ctrlKey;
    const altKey = event.altKey;
    const metaKey = event.metaKey;

    if (shiftKey) {
        shiftKeyPress.classList.add('true');
        shiftKeyPress.textContent = 'true';
    }
    if (ctrlKey) {
        ctrlKeyPress.classList.add('true');
        ctrlKeyPress.textContent = 'true';
    }
    if (altKey) {
        altKeyPress.classList.add('true');
        altKeyPress.textContent = 'true';
    }
    if (metaKey) {
        metaKeyPress.classList.add('true');
        metaKeyPress.textContent = 'true';
    }

    if (keyName === 'Shift' || keyName === 'Control' || keyName === 'Alt') {
        return;
    } else {
        keyDownName.value = keyName;
        keyDownCode.value = keyCode;
        keyDownChar.value = keyName.charCodeAt();
    }
}, false);

/* /////////////////// KeyPress Listen ///////////////////// */

document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    const keyCode = event.keyCode;

    keyPressName.value = keyName;
    keyPressCode.value = keyCode;
    keyPressChar.value = keyName.charCodeAt();

}, false);

/* /////////////////// KeyUp Listen ///////////////////// */

document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    const keyCode = event.keyCode;

    if (keyName === 'Shift' || keyName === 'Control' || keyName === 'Alt') {
        return;
    } else {
        keyUpName.value = keyName;
        keyUpCode.value = keyCode;
        keyUpChar.value = keyName.charCodeAt();
    }


    shiftKeyPress.classList.remove('true');
    shiftKeyPress.textContent = 'false';

    ctrlKeyPress.classList.remove('true');
    ctrlKeyPress.textContent = 'false';

    altKeyPress.classList.remove('true');
    altKeyPress.textContent = 'false';

    metaKeyPress.classList.remove('true');
    metaKeyPress.textContent = 'false';
}, false);

/* ///////////////////// Reset All Inputs ///////////////// */

function resetAll(event) {
    event.preventDefault();

    keyDownName.value = '';
    keyDownCode.value = '';
    keyDownChar.value = '';
    keyPressName.value = '';
    keyPressCode.value = '';
    keyPressChar.value = '';
    keyUpName.value = '';
    keyUpCode.value = '';
    keyUpChar.value = '';
}

/* //////////////////// Reset Button Listener //////////////// */

resetBtn.addEventListener('click', resetAll);