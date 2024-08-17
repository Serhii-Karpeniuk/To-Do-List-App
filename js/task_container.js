import { newTaskBtn, taskForm } from "../variables/task.variables.js";
const tasksContainer = document.querySelector("#output");

newTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "visible";
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getDataForm();
  displayTasks();
  resetFormFields();
  closeModalTask();
});

const tasksArray = [];

function getDataForm() {
  const dataEl = document.querySelectorAll("[data-field]");
  const formObj = {};
  let isEmpty = false;

  dataEl.forEach((el) => {
    const key = el.getAttribute("data-field");
    const value = el.value.trim();
    if (value === "") {
      isEmpty = true;
    }
    formObj[key] = value;
  });

  if (isEmpty) {
    console.log("Помилка: всі поля повинні бути заповнені");
  } else {
    tasksArray.push(formObj);
    console.log("Завдання додано:", formObj);
  }
}

function displayTasks() {
  tasksContainer.innerHTML = "";

  tasksArray.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
      <div class="output_subcontainer">
        <h2 class="task-title">Title: ${task.task_name}</h2>
        <input type="checkbox" id="res_checkbox">
      </div>
      <p class='description'>Description: ${task.task_description}</p>
      <p class="border"></p>
      <p class='time_output'>Start: ${task.start_time} - End: ${task.end_time}</p>
    `;

    tasksContainer.appendChild(taskElement);

    const checkbox = taskElement.querySelector("#res_checkbox");
    const taskTitle = taskElement.querySelector(".task-title");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskTitle.style.textDecoration = "line-through";
      } else {
        taskTitle.style.textDecoration = "none";
      }
    });
  });
}

function displayCurrentDate() {
  const fieldDate = document.querySelector(".date");

  const currentDate = new Date();

  const dayOfWeek = currentDate.getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfMonth = currentDate.getDate();

  const monthOfYear = currentDate.getMonth();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  fieldDate.textContent = `${days[dayOfWeek]}, ${dayOfMonth} ${month[monthOfYear]}`;
}

displayCurrentDate();

function closeModalTask() {
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "hidden";
}

function resetFormFields() {
  taskForm.reset();
}
