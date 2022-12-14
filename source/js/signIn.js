(function () {
  const signInModal = document.querySelector(".sign-in");
  const signInOpenButton = document.querySelector(".nav__link--sign-js");
  const signInCloseButton = signInModal.querySelector(".modal__close");
  const signInForm = document.forms.signIn;

  interactiveWindow(signInModal, signInOpenButton, signInCloseButton);

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = signInForm.elements.email;
    const password = signInForm.elements.password;

    let errors = {};

    clearForm();

    if (!email.value.length) {
      errors.email = "This field is required";
    } else if (!isEmailValid(email.value)) {
      errors.email =
        "Please enter a valid email address (your entry is not in the format 'somebody@example.com')";
    } else {
      setSuccessText(email);
    }

    if (!password.value.length) {
      errors.password = "This field is required";
    } else if (password.value.length <= 6) {
      errors.password = "The password must be more than 6 characters";
    } else {
      setSuccessText(password);
    }

    if (!Object.keys(errors).length) {
      const data = {
        email: email.value,
        password: password.value,
      };
      console.log(data);
    } else {
      console.log("Validation error");
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = signInForm.elements[key];
        setErrorText(input, messageError);
      });
    }
  });
})();
