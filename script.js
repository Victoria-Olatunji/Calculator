function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


const calculator = {
    displayValue: '0',
    firstNumber: null,
    waitingForSecondNumber: false,
    operator: null,
  };
  function inputDigit(digit) {
    const { displayValue, waitingForSecondNumber } = calculator;
    if (waitingForSecondNumber === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondNumber = false;
      }
    else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

  function inputDecimal(dot) {
    if (calculator.waitingForSecondNumber === true) {
        calculator.displayValue = "0."
      calculator.waitingForSecondNumber = false;
      return
    }
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }


  function handleOperator(nextOperator) {
    const { firstNumber, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondNumber)  {
      calculator.operator = nextOperator;
      return;
    }
  
  
    if (firstNumber == null && !isNaN(inputValue)) {
      calculator.firstNumber = inputValue;
    } else if (operator) {
      const result = calculate(firstNumber, inputValue, operator);
  
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstNumber = result;
    }
  
    calculator.waitingForSecondNumber = true;
    calculator.operator = nextOperator;
  }

  function calculate(firstNumber, secondNumber, operator) {
    let b;
    switch (operator) {
        case '+': 
            b = add(firstNumber, secondNumber)
            break;
        case '-':
            b = subtract(firstNumber, secondNumber);
            break;
        case '*':
            b = multiply(firstNumber, secondNumber);
            break;
        case '/':
            b = divide(firstNumber, secondNumber);
            break;
    
        default: 'Enter an operand'
            break;
    }
  
    return b;
  }

  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    calculator.operator = null;
  }

  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
          handleOperator(value);
          break;
        case '.':
          inputDecimal(value);
          break;
        case 'all-clear':
          resetCalculator();
          break;
        default:
          if (Number.isInteger(parseFloat(value))) {
            inputDigit(value);
          }
      }
    
    updateDisplay();
  });