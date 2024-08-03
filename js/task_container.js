import { newTaskBtn, addTaskButton } from "../variables/task.variables.js";

newTaskBtn.addEventListener("click", function () {
  const formContainer = document.querySelector(".form__task-container");
  formContainer.style.visibility = "visible";
});

addTaskButton.addEventListener("click", function () {
  const descriptionInput = document.querySelector("#description");
  const descriptionValue = descriptionInput.value;
  console.log(descriptionValue);
});
