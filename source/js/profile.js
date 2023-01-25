(function () {
  const dialog = document.querySelector(".dialog");
  const profileImage = document.querySelector(".profile__image");
  const profileName = document.querySelector(".profile__name");
  const profileSurname = document.querySelector(".profile__surname");
  const profileEmail = document.querySelector(".profile__email");
  const profileLocation = document.querySelector(".profile__location");
  const profileAge = document.querySelector(".profile__age");

  const openButtonEditingData = document.querySelector(
    ".profile__button--data-js"
  );
  const editingDataModal = document.querySelector(".editing-data");
  const editingDataForm = document.forms.editingData;
  const closeButtonEditingData =
    editingDataModal.querySelector(".modal__close");

  const openButtonEditingPassword = document.querySelector(
    ".profile__button--password-js"
  );
  const editingPasswordModal = document.querySelector(".editing-password");
  const editingPasswordForm = document.forms.editingPassword;
  const closeButtonEditingPassword =
    editingPasswordModal.querySelector(".modal__close");
  const deleteProfileButton = document.querySelector(
    ".profile__button--delete-js"
  );

  const modalLoader = document.querySelector(".loader--js");
  const dataFormInputs = [...editingDataForm.querySelectorAll("input")];
  const passwordFormInputs = [...editingPasswordForm.querySelectorAll("input")];

  let profile = null;

  const renderProfile = () => {
    profileImage.src = BASE_SERVER_PATH + profile.photoUrl;
    profileName.innerText = profile.name;
    profileSurname.innerText = profile.surname;
    profileEmail.innerText = profile.email;
    profileLocation.innerText = profile.location;
    profileAge.innerText = profile.age;
  };

  const getProfile = () => {
    sendRequest({
      url: `/api/users/${localStorage.getItem("userId")}`,
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          profile = response.data;
          renderProfile();
        } else {
          location.pathname = "/";
        }
      })
      .catch((error) => {
        if (error._message) console.log(error._message);
        console.log(error);
      });
  };

  const changeData = (event) => {
    event.preventDefault();
    const email = editingDataForm.elements.email;
    const name = editingDataForm.elements.name;
    const surname = editingDataForm.elements.surname;
    const location = editingDataForm.elements.location;
    const age = editingDataForm.elements.age;

    let errors = {};
    let requiredInputs = [];

    clearForm();

    if (!isEmailValid(email.value)) {
      errors.email =
        "Please enter a valid email address (your entry is not in the format 'somebody@example.com')";
    } else {
      setSuccessText(email);
    }

    if (name.value.length <= 2) {
      errors.name = "The name must be more than 2 characters";
    } else {
      setSuccessText(name);
    }
    if (surname.value.length <= 2) {
      errors.surname = "The name must be more than 2 characters";
    } else {
      setSuccessText(surname);
    }

    if (location.value.length <= 3) {
      errors.location = "The location must be more than 3 characters";
    } else {
      setSuccessText(location);
    }

    if (!Number(age.value)) {
      errors.age = "The age must be a number";
    } else {
      setSuccessText(age);
    }

    dataFormInputs.forEach((input) => {
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
        const input = editingDataForm.elements[key];
        setErrorText(input, messageError);
      });
    } else {
      const data = new FormData(editingDataForm);
      modalLoader.classList.remove("hidden");
      sendRequest({
        url: "/api/users",
        method: "PUT",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        body: data,
      })
        .then((response) => {
          if (response.status === "401" || response.status === "403") {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            location.pathname = "/";
            return;
          }
          return response.json();
        })
        .then((response) => {
          if (response.success) {
            profile = response.data;
            showMessage("Form has been sent successfully!", "success");
            renderProfile();
            setTimeout(() => {
              dialog.classList.remove("visible");
            }, 2000);
          } else throw response;
        })
        .catch((error) => {
          showMessage(
            "The form was sent but the server transmits an error!",
            "error"
          );
          if (error._message) console.log(error._message);
        })
        .finally(() => {
          interactiveModal(editingDataModal);
          modalLoader.classList.add("hidden");
          clearForm();
          editingDataForm.reset();
        });
    }
  };

  const changePassword = (event) => {
    event.preventDefault();
    const newPassword = editingPasswordForm.elements.newPassword;
    const newPasswordRepeat = editingPasswordForm.elements.newPasswordRepeat;

    let errors = {};
    let requiredInputs = [];

    clearForm();

    if (newPassword.value.length <= 6) {
      errors.newPassword = "The password must be more than 6 characters";
    } else {
      setSuccessText(newPassword);
    }

    if (newPasswordRepeat.value !== newPassword.value) {
      errors.newPasswordRepeat = "Your passwords do not match";
    } else {
      setSuccessText(newPasswordRepeat);
    }

    passwordFormInputs.forEach((input) => {
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
        const input = editingPasswordForm.elements[key];
        setErrorText(input, messageError);
      });
    } else {
      const data = new FormData(editingPasswordForm);
      modalLoader.classList.remove("hidden");
      sendRequest({
        url: "/api/users",
        method: "PUT",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        body: data,
      })
        .then((response) => {
          if (response.status === "401" || response.status === "403") {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            location.pathname = "/";
            return;
          }
          return response.json();
        })
        .then((response) => {
          if (response.success) {
            profile = response.data;
            showMessage("Form has been sent successfully!", "success");
            setTimeout(() => {
              dialog.classList.remove("visible");
            }, 2000);
          } else {
            throw response;
          }
        })
        .catch((error) => {
          showMessage("Ups! Something went wrong!", "error");
          if (error._message) console.log(error._message);
        })
        .finally(() => {
          interactiveModal(editingPasswordModal);
          modalLoader.classList.add("hidden");
          clearForm();
          editingPasswordForm.reset();
        });
    }
  };

  const deleteProfile = (event) => {
    event.preventDefault();

    sendRequest({
      url: `/api/users/${localStorage.getItem("userId")}`,
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === "401" || response.status === "403") {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          location.pathname = "/";
          return;
        }
        return response.json();
      })
      .then((response) => {
        if (response.success) {
          showMessage("Your profile has been deleted successfully!", "success");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setTimeout(() => {
            location.pathname = "/";
          }, 2000);
        } else {
          throw response;
        }
      })
      .catch((error) => {
        showMessage("Ups! Something went wrong!", "error");
        if (error._message) console.log(error._message);
      });
  };

  getProfile();

  openButtonEditingData.addEventListener("click", () => {
    editingDataForm.name.value = profile.name;
    editingDataForm.surname.value = profile.surname;
    editingDataForm.email.value = profile.email;
    editingDataForm.location.value = profile.location;
    editingDataForm.age.value = profile.age;
    interactiveModal(editingDataModal);
  });

  closeButtonEditingData.addEventListener("click", () => {
    interactiveModal(editingDataModal);
  });

  window.addEventListener("keydown", (event) => {
    if (
      event.code === "Escape" &&
      editingDataModal.classList.contains("visible")
    ) {
      interactiveModal(editingDataModal);
      openButtonEditingData.focus();
    }
  });

  openButtonEditingPassword.addEventListener("click", () => {
    editingPasswordForm.oldPassword.value = profile.password;
    oldPassword.setAttribute("readonly", "readonly");
    interactiveModal(editingPasswordModal);
  });

  closeButtonEditingPassword.addEventListener("click", () => {
    interactiveModal(editingPasswordModal);
  });

  window.addEventListener("keydown", (event) => {
    if (
      event.code === "Escape" &&
      editingPasswordModal.classList.contains("visible")
    ) {
      interactiveModal(editingPasswordModal);
      openButtonEditingPassword.focus();
    }
  });

  deleteProfileButton.addEventListener("click", deleteProfile);

  editingDataForm.addEventListener("submit", changeData);

  editingPasswordForm.addEventListener("submit", changePassword);
})();
