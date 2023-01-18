const blogList = document.querySelector(".blog__list");
const panel = document.querySelector(".panel");
const buttonPrev = panel.querySelector(".blog__button--prev-js");
const buttonNext = panel.querySelector(".blog__button--next-js");
const pagination = panel.querySelector(".blog__pagination--js");

const pagesArray = [
  "temporary string 1 to see how it works",
  "temporary string 2 to see how it works",
  "temporary string 3 to see how it works",
];

let activePage;

let pagesNumbers = [];

const updatePage = () => {
  +localStorage.getItem("activePage")
    ? (activePage = +localStorage.getItem("activePage"))
    : (activePage = 1);
};

const setActiveNumber = (index) => {
  if (index < 1 || index > pagesArray.length) return;

  buttonPrev.removeAttribute("disabled");
  buttonNext.removeAttribute("disabled");

  if (index === 1) {
    buttonPrev.setAttribute("disabled", "");
  }

  if (index === pagesArray.length) {
    buttonNext.setAttribute("disabled", "");
  }

  pagesNumbers[activePage - 1].classList.remove("blog__page-number--active");
  pagesNumbers[index - 1].classList.add("blog__page-number--active");
  activePage = index;
};

const createPage = () => {
  const div = document.createElement("div");
  div.classList.add("blog__page");
  div.innerText = activePage ? pagesArray[activePage - 1] : pagesArray[0];
  blogList.insertAdjacentElement("beforeend", div);
};

const createPageNumber = (number) => {
  const div = document.createElement("div");
  div.classList.add("blog__page-number");

  if (number === activePage) {
    div.classList.add("blog__page-number--active");
  }

  div.addEventListener("click", () => {
    setActiveNumber(number);
    localStorage.setItem("activePage", number);
    updatePage();
    document.querySelector(".blog__page").remove();
    createPage();
  });
  return div;
};

const createPagesNumbers = () => {
  for (let i = 1; i <= pagesArray.length; i++) {
    const number = createPageNumber(i);
    number.innerText = i;
    pagesNumbers.push(number);
    console.log(pagesNumbers);
    pagination.insertAdjacentElement("beforeend", number);
  }
};

updatePage();
createPage();
createPagesNumbers();
setActiveNumber(activePage);

buttonPrev.addEventListener("click", () => {
  setActiveNumber(activePage - 1);
  localStorage.setItem("activePage", activePage);
  updatePage();
  document.querySelector(".blog__page").remove();
  createPage();
});

buttonNext.addEventListener("click", () => {
  setActiveNumber(activePage + 1);
  localStorage.setItem("activePage", activePage);
  updatePage();
  document.querySelector(".blog__page").remove();
  createPage();
});
