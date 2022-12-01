let userNumber = Number(prompt("Enter the number:", 0));

if (Number.isNaN(userNumber)) {
  console.log("It is not a number!");
} else {
  for (let i = 1; i < userNumber; i++) {
    if (i % 4 !== 0) {
      console.log(i);
    }
  }
}
