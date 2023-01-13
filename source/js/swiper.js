const swiper = new Swiper(".swiper", {
  loop: true,

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  navigation: {
    nextEl: ".portfolio__button--next",
    prevEl: ".portfolio__button--prev",
  },

  effect: "coverflow",
});
