/*
(defn fib [n]
  (cond
    (< n 1) nil
    (<= n 2) 1
    :else (+ (fib (dec n)) (fib (- n 2)))))
*/

function fib(n) {
  if (n < 1) {
    return null;
  } else if (n <= 2) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

/*
(defn fibs [n]
  (map fib (range 1 (inc n))))
*/
function fibs(n) {
  return Array.from({ length: n }, (_, i) => fib(i + 1));
}
