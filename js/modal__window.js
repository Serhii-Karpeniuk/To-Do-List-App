import { userName, addUserNameButton } from "../variables/header.variables.js";
import {
  fnameInput,
  lnameInput,
  sendModalButton,
  modalContainer,
  closeButton,
  storedFname,
} from "../variables/modal.variables.js";

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

sendModalButton.addEventListener("click", (e) => {
  e.preventDefault();

  validateInput();

  if (!isFormValid) {
    return;
  }

  modalContainer.style.visibility = "hidden";

  const fname = fnameInput.value;
  const lname = lnameInput.value;

  userName.innerHTML = "";

  const fullName = document.createElement("span");
  fullName.innerHTML = `${fname}, ${lname}`;

  userName.appendChild(fullName);

  localStorage.setItem("fname", fname);
  localStorage.setItem("lname", lname);

  fnameInput.value = "";
  lnameInput.value = "";
});

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

const localStoredName = () => {
  const storedFname = localStorage.getItem("fname");
  const storedLname = localStorage.getItem("lname");

  if (storedFname && storedLname) {
    userName.innerHTML = "";

    const fullName = document.createElement("span");
    fullName.innerHTML = `${storedFname}, ${storedLname}`;

    userName.appendChild(fullName);
  }
};

localStoredName();
