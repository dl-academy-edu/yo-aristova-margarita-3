let userNumber = prompt("Enter the number:", 0);
for (let i = 1; i < userNumber; i++) {
  if (i % 4 !== 0) {
    console.log(i);
  }
}
