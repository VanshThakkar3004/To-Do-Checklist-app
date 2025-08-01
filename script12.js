const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function addTask() {
    const task = input.value.trim();
    if (!task) return;

    const li = document.createElement("li");
    li.className = "todo-item";

    // --- Checkbox element ---
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.onclick = (e) => {
        li.classList.toggle("completed");
    };

    // --- Task text ---
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task;

    // --- Actions (delete button) ---
    const actions = document.createElement("div");
    actions.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#10006;";
    deleteBtn.className = "action-btn";
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.style.opacity = 0;
        setTimeout(() => list.removeChild(li), 230);
    };
    actions.appendChild(deleteBtn);

    // --- Assemble the list item ---
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(actions);
    li.style.opacity = 0;
    list.appendChild(li);
    setTimeout(() => li.style.opacity = 1, 60);
    input.value = "";
}

// Enter key support
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// "Clear All" button logic
function clearAll() {
    list.innerHTML = "";
}
