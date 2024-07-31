import {
  fileInput,
  uploadButton,
  avatar,
  currentDate,
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

function getCurrentHour() {
  const date = new Date().getHours();

  let greeting = "";

  switch (true) {
    case date >= 0 && date < 6:
      greeting = `Night, ${storedFname}`;
      break;
    case date >= 6 && date < 12:
      greeting = `Morning, ${storedFname}`;
      break;
    case date >= 12 && date < 18:
      greeting = `Day, ${storedFname}`;
      break;
    case date >= 18 && date < 24:
      greeting = `Evening, ${storedFname}`;
      break;
  }
  currentDate.textContent = greeting;
}

getCurrentHour();
