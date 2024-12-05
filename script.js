//Retrieve todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

 
//initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
      displayTasks();
    }
  });
  deleteButton.addEventListener("click", deleteAllTask);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });

    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}
function deleteAllTask() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}
function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
         <div class="todo-container">
              <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
              <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">
                ${item.text}
              </p>
              <button class="delete-task-btn" data-index="${index}">       🗑️</button>
         </div>
    `;

    // Checkbox toggle event
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });

    // Delete button event
    const deleteButton = p.querySelector(".delete-task-btn");
    deleteButton.addEventListener("click", () => {
      deleteTask(index);
    });

    todoList.appendChild(p);
  });

  todoCount.textContent = todo.length;
}

// New function to delete a specific task
function deleteTask(index) {
  // Remove the task at the specified index
  todo.splice(index, 1);

  // Save the updated list to local storage
  saveToLocalStorage();

  // Redisplay the tasks
  displayTasks();
}
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      inputElement.blur();
    }
  });
}
 
