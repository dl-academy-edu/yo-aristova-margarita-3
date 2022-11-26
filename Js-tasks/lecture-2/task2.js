let userNumber = prompt("Enter the number:", 0);
let factorial = 1;
let iterator = 1;

while (iterator <= userNumber) {
  factorial *= iterator;
  iterator++;
}

console.log("Factorial: ", factorial);
