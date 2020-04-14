const romanNumeral = document.querySelector('.roman');
const decimalNumeral = document.querySelector('.decimal');
const clearBtn = document.querySelector('.btn');

/*  /////////////////////////// Check input /////////////////// */
function isRomanNumeral(str) {
    return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$|^\d+$/.test(str);
}

/* ///////////////// Add and Remove Error message //////////////////// */
function setError() {
    document.querySelector('small').classList.add('error');
}

function removeError() {
    document.querySelector('small').classList.remove('error');
}

/* //////////////////// Convert Roman to Decimal //////////////////// */

function convertToDecimal(romanNum) {
    const obj = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }
    if (!isRomanNumeral(romanNum)) {
        return setError();
    }

    removeError();
    const numbersArr = romanNum.split('').map(value => obj[value]);

    let decimalNum = 0;
    for (let i = 0; i < numbersArr.length; i += 2) {
        if (numbersArr[i] < numbersArr[i + 1]) {
            decimalNum += numbersArr[i + 1] - numbersArr[i];
        } else {
            decimalNum += (numbersArr[i + 1] || 0) + numbersArr[i];
        }
    }
    return decimalNum;
}

/* ////////////////////// Clear All Inputs //////////////////////////// */

function clearAll() {
    romanNumeral.value = '';
    decimalNumeral.value = '';
}


/* ///////////////// Listeners /////////////////////////// */

romanNumeral.addEventListener('input', event => {
    decimalNumeral.value = convertToDecimal(romanNumeral.value);
});

clearBtn.addEventListener('click', event => {
    event.preventDefault();

    clearAll();
})