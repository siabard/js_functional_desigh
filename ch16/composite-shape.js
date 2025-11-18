const { createMultiMethod } = require('./multimethod');

const getShapeType = (shape) => {
  return shape.shapeType;
}

const translate = createMultiMethod(getShapeType);
const scale = createMultiMethod(getShapeType);

const makeCircle = (center, radius) => {
  return {
    shapeType: 'circle',
    center: center,
    radius: radius
  };
};

translate.addMethod('circle', (shape, dx, dy) => {
  return {...shape, center: {x: shape.center.x + dx, y: shape.center.y + dy}};
});
scale.addMethod('circle', (shape, factor) => ({
   ...shape,
    radius: shape.radius * factor
}));

const circle = makeCircle({x: 10, y: 20}, 30);
console.log(translate(circle, 5, 8));
console.log(scale(circle, 2));


const makeSqaure = (topleft, side)  => {
  return  {
     shapeType:'square',
     topleft: topleft,
     side: side,
  };
};

translate.addMethod('square', (shape, dx, dy) => {
  return {...shape, topleft: {x: shape.topleft.x + dx, y: shape.topleft.y + dy}};
})
scale.addMethod("square", (shape, factor) => {
  return {...shape, side: shape.side * factor};
});

const rectangle = makeSqaure({x: 10, y: 15}, 5);
console.log(translate(rectangle, 5, 8));
console.log(scale(rectangle, 2));


console.log("composite shapes");
const makeCompositeShapes = () => {
  return {
    shapeType: 'compositeShapes',
    shapes: [],
  };
}

const addShape = (compositeShape, shape) => {
  compositeShape.shapes.push(shape);
}

translate.addMethod('compositeShapes', (shape, dx, dy) => {
  return shape.shapes.map( s => translate(s, dx, dy));
});
scale.addMethod('compositeShapes', (shape, factor) => {
  return shape.shapes.map( s => scale(s, factor));
});

const compositeShape = makeCompositeShapes();
addShape(compositeShape, makeCircle({x: 10, y: 10}, 5));
addShape(compositeShape, makeSqaure({x:20, y:30, }, 8));

console.log("기존 CompositeShapes : ", compositeShape.shapes );

console.log(" x = 4, y = 7 만큼 이동한 CompositeShapes : ", translate(compositeShape, 4, 7));

console.log("크기를 2배 확장한 CompositeShapes : ", scale(compositeShape, 2));

module.exports = {
  translate, scale, makeCircle, makeSqaure
}
