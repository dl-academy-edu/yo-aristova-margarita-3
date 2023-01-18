const slider = document.querySelector(".slider");
const wrapper = slider.querySelector(".slider__wrapper");
const innerWrapper = slider.querySelector(".slider__inner-wrapper");
const slides = [...slider.querySelectorAll(".slider__slide")];
const slidesCount = slides.length;
const buttonPrev = slider.querySelector(".slider__button--prev-js");
const buttonNext = slider.querySelector(".slider__button--next-js");
const pagination = slider.querySelector(".slider__pagination--js");

const animationDuration = 500;

let activeSlideIndex;
let slideWidth = wrapper.offsetWidth;
let dots = [];
let timer = null;
let position = { x: 0 };
let isMouseDown = false;

const initWidth = () => {
  slideWidth = wrapper.offsetWidth;
  slides.forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
  });
};

const setActiveSlide = (index, withAnimation = true) => {
  if (index < 0 || index >= slidesCount) return;
  innerWrapper.style.transform = `translateX(${-1 * index * slideWidth}px)`;

  buttonPrev.removeAttribute("disabled");
  buttonNext.removeAttribute("disabled");

  if (withAnimation) {
    clearTimeout(timer);
    innerWrapper.style.transition = `transform ${animationDuration}ms`;
    timer = setTimeout(() => {
      innerWrapper.style.transition = "";
    }, animationDuration);
  }

  if (index === 0) {
    buttonPrev.setAttribute("disabled", "");
  }

  if (index === slidesCount - 1) {
    buttonNext.setAttribute("disabled", "");
  }

  dots[activeSlideIndex].classList.remove("slider__dot--active");
  dots[index].classList.add("slider__dot--active");
  activeSlideIndex = index;
};

const createDot = (index) => {
  const dot = document.createElement("button");
  dot.classList.add("slider__dot");

  if (index === activeSlideIndex) {
    dot.classList.add("slider__dot--active");
  }

  dot.addEventListener("click", () => {
    setActiveSlide(index);
  });
  return dot;
};

const createDots = () => {
  for (let i = 0; i < slidesCount; i++) {
    const dot = createDot(i);
    dots.push(dot);
    pagination.insertAdjacentElement("beforeend", dot);
  }
};

const endMouseEvent = (event) => {
  if (!isMouseDown) return;
  isMouseDown = false;
  if (position.x > event.clientX) {
    setActiveSlide(activeSlideIndex + 1);
  } else {
    setActiveSlide(activeSlideIndex - 1);
  }
};

const updateSlider = () => {
  +localStorage.getItem("activeSlideIndex")
    ? (activeSlideIndex = +localStorage.getItem("activeSlideIndex"))
    : (activeSlideIndex = 0);
};

wrapper.addEventListener("mousedown", (event) => {
  position.x = event.clientX;
  isMouseDown = true;
});

wrapper.addEventListener("mouseup", endMouseEvent);
wrapper.addEventListener("mouseout", endMouseEvent);

initWidth();
createDots();

updateSlider();
setActiveSlide(activeSlideIndex);

window.addEventListener("resize", () => {
  initWidth();
  setActiveSlide(activeSlideIndex, false);
});

buttonPrev.addEventListener("click", () => {
  setActiveSlide(activeSlideIndex - 1);
  localStorage.setItem("activeSlideIndex", activeSlideIndex);
  updateSlider();
});

buttonNext.addEventListener("click", () => {
  setActiveSlide(activeSlideIndex + 1);
  localStorage.setItem("activeSlideIndex", activeSlideIndex);
  updateSlider();
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    setActiveSlide(activeSlideIndex - 1);
    localStorage.setItem("activeSlideIndex", activeSlideIndex);
    updateSlider();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    setActiveSlide(activeSlideIndex + 1);
    localStorage.setItem("activeSlideIndex", activeSlideIndex);
    updateSlider();
  }
});
