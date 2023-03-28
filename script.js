// Wrapped my Javascript to only execute after HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //Create references to display-screen, result button and number buttons.
  const displayScreen = document.getElementById("display-screen");
  const resultCall = document.getElementById("result");
  const numberButtons = document.querySelectorAll(".number");
  const clearButton = document.getElementById("clearAll");
  const operatorButtons = document.querySelectorAll(".operator");
  const delButton = document.getElementById("delete");

  //Init variables for computation
  let numberOne = "";
  let numberTwo = "";
  let operatorChoice = null;
  let decimalOne = false;
  let decimalTwo = false;
  let flag = false;

  numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (flag) {
        numberOne = displayScreen.textContent;
        numberTwo = "";
        decimalOne = numberOne.includes(".") ? true : false;
        decimalTwo = false;
        displayScreen.textContent = numberOne;
        flag = false;
      }
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
      flag = true;
      numberOne = resultString;
      numberTwo = "";
      operatorChoice = null;
      decimalOne = resultString.includes(".") ? true : false;
      decimalTwo = false;
    }
  });

  //Operator button event listener
  operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (flag) {
        operatorChoice = null;
        flag = false;
      }
      if (operatorChoice !== null && numberTwo !== "") {
        const result = operate(
          parseFloat(numberOne),
          parseFloat(numberTwo),
          operatorChoice
        );
        numberOne = result.toString();
        numberTwo = "";
        decimalOne = numberOne.includes(".") ? true : false;
        decimalTwo = false;
        let resultString = parseFloat(result.toFixed(9)).toString();
        if (resultString.indexOf(".") >= 0) {
          resultString = resultString.replace(/\.?0*$/, "");
        }
        displayScreen.textContent = resultString;
      }
      operatorChoice = button.textContent;
      displayScreen.textContent += " " + operatorChoice + " ";
    });
  });

  //Delete/Backspace button listener
  delButton.addEventListener("click", function () {
    let displayValue = displayScreen.textContent;
    if(displayValue.length > 0){
      displayValue = displayValue.slice(0, -1)
      if(displayValue.length === 0){
        numberOne = "";
        numberTwo = "";
        operatorChoice = null;
        decimalOne = false;
        decimalTwo = false;
      } else {
        const lastCharacter = displayValue[displayValue.length - 1]
        if(lastCharacter === "+" ||lastCharacter === "-" ||lastCharacter === "*" ||lastCharacter === "/" ||lastCharacter === "%" ||){
          displayValue = displayValue.slice(0, -1)
        
        storedValue = displayValue
        operatorChoice = lastCharacter
        decimalTwo = false
      } else {
        const operatorIndex = displayValue.indexOf(operatorChoice)
        if (operatorIndex === -1){
          numberOne = displayValue
          decimalOne = displayValue.includes(".") ? true : false
        } else {
          numberOne = displayValue.slice(0, operatorIndex).trim()
          numberTwo = displayValue.slice(operatorIndex + 1).trim()
          decimalOne = numberOne.includes(".") ? true:false
          decimalTwo = numberTwo.includes(".") ? true:false
        }
      }

      }
      displayScreen.textContent = displayValue
    }
  });

  //Clear button event listener
  clearButton.addEventListener("click", function () {
    numberOne = "";
    numberTwo = "";
    operatorChoice = null;
    decimalOne = false;
    decimalTwo = false;
    displayScreen.textContent = "";
    flag = false;
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
    case "%":
      return percentage(num1, num2);
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
function percentage(a, b) {
  return (Number(a) / Number(b)) * 100;
}
