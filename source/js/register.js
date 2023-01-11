(function () {
  const registerModal = document.querySelector(".register");
  const registerForm = document.forms.register;
  const registerOpenButton = document.querySelector(".nav__link--register-js");
  const registerCloseButton = registerModal.querySelector(".modal__close");
  const registerButton = registerForm.querySelector(".button--register-js");
  const accept = registerForm.elements.accept;

  interactiveWindow(registerModal, registerOpenButton, registerCloseButton);

  accept.addEventListener("click", () => {
    switchButton(registerButton);
  });

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = registerForm.elements.email;
    const name = registerForm.elements.name;
    const surname = registerForm.elements.surname;
    const password = registerForm.elements.password;
    const passwordRepeat = registerForm.elements.passwordRepeat;
    const location = registerForm.elements.location;
    const age = registerForm.elements.age;

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

    if (!name.value.length) {
      errors.name = "This field is required";
    } else if (name.value.length <= 2) {
      errors.name = "The name must be more than 2 characters";
    } else {
      setSuccessText(name);
    }

    if (!surname.value.length) {
      errors.surname = "This field is required";
    } else if (surname.value.length <= 2) {
      errors.surname = "The name must be more than 2 characters";
    } else {
      setSuccessText(surname);
    }

    if (!password.value.length) {
      errors.password = "This field is required";
    } else if (password.value.length <= 6) {
      errors.password = "The password must be more than 6 characters";
    } else {
      setSuccessText(password);
    }

    if (!passwordRepeat.value.length) {
      errors.passwordRepeat = "This field is required";
    } else if (passwordRepeat.value !== password.value) {
      errors.passwordRepeat = "Your passwords do not match";
    } else {
      setSuccessText(passwordRepeat);
    }

    if (!location.value.length) {
      errors.location = "This field is required";
    } else if (location.value.length <= 3) {
      errors.location = "The location must be more than 3 characters";
    } else {
      setSuccessText(location);
    }

    if (!age.value.length) {
      errors.age = "This field is required";
    } else if (!Number(age.value)) {
      errors.age = "The age must be a number";
    } else {
      setSuccessText(age);
    }

    if (!Object.keys(errors).length) {
      const data = {
        email: email.value,
        name: name.value,
        surname: surname.value,
        password: password.value,
        location: location.value,
        age: age.value,
      };
      console.log(data);
    } else {
      console.log("Validation error");
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = registerForm.elements[key];
        setErrorText(input, messageError);
      });
    }

    // if (!accept.checked) {
    //   errors.accept = "You must agree to sign up";
    // }
  });
})();
