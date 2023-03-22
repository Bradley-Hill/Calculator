// Wrapped my Javascript to only execute after HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //Create the number pad for calculator(not operator buttons)
  let buttonContainer = document.getElementById("keypad");
  for (let i = 1; i <= 9; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    buttonContainer.appendChild(button);
  }
  // Using display screen to display the numbers selected.
  let displayScreen = document.getElementById("display-screen");
  let buttons = document.querySelectorAll("#keypad button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      displayScreen.textContent += button.textContent;
    });
  });
  //Functions for the maths operators(rough)
  const add = function (a, b) {
    return a + b;
  };

  const subtract = function (c, d) {
    return c - d;
  };

  const multiply = function (c, d) {
    return c * d;
  };

  const divide = function (c, d) {
    return c / d;
  };
});
