let currentOperation = null;
let resetScreen = false;
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

