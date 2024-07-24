import {
  navButtons as navButtons,
  container,
  savedPage,
} from "./variables.js";

const loadPage = async (page) => {
  let pageUrl;
  switch (page) {
    case "1":
      pageUrl = "page1.html";
      break;
    case "2":
      pageUrl = "page2.html";
      break;
    case "3":
      pageUrl = "page3.html";
      break;
    case "4":
      pageUrl = "page4.html";
      break;
    default:
      container.innerHTML = "Сторінку не знайдено";
      return;
  }

  try {
    const response = await fetch(pageUrl);
    const data = await response.text();
    container.innerHTML = data;
  } catch (error) {
    container.innerHTML = "Помилка при завантаженні сторінки";
  }
};

if (savedPage) {
  loadPage(savedPage);
}

navButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    const attributeValue = button.getAttribute("data-page");

    localStorage.setItem("page", attributeValue);

    await loadPage(attributeValue);
  });
});
