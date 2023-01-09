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
    const email = registerForm.elements.registerEmail;
    const name = registerForm.elements.registerName;
    const surname = registerForm.elements.registerSurname;
    const password = registerForm.elements.registerPassword;
    const passwordRepeat = registerForm.elements.registerPasswordRepeat;
    const location = registerForm.elements.registerLocation;
    const age = registerForm.elements.registerAge;
    const accepnt = registerForm.elements.registerAccepnt;
    const data = {
      email: email.value,
      password: password.value,
    };
    let errors = {};
  });
})();
