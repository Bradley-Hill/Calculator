// Wrapped my Javascript to only execute after HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //Create references to display-screen, result button and number buttons.
  const displayScreen = document.getElementById("display-screen");
  const resultCall = document.getElementById("result");
  const numberButtons = document.querySelectorAll(".number");
  const clearButton = document.getElementById("clearAll");
  const operatorButtons = document.querySelectorAll(".operator");

  //Init variables for computation
  let numberOne = "";
  let numberTwo = "";
  let operatorChoice = null;
  let decimalOne = false;
  let decimalTwo = false;

  numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.textContent === ".") {
        if (
          (operatorChoice === null && decimalOne) ||
          (operatorChoice !== null && decimalTwo)
        ) {
          return;
        }
        if (operatorChoice === null) {
          decimalOne = true;
          displayScreen.textContent += ".";
        } else {
          decimalTwo = true;
          displayScreen.textContent += ".";
        }
      } else {
        if (operatorChoice === null) {
          if (decimalOne) {
            numberOne += ".";
            decimalOne = false;
          }
          numberOne += button.textContent;
          displayScreen.textContent += button.textContent;
        } else {
          if (decimalTwo) {
            numberTwo += ".";
            decimalTwo = false;
          }
          numberTwo += button.textContent;
          displayScreen.textContent += button.textContent;
        }
      }
    });
  });

  //Result button event listener
  resultCall.addEventListener("click", function () {
    if (numberOne === "" || numberTwo === "" || operatorChoice === null) {
      return;
    }
    if (decimalOne && numberOne === "") {
      numberOne = "0";
    }
    if (decimalTwo && numberTwo === "") {
      numberTwo = "0";
    }

    const result = operate(
      parseFloat(numberOne),
      parseFloat(numberTwo),
      operatorChoice
    );

    if (isNaN(result)) {
      displayScreen.textContent = "Nope, it can't be done.";
    } else {
      let resultString = parseFloat(result.toFixed(9)).toString();
      if (resultString.indexOf(".") >= 0) {
        resultString = resultString.replace(/\.?0*$/, "");
      }
      displayScreen.textContent = resultString;
    }
    numberOne = "";
    numberTwo = "";
    operatorChoice = null;
    decimalOne = false;
    decimalTwo = false;
  });

  //Operator button event listener
  operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      operatorChoice = button.textContent;
      displayScreen.textContent += " " + operatorChoice + " ";
    });
  });

  //Clear button event listener
  clearButton.addEventListener("click", function () {
    numberOne = "";
    numberTwo = "";
    operatorChoice = null;
    decimalOne = false;
    decimalTwo = false;
    displayScreen.textContent = "";
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
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  if (b === 0) {
    return NaN;
  }
  return Number(a) / Number(b);
}
