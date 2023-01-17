const interactiveModal = (modal) => {
  modal.classList.toggle("visible");
};

const interactiveWindow = (modal, openButton, closeButton) => {
  const overlay = modal.querySelector(".overlay");

  openButton.addEventListener("click", () => {
    const firstInput = modal.querySelector(".form__input");
    interactiveModal(modal);
    firstInput.focus();
  });

  closeButton.addEventListener("click", () => {
    interactiveModal(modal);
    openButton.focus();
  });

  overlay.addEventListener("click", () => {
    interactiveModal(modal);
    openButton.focus();
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("visible")) {
      interactiveModal(modal);
      openButton.focus();
    }
  });
};

const hoverButton = (form) => {
  const personal = form.querySelector(".form__personal");
  const button = form.querySelector(".form__button");

  personal.addEventListener("mouseover", () => {
    button.classList.toggle("form__button--hover");
    button.disabled = false;
  });

  personal.addEventListener("mouseout", () => {
    button.classList.toggle("form__button--hover");
    button.disabled = true;
  });
};

const switchButton = (button) => {
  if (button.disabled) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

const isEmailValid = (email) => {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
};

const isPhoneValid = (phone) => {
  return phone.match(/^((\+7|7|8)+([0-9]){10})$/i);
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

const clearForm = () => {
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
