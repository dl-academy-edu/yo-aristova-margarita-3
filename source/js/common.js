const interactiveModal = (modal) => {
  modal.classList.toggle("visible");
};

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

const setSuccessText = (input) => {
  let messageSuccess = document.createElement("div");
  messageSuccess.classList.add("success");
  input.classList.add("form__input--success");
  messageSuccess.innerText = "All right";
  input.insertAdjacentElement("afterend", messageSuccess);
};

const errorCreator = (message) => {
  let messageError = document.createElement("div");
  messageError.classList.add("invalid");
  messageError.innerText = message;
  return messageError;
};

const setErrorText = (input, message) => {
  const error = errorCreator(message);
  input.classList.add("form__input--invalid");
  input.insertAdjacentElement("afterend", error);
  input.addEventListener(
    "input",
    () => {
      error.remove();
      input.classList.remove("form__input--invalid");
    },
    { once: true }
  );
};

const switchButton = (button) => {
  if (button.disabled) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

const clearForm = (form) => {
  const errorMessages = [...document.querySelectorAll(".invalid")];
  const errorInputs = [...document.querySelectorAll(".form__input--invalid")];
  const successMessages = [...document.querySelectorAll(".success")];

  if (errorMessages) {
    for (let errorMessage of errorMessages) {
      errorMessage.remove();
    }
  }

  if (successMessages) {
    for (let successMessage of successMessages) {
      successMessage.remove();
    }
  }

  if (errorInputs) {
    for (let errorInput of errorInputs) {
      errorInput.classList.remove("form__input--invalid");
    }
  }
};
