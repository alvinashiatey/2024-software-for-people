function handleDateClick() {
  const buttons = document.querySelectorAll(".class .btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const classWrapper = button
        .closest(".class")
        .querySelector(".class-wrapper");
      if (classWrapper.hasAttribute("hidden")) {
        classWrapper.removeAttribute("hidden");
      } else {
        classWrapper.setAttribute("hidden", "");
      }
    });
  });
}

(() => {
  handleDateClick();
})();
