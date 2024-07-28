import { fileInput, uploadButton, avatar } from "./variables.js";

uploadButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      localStorage.setItem("avatar", imageUrl);
    };
    reader.readAsDataURL(file);
  }
});

const storedAvatar = localStorage.getItem("avatar");

if (storedAvatar) {
  avatar.src = storedAvatar;
}
