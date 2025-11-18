const { createMultiMethod } = require('./multimethod');
const { translate, scale , makeCircle, makeSqaure} = require('./composite-shape');

let journalEntries = [];

// 기존 shape을 하위요소로 하는 journaledShape 을 shapeType으로 지정
// 이렇게하면 하위 요소 shape 으로 기존의 변형 작업은 그대로 유지하면서
// 새로운 journaledShape 에 따른 처리를 추가할 수 있다.

const makeJournaledShape = (shape) => {
  return {shapeType: 'journaledShape',
  shape: shape,
}};

translate.addMethod('journaledShape', (journaledShape, dx, dy) => {
  journalEntries.push("translate: " + journaledShape.shape.shapeType);
  return translate(journaledShape.shape, dx, dy);
});


scale.addMethod('journaledShape', (journaledShape, factor) => {
  journalEntries.push("scale: " + journaledShape.shape.shapeType);
  return scale(journaledShape.shape, scale);
})

const circle = makeCircle({x: 5, y: 10}, 8);
const square = makeSqaure({x: 8, y: 16}, 5);

const journal1 = makeJournaledShape(circle);
const journal2 = makeJournaledShape(square);

console.log(translate(journal1, 4, 7));
console.log(scale(journal2, 3));

console.log(journalEntries);
