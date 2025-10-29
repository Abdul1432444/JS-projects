const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeTonggle = document.getElementById("theme-toggle");

let currentInput = "";

// step 1 is handle buttons

buttons.forEach((btn) => {
  btn.addEventListener("click ", () => handleInput(btn.dataset.key));
});

// step 2 is to handle keyboardkeys

document.addEventListener("keydown", (e) => {
  const key = e.key;
  const allowedKeys = "0123456789+-*/.%";
  if (allowedKeys.includes(key)) handleInput(key);
  else if (allowedKeys === "enter") handleInput("=");
  else if (allowedKeys === "backspace") handleInput("DEL");
  else if (allowedKeys === "")
});
