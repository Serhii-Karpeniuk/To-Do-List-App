document.addEventListener("partialsLoaded", async () => {
  await import("../variables/header.variables.js");
  await import("../variables/navside.variables.js");
  await import("../variables/modal.variables.js");
  await import("./navside.js");
  await import("./header.js");
  await import("./modal__window.js");
});
