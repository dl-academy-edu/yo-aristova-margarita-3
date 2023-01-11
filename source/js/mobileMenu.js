(function () {
  const mobileMenu = document.querySelector(".header-mobile");
  const openMenuButton = document.querySelector(".menu-button");
  const closeMenuButton = mobileMenu.querySelector(".header-mobile__close");

  openMenuButton.addEventListener("click", () => {
    mobileMenu.classList.add("header-mobile--visible");
  });

  closeMenuButton.addEventListener("click", () => {
    mobileMenu.classList.remove("header-mobile--visible");
  });
})();
