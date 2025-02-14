const factorsOf = (n) => {
  let divisor = 2;
  let factors = [];

  while( n > 1) {
    if(divisor > Math.sqrt(n)) {
      factors.push(n);
      break;
    } else if( 0 === ( n % divisor)) {
      factors.push(divisor);
      n /= divisor;
    } else {
      divisor += 1;
    }
  }

  return factors;

};


module.exports = {
  factorsOf,
};