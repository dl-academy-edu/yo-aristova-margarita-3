(function () {
  const sendMessageModal = document.querySelector(".send-message");
  const dialog = sendMessageModal.querySelector(".dialog");
  const sendMessageForm = document.forms.sendMessage;
  const sendMessageOpenButton = document.querySelector(".footer__button--js");
  const sendMessageCloseButton =
    sendMessageModal.querySelector(".modal__close");
  const sendMessageButton = sendMessageForm.querySelector(
    ".button--send-message-js"
  );
  const accept = sendMessageForm.elements.accept;
  const sendMessageLoader = sendMessageModal.querySelector(".loader--js");
  const inputs = [...sendMessageForm.querySelectorAll("input")];

  interactiveWindow(
    sendMessageModal,
    sendMessageOpenButton,
    sendMessageCloseButton
  );

  accept.addEventListener("click", () => {
    switchButton(sendMessageButton);
  });

  const sendMessage = (event) => {
    event.preventDefault();
    const name = sendMessageForm.elements.name;
    const subject = sendMessageForm.elements.subject;
    const email = sendMessageForm.elements.email;
    const phone = sendMessageForm.elements.phone;
    const message = sendMessageForm.elements.message;

    let errors = {};
    let requiredInputs = [];

    clearForm();

    if (name.value.length <= 2) {
      errors.name = "The name must be more than 2 characters";
    } else {
      setSuccessText(name);
    }

    if (subject.value.length <= 3) {
      errors.subject = "The subject must be more than 3 characters";
    } else {
      setSuccessText(subject);
    }

    if (!isEmailValid(email.value)) {
      errors.email =
        "Please enter a valid email address (your entry is not in the format 'somebody@example.com')";
    } else {
      setSuccessText(email);
    }

    if (!isPhoneValid(phone.value)) {
      errors.phone =
        "Please enter a valid phone (your entry is not in the format '+79999999999')";
    } else {
      setSuccessText(phone);
    }

    inputs.forEach((input) => {
      if (input.hasAttribute("required")) {
        requiredInputs.push(input);
      }
    });

    requiredInputs.forEach((input) => {
      if (!input.value.length) {
        errors[input.name] = "This field is required";
      }
    });

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = sendMessageForm.elements[key];
        setErrorText(input, messageError);
      });
    } else {
      const data = {
        to: email.value,
        body: {
          name: name.value,
          subject: subject.value,
          phone: phone.value,
          message: message.value,
        },
      };
      data.body = JSON.stringify(data.body);
      sendMessageLoader.classList.remove("hidden");
      sendRequest({
        url: "/api/emails",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            showMessage("Your message was successfully send!", "success");
            setTimeout(() => {
              dialog.classList.remove("visible");
            }, 2000);
          } else throw response;
        })
        .catch((error) => {
          showMessage(
            "This email is already subscribed to the mailing list!",
            "error"
          );
          if (error._message) console.log(error._message);
        })
        .finally(() => {
          interactiveModal(sendMessageModal);
          sendMessageLoader.classList.add("hidden");
          sendMessageForm.reset();
          clearForm();
        });
    }
  };

  sendMessageForm.addEventListener("submit", sendMessage);
})();
