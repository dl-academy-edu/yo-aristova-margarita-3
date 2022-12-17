window.addEventListener("DOMContentLoaded", function () {
  // const signInButton = document.querySelector(".sign-in-button");
  // const signInModal = document.querySelector(".sign-in");
  // const input = document.querySelector(".form__input");
  // const closeButton = document.querySelector(".modal__close");
  // const overlay = document.querySelector(".modal__overlay");
  // signInButton.addEventListener("click", function () {
  //   signInModal.classList.toggle("sign-in--visible");
  //   input.focus();
  // });
  // closeButton.addEventListener("click", function () {
  //   signInModal.classList.toggle("sign-in--visible");
  //   signInButton.focus();
  // });
  // overlay.addEventListener("click", function () {
  //   signInModal.classList.toggle("sign-in--visible");
  //   signInButton.focus();
  // });
  // window.addEventListener("keydown", function (event) {
  //   if (
  //     event.code === "Escape" &&
  //     signInModal.classList.contains("sign-in--visible")
  //   ) {
  //     signInModal.classList.toggle("sign-in--visible");
  //     signInButton.focus();
  //   }
  // });

  const openMenuButton = this.document.querySelector(".menu-button");
  const mobileMenu = this.document.querySelector(".header-mobile");
  const closeMenuButton = this.document.querySelector(".header-mobile__close");

  openMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("header-mobile--visible");
  });

  closeMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("header-mobile--visible");
  });
});
