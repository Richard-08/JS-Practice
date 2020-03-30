/* //////////// Elements ///////////// */

const addNoteBtn = document.querySelector('.add-note');
const notesList = document.querySelector('.notes');
let notes = JSON.parse(localStorage.getItem('notes')) || [];

const modeBtn = document.querySelector('.nightmode');

/* /////////////// Add Empty Note //////////////// */

function addNote(text = '') {
    const date = new Date();
    const nowDate = `${date.getMonth()}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const noteHTML = `
    <div class="note">
        <div class="note__control">
            <span class='date'>${nowDate}</span>
            <i class="fas fa-check-circle done" onclick='addNoteTextStorage(event)'></i>
            <i class='fas fa-times-circle delete' onclick='deleteNote(event)'></i>
        </div>
        <div class="note__text" contenteditable="true">${text}</div>
    </div>`
    notesList.insertAdjacentHTML('beforeend', noteHTML);
}

/* ////////////////// Add note text in localstorage ///////////////// */

function addNoteTextStorage(event) {
    const node = event.target.parentNode.parentNode;
    const text = node.querySelector('.note__text').innerText;
    const date = node.querySelector('.date').innerText;

    const noteText = { text, date };

    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));

    populateNotes(notes, notesList);
}

/* ////////////////// Populate saved notes ////////////////////// */

function populateNotes(notesArr = [], listOfNotes) {
    listOfNotes.innerHTML = notesArr.map((note, i) => {
        return `
        <div class="note" data-index=${i}>
            <div class="note__control">
                <span class='date'>${note.date}</span>
                <i class="fas fa-check-circle done" onclick='addNoteTextStorage(event)'></i>
                <i class='fas fa-times-circle delete' onclick='deleteNote(event)'></i>
            </div>
            <div class="note__text" contenteditable="true">${note.text}</div>
        </div>`;
    }).join('');
}

populateNotes(notes, notesList);

/* //////////////////// Delete note ///////////////////////// */

function deleteNote(event) {
    const el = event.target.parentNode.parentNode;
    const index = el.dataset.index;
    notes = notes.filter((note, i) => i !== Number(index));
    localStorage.setItem('notes', JSON.stringify(notes));

    populateNotes(notes, notesList);
}

/* //////////////// Change day or night mode /////////////// */

function changeMode() {
    document.body.classList.toggle('mode');
    modeBtn.classList.toggle('day');

    if (!modeBtn.classList.contains('day')) {
        modeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        modeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

}

/* ////////////////////// Listeners ////////////////////// */

addNoteBtn.addEventListener('click', event => {
    event.preventDefault();
    addNote();
});

modeBtn.addEventListener('click', event => {
    event.preventDefault();
    changeMode();
});