import {
  newTaskBtn,
  taskForm,
  tasksContainer,
  allTasksBtn,
  openTasksBtn,
  closedTasksBtn,
  messageField,
} from "../variables/task.variables.js";
import {
  successMessage,
  errorMessage,
} from "../variables/successMessage.variables.js";

// Завантаження завдань з localStorage
const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // Змінна для збереження поточного фільтру
displayTasks(currentFilter);

newTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "visible";
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getDataForm();
  resetFormFields();
  closeModalTask();
  displayTasks(currentFilter); // Використання поточного фільтру
});

// Функція для отримання даних з форми
function getDataForm() {
  const dataEl = document.querySelectorAll("[data-field]");
  const formObj = { id: Math.floor(Math.random() * 1000), status: "open" };
  let isEmpty = false;

  dataEl.forEach((el) => {
    const key = el.getAttribute("data-field");
    const value = el.value.trim();
    if (value === "") {
      isEmpty = true;
    }
    formObj[key] = value;
  });

  if (formObj.start_time && formObj.end_time) {
    const startTime = new Date(`1970-01-01T${formObj.start_time}:00`);
    const endTime = new Date(`1970-01-01T${formObj.end_time}:00`);
    if (startTime >= endTime) {
      outputErrorMessage("End time must be later than start time.");
      return;
    }
  }

  if (isEmpty) {
    outputErrorMessage();
    return;
  } else {
    tasksArray.push(formObj);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    outputSuccessMessage(successMessage.created());
  }
}

function outputSuccessMessage(message) {
  messageField.innerHTML = message;

  messageField.style.display = "block";

  setTimeout(() => {
    messageField.style.display = "none";
  }, 2000);
}

function outputErrorMessage(message) {
  messageField.innerHTML = message;

  messageField.style.display = "block";
  messageField.style.color = "red";

  setTimeout(() => {
    messageField.style.display = "none";
  }, 2000);
}

// Функція для відображення завдань
function displayTasks(filter) {
  tasksContainer.innerHTML = "";

  // Фільтрація завдань за статусом
  const filteredTasks = tasksArray.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  // Відображення завдань
  filteredTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.id = task.id;
    taskElement.innerHTML = `
      <div class="output_subcontainer">
        <h2 class="task-title" style="text-decoration: ${
          task.status === "completed" ? "line-through" : "none"
        };">Title: ${task.task_name}</h2>
        <input type="checkbox" class="res_checkbox" ${
          task.status === "completed" ? "checked" : ""
        }>
      </div>
      <p class='description'>Description: ${task.task_description}</p>
      <p class="border"></p>
      <div class="position__remove-button">
      <p class='time_output'>Start: ${task.start_time} - End: ${
        task.end_time
      }</p>
      <button type="button" class="remove__task" name="remove task">Remove Task</button>
      </div>
    `;
    tasksContainer.appendChild(taskElement);

    const checkbox = taskElement.querySelector(".res_checkbox");
    const taskTitle = taskElement.querySelector(".task-title");

    checkbox.addEventListener("change", () => {
      task.status = checkbox.checked ? "completed" : "open";
      taskTitle.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";

      // Оновлення LocalStorage після зміни статусу
      localStorage.setItem("tasks", JSON.stringify(tasksArray));

      // Повторне відображення завдань для актуальної вкладки
      displayTasks(currentFilter); // Використання поточного фільтру
    });

    removeTask();
  });
}

// Функція для додавання/зняття підкреслення з фільтруючих кнопок
function handleClickFilter(element) {
  const nameFilters = document.querySelectorAll(".filtered__tasks div");

  nameFilters.forEach((filter) => {
    filter.classList.remove("underline");
  });

  element.classList.add("underline");
}

// Слухачі подій для фільтруючих кнопок
allTasksBtn.addEventListener("click", () => {
  currentFilter = "all"; // Оновлення поточного фільтру
  handleClickFilter(allTasksBtn);
  displayTasks(currentFilter);
});

openTasksBtn.addEventListener("click", () => {
  currentFilter = "open"; // Оновлення поточного фільтру
  handleClickFilter(openTasksBtn);
  displayTasks(currentFilter);
});

closedTasksBtn.addEventListener("click", () => {
  currentFilter = "completed"; // Оновлення поточного фільтру
  handleClickFilter(closedTasksBtn);
  displayTasks(currentFilter);
});

// Функція для відображення поточної дати
export function displayCurrentDate() {
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

// Функція для закриття модального вікна
function closeModalTask() {
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "hidden";
}

// Функція для очищення полів форми
function resetFormFields() {
  taskForm.reset();
}

function removeTask() {
  // Знаходимо всі кнопки для видалення завдань
  const removeTaskButtons = document.querySelectorAll(".remove__task");

  removeTaskButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskElement = e.target.closest(".task");
      const taskId = taskElement.id;

      const taskIndex = tasksArray.findIndex((task) => task.id == taskId);
      console.log(taskIndex);

      if (taskIndex !== -1) {
        tasksArray.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));

        taskElement.remove();

        displayTasks(currentFilter);
      }
    });
  });
}
