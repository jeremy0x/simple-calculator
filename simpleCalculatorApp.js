// an object to keep track of the operands and operator
const calculator = {
    displayValue: '0', // this holds the input of a user or the result of an operation
    firstOperand: null,
    waitingForSecondOperand: false, // to check if the first operand and the operator have been inputed
    operator: null,
};

function updateDisplay() {
    // select the element with class of 'calculator-screen'
    const display = document.querySelector('.calculator-screen'); // or use document.getElementById("elementId")
    // update the value of the element with the contents of 'displayValue'
    display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  // access the clicked element
  const { target } = event;

  // Check if the clicked element is a button; if not, exit from the function
  if (!target.matches('button')) {
    return;
  } else if (target.classList.contains('operator')) {
    console.log('operator', target.value);
    return;
  } else if (target.classList.contains('decimal')) {
    console.log('decimal', target.value);
    return;
  } else if (target.classList.contains('all-clear')) {
    console.log('clear', target.value);
    return;
  }
  console.log('digit', target.value);
});
