// ✅ STEP 1: Select all important elements from the HTML
const taskInput = document.getElementById("taskInput"); // The text box where user types the task
const addBtn = document.getElementById("addBtn"); // The "Add" button
const taskList = document.getElementById("taskList"); // The <ul> that will contain all tasks

// ✅ STEP 2: When page loads, show previously saved tasks from localStorage
window.onload = loadTasks; // When page refreshes, this function runs automatically

// ✅ STEP 3: Add a click event on the "Add" button
addBtn.addEventListener("click", addTask); // When button is clicked, run addTask()

// ✅ STEP 4: Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim(); // Get the text from input and remove spaces

  // If input is empty, show alert and stop function
  if (taskText === "") {
    alert("Please enter a task!");
    return; // stops the function
  }

  // ✅ STEP 5: Create a new <li> element dynamically
  const li = document.createElement("li");

  // Add task text and a delete button inside <li>
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete">X</button>
  `;

  // ✅ STEP 6: Add feature to mark task as "completed" (strike-through)
  li.addEventListener("click", function (e) {
    // Only mark complete if clicked on the text, not delete button
    if (e.target.tagName === "SPAN") {
      li.classList.toggle("completed"); // toggle adds/removes class
      saveTasks(); // update localStorage
    }
  });

  // ✅ STEP 7: Add delete functionality for "X" button
  li.querySelector(".delete").addEventListener("click", function (e) {
    e.stopPropagation(); // stop the click from affecting the parent (avoid mark complete)
    li.remove(); // remove this <li> from the list
    saveTasks(); // update localStorage after deleting
  });

  // ✅ STEP 8: Add the new task <li> into the <ul>
  taskList.appendChild(li);

  // ✅ STEP 9: Clear input box after adding task
  taskInput.value = "";

  // ✅ STEP 10: Save all tasks into localStorage (so they stay after refresh)
  saveTasks();
}

// ✅ STEP 11: Function to save all tasks to localStorage
function saveTasks() {
  const tasks = []; // empty array to store all tasks

  // Loop through all <li> items to save their data
  document.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent, // task name
      completed: li.classList.contains("completed"), // true/false
    });
  });

  // Save array as JSON string in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ✅ STEP 12: Function to load saved tasks from localStorage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || []; // get tasks or empty array

  // Loop through all saved tasks and rebuild them
  saved.forEach((task) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed"); // if task was completed, add class
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete">X</button>
    `;

    // Add the same click events again (same as above)
    li.addEventListener("click", function (e) {
      if (e.target.tagName === "SPAN") {
        li.classList.toggle("completed");
        saveTasks();
      }
    });

    li.querySelector(".delete").addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li); // Add task into list
  });
}
