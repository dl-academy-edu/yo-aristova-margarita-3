window.addEventListener("DOMContentLoaded", function () {
  const signInButton = document.querySelector(".sign-in-button");
  const signInModal = document.querySelector(".sign-in");
  const registerButton = document.querySelector(".register-button");
  const registerModal = document.querySelector(".register");
  const sendMessageModal = this.document.querySelector(".send-message");
  const sendMessageButton = this.document.querySelector(".send-message-button");
  const input = document.querySelector(".form__input");
  const signCloseButton = document.querySelector(".sign-in__close");
  const registerCloseButton = document.querySelector(".register__close");
  const sendMessageCloseButton = this.document.querySelector(
    ".send-message__close"
  );

  signInButton.addEventListener("click", () => {
    signInModal.classList.add("sign-in--visible");
    input.focus();
  });

  signCloseButton.addEventListener("click", function () {
    signInModal.classList.remove("sign-in--visible");
    signInButton.focus();
  });

  registerButton.addEventListener("click", () => {
    registerModal.classList.add("register--visible");
    input.focus();
  });

  registerCloseButton.addEventListener("click", function () {
    registerModal.classList.remove("register--visible");
    registerButton.focus();
  });

  sendMessageButton.addEventListener("click", () => {
    sendMessageModal.classList.add("send-message--visible");
    input.focus();
  });

  sendMessageCloseButton.addEventListener("click", function () {
    sendMessageModal.classList.remove("send-message--visible");
    sendMessageButton.focus();
  });

  // console.log([...this.document.querySelectorAll(".modal__close")]);

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
