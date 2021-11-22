// an object to keep track of the operands and operator
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false, // check if first operand and operator have been inputed
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return;
  } else if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator; // overwrite the existing operator
    console.log(calculator);
    return;
  } else if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`; // limit result to 7 decimal places
    calculator.firstOperand = result; // make the result a new input
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand; // if the operator is the equal sign (=)
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen'); // or use document.getElementById("elementId")
  // update the value of the element with the contents of 'displayValue'
  display.value = calculator.displayValue;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event; // access the clicked element's class
  if (!target.matches('button')) {
    return;
  } else if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  } else if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  } else if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  } else {
    inputDigit(target.value);
    updateDisplay();
  }
});
