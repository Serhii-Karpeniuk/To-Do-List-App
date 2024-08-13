import { newTaskBtn, taskForm, outputTaskTitle, descriptionOutput, timeOutput } from "../variables/task.variables.js";
const tasksContainer = document.querySelector('#output');

newTaskBtn.addEventListener("click", function () {
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "visible";
});

taskForm.addEventListener('submit', (e)=> {
  e.preventDefault();
  getDataForm();
  displayTasks()
  resetFormFields();
  closeModalTask();
})

const tasksArray = [];

function getDataForm() {
  const dataEl = document.querySelectorAll('[data-field]');
  const formObj = {};
  let isEmpty = false;

  dataEl.forEach((el) => {
    const key = el.getAttribute('data-field');
    const value = el.value.trim();
    if (value === '') {
      isEmpty = true;
    }
    formObj[key] = value;
  });

  if (isEmpty) {
    console.log('Помилка: всі поля повинні бути заповнені'); 
  } else {
    tasksArray.push(formObj);
    console.log('Завдання додано:', formObj);
  }
}

// function displayTasks() {
//   tasksContainer.innerHTML = '';

//   tasksArray.forEach((task) => {
//     const taskElement = document.createElement('div');
//     taskElement.className = 'task';
//     taskElement.innerHTML = `
//       <div class="output_subcontainer">
//       <h2>Назва: ${task.task_name}</h2>
//        <input type="checkbox" id="res_checkbox">
//       </div>
//       <p>Опис: ${task.task_description}</p>
//       <p>Початок: ${task.start_time} - Кінець: ${task.end_time}</p>
//     `;

//     tasksContainer.appendChild(taskElement);
//   });
// }

function displayTasks() {
  tasksContainer.innerHTML = '';

  tasksArray.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <div class="output_subcontainer">
        <h2 class="task-title">Назва: ${task.task_name}</h2>
        <input type="checkbox" id="res_checkbox">
      </div>
      <p>Опис: ${task.task_description}</p>
      <p>Початок: ${task.start_time} - Кінець: ${task.end_time}</p>
    `;

    tasksContainer.appendChild(taskElement);

    const checkbox = taskElement.querySelector('#res_checkbox');
    const taskTitle = taskElement.querySelector('.task-title');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        taskTitle.style.textDecoration = 'line-through';
      } else {
        taskTitle.style.textDecoration = 'none';
      }
    });
  });
}


function closeModalTask() {
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "hidden";
}

function resetFormFields() {
  taskForm.reset();
}

