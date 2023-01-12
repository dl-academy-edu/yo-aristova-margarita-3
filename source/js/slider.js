const slider = document.querySelector(".slider");
const wrapper = document.querySelector(".slider__wrapper");
const innerWrapper = document.querySelector(".slider__inner-wrapper");
const slides = [...document.querySelectorAll(".slider__slide")];
const slidesCount = slides.length;

let activeSlideIndex = 0;
let slideWidth = wrapper.offsetWidth;

slides.forEach((slide) => {
  slide.style.width = `${slideWidth}px`;
});

const setActiveSlide = (index) => {
  if (index < 0 || index > slidesCount) return;
  innerWrapper.style.transform = `translateX(${index * slideWidth}px)`;
};
