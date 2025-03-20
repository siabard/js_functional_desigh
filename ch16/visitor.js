const {createMultiMethod}= require('./multimethod');

const getShapeType = (shape) => shape.shapeType;

const toJson = createMultiMethod(getShapeType);

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
