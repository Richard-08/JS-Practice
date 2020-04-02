/* ////////////////////// Elements //////////////////// */

const ctx = document.getElementById('myChart').getContext('2d');
const xData = document.querySelector('.x-data');
const yData = document.querySelector('.y-data');
const resetButton = document.querySelector('.reset-btn');
const calculateButton = document.querySelector('.calculate-btn');
const dataTable = document.querySelector('.data-table__body');


/* //////////////////// Inputs data convert to nested objects //////////////////////// */

function convertToObj(arrX, arrY) {
    let result = [];
    for (let i = 0; i < arrX.length; i += 1) {
        let obj = {};
        obj['x'] = arrX[i];
        obj['y'] = arrY[i];
        result.push(obj);
    }
    return result;
}

/* //////////////////// Inputs data convert to array //////////////////////// */

function convertToArray(str) {
    return str.split(',').map(value => parseFloat(value));
}

/* ///////////////////// Get Pearson correlation //////////////////// */

function getPearsonCorrelation(x, y) {
    let shortestArrayLength = 0;

    if (x.length == y.length) {
        shortestArrayLength = x.length;
    } else if (x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
    }

    let xy = [];
    let x2 = [];
    let y2 = [];

    for (let i = 0; i < shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }

    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_x2 = 0;
    let sum_y2 = 0;

    for (let i = 0; i < shortestArrayLength; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }

    let step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    let step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    let step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    let step4 = Math.sqrt(step2 * step3);
    let answer = step1 / step4;

    return answer;
}


/* ///////////////////// Calculate Arithmetic mean //////////////////////// */

function getArithmeticMean(numbersArr) {
    const mean = numbersArr.reduce((a, b) => a + b, 0) / numbersArr.length;
    return mean.toFixed(2);
}

/* ////////////////// Calculate Standard deviation ////////////////////// */

function getStandardDeviation(numbersArr, mean) {
    const sumOfDiff = numbersArr.map(value => Math.pow((value - mean), 2)).reduce((a, b) => a + b, 0);

    const sD = Math.sqrt(sumOfDiff / (numbersArr.length - 1));
    return sD.toFixed(2);
}

/* ///////////////////// Calculate Coefficient  //////////////////// */

function calculateCoefficient(arrX, arrY) {
    const correlationValue = getPearsonCorrelation(arrX, arrY);
    return correlationValue.toFixed(2);
}


/* /////////////////////// Render table row ////////////////////// */

function renderTableRow(x, y, xMean, yMean, xSd, ySd, coeff, correl) {
    const html = `
    <tr class="data-table__row">
        <td>${x}</td>
        <td>${y}</td>

        <td>${xMean}</td>
        <td>${yMean}</td>

        <td>${xSd}</td>
        <td>${ySd}</td>
    
        <td>${coeff}</td>
        <td>${correl}</td>
    </tr>`;
    dataTable.insertAdjacentHTML('beforeend', html);
};


/* //////////// Pearson correlation coefficient interpretation ///////////// */

function correlationValue(num) {
    if (num > 0.9 || num < -0.9) {
        return num > 0 ? 'Some correlation' : 'Some negative correlation';
    } else if (num > 0.5 || num < -0.5) {
        return num > 0 ? 'Neutral' : 'Negative neutral';
    } else {
        return 'No correlation';
    }
}

/* //////////////////// Calculate Correlation ///////////////////// */

function calculateCorrelation() {
    // x & y data values
    const x = convertToArray(xData.value);
    const y = convertToArray(yData.value);
    // x & y data mean values
    const xMean = getArithmeticMean(x);
    const yMean = getArithmeticMean(y);
    // x & y data standard deviation values
    const xSd = getStandardDeviation(x, xMean);
    const ySd = getStandardDeviation(y, yMean);
    // Pearson Correlation Coefficient
    const coefficient = calculateCoefficient(x, y);
    // Pearson correlation coefficient interpretation
    const correlation = correlationValue(coefficient);

    // Render data and results
    renderTableRow(x, y, xMean, yMean, xSd, ySd, coefficient, correlation);

    // Draw scatter plot
    const objData = convertToObj(x, y);
    drawScatterPlot(objData);

    // Clear inputs
    xData.value = '';
    yData.value = '';
}


/* ///////////////////// Reset all ///////////////////////// */

function resetAll() {
    dataTable.innerHTML = '';
}

/* ///////////////////// Listeners ////////////////////////// */

calculateButton.addEventListener('click', event => {
    event.preventDefault();

    calculateCorrelation();
});

resetButton.addEventListener('click', event => {
    event.preventDefault();

    resetAll();
})

/* ///////////////////// Draw scatter plot ///////////////////// */

function drawScatterPlot(obj) {
    const scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: obj,
                backgroundColor: 'rgba(0, 250, 154, 0.5)',
                pointBorderWidth: '5',
                pointRadius: '4',
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    gridLines: {
                        lineWidth: '1',
                        z: '-1',
                        color: 'rgba(0, 0, 0, 0.3)',

                    }
                }],
                yAxes: [{
                    gridLines: {
                        lineWidth: '1',
                        z: '-1',
                        color: 'rgba(0, 0, 0, 0.3)'
                    }
                }]
            },
        }
    });
    return scatterChart;
}

