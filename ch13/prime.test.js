const { describe, test, expect } = require("@jest/globals");
const fc = require("fast-check");
const { isPrime } = require("./prime"); 
const { factorsOf} = require("./factorial");

describe("factors", () => {
  test("they are all prime", () => {
    fc.assert(
      // gen-input 은 fc.integer 로 대체하였다.
      fc.property(fc.integer({ min: 1, max: 1e9 }), (n) => {
        const factors = factorsOf(n);
        return factors.every(isPrime);
      }),
      { numRuns: 1000 } // 1000번 실행
    );
  });
});
