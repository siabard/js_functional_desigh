/* 


(declare fib)

(defn fib-w [n] 
  (cond
    (< n 1) nil
    (<= n 2) 1
    :else (+ (fib (dec n)) (fib (- n 2)))))
	
(def fib (memoize fib-w))


*/
function fib_w(n) {
  if (n < 1) {
    return null;
  } else if (n <= 2) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

// 메모이제이션 헬퍼함수
function memoize(fn) {
  const cache = new Map();
  return function (n) {
    if (cache.has(n)) {
      return cache.get(n); // 주어진 인수값에 해당하는 캐시값을 반환
    }
    const result = fn(n);
    cache.set(n, result); // 주어진 인수값에 대한 결과를 캐시에 저장
    return result;
  };
}

const fib = memoize(fib_w);

console.log(fib(3));
console.log(fib(5));
console.log(fib(11));
console.log(fib(50));