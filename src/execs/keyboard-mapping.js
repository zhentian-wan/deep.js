const mapping = [
  ,
  ,
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["j", "k", "l"],
  ["m", "n", "o"],
  ["p", "q", "r", "s"],
  ["t", "u", "v"],
  ["w", "x", "y", "z"],
];

const compose = (arr1, arr2) => {
  if (arr1.length === 0) {
    return arr2;
  }
  if (arr2.length === 0) {
    return arr1;
  }
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push(arr1[i] + arr2[j]);
    }
  }
  return result;
};

function keyboardMap(digits) {
  return digits
    .split("")
    .map((i) => mapping[+i])
    .reduce((acc, curr) => compose(acc, curr), []);
}

console.log(keyboardMap("23"));
