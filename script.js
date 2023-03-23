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
  // Using display screen to display the numbers selected.
  let displayScreen = document.getElementById("display-screen");
  let buttons = document.querySelectorAll(
    "#numberpad button,.number, .operator"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("operator")) {
        displayScreen.textContent += " " + button.textContent + " ";
      } else {
        displayScreen.textContent += button.textContent;
      }
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
