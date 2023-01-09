(function () {
  const signInModal = document.querySelector(".sign-in");
  const signInOpenButton = document.querySelector(".nav__link--sign-js");
  const signInCloseButton = signInModal.querySelector(".modal__close");
  const signInOverlay = signInModal.querySelector(".overlay");
  const signInForm = this.document.forms.signIn;
  const signInEmailInput = signInForm.elements.signInEmail;
  const signInPasswordInput = signInForm.elements.signInPassword;

  signInOpenButton.addEventListener("click", () => {
    interactiveModal(signInModal);
    signInEmailInput.focus();
  });

  signInCloseButton.addEventListener("click", () => {
    interactiveModal(signInModal);
    signInOpenButton.focus();
  });

  signInOverlay.addEventListener("click", () => {
    interactiveModal(signInModal);
    signInOpenButton.focus();
  });

  clickEscape(signInModal, signInOpenButton);

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
      email: signInEmailInput.value,
      password: signInPasswordInput.value,
    };
    let errors = {};

    if (!isEmailValid(data.email)) {
      errors.email =
        "Please enter a valid email address (your entry is not in the format 'somebody@example.com')";
    } else {
      showCorrectInput(signInEmailInput);
    }

    if (data.password <= 6) {
      errors.password = "The password must be more than 6 characters";
    }

    if (!Object.keys(errors).length) {
      console.log("All right");
    } else {
      console.log("Validation error");
      return;
    }
  });
})();
