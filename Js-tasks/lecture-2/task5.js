let rand = Math.floor(1 + Math.random() * 10);

while (true) {
  let userNumber = Number(prompt("Enter the number:", 0));
  if (userNumber === rand) break;
}

console.log("You win!");
