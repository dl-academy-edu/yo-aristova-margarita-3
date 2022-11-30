function getAge() {
  const age = prompt("Enter the age: ", 0);
  if (+age < 18) {
    alert(
      `You transferred the number less than 18 (${age}), but you need more!`
    );
    getAge();
  } else {
    alert("Great!");
  }
}

getAge();
