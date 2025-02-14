const isPrime = (n) => {
  if (n === 2) return true;
  if (n < 2 || n % 2 === 0) return false;
  
  const limit = Math.sqrt(n);
  for (let i = 2; i <= limit; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

module.exports = {
  isPrime
}