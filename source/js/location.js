const url = new URL(location.pathname, location.origin);

if (location.search) {
  const filterForm = document.forms.filter;
  const params = {};
  const arrayStringParams = location.search.substring(1).split("&");

  for (let stringParam of arrayStringParams) {
    const param = stringParam.split("=");
    const nameParam = param[0];
    const valueParam = param[1];

    if (nameParam in params) {
      params[nameParam].push(valueParam);
    } else {
      params[nameParam] = [valueParam];
    }
  }

  const updateInput = (inputs, typeParam) => {
    for (let input of inputs) {
      const param = params[typeParam];
      for (let partParam of param) {
        if (partParam === input.value) input.checked = true;
      }
    }
  };

  updateInput(filterForm, "views");
  updateInput(filterForm, "comments");
  updateInput(filterForm, "limit");
  updateInput(filterForm, "sort");

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    url.searchParams.delete("views");
    url.searchParams.delete("comments");
    url.searchParams.delete("limit");
    url.searchParams.delete("sort");

    const addCheckedInput = (nameGroupInputs, typeParam) => {
      for (let checkbox of nameGroupInputs) {
        if (checkbox.checked) url.searchParams.append(typeParam.checkbox.value);
      }
    };

    addCheckedInput(e.target.views, "views");
    addCheckedInput(e.target.comments, "comments");
    addCheckedInput(e.target.limit, "limit");
    addCheckedInput(e.target.sort, "sort");

    history.replaceState(null, "", url);
  });
}

// ------------------- pages part ------------------------------
const blogList = document.querySelector(".blog__tomato");
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

const newActivePage = () => {
  localStorage.setItem("activePage", activePage);
  url.searchParams.delete("page");
  url.searchParams.append("page", activePage);
  history.replaceState(null, "", url);
  updatePage();
  document.querySelector(".blog__page").remove();
  createPage();
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
    newActivePage();
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
setActiveNumber(activePage);

buttonPrev.addEventListener("click", () => {
  setActiveNumber(activePage - 1);
  newActivePage();
});

buttonNext.addEventListener("click", () => {
  setActiveNumber(activePage + 1);
  newActivePage();
});
