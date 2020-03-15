const csvData = document.querySelector('.csv');
const jsonData = document.querySelector('.json');
const convertBtn = document.querySelector('.convert');
const clearBtn = document.querySelector('.clear');
const copyBtn = document.querySelector('.copy');


// CSV to Array

function CSVtoArray(csv) {
    let csvArr = csv.split(/\n/).map(value => value.replace(/\"/g, ""));
    return csvArr.map(value => value.split(','));
}

// Convert CSV Array to JSON

function convertToJSON() {
    let csvValue = csvData.value;
    let csvArray = CSVtoArray(csvValue);
    let dataArray = [];

    for (let i = 1; i < csvArray.length; i += 1) {
        dataArray[i - 1] = {};
        for (let j = 0; j < csvArray[0].length && j < csvArray[i].length; j += 1) {
            let key = csvArray[0][j];
            dataArray[i - 1][key] = csvArray[i][j];
        }
    }
    let json = JSON.stringify(dataArray);
    return json.replace(/},/g, '},\n');
}

// Convert button

function convert() {
    let json = convertToJSON();
    jsonData.value = json;
}

// Reset button

function clearAll() {
    csvData.value = '';
    jsonData.value = '';
}

// Copy button

function copyJSON() {
    const textArea = jsonData;
    textArea.select();
    document.execCommand('copy');
}

// Listeners

convertBtn.addEventListener('click', convert);
clearBtn.addEventListener('click', clearAll);
copyBtn.addEventListener('click', copyJSON);