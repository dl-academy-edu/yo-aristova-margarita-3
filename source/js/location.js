if (location.search) {
  const filterForm = document.forms.filter;
  const arrayStringParams = location.search.substring(1).split("&");
  const baseUrl = `${location.origin}${location.pathname}`;
  const arrayCheckedInput = [];
  const checkedInputsString = "";
  const params = {};
  const newUrl = "";

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
    const addCheckedInput = (nameGroupInputs, typeParam) => {
      for (let checkbox of nameGroupInputs) {
        if (checkbox.checked) {
          arrayCheckedInput.push(`${typeParam}=${checkbox.value}`);
        }
      }
    };

    addCheckedInput(e.target.views, "views");
    addCheckedInput(e.target.comments, "comments");
    addCheckedInput(e.target.show, "show");
    addCheckedInput(e.target.sort, "sort");

    for ([index, activeInput] of arrayCheckedInput.entries()) {
      checkedInputsString += activeInput;
      if (index != arrayCheckedInput.length - 1) {
        checkedInputsString += "&";
      }
    }

    newUrl = baseUrl + `?${checkedInputsString}`;
    location = newUrl;
  });
}
