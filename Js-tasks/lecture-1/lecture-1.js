const myName = "Margo";
let myAge = 45;
let bigInt = 123456789n;
let isAdult = true;
let list = null;
let myCountry = undefined;
let id = Symbol("id");
let myAddress = {
  city: "Tolyatti",
  district: false,
};

console.log(String(myName), Number(myName), Boolean(myName));
console.log(String(myAge), Number(myAge), Boolean(myAge));
console.log(String(bigInt), Number(bigInt), Boolean(bigInt));
console.log(String(isAdult), Number(isAdult), Boolean(isAdult));
console.log(String(list), Number(list), Boolean(list));
console.log(String(myCountry), Number(myCountry), Boolean(myCountry));
console.log(String(myAddress), Number(myAddress), Boolean(myAddress));
console.log(String(id), Number(id), Boolean(id));
