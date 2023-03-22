document.addEventListener("DOMContentLoaded", function () {
  let buttonContainer = document.getElementById("keypad");
  for (let i = 1; i <= 9; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    buttonContainer.appendChild(button);
  }
  let displayScreen = document.getElementById("display-screen");
  let buttons = document.querySelectorAll("#keypad button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      displayScreen.textContent += button.textContent;
    });
  });
});
