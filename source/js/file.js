const getFileName = () => {
  const fileInput = document.querySelector(".file__input");
  const label = fileInput.nextElementSibling;

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files;
    const fileName = file[0].name;
    label.innerText = fileName;
  });
};

getFileName();
