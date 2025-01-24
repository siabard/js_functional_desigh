/*
 
(declare fib)

(defn fib-w [n] 
  (cond
    (< n 1) nil
    (<= n 2) 1
    :else (+ (fib (dec n)) (fib (- n 2)))))
	
(def fib (memoize fib-w))

(defn lazy-fibs []
  (map fib (rest (range))))

 */

// 피보나치 함수의 메모이제이션을 저장할 변수 선언 
let fib;

// 피보나치 계산을 위한 헬퍼 함수
function fibW(n) {
  if (n < 1) {
    return null;
  } else if (n <= 2) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

// 메모이제이션 함수
function memoize(fn) {
  const cache = new Map();
  return function (n) {
    if (cache.has(n)) {
      return cache.get(n); // 캐시된 결과를 반환한다.
    }
    const result = fn(n);
    cache.set(n, result); // 결과를 캐시에 저장한다.
    return result;
  };
}

// 메모이제이션 된 fibW 버전을 fib 에 저장한다.
fib = memoize(fibW);

// 지연 연산을 위해 제너레이터 함수를 사용한다.
function* lazyFibs() {
  let n = 1;
  while (true) {
    yield fib(n);
    n += 1;
  }
}

// 사용법
const fibs = lazyFibs();
console.log([...Array(10)].map(() => fibs.next().value)); // 처음 10개 피보나치 수
console.log([...Array(20)].map(() => fibs.next().value)); // 다음 20개 피보나치 수
