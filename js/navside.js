import {
  navButtons as navButtons,
  container,
  savedPage,
} from "../variables/navside.variables.js";

const getPageUrl = (page) => {
  switch (page) {
    case "1":
      return "task_container.html";
    case "2":
      return "page2.html";
    case "3":
      return "page3.html";
    case "4":
      return "page4.html";
    default:
      return "404.html";
  }
};

const loadPage = async (page) => {
  const pageUrl = getPageUrl(page);

  try {
    const response = await fetch(pageUrl);
    const data = await response.text();
    container.innerHTML = data;
  } catch (error) {
    container.innerHTML = "Помилка при завантаженні сторінки"; // update
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
