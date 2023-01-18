let xhr = new XMLHttpRequest();

xhr.open("GET", "https://academy.directlinedev.com/api/tags");

xhr.onload = () => {
  console.log(`Загружено ${xhr.status} и ${xhr.response}`);
};

xhr.error = () => {
  console.log(`Ошибка ${xhr.status}`);
};
