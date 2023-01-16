if (location.search) {
  const filterForm = document.forms.filter;
  const params = {};
  const arrayStringParams = location.search.substring(1).split("&");
  const url = new URL(location.pathname, location.origin);

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
  updateInput(filterForm, "show");
  updateInput(filterForm, "sort");

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    url.searchParams.delete("views");
    url.searchParams.delete("comments");
    url.searchParams.delete("show");
    url.searchParams.delete("sort");

    const addCheckedInput = (nameGroupInputs, typeParam) => {
      for (let checkbox of nameGroupInputs) {
        if (checkbox.checked) url.searchParams.append(typeParam.checkbox.value);
      }
    };

    addCheckedInput(e.target.views, "views");
    addCheckedInput(e.target.comments, "comments");
    addCheckedInput(e.target.show, "show");
    addCheckedInput(e.target.sort, "sort");

    history.replaceState(null, "", url);
  });
}
