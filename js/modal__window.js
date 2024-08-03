import { addUserNameButton } from "../variables/header.variables.js";
import {
  fnameInput,
  lnameInput,
  modalContainer,
  closeButton,
  form,
} from "../variables/modal.variables.js";
 import { setFullName } from '../js/header.js';

let isFormValid = true;

const validateInput = () => {
  isFormValid = true;

  const firstName = !validator.isEmpty(fnameInput.value.trim());
  const lastName = !validator.isEmpty(lnameInput.value.trim());

  if (firstName === false) {
    displayError(fnameInput, "Name is required!");
    isFormValid = false;
  } else {
    setSucces(fnameInput);
  }

  if (lastName === false) {
    displayError(lnameInput, "Last Name is required!");
    isFormValid = false;
  } else {
    setSucces(lnameInput);
  }
};

const displayError = (element, msg) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error_output");
  errorDisplay.innerText = msg;
  element.classList.add("invalid");
  element.classList.remove("valid");
};

const setSucces = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error_output");
  errorDisplay.innerText = "";
  element.classList.add("valid");
  element.classList.remove("invalid");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInput();

  if (!isFormValid) {
    return;
  }

  modalContainer.style.visibility = "hidden";

  const { firstName, lastName } = getFormData(form);
  const fullName = `${firstName} ${lastName}`;
  localStorage.setItem("fname", firstName);

  // const firstNameEvent = new CustomEvent("local-storage", {
  //   detail: { key: "fname", oldValue: "old", newValue: fname },
  // });
  
  const firstNameEvent = createCustomStorageEvent("fname", null, firstName);
  window.dispatchEvent(firstNameEvent);
  
  const fullNameEvent = createCustomStorageEvent(
    "fullName",
    null, `${firstName} ${lastName}`
  );
  window.dispatchEvent(fullNameEvent);

  localStorage.setItem("lname", lastName);

  fnameInput.value = "";
  lnameInput.value = "";

  setFullName(fullName);
});

 function getFormData(form) {
  const modalForm = new FormData(form);

  const firstName = modalForm.get("fname");
  const lastName = modalForm.get("lname");

  return { firstName, lastName };
}


function createCustomStorageEvent(key, oldValue, newValue) {
  return new CustomEvent("local-storage", {
    detail: { key, oldValue, newValue },
  });
}

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.style.visibility = "hidden";

  fnameInput.value = "";
  lnameInput.value = "";

  clearErrors();
});

addUserNameButton.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.style.visibility = "visible";
});

const clearErrors = () => {
  const errorElements = document.querySelectorAll(".error_output");
  errorElements.forEach((errorElement) => {
    errorElement.innerText = "";
  });

  fnameInput.classList.remove("invalid", "valid");
  lnameInput.classList.remove("invalid", "valid");
};


