// Wrapped my Javascript to only execute after HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //Create the number pad for calculator(not operator buttons)
  let buttonContainer = document.getElementById("numberpad");
  for (let i = 1; i <= 9; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    button.classList.add("number");
    buttonContainer.appendChild(button);
  }

  // Create references to the display screen and result button.
  let displayScreen = document.getElementById("display-screen");
  let resultButton = document.getElementById("resultCall");

  //Initialise variables to hold the first number, operator and the second number.
  let numberOne = null;
  let numberTwo = null;
  let operatorChoice = null;

  // Add event listener to the resultCall Button.
  resultButton.addEventListener("click", () => {
    //Verify both numbers and the operator have been stored.
    if (numberOne !== null && numberTwo !== null && operatorChoice !== null) {
      // Perform appropriate calculation based upon operatorChoice
      displayScreen.textContent = operate(
        parseFloat(numberOne),
        parseFloat(numberTwo),
        operatorChoice
      );
      numberOne = null;
      numberTwo = null;
      operatorChoice = null;
    }
  });

  // Event listener for buttons
  let buttons = document.querySelectorAll(
    "#numberpad button,.number, .operator"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      //verify if button is a number
      if (!isNaN(button.textContent)) {
        if (operatorChoice === null) {
          if (numberOne === null) {
            numberOne = button.textContent;
            displayScreen.textContent = button.textContent;
          } else {
            numberOne += button.textContent;
            displayScreen.textContent += button.textContent;
          }
        } else {
          if (numberTwo === null) {
            numberTwo = button.textContent;
            displayScreen.textContent += button.textContent;
          } else {
            numberTwo += button.textContent;
            displayScreen.textContent += button.textContent;
          }
        }
      } else if (button.id === "resultCall") {
        if (numberTwo !== null) {
          displayScreen.textContent = operate(
            parseFloat(numberOne),
            parseFloat(numberTwo),
            operatorChoice
          );
          numberOne = displayScreen.textContent;
          numberTwo = null;
          operatorChoice = null;
        }
      } else {
        operatorChoice = button.textContent;
        displayScreen.textContent += " " + button.textContent + " ";
      }
    });
  });

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
