* 각 장의 코드 테스트 방법

3, 4장은 개별 코드를 javascript의 closure 형식으로 변환한 것으로 직접 `node` 를 이용해 자바스크립트 코드를 실행하면 된다.

```
node ch03/fib-w.js

node ch04/lazy-fib.js
```

6, 7, 8, 9, 13, 15, 17 장은 `jest` 를 통해 테스트가 가능하다. 

```
npm run ch06_test
npm run ch07_test
npm run ch08_test
npm run ch09_test
npm run ch13_test
npm run ch15_test
npm run ch17_test
```

10장의 코드는 zod를 이용하는 타입스크립트 코드로 해당 디렉토리 안에서 별도로 실행해야한다.

```
cd ch10
npm install
npm run start
```


16장은 개별 코드를 javascript로 변환하는 것을 위주로 작성되었으므로, 직접 `node`를 이용해 실행하거나, 소스 코드를 참조만 할 것을 권장한다.
