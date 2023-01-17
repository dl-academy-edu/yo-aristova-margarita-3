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

const updatePages = () => {
  +localStorage.getItem("activePage")
    ? (activePage = +localStorage.getItem("activePage"))
    : (activePage = 1);
};

const createPage = () => {
  const div = document.createElement("div");
  div.classList.add("blog__page");
  div.innerText = activePage ? pagesArray[activePage - 1] : pagesArray[0];
  blogList.insertAdjacentElement("beforeend", div);
};

const createPageNumber = () => {
  const div = document.createElement("div");
  div.classList.add("blog__page-number");
  div.innerText = activePage ? activePage : "1";
  pagination.insertAdjacentElement("beforeend", div);
};

updatePages();
createPage();
createPageNumber();

if (activePage === 1) buttonPrev.setAttribute("disabled", "");
if (activePage === pagesArray.length) buttonNext.setAttribute("disabled", "");
