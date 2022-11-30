// Эти функции являются чистыми, так как они не используют глобальные переменные и ничего не выводят на экран

function add(numberOne, numberTwo) {
  return numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
  return numberOne - numberTwo;
}

function devide(numberOne, numberTwo) {
  return numberOne / numberTwo;
}

function multiply(numberOne, numberTwo) {
  return numberOne * numberTwo;
}

console.log("Sum: ", add(7, 5));
console.log("Difference: ", subtract(7, 5));
console.log("Division: ", devide(7, 5));
console.log("Multiplication: ", multiply(7, 5));
