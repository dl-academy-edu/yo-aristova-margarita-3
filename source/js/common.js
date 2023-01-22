const BASE_SERVER_PATH = "https://academy.directlinedev.com";

const sendRequest = ({ url, method = "GET", headers, body = null }) => {
  return fetch(BASE_SERVER_PATH + url + "?v=0.0.1", { method, headers, body });
};

const showMessage = (message, status) => {
  const dialog = document.querySelector(".dialog");
  const closeButton = document.querySelector(".modal__close--js");
  const newMessage = document.querySelector(".modal__message");

  newMessage.innerText = message;
  dialog.classList.add("visible");
  if (status === "success") {
    dialog.classList.add("modal__message--success");
  } else {
    dialog.classList.add("modal__message--invalid");
  }

  closeButton.addEventListener("click", () => {
    dialog.classList.remove("visible");
  });
};

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

const rerenderLinks = () => {
  const loginButton = document.querySelector(".nav__item--login-js");
  const registerButton = document.querySelector(".nav__item--register-js");
  const myProfileButton = document.querySelector(".nav__item--profile-js");
  const myBlogButton = document.querySelector(".nav__item--blog-js");

  const isLogin = localStorage.getItem("token");

  console.log(loginButton);
  console.log(registerButton);
  console.log(myProfileButton);
  console.log(myBlogButton);

  if (isLogin) {
    loginButton.classList.add("hidden");
    registerButton.classList.add("hidden");
    myProfileButton.classList.remove("hidden");
    myBlogButton.classList.remove("hidden");
  } else {
    loginButton.classList.remove("hidden");
    registerButton.classList.remove("hidden");
    myProfileButton.classList.add("hidden");
    myBlogButton.classList.add("hidden");
  }
};
