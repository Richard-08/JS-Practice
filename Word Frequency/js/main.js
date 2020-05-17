/* ---------------------------Elements---------------------- */

const textInput = document.querySelector('.word-frequency__input');
const translateBtn = document.querySelector('.translate-btn');
const resultTable = document.querySelector('.data-table__body');
const table = document.querySelector('.data-table');
const errorMessage = document.querySelector('.error');


/* ------------------------Word freaquency counter---------------------- */

function wordFreaquencyCounter(text) {
    const obj = {};
    const wordsArr = text.replace(/[?!,."/\(\)]/g, '')
        .toLowerCase()
        .split(' ').forEach(word => obj[word] ? obj[word] += 1 : obj[word] = 1);
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

/* ------------------------Render results---------------------- */

const toHTML = data => {
    return `
    <tr class="data-table__row">
        <td>${data[0]}</td>
        <td>${data[1]}</td>
    </tr>`;
}

function render(arr) {
    const html = arr.map(data => toHTML(data)).join('');
    table.classList.add('show');
    resultTable.innerHTML = html;

    setTimeout(() => {
        resultTable.querySelectorAll('.data-table__row').forEach(row => {
            row.classList.add('show');
        });
    }, 1000);

}

/* -------------------Show error message------------------- */

function setError() {
    errorMessage.classList.add('show');

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 1500);
}

/* ---------------------------Listener------------------------ */

translateBtn.addEventListener('click', () => {

    if (textInput.value) {
        const arr = wordFreaquencyCounter(textInput.value);
        render(arr);
    } else {
        setError();
    }

})