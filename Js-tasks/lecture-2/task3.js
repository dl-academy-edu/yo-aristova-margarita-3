let userNumber = prompt("Enter the number:", 0);
let userDegree = prompt("Enter the degree:", 0);
let newNumber = 1;

for (let i = 0; i < userDegree; i++) {
  newNumber *= userNumber;
}

console.log("Your new number: ", newNumber);
