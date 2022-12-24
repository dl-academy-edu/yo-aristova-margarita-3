const registerForm = this.document.forms.register;
const registerEmailInput = registerForm.elements.registerEmail;
const registerNameInput = registerForm.elements.registerName;
const registerSurnameInput = registerForm.elements.registerSurname;
const registerPasswordInput = registerForm.elements.registerPassword;
const registerRepeatPasswordInput =
  registerForm.elements.registerPasswordRepeat;
const registerLocationInput = registerForm.elements.registerLocation;
const registerAgeInput = registerForm.elements.registerAge;

const isEmailValid = (email) => {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
};

// Sign in
(function () {
  const signInForm = this.document.forms.signIn;
  const signInEmailInput = signInForm.elements.signInEmail;
  const signInPasswordInput = signInForm.elements.signInPassword;
  let statusSubmitMessage = document.createElement("div");

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
      statusSubmitMessage.style.color = "#03BC3C";
      statusSubmitMessage.innerText = "All right";
      signInEmailInput.insertAdjacentElement("beforeend", statusSubmitMessage);
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

    console.log(statusSubmitMessage);

    // let isEmailValid = signInEmailInput.value.match(emailRegular);
    // let isPasswordValid;
    // let statusSubmitMessage = document.createElement("div");

    // if (signInPasswordInput.value.length > 6) {
    //   isPasswordValid = true;
    // } else {
    //   isPasswordValid = false;
    // }

    // if (isEmailValid && isPasswordValid) {
    //   statusSubmitMessage.style.color = "#03BC3C";
    //   statusSubmitMessage.innerText = "All right";
    //   signInForm.insertAdjacentElement("beforeend", statusSubmitMessage);
    // } else {
    //   statusSubmitMessage.style.color = "#EB3617";
    //   statusSubmitMessage.innerText = "Validation error";
    //   signInForm.insertAdjacentElement("beforeend", statusSubmitMessage);
    // }
  });
})();
