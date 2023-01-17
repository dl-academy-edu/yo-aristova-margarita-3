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
    localStorage.setItem("activePage", number);
    updatePage();
    div.classList.add("blog__page-number--active");
    console.log("active page: ", activePage);
  });
  return div;
};

const createPagesNumbers = () => {
  for (let i = 1; i <= pagesArray.length; i++) {
    const number = createPageNumber(i);
    number.innerText = i;
    pagesNumbers.push(number);
    pagination.insertAdjacentElement("beforeend", number);
  }
};

updatePage();
createPage();
createPagesNumbers();

if (activePage === 1) buttonPrev.setAttribute("disabled", "");
if (activePage === pagesArray.length) buttonNext.setAttribute("disabled", "");

const changePage = (direction) => {
  switch (direction) {
    case "prev": {
      if (activePage !== 1) {
        pagesNumbers[activePage - 1].classList.remove(
          "blog__page-number--active"
        );
        pagesNumbers[activePage - 2].classList.add("blog__page-number--active");
        localStorage.setItem("activePage", activePage - 1);
        updatePage();
        buttonNext.removeAttribute("disabled");
      }
      if (activePage === 1) {
        buttonPrev.setAttribute("disabled", "");
      }
      break;
    }
    case "next": {
      if (activePage < pagesArray.length) {
        pagesNumbers[activePage - 1].classList.remove(
          "blog__page-number--active"
        );
        pagesNumbers[activePage].classList.add("blog__page-number--active");
        localStorage.setItem("activePage", activePage + 1);
        updatePage();
        buttonPrev.removeAttribute("disabled");
      }
      if (activePage === pagesArray.length) {
        buttonNext.setAttribute("disabled", "");
      }
      break;
    }
  }
  document.querySelector(".blog__page").remove();
  createPage();
  document.querySelector(".blog__page-number").remove();
  createPagesNumbers();
};

buttonPrev.addEventListener("click", () => {
  changePage("prev");
});

buttonNext.addEventListener("click", () => {
  changePage("next");
});
