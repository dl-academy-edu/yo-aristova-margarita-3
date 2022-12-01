let userNumber = Number(prompt("Enter the number:", 0));
let factorial = 1;
let iterator = 1;

if (Number.isNaN(userNumber)) {
  console.log("It is not a number!");
} else {
  while (iterator <= userNumber) {
    factorial *= iterator;
    iterator++;
  }
  console.log("Factorial: ", factorial);
}
