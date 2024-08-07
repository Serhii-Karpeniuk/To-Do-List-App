import { newTaskBtn, formDataObj, taskForm, outputTaskTitle, descriptionOutput, timeOutput} from "../variables/task.variables.js";

newTaskBtn.addEventListener("click", function () {
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "visible";
});

function getFormDataTask(dataAttribute) {
  
  const elements = taskForm.querySelectorAll(`[data-${dataAttribute}]`);

  elements.forEach(element => {
    const key = element.getAttribute(`data-${dataAttribute}`);
    formDataObj[key] = element.value;
  });

  return formDataObj;
}

const outputDiv = document.querySelector('#output');


taskForm.addEventListener("submit", (e)=> {
  e.preventDefault();
  const formDataObj = getFormDataTask('field');
  outputDataForm(formDataObj);
  closeModalTask() 
  resetFormFields()
})

function outputDataForm(formDataObj) {

  const startTime = taskForm.querySelector('#start_time').value;
  const endTime = taskForm.querySelector('#end_time').value;

  if (startTime && endTime) {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    
    if (start >= end) {
      outputDiv.textContent = 'Помилка: час початку має бути раніше за час закінчення.';
    } else {
      formDataObj.start_time = startTime;
      formDataObj.end_time = endTime;
      timeOutput.innerHTML = `Початок ${startTime} - Кінець ${endTime}`
      console.log(formDataObj);
    }
  }
  const title = formDataObj.task_title
  outputTaskTitle.textContent = title;

  const description = formDataObj.task_description;
  descriptionOutput.innerHTML = description;
}

function closeModalTask () {
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "hidden";
}

function resetFormFields() {
  taskForm.reset();
}