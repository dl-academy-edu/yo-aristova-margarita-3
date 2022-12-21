window.addEventListener("DOMContentLoaded", function () {
  const signInModal = document.querySelector(".sign-in");
  const registerModal = document.querySelector(".register");
  const sendMessageModal = this.document.querySelector(".send-message");
  const inputArray = [
    signInModal.querySelector(".form__input"),
    registerModal.querySelector(".form__input"),
    sendMessageModal.querySelector(".form__input"),
  ];
  const openButtonArray = [...this.document.querySelectorAll(".modal-button")];
  const closeButtonArray = [...this.document.querySelectorAll(".modal__close")];
  const modalArray = [...this.document.querySelectorAll(".modal")];
  const overlayArray = [...this.document.querySelectorAll(".overlay")];

  for (let i = 0; i < modalArray.length; i++) {
    openButtonArray[i].addEventListener("click", () => {
      modalArray[i].classList.add("visible");
      inputArray[i].focus();
    });
    closeButtonArray[i].addEventListener("click", () => {
      modalArray[i].classList.remove("visible");
      openButtonArray[i].focus();
    });
    window.addEventListener("keydown", function (event) {
      if (
        event.code === "Escape" &&
        modalArray[i].classList.contains("visible")
      ) {
        modalArray[i].classList.remove("visible");
        openButtonArray[i].focus();
      }
    });
    overlayArray[i].addEventListener("click", () => {
      modalArray[i].classList.remove("visible");
      openButtonArray[i].focus();
    });
  }

  const openMenuButton = this.document.querySelector(".menu-button");
  const mobileMenu = this.document.querySelector(".header-mobile");
  const closeMenuButton = this.document.querySelector(".header-mobile__close");

  openMenuButton.addEventListener("click", () => {
    mobileMenu.classList.add("header-mobile--visible");
  });

  closeMenuButton.addEventListener("click", () => {
    mobileMenu.classList.remove("header-mobile--visible");
  });
});
