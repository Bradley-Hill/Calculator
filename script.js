document.addEventListener("DOMContentLoaded", function () {
  let buttonContainer = document.getElementById("keypad");
  for (let i = 1; i <= 9; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    buttonContainer.appendChild(button);
  }
});
