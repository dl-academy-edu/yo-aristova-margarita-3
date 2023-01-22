(function () {
  const mobileMenu = document.querySelector(".header");
  const openMenuButton = document.querySelector(".menu-button");
  const closeMenuButton = mobileMenu.querySelector(".header__close");
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

  let menuWidth = mobileMenu.offsetWidth;

  if (menuWidth <= 480) {
    openMenuButton.addEventListener("click", () => {
      mobileMenu.classList.add("header--mobile");
    });

    closeMenuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("header--mobile");
    });

    signInOpenButton.addEventListener("click", () => {
      const firstInput = signInModal.querySelector(".form__input");
      mobileMenu.classList.remove("header--mobile");
      signInModal.classList.toggle("visible");
      console.log("click");
      firstInput.focus();
    });

    registerOpenButton.addEventListener("click", () => {
      const firstInput = registerModal.querySelector(".form__input");
      mobileMenu.classList.remove("header--mobile");
      registerModal.classList.add("visible");
      firstInput.focus();
    });
  }
})();
