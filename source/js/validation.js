window.addEventListener("DOMContentLoaded", function () {
  const emailRegular = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;
  const signInForm = this.document.forms.signIn;
  const emailInput = signInForm.elements.signInEmail;
  const passwordInput = signInForm.elements.signInPassword;

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isEmailValid = emailInput.value.match(emailRegular);

    if (!isEmailValid) {
      console.log("Validation error in email");
      return;
    }
    if (passwordInput.value.length < 6) {
      console.log("Validation error in password");
      return;
    }
    console.log("Validation was successful");
  });
});
