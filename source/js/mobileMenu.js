(function () {
  const mobileMenu = document.querySelector(".header-mobile");
  const openMenuButton = document.querySelector(".menu-button");
  const closeMenuButton = mobileMenu.querySelector(".header-mobile__close");
  const signInModal = document.querySelector(".sign-in");
  const signInOpenButton = mobileMenu.querySelector(".nav__link--sign-js");
  const registerModal = document.querySelector(".register");
  const registerOpenButton = mobileMenu.querySelector(
    ".nav__link--register-js"
  );
  const isLogin = localStorage.getItem("token");

  if (isLogin) {
    rerenderLinks();
  }

  openMenuButton.addEventListener("click", () => {
    mobileMenu.classList.add("header-mobile--visible");
  });

  closeMenuButton.addEventListener("click", () => {
    mobileMenu.classList.remove("header-mobile--visible");
  });

  signInOpenButton.addEventListener("click", () => {
    const firstInput = signInModal.querySelector(".form__input");
    mobileMenu.classList.remove("header-mobile--visible");
    signInModal.classList.toggle("visible");
    console.log("click");
    firstInput.focus();
  });

  registerOpenButton.addEventListener("click", () => {
    const firstInput = registerModal.querySelector(".form__input");
    mobileMenu.classList.remove("header-mobile--visible");
    registerModal.classList.add("visible");
    firstInput.focus();
  });
})();
