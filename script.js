// Wrapped my Javascript to only execute after HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //Operate Function to be called when resultCall is clicked.
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
