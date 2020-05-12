/* -----------------Elements----------------- */
const form = document.querySelector('.form');
const firstValue = document.querySelector('.first-value');
const secondValue = document.querySelector('.second-value');
const firstValueType = document.querySelector('.first-type');
const secondValueType = document.querySelector('.second-type');
const operator = document.querySelector('.operator-value');
const result = document.querySelector('.result');
const compareResult = document.querySelector('.compare-result');

/* --------------------------------------------------- */

function getTypeOfValue(value, selectedType) {
    if (selectedType === 'number') {
        return parseInt(value);
    } else if (selectedType === 'string') {
        return value;
    } else if (selectedType === 'boolean') {
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        }
    } else if (selectedType === 'undefined') {
        return undefined;
    } else if (selectedType === 'null') {
        return null;
    }
}

/* -----------------Compare Values-------------------- */

function compareValues(value1, value2) {
    const first = getTypeOfValue(value1, firstValueType.value);
    const second = getTypeOfValue(value2, secondValueType.value);

    const operatorValue = operator.value;

    if (operatorValue === 'equality') {
        result.innerText = `${first == second}`;
        showResult();
    } else if (operatorValue === 'inequality') {
        result.innerText = `${first != second}`;
        showResult();
    } else if (operatorValue === 'identity') {
        result.innerText = `${first === second}`;
        showResult();
    } else if (operatorValue === 'nonIdentity') {
        result.innerText = `${first !== second}`;
        showResult();
    } else if (operatorValue === 'greater') {
        result.innerText = `${first > second}`;
        showResult();
    } else if (operatorValue === 'greaterOrEqual') {
        result.innerText = `${first >= second}`;
        showResult();
    } else if (operatorValue === 'less') {
        result.innerText = `${first < second}`;
        showResult();
    } else if (operatorValue === 'lessOrEqual') {
        result.innerText = `${first <= second}`;
        showResult();
    }
}

function showResult() {
    compareResult.classList.add('show');

    setTimeout(() => {
        compareResult.classList.remove('show');
        firstValue.value = '';
        secondValue.value = '';
    }, 2000);
}

/* Listeners */

form.addEventListener('submit', event => {
    event.preventDefault();

    compareValues(firstValue.value, secondValue.value);
})