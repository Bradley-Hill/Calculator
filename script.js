// Wrapped my Javascript to only execute after HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //Create references to display-screen, result button and number buttons.
  let displayScreen = document.getElementById("display-screen");
  let resultCall = document.getElementById("result");
  let numberButtons = document.querySelectorAll(".number");

  //Init variables for computation
  let numberOne = null;
  let numberTwo = null;
  let operatorChoice = null;

  numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      displayScreen.textContent += button.textContent;
    });
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
