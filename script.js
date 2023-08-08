let currentOperation = null;
let doResetScreen = false;
let firstOperand = '';
let secondOperand = '';

const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const pointBtn = document.getElementById('point');
const lastOperationScreen = document.getElementById('lastOperation');
const currentOperationScreen = document.getElementById('currentOperation');

window.addEventListener('keydown', handleKeyboardInput);
equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
pointBtn.addEventListener('click', appendPoint);

numberBtns.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent)
    )
)

operatorBtns.forEach((button) =>
    button.addEventListener('click', setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || resetScreen)
    resetScreen();
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    doResetScreen = false;
}

function appendPoint() {
    if(doResetScreen) resetScreen();
    if(currentOperationScreen.textContent === '')
    currentOperationScreen.textContent = '0';
    if(currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function clear() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    doResetScreen = true;
}

function evaluate() {
    if(currentOperation === null || resetScreen) return;
    if(currentOperation === '÷' && currentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }

    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if(e.key === '.') appendPoint();
    if(e.key === '=' || e.key === 'Enter') evaluate();
    if(e.key === 'Backspace') deleteNumber();
    if(e.key === 'Escape') clear();
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if(keyboardOperator === '/') return '÷';
    if(keyboardOperator === '*') return '×';
    if(keyboardOperator === '-') return '−';
    if(keyboardOperator === '+') return '+';
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '−':
            return substract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            if(b === 0) return null
            else return divide(a, b);
        default:
            return null;
    }
}

