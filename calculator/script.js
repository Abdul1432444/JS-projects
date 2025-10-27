const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("theme-toggle");

let currentInput = "";

// Step 1: Handle button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleInput(btn.dataset.key));
});

// Step 2: Handle keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;
  const allowedKeys = "0123456789+-*/.%";
  if (allowedKeys.includes(key)) handleInput(key);
  else if (key === "Enter") handleInput("=");
  else if (key === "Backspace") handleInput("DEL");
  else if (key === "Escape") handleInput("C");
});

// Step 3: Main input handling logic
function handleInput(key) {
  if (key === "C") {
    currentInput = "";
  } else if (key === "DEL") {
    currentInput = currentInput.slice(0, -1);
  } else if (key === "=") {
    try {
      // Safely evaluate the expression
      currentInput = eval(currentInput.replace("%", "/100")).toString();
    } catch {
      currentInput = "Error";
      setTimeout(() => (currentInput = ""), 1000);
    }
  } else {
    // Avoid two operators in a row
    const lastChar = currentInput.slice(-1);
    if (/[+\-*/.]/.test(lastChar) && /[+\-*/.]/.test(key)) return;
    currentInput += key;
  }

  updateDisplay();
}

// Step 4: Update display
function updateDisplay() {
  display.value = currentInput || "0";
}

// Step 5: Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
