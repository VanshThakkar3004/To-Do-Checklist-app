const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Add fun entrance animation for items, and fade for removals
// Added local storage to save and load tasks

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function saveTasks() {
  const tasks = [];
  list.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    addTaskElement(task.text, task.completed);
  });
}

function addTaskElement(taskText, isCompleted = false) {
  const li = document.createElement("li");
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = isCompleted;
  
  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = taskText;

  if (isCompleted) {
    li.classList.add("completed");
  }

  // Checkbox event listener
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    if (li.classList.contains("completed")) {
      showConfetti(li);
    }
    saveTasks();
  });
  
  // Edit button
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "&#9998;";
  editBtn.className = "action-btn edit-btn";
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const newTaskText = prompt("Edit your task:", taskSpan.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskSpan.textContent = newTaskText.trim();
      saveTasks();
    }
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "&#10006;";
  deleteBtn.className = "action-btn delete-btn";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.style.opacity = 0;
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 230);
  });

  // Assemble the item
  const actions = document.createElement("div");
  actions.className = "actions";
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  
  todoItem.appendChild(checkbox);
  todoItem.appendChild(taskSpan);

  li.appendChild(todoItem);
  li.appendChild(actions);

  li.style.opacity = 0;
  list.appendChild(li);
  setTimeout(() => li.style.opacity = 1, 60); // fade-in
}

function addTask() {
  const task = input.value.trim();
  if (!task) return;
  addTaskElement(task);
  saveTasks();
  input.value = "";
}

// Enter key event
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// "Clear All" button
function clearAll() {
  list.innerHTML = "";
  localStorage.removeItem("tasks");
}

// Optional: Simple confetti burst
function showConfetti(element) {
  const confetti = document.createElement("span");
  confetti.textContent = "✨";
  confetti.style.position = "absolute";
  confetti.style.right = "45%";
  confetti.style.top = "10%";
  confetti.style.pointerEvents = "none";
  confetti.style.fontSize = "2em";
  confetti.style.opacity = 1;
  element.appendChild(confetti);

  setTimeout(() => {
    confetti.style.transform = "translateY(-30px) scale(1.7)";
    confetti.style.opacity = 0;
  }, 60);
  setTimeout(() => element.removeChild(confetti), 1100);
}