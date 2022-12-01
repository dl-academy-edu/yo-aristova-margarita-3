function addCreator(numberOne) {
  return function addNumbers(numberTwo) {
    return numberOne + numberTwo;
  };
}

const add = addCreator(5);
console.log(add(5));
console.log(addCreator(1)(3));
