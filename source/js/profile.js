(function () {
  const profileImage = document.querySelector(".profile__image");
  const profileName = document.querySelector(".profile__name");
  const profileSurname = document.querySelector(".profile__surname");
  const profileEmail = document.querySelector(".profile__email");
  const profileLocation = document.querySelector(".profile__location");
  const profileAge = document.querySelector(".profile__age");

  // добавить потом лоадер
  let loaderCount = 0;

  const renderProfile = (profile) => {
    // profileImage.style.backgroundImage = `url(${BASE_SERVER_PATH + profile.photoUrl})`;
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
          console.log(response);
          renderProfile(response.data);
        } else {
          location.pathname = "/";
        }
      })
      .catch((error) => {
        if (error._message) console.log(error._message);
        console.log(error);
      });
  };

  getProfile();
})();
