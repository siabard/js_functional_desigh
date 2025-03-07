const WIDTH = 10;
const HEIGHT = 15;

const makeTurtle = () => ({
  position: [200, 200],
  heading: 0.0,
  velocity: 0.0,
  distance: 0.0,
  omega: 0.0,
  angle: 0.0,
  pen: "up",
  weight: 1,
  speed: 5,
  visible: true,
  lines: [],
  state: "idle",
  penStart: null,
});

let turtle = makeTurtle();

const updatePosition = (turtle) => {
  const { position, velocity, heading, distance } = turtle;
  const step = Math.min(Math.abs(velocity), distance);
  const newDistance = distance - step;
  const adjustedStep = velocity < 0 ? -step : step;
  const radians = (heading * Math.PI) / 180;
  const [x, y] = position;
  const vx = adjustedStep * Math.cos(radians);
  const vy = adjustedStep * Math.sin(radians);
  return {
    ...turtle,
    position: [x + vx, y + vy],
    distance: newDistance,
    velocity: newDistance === 0 ? 0.0 : velocity,
  };
};

const updateHeading = (turtle) => {
  const { heading, omega, angle } = turtle;
  const angleStep = Math.min(Math.abs(omega), angle);
  const newAngle = angle - angleStep;
  const adjustedAngleStep = omega < 0 ? -angleStep : angleStep;
  return {
    ...turtle,
    heading: (heading + adjustedAngleStep) % 360,
    angle: newAngle,
    omega: newAngle === 0 ? 0.0 : omega,
  };
};

const makeLine = ({ penStart, position, weight }) => ({
  lineStart: penStart,
  lineEnd: position,
  lineWeight: weight,
});

const updateTurtle = (turtle) => {
  if (turtle.state === "idle") return turtle;
  const updatedTurtle = updateHeading(updatePosition(turtle));
  const done = updatedTurtle.distance === 0 && updatedTurtle.angle === 0;
  return {
    ...updatedTurtle,
    state: done ? "idle" : updatedTurtle.state,
    lines:
      done && updatedTurtle.pen === "down"
        ? [...updatedTurtle.lines, makeLine(updatedTurtle)]
        : updatedTurtle.lines,
    penStart:
      done && updatedTurtle.pen === "down"
        ? updatedTurtle.position
        : updatedTurtle.penStart,
  };
};

const penDown = (turtle) =>
  turtle.pen === "down"
    ? turtle
    : { ...turtle, pen: "down", penStart: turtle.position };

const penUp = (turtle) =>
  turtle.pen === "up"
    ? turtle
    : {
        ...turtle,
        pen: "up",
        penStart: null,
        lines: [...turtle.lines, makeLine(turtle)],
      };

const forward = (turtle, distance) => ({
  ...turtle,
  velocity: turtle.speed,
  distance,
  state: "busy",
});

const back = (turtle, distance) => ({
  ...turtle,
  velocity: -turtle.speed,
  distance,
  state: "busy",
});

const right = (turtle, angle) => ({
  ...turtle,
  omega: 2 * turtle.speed,
  angle,
  state: "busy",
});

const left = (turtle, angle) => ({
  ...turtle,
  omega: -2 * turtle.speed,
  angle,
  state: "busy",
});

const hide = (turtle) => ({ ...turtle, visible: false });
const show = (turtle) => ({ ...turtle, visible: true });
const setWeight = (turtle, weight) => ({ ...turtle, weight });
const setSpeed = (turtle, speed) => ({ ...turtle, speed });

const handleCommand = (turtle, [cmd, ...args]) => {
  switch (cmd) {
    case "forward":
      return forward(turtle, ...args);
    case "back":
      return back(turtle, ...args);
    case "right":
      return right(turtle, ...args);
    case "left":
      return left(turtle, ...args);
    case "pen-down":
      return penDown(turtle);
    case "pen-up":
      return penUp(turtle);
    case "hide":
      return hide(turtle);
    case "show":
      return show(turtle);
    case "weight":
      return setWeight(turtle, ...args);
    case "speed":
      return setSpeed(turtle, ...args);
    default:
      return turtle;
  }
};

const executeCommands = (turtle, commands) =>
  commands.reduce(handleCommand, turtle);

const fibs = (a = 1, b = 1) => {
  return {
    [Symbol.iterator]: function* () {
      let x = a,
        y = b;
      while (true) {
        yield x;
        [x, y] = [y, x + y];
      }
    },
  };
};

const dot = (turtle) => {
  turtle = setWeight(turtle, 5);
  turtle = penDown(turtle);
  turtle = forward(turtle, 1);
  turtle = penUp(turtle);
  turtle = back(turtle, 1);
  return turtle;
};

const fibSpiral = (turtle) => {
  let fibGen = fibs()[Symbol.iterator]();
  turtle = setSpeed(turtle, 1000);
  turtle = setWeight(turtle, 3);
  for (let i = 0; i < 20; i++) {
    let f = fibGen.next().value;
    turtle = setWeight(turtle,  Math.log(f) + 1);
    turtle = forward(turtle, f);
    turtle = right(turtle, 90);
    turtle = dot(turtle);
  }
  return turtle;
};

const drawTurtle = (turtle, p) => {
  // 선 그리기
  p.stroke(0);
  p.strokeWeight(1);
  for (let line of turtle.lines) {
    p.strokeWeight(line.lineWeight);
    p.line(
      line.lineStart[0],
      line.lineStart[1],
      line.lineEnd[0],
      line.lineEnd[1]
    );
  }

  // 거북이 그리기
  if (turtle.visible) {
    const [x, y] = turtle.position;
    p.fill(0);
    p.noStroke();
    p.ellipse(x, y, 5, 5);
  }
};

turtle = fibSpiral(turtle);
turtle.lines.forEach((line) => {
  console.log(line);
});
turtle = updateTurtle(turtle);
turtle.lines.forEach((line) => {
  console.log(line);
});
/*
const draw = (p) => {
  p.background(255);
  drawTurtle(turtle, p);
};

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
    turtle = fibSpiral(turtle);
  };

  p.draw = () => {
    draw(p);
    turtle = updateTurtle(turtle);
  };
};

new p5(sketch);

*/