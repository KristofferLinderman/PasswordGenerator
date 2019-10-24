'use strict';

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lengthText = document.getElementById('passwordLengthText');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const listOfInputs = document.querySelectorAll('input');

const popUp = document.getElementById('popup');
const popupDisplayTime = 2000;

const funcArray = {
    uppercase: getRandomUpperCase,
    lowercase: getRandomLowerCase,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

getPassword();

for (let index = 0; index < listOfInputs.length; index++) {
    listOfInputs[index].addEventListener('change', (e) => {
        console.log(e.target);
        if (e.target.id === 'length') {
            console.log("Range");
            lengthText.innerText = e.target.value;
        }
        getPassword();
    });
}

generateEl.addEventListener('click', getPassword);

function getPassword() {
    let length = lengthEl.value;
    let includeNumbers = numbersEl.checked;
    let includeUppercase = uppercaseEl.checked;
    let includeLowercase = lowercaseEl.checked;
    let includeSymbols = symbolsEl.checked;

    resultEl.innerText = (generatePassword(includeLowercase, includeUppercase, includeNumbers, includeSymbols, length));
}

function generatePassword(lowercase, uppercase, number, symbol, length) {
    let result = "";

    if (!lowercase && !uppercase && !number && !symbols) {
        return result;
    }
    const typesArr = [{
        lowercase
    }, {
        uppercase
    }, {
        number
    }, {
        symbol
    }].filter(item => Object.values(item)[0]);

    for (let i = 0; i < length; i++) {
        let type = typesArr[Math.floor(Math.random() * typesArr.length)];
        let funcName = Object.keys(type)[0];
        result += funcArray[funcName]();
    }

    return result;
}

clipboard.addEventListener('click', () => {
    const tempElemnt = document.createElement('textarea');

    tempElemnt.value = resultEl.innerText;
    document.body.appendChild(tempElemnt);
    tempElemnt.select();
    document.execCommand('copy');
    document.body.removeChild(tempElemnt);

    showPopUp();
});

function showPopUp() {
    popUp.style.opacity = 1;

    setTimeout(() => {
        popUp.style.opacity = 0;
    }, popupDisplayTime);
}

//Generator functions
function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpperCase() {
    return getRandomLowerCase().toUpperCase();
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function getRandomSymbol() {
    const symbols = '!"#€%&/()=?[]{}$£@'
    return symbols[Math.floor(Math.random() * symbols.length)]
}