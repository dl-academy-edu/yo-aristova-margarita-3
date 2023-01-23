(function () {
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
  const modalLoader = document.querySelector(".loader--js");

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

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = editingDataForm.elements[key];
        setErrorText(input, messageError);
      });
    } else {
      const data = new FormData(editingDataForm);
      // modalLoader.classList.remove("hidden");
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
            renderProfile();
            showMessage("Form has been sent successfully!", "success");
          } else throw response;
        })
        .catch((error) => {
          if (error._message) console.log(error._message);
        })
        .finally(() => {
          interactiveModal(editingDataModal);
          // modalLoader.classList.add("hidden");
          clearForm();
        });
    }
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

  editingDataForm.addEventListener("submit", changeData);
})();
