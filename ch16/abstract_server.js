const { createMultiMethod } = require("./multimethod")

const turnOnLight = () => {
  // turn on light
  console.log('light on');
}

const turnOffLight = () => {
  // turn off light
  console.log('light off');
}


/*
  (defn engage-switch []
    ; Some other stuff 
    (turn-on-light))
*/
const engageSwitch = (turnOnFunction) => {
  turnOnFunction();
}

// engageWitch 

/*
  (defn engage-switch [turn-on-function]
    (turn-on-function))
*/

const engageSwitch2 = (turnOnFunction) => {
    turnOnFunction();
}

// engageSwitch2(turnOnLight);

/*
  (defn make-swithable-light []
    { :on turn-on-light
      :off turn-off-light })
*/

const makeSwitch = {
  'on': turnOnLight, 
   'off': turnOffLight
};


/*
  (defn engage-switch [switchable]
    ((:on switchable))
    ((:off switchable)))
*/
const engageSwitch3 = (switchable) => {
  // do something
  switchable['on']();
   // do other thing
   switchable['off']();
};

// engageSwitch3( makeSwitch );

// multi method

const getType = (light) => light.type;

const multiTurnOn = createMultiMethod(getType);
const multiTurnOff = createMultiMethod(getType);

multiTurnOn.addMethod('light', turnOnLight);
multiTurnOff.addMethod('light', turnOffLight);

const engageSwitch4 = (switchable) => {
  multiTurnOn(switchable);
  // do other thing
  multiTurnOff(switchable);
};

engageSwitch4({type: 'light'});

module.exports = {
  turnOffLight,
  turnOnLight,
  engageSwitch, 
  engageSwitch2, 
  engageSwitch3, 
  engageSwitch4
};
