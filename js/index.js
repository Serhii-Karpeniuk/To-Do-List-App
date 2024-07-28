document.addEventListener("partialsLoaded", async () => {
  await import("./variables.js");
  await import("./navside.js");
  await import("./header.js");
});
