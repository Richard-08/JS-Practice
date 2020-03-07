const binary = document.querySelector('[name="binary"]');
const decimalInput = document.querySelector('[name="decimal"]');
const convertButton = document.querySelector('.convert-btn');
const resetButton = document.querySelector('.reset-btn');
const warning = document.querySelector('.warning');

function getNumber() {
    let inputValue = binary.value;
    return inputValue;
}

function convertToDec(num) {
    let result = 0;
    const l = num.length - 1;
    for (let i = 0; i < num.length; i += 1) {
        if (num[i] !== '0' && num[i] !== '1') {
            warning.textContent = 'Please, entry 0 or 1';
            return;
        } else {
            result += Number(num[i]) * Math.pow(2, l - i);
        }
    }
    return result;
}

function convert(e) {
    e.preventDefault();
    let binaryNum = getNumber();
    let decimalNum = convertToDec(binaryNum);
    decimalInput.value = decimalNum || 'Please, entry 0 or 1';
}

function reset() {
    warning.textContent = '';
    binary.value = '';
    decimalInput.value = '';
}

binary.addEventListener('input', getNumber);
convertButton.addEventListener('click', convert);
resetButton.addEventListener('click', reset);