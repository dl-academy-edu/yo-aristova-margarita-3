// const registerForm = this.document.forms.register;
// const registerEmailInput = registerForm.elements.registerEmail;
// const registerNameInput = registerForm.elements.registerName;
// const registerSurnameInput = registerForm.elements.registerSurname;
// const registerPasswordInput = registerForm.elements.registerPassword;
// const registerRepeatPasswordInput =
//   registerForm.elements.registerPasswordRepeat;
// const registerLocationInput = registerForm.elements.registerLocation;
// const registerAgeInput = registerForm.elements.registerAge;
const overlayArray = [...this.document.querySelectorAll(".overlay")];
const success = "#03bc3c";
const invalid = "#EB3617";

let statusSubmitMessage = document.createElement("div");
statusSubmitMessage.style.marginTop = "10px";

const clickEscape = (modal, focusButton) => {
  window.addEventListener("keydown", function (event) {
    if (event.code === "Escape" && modal.classList.contains("visible")) {
      interactiveModal(modal);
      focusButton.focus();
    }
  });
};

const isEmailValid = (email) => {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
};

const interactiveModal = (modal) => {
  modal.classList.toggle("visible");
};

const showCorrectInput = (input) => {
  statusSubmitMessage.style.color = success;
  statusSubmitMessage.innerText = "All right";
  input.insertAdjacentElement("afterend", statusSubmitMessage);
};
