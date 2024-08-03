import {
  fileInput,
  uploadButton,
  avatar,
  currentDate,
  userName,
} from "../variables/header.variables.js";
import { storedFname } from "../variables/modal.variables.js";


uploadButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      avatar.src = imageUrl;
      localStorage.setItem("avatar", imageUrl);
    };
    reader.readAsDataURL(file);
  }
});

const storedAvatar = localStorage.getItem("avatar");

if (storedAvatar) {
  avatar.src = storedAvatar;
}

function getGreeting(storedFname) {
  const date = new Date().getHours();
  switch (true) {
    case date >= 0 && date < 6:
      return `Night, ${storedFname}`;
    case date >= 6 && date < 12:
      return `Morning, ${storedFname}`;
    case date >= 12 && date < 18:
      return `Afternoon, ${storedFname}`;
    case date >= 18 && date < 24:
      return `Evening, ${storedFname}`;
    default:
      return "Hello";
  }
}

function setGreeting(storedFname) {
  currentDate.textContent = getGreeting(storedFname);
}

setGreeting(storedFname);

window.addEventListener("local-storage", (event) => {
  if (event.detail?.key === "fname") {
    setGreeting(event.detail.newValue);
  }
  if (event.detail?.key === "fullName") {
   
    setFullName(event.detail.newValue)
  }
});


export function setFullName(fullName) {
  const [firstName, lastName] = fullName.split(' ');

  if (userName) {
    userName.innerHTML = ""; 
    const check = document.createElement("span");
    check.innerHTML = `${firstName}, ${lastName}`;
    userName.appendChild(check);
  } 
}


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