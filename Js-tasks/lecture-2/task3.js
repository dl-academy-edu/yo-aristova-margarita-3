let userNumber = Number(prompt("Enter the number:", 0));
let userDegree = Number(prompt("Enter the degree:", 0));
let newNumber = 1;

if (Number.isNaN(userNumber) || Number.isNaN(userDegree)) {
  console.log("You must enter numbers!");
} else {
  for (let i = 0; i < userDegree; i++) {
    newNumber *= userNumber;
  }
  console.log("Your new number: ", newNumber);
}
