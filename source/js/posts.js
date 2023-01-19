const SERVER_URL = "https://academy.directlinedev.com";
const LIMIT = 9;
const loader = document.querySelector(".loader--js");

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

const getParamsFromLocation = () => {
  let searchParams = new URLSearchParams(location.search);

  return {
    page: searchParams.get("page") || "",
    tags: searchParams.getAll("tags"),
    sort: searchParams.getAll("sort"),
  };
};

const setDataToFilter = (data) => {
  const filterForm = document.forms.filter;
  filterForm.elements.tags.forEach((checkbox) => {
    checkbox.checked = data.tags.includes(checkbox.value);
  });
  filterForm.elements.sort.forEach((radio) => {
    radio.checked = data.sort === radio.value;
  });
};

const createPost = (title, text, src, tags) => {
  return `
  <div>
    <div class="post">
      <img scr="${SERVER_URL}${src}" alt="${title}">
      <div class="post__body">
        <h3 class="post__title">${title}</h3>
        <p class="info">${text}</p>
        ${tags.map(
          (tag) => `<span style="color: ${tag.color}">${tag.name}</span>`
        )}
      </div>
    </div>
  </div>
  `;
};

const getData = (params) => {
  const result = document.querySelector(".blog__list");

  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  let filter = {};

  console.log("params: ", params);

  searchParams.set("v", "1.0.0");

  if (params.tags && Array.isArray(params.tags) && params.tags.lenght) {
    searchParams.set("tags", JSON.stringify(params.tags));
  }

  if (params.page) {
    console.log("hello");
    filter.page = params.page;
    console.log(filter);
  }

  searchParams.set("filter", JSON.stringify(params.filter));

  if (params.sort) {
    searchParams.set("sort", JSON.stringify([params.sort, "DESC"]));
  }

  xhr.open("GET", SERVER_URL + "/api/posts?" + searchParams.toString());
  xhr.send();
  result.innerHTML = "";

  // showLoader();

  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    response.data.forEach((card) => {
      const post = createPost({
        title: card.title,
        text: card.text,
        src: card.photo.desktopPhotoUrl,
        tags: card.tags,
      });
      result.insertAdjacentHTML("beforeend", card);
    });
    // hideLoader();
  };

  xhr.error = () => {
    console.log(`Ошибка ${xhr.status}`);
  };
};

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
      page: 1,
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
  // showLoader();

  xhr.onload = () => {
    const tags = JSON.parse(xhr.response).data;
    const tagsBox = document.querySelector(".tags--js");
    tags.forEach((tag) => {
      tagHTML = createTag(tag);
      tagsBox.insertAdjacentHTML("beforeend", tagHTML);
    });
    const params = getParamsFromLocation();
    setDataToFilter(params);
    getData(params);
    // hideLoader();
  };

  xhr.error = () => {
    console.log(`Ошибка ${xhr.status}`);
  };
})();
