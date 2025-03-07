const { createMultiMethod} = require('./multimethod');



const getType = (light) => light.type;


const multiTurnOn = createMultiMethod(getType);
const multiTurnOff = createMultiMethod(getType);


const turnOnLight = () => {
  // turn on light
  console.log('light on');
}

const turnOffLight = () => {
  // turn off light
  console.log('light off');
}

const turnLight = (amount) => {
  if(amount > 0) {
    return () => console.log('light on') ;
  } else {
    return () => console.log('light off');
  }
};


multiTurnOn.addMethod('normal', turnOnLight);
multiTurnOff.addMethod('normal', turnOffLight);

multiTurnOn.addMethod('lamp', turnLight(100));
multiTurnOff.addMethod('lamp', turnLight(0));


const lamp = { type: 'lamp' };
multiTurnOn(lamp);
multiTurnOff(lamp);

const normal = {type: 'normal'};
multiTurnOn(normal);
multiTurnOff(normal);
