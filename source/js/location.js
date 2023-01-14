if (location.search) {
  const filterForm = document.forms.filter;
  const arrayStringParams = location.search.substring(1).split("&");
  const params = [];

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
}
