// DEFINE UI VARS

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadAllEventListeners();

function loadAllEventListeners() {
  // submit task

  form.addEventListener("submit", addTask);

  taskList.addEventListener("click", removeTask);

  clearBtn.addEventListener("click", clearTask);

  filter.addEventListener("keyup", filterTasks);

  document.addEventListener("DOMContentLoaded", getTasks);
}

// event handler so it will take an e object
function addTask(e) {
  if (taskInput.value === "") {
    alert("add a task");
  }

  // Create li element]
  const li = document.createElement("li");
  li.className = "collection-item";

  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  li.appendChild(link);

  taskList.appendChild(li);
  e.preventDefault();

  storeTaskInLocalStorage(taskInput.value);
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  e.preventDefault();
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li element]
    const li = document.createElement("li");
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure")) {
      e.target.parentElement.parentElement.remove();
      removeFromStorage(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();
}

function removeFromStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent == task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTask() {
  taskList.innerHTML = "";

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
