// utils.js
function* cycle(array) {
  if (!Array.isArray(array) || array.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  let index = 0;
  while (true) {
    yield array[index];
    index = (index + 1) % array.length;
  }
}


/*
function cycle(array) {
  return [...array, ...array]; // 단순 순환 예제
}
*/

module.exports = { cycle };