const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomLeft = document.querySelector('.bottom-left');
const bottomRight = document.querySelector('.bottom-right');
const preview = document.querySelector('.preview');
const copyField = document.querySelector('.copy-field');
const reset = document.querySelector('.reset-btn');


function changeBorderRadius() {
    preview.style.borderRadius = `${topLeft.value}% ${topRight.value}% ${bottomRight.value}% ${bottomLeft.value}%`;
    copyField.value = `${topLeft.value}% ${topRight.value}% ${bottomRight.value}% ${bottomLeft.value}%`;
}

function resetValues(e) {
    e.preventDefault();
    preview.style.borderRadius = '';
    topLeft.value = 0;
    topRight.value = 0;
    bottomLeft.value = 0;
    bottomRight.value = 0;
    copyField.value = `${topLeft.value}% ${topRight.value}% ${bottomRight.value}% ${bottomLeft.value}%`;
}

document.addEventListener('input', changeBorderRadius);
reset.addEventListener('click', resetValues);