import React, { useState } from 'react';
import './styles.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performOperation(firstOperand, inputValue, operator);
      setDisplayValue(result.toString());
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEqualsClick = () => {
    if (waitingForSecondOperand) {
      return;
    }

    const inputValue = parseFloat(displayValue);

    if (firstOperand !== null && operator) {
      const result = performOperation(firstOperand, inputValue, operator);
      setDisplayValue(result.toString());
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (operand1, operand2, operator) => {
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
      default:
        return operand2;
    }
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="button-panel">
        <button onClick={() => handleDigitClick('7')}>7</button>
        <button onClick={() => handleDigitClick('8')}>8</button>
        <button onClick={() => handleDigitClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>

        <button onClick={() => handleDigitClick('4')}>4</button>
        <button onClick={() => handleDigitClick('5')}>5</button>
        <button onClick={() => handleDigitClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>

        <button onClick={() => handleDigitClick('1')}>1</button>
        <button onClick={() => handleDigitClick('2')}>2</button>
        <button onClick={() => handleDigitClick('3')}>3</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>

        <button onClick={() => handleDigitClick('0')}>0</button>
        <button onClick={() => handleDigitClick('.')}>.</button>
        <button onClick={handleEqualsClick}>=</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>

        <button onClick={handleClearClick}>C</button>
      </div>
    </div>
  );
};

export default Calculator;
