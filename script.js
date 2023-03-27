// Wrapped my Javascript to only execute after HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //Create references to display-screen, result button and number buttons.
  const displayScreen = document.getElementById("display-screen");
  const resultCall = document.getElementById("result");
  const numberButtons = document.querySelectorAll(".number");
  const clearButton = document.getElementById("clearAll");
  const operatorButtons = document.querySelectorAll(".operator");

  //Init variables for computation
  let numberOne = null;
  let numberTwo = null;
  let operatorChoice = null;
  let decimalOne = false;
  let decimalTwo = false;

  numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (
        button.textContent === "." &&
        ((operatorChoice == null && decimalOne) ||
          (operatorChoice !== null && decimalTwo))
      ) {
        return;
      }
      if (numberOne === null) {
        if (button.textContent === ".") {
          decimalOne = true;
        }
        numberOne = button.textContent;
        displayScreen.textContent += button.textContent;
      } else if (operatorChoice === null) {
        if (button.textContent === "." && decimalOne) {
          return;
        }
        if (button.textContent === ".") {
          decimalOne = true;
        }
        numberOne += button.textContent;
        displayScreen.textContent += button.textContent;
      } else {
        if (button.textContent === "." && decimalTwo) {
          return;
        }
        if (button.textContent === ".") {
          decimalTwo = true;
        }
        numberTwo += button.textContent;
        displayScreen.textContent += button.textContent;
      }
    });
  });

  //Operator button event listener
  operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      operatorChoice = button.textContent;
      displayScreen.textContent += operatorChoice;
    });
  });

  //Clear button event listener
  clearButton.addEventListener("click", function () {
    numberOne = null;
    numberTwo = null;
    operatorChoice = null;
    decimalOne = false;
    decimalTwo = false;
    displayScreen.textContent = "";
  });

  //Operate Function to be called when result is clicked.
  function operate(num1, num2, operator) {
    switch (operator) {
      case "+":
        return add(num1, num2);
      case "-":
        return subtract(num1, num2);
      case "*":
        return multiply(num1, num2);
      case "/":
        return divide(num1, num2);
    }
  }

  // Specific functions for each operation.
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
});
