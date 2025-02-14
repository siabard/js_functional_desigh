const { factorsOf } = require('./factorial');
const { describe, test, expect } = require("@jest/globals");
const fc = require("fast-check");

const power2 = (n) => {
  return BigInt(2) ** BigInt(n);
};



describe("factor primes", () => {
  test("factors 1 -> []", () => {
    expect(factorsOf(1)).toEqual([]);
  });

  test("factors 2 -> [2]", () => {
    expect(factorsOf(2)).toEqual([2]);
  });

  test("factors 3 -> [3]", () => {
    expect(factorsOf(3)).toEqual([3]);
  });

  test("factors 4 -> [2, 2]", () => {
    expect(factorsOf(4)).toEqual([2, 2]);
  });

  test("factors 5 -> [5]", () => {
    expect(factorsOf(5)).toEqual([5]);
  });

  test("factors 6 -> [2, 3]", () => {
    expect(factorsOf(6)).toEqual([2, 3]);
  });

  test("factors 7 -> [7]", () => {
    expect(factorsOf(7)).toEqual([7]);
  });

  test("factors 8 -> [2, 2, 2]", () => {
    expect(factorsOf(8)).toEqual([2, 2, 2]);
  });

  test("factors 9 -> [3, 3]", () => {
    expect(factorsOf(9)).toEqual([3, 3]);
  });

  test("factors lots", () => {
    expect(factorsOf(2 * 2 * 3 * 3 * 5 * 7 * 11 * 11 * 13)).toEqual([2, 2, 3, 3, 5, 7, 11, 11, 13]);
  });

  test("factors Euler 3", () => {
    expect(factorsOf(600851475143)).toEqual([71, 839, 1471, 6857]);
  });

  test("factors mersenne 2^31-1", () => {
    expect(factorsOf(Number(power2(31n) - 1n))).toEqual([2147483647]);
  });
});


describe("properties", () => {
  test("multiplies out properly", () => {
    fc.assert(
      // gen-input 은 fc.integer 로 대체하였다.
      fc.property(fc.integer({ min: 1, max: 1e9 }), (n) => {
        const factors = factorsOf(n);
        return n === factors.reduce((a, b) => a * b, 1);
      }),
      { numRuns: 1000 } // 1000번 테스트 실행
    );
  });
});