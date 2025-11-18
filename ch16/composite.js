const {createMultiMethod} = require("./multimethod");

function getType(switchable) {
  return switchable.type;
}

const turnOn = createMultiMethod(getType);
const turnOff = createMultiMethod(getType);

function makeLight() {
  return {type: 'light'};
}

function turnOnLight() {
  return "on";
}

function turnOffLight() {
  return "off";
}

turnOn.addMethod('light', turnOnLight);
turnOff.addMethod('light', turnOffLight);

const light = makeLight();
console.log(light);
console.log(turnOn(light));
console.log(turnOff(light));

function makeVariableLight() {
  return {type: 'variable-light'};
}

function setLightIntensity(intensity) {
  return intensity;
}

turnOn.addMethod('variable-light', () => setLightIntensity(100));
turnOff.addMethod('variable-light', () => setLightIntensity(0));

const variableLight = makeVariableLight();
console.log(turnOn(variableLight));
console.log(turnOff(variableLight));

function makeCompositeSwitchable() {
  return {
    type: 'composite-switchable',
    switchables: []
  }
}

function add(compositeSwitchable, switchable) {
  compositeSwitchable.switchables.push(switchable);
}

turnOn.addMethod('composite-switchable', (compositeSwitchable) => {
  return compositeSwitchable.switchables.map(switchable => turnOn(switchable));
});

turnOff.addMethod('composite-switchable', (compositeSwitchable) => {
  return compositeSwitchable.switchables.map(switchable => turnOff(switchable));
});


console.log("Composite Switchable");
const compositeSwitchable = makeCompositeSwitchable();

// 밝기 조정 가능한 등을 추가한다. (variable-light)
add(compositeSwitchable, makeVariableLight());

// On, Off 만 되는 등을 추가한다. (light)
add(compositeSwitchable, makeLight());

// compositeSwitchable 의 모든 등을 켠다
console.log(turnOn(compositeSwitchable));


// compositeSwitchable 의 모든 등을 끈다.
console.log(turnOff(compositeSwitchable));

