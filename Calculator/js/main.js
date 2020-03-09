const numbers = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.operation');
const equal = document.querySelector('.equals');
const result = document.querySelector('.display');
const clear = document.querySelector('.clear');

let currentNum = '';
let oldNum;
let ops = '';

/* const values = {
    currentNum: '',
    oldNum: '',
    ops: ''
}
 */

function getValues(e) {
    if (e.target.dataset.num) {
        currentNum += e.target.dataset.num;
        result.textContent = currentNum;    
    } else if (e.target.dataset.ops) {
        ops += e.target.dataset.ops;
        oldNum = currentNum;
        currentNum = '';
    }
}

function calculate() {
    currentNum = parseFloat(currentNum);
    oldNum = parseFloat(oldNum);
    resultNum = 0;

    switch (ops) {
        case 'plus':
            resultNum = oldNum + currentNum;
            break;
        
        case 'minus':
            resultNum = oldNum - currentNum;
            break;
            
        case 'multiply':
            resultNum = oldNum * currentNum;
            break;

        case 'division':
            resultNum = oldNum / currentNum;
            break;
        default:
            resultNum = currentNum;
    }

    result.textContent = resultNum;
}

function clearAll() {
    oldNum = '';
    currentNum = '';
    ops = '';
    result.textContent = 0;
}

document.addEventListener('click', getValues);
equal.addEventListener('click', calculate);
clear.addEventListener('click', clearAll);