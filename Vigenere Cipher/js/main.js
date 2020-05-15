/* --------------------------Elements---------------------- */

const message = document.querySelector('.vigenere-cipher__input');
const result = document.querySelector('.vigenere-cipher__result');
const encryptBtn = document.querySelector('.vigenere-cipher__encrypt-btn');
const decryptBtn = document.querySelector('.vigenere-cipher__decrypt-btn');
const key = document.querySelector('.vigenere-cipher__key');
const mode = document.querySelector('.vigenere-cipher__mode');


/* ---------------------------Encrypt Message--------------------------- */

function encryptMessage(message, key) {
    const alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "\'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];
    let encryptedText = [];
    message = message.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0; i < message.length; i += 1) {
        let keyIndex = i >= key.length ? i % key.length : i; // if the key length is shorter than the message

        let symbolCode = (alphabetArr.indexOf(message[i]) + alphabetArr.indexOf(key[keyIndex])) % alphabetArr.length;

        encryptedText.push(alphabetArr[symbolCode]);
    }

    return encryptedText.join('');
}

/* ---------------------------Decrypt Message--------------------------- */

function decryptMessage(encryptedMessage, key) {
    const alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "\'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];
    let encryptedText = [];
    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0; i < encryptedMessage.length; i += 1) {
        let keyIndex = i >= key.length ? i % key.length : i; // if the key length is shorter than the message

        let symbolCode = (alphabetArr.indexOf(encryptedMessage[i]) - alphabetArr.indexOf(key[keyIndex]) + alphabetArr.length) % alphabetArr.length;

        encryptedText.push(alphabetArr[symbolCode]);
    }

    return encryptedText.join('');
}

/* -------------------------------Show result message------------------------------ */

function showResult(text) {
    result.innerText = text;
}

/* -------------------------Listeners----------------------- */

encryptBtn.addEventListener('click', () => {
    const encryptedMessageText = encryptMessage(message.value, key.value);
    mode.innerText = 'encrypted';
    showResult(encryptedMessageText);
});
decryptBtn.addEventListener('click', () => {
    const decryptedMessageText = decryptMessage(message.value, key.value);
    mode.innerText = 'decrypted';
    showResult(decryptedMessageText);
});