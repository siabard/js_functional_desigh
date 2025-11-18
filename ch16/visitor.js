const {createMultiMethod}= require('./multimethod');

/* 비지터 인터페이스 선언으로 감안
   실제로 이는 하나의 객체이기때문에
   완전한 인터페이스라고는 보기 어렵기도 하다.

   하지만 구체적인 구현과 다중메서드 선언부를 분리했다는 점에서
   인터페이스라고 칭할 수 있다.
 */

const getShapeType = (shape) => shape.shapeType;

const toJson = createMultiMethod(getShapeType);

/* 비지터 패턴 구현 
   
   toJson 에 전달할 타입에 해당하는 인스탄스를 만드는 방법과
   해당하는 다중메서드를 구현함으로써 구현이 완성된다.
*/

/* Shape 선언 */

const makeCircle = (center, radius) => {
  return {
    shapeType: 'circle',
    center: center,
    radius: radius
  };
}


const makeSquare = (topleft, side)  => {
  return  {
     shapeType:'square',
     topleft: topleft,
     side: side,
  };
};


/* Json Shape 비지터 구현 */

toJson.addMethod('square', (shape) => {
  const {topleft: {x, y}, side} = shape;
  return {
    "top-left": [x, y],
    "side": side
  };
});

toJson.addMethod('circle', (shape) => {
  const {center: {x, y}, radius} = shape;
  return {
    "center": [x, y],
    "radius": radius
  };
});

console.log(toJson(makeSquare({x: 10, y: 20}, 5)));
console.log(toJson(makeCircle({x: 5, y: 15}, 20)));
