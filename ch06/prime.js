/*


function primeFactorsOf (n)  {
  return [];
}



function primeFactorsOf (n)  {
  return (n > 1) ? [n] : [];
}


function primeFactorsOf(n) {
  if (n > 1) {
    if (n % 2 === 0) {
      return [2, ...primeFactorsOf(n / 2)];
    }
    return [n];
  }
  return [];
}





function primeFactorsOf(n) {
  if (n > 1) {
    if (n % 2 === 0) {
      return [2, ...primeFactorsOf(n / 2)];
    } else if (n % 3 === 0) {
      return [3, ...primeFactorsOf(n / 3)];
    }
    return [n];
  }
  return [];
}

*/

function primeFactorsOf(n) {
  function helper(n, divisor, factors) {
    if (n > 1) {
      if (n % divisor === 0) {
        return helper(Math.floor(n / divisor), divisor, [...factors, divisor]);
      } else {
        return helper(n, divisor + 1, factors);
      }
    }
    return factors;
  }

  return helper(n, 2, []);
}

module.exports = {
  primeFactorsOf,
}