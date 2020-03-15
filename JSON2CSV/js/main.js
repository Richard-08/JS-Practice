const csvData = document.querySelector('.csv');
const jsonData = document.querySelector('.json');
const convertBtn = document.querySelector('.convert');
const clearBtn = document.querySelector('.clear');
const copyBtn = document.querySelector('.copy');

// JSON to Array

function JSONtoArray(json) {
    let parsedJSON = JSON.parse(json); 
    let arr = [];
    for (let i = 0; i < parsedJSON.length; i += 1) {
        arr[i + 1] = [];
        arr[0] = [];
        for (let key in parsedJSON[i]) {
            arr[0].push(`"${key}"`);
            arr[i + 1].push(`"${parsedJSON[i][key]}"`);
        }
    }
    return arr;
}

// Convert JSON to CSV

function convertToCSV() {
    const arr = JSONtoArray(jsonData.value);
    return arr.join(`\n`);
}

// Convert button

function convert() {
    let csv = convertToCSV();
    csvData.value = csv;
}

// Reset button

function clearAll() {
    csvData.value = '';
    jsonData.value = '';
}

// Copy button

function copyJSON() {
    const textArea = csvData;
    textArea.select();
    document.execCommand('copy');
}

// Listeners

convertBtn.addEventListener('click', convert);
clearBtn.addEventListener('click', clearAll);
copyBtn.addEventListener('click', copyJSON);