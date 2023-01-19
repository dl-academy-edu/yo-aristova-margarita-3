const SERVER_URL = "https://academy.directlinedev.com";
const LIMIT = 9;
const loader = document.querySelector(".loader--js");
console.log(loader);

let loaderCount = 0;

const showLoader = () => {
  loaderCount++;
  loader.classList.remove("hidden");
};

const hideLoader = () => {
  loaderCount--;
  if (loaderCount <= 0) {
    loader.classList.add("hidden");
    loaderCount = 0;
  }
};

const createTag = ({ id, color }) => {
  color = color.substring(1, 7);
  return `
  <div>
  <input name="tags" type="checkbox" id="tags-${id}" value="${id}" class="checkbox checkbox--${color}" />
  <label for="tags-${id}"></label>
  </div>`;
};

const getParamsFromLocation = () => {};

// (function () {
//   const filterForm = document.forms.filter;
//   filterForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     let data = {
//       page: 0,
//     };
//     data.tags = [...filterForm.elements.tags];
//     .filter(checkbox => checkbox.checked);
//     .map(checkbox => checkbox.value);
//     data.sort = ([...filterForm.elements.sort]
//       .find(radio => radio.checked) || {value: null}).value;
//       getData(data);
//       setSearchParams(data);

//   });
// })();

(function () {
  const filterForm = document.forms.filter;
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = {
      page: 0,
    };
    // data.name = filterForm.elements.name.value;
    data.sort = (
      [...filterForm.elements.sort].find((radio) => radio.checked) || {
        value: null,
      }
    ).value;
  });

  let xhr = new XMLHttpRequest();

  xhr.open("GET", SERVER_URL + "/api/tags");
  xhr.send();
  showLoader();

  xhr.onload = () => {
    const tags = JSON.parse(xhr.response).data;
    console.log(tags);
    const tagsBox = document.querySelector(".tags--js");
    tags.forEach((tag) => {
      tagHTML = createTag(tag);
      tagsBox.insertAdjacentHTML("beforeend", tagHTML);
    });
    const params = getParamsFromLocation();
    // setDataToFilter(params);
    // getData(params);
    hideLoader();
  };

  xhr.error = () => {
    console.log(`Ошибка ${xhr.status}`);
  };
})();
