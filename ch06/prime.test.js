const { primeFactorsOf } = require('./prime');

describe('Prime Factors', () => {
  test('should return none for 1', () => {
    expect(primeFactorsOf(1)).toEqual([]);
  });
  test('should return [2] for [2]', () => {
    expect(primeFactorsOf(2)).toEqual([2]);
  });

  test('should return [2] for [2]', () => {
    expect(primeFactorsOf(2)).toEqual([2]);
  });
  test('should return [3] for [3]', () => {
    expect(primeFactorsOf(3)).toEqual([3]);
  });
  test('should return [2] for 4', () => {
    expect(primeFactorsOf(4)).toEqual([2, 2]);
  });

  test('prime-factors-of 5', () => {
    expect(primeFactorsOf(5)).toEqual([5]);
  });

  test('prime-factors-of 6', () => {
    expect(primeFactorsOf(6)).toEqual([2, 3]);
  });

  test('prime-factors-of 7', () => {
    expect(primeFactorsOf(7)).toEqual([7]);
  });

  test('prime-factors-of 8', () => {
    expect(primeFactorsOf(8)).toEqual([2, 2, 2]);
  });

});