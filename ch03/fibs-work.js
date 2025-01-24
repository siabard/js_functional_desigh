function fibsWork(n, i, fs) {
  if (i === n) {
    return fs;
  } else {
    const nextValue = fs.slice(-2).reduce((a, b) => a + b, 0);
    return fibsWork(n, i + 1, [...fs, nextValue]);
  }
}

function fibs(n) {
  if (n < 1) {
    return [];
  } else if (n === 1) {
    return [1];
  } else {
    return fibsWork(n, 2, [1, 1]);
  }
}
