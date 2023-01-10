(function () {
  const registerModal = document.querySelector(".register");
  const registerForm = document.forms.register;
  const registerOpenButton = document.querySelector(".nav__link--register-js");
  const registerCloseButton = registerModal.querySelector(".modal__close");
  const registerOverlay = registerModal.querySelector(".overlay");
  const input = registerForm.querySelector(".form__input");

  registerOpenButton.addEventListener("click", () => {
    interactiveModal(registerModal);
    input.focus();
  });

  registerCloseButton.addEventListener("click", () => {
    interactiveModal(registerModal);
    registerOpenButton.focus();
  });

  registerOverlay.addEventListener("click", () => {
    interactiveModal(registerModal);
    registerOpenButton.focus();
  });

  clickEscape(registerModal, registerOpenButton);

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = registerForm.elements.email;
    const name = registerForm.elements.name;
    const surname = registerForm.elements.surname;
    const password = registerForm.elements.password;
    const passwordRepeat = registerForm.elements.passwordRepeat;
    const location = registerForm.elements.location;
    const age = registerForm.elements.age;
    const accepnt = registerForm.elements.accepnt;

    let errors = {};

    if (!accepnt.checked) {
      errors.accepnt = "You must agree to register";
      console.log("you must agree to register");
    }
  });
})();
