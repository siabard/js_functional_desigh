const { createMultiMethod } = require("./multimethod")

const turnOnLight = () => {
  // turn on light
  console.log('light on');
}

const turnOffLight = () => {
  // turn off light
  console.log('light off');
}

const engageSwitch = (turnOnFunction) => {
  turnOnFunction();
}

const engageSwitch2 = () => {
  // do something
  turnOnLight();

  // do other thing
  turnOffLight();
}

const makeSwitch = {
  'on': turnOnLight, 
   'off': turnOffLight
};

const engageSwitch3 = (switchable) => {
  // do something
  switchable['on']();
   // do other thing
   switchable['off']();
};

// engageSwitch3(switchable);

// multi method

const getType = (light) => light.type;

const multiTurnOn = createMultiMethod(getType);
const multiTurnOff = createMultiMethod(getType);

multiTurnOn.addMethod('type', turnOnLight);
multiTurnOff.addMethod('type', turnOffLight);

const engageSwitch4 = (switchable) => {
  multiTurnOn(switchable);
    // do other thing
  multiTurnOff(switchable);
};



module.exports = {
  multiMethodSwitchable,
  turnOffLight,
  turnOnLight,
  engageSwitch, 
  engageSwitch2, 
  engageSwitch3, 
  engageSwitch4
};
