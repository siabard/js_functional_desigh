function createMultiMethod(dispatchFn) {
  const methods = new Map();

  function multimethod(...args) {
    const dispatchValue = dispatchFn(...args);
    if (!methods.has(dispatchValue)) {
      throw new Error(`No method defined for dispatch value: ${dispatchValue}`);
    }
    return methods.get(dispatchValue)(...args);
  }

  multimethod.addMethod = (dispatchValue, methodFn) => {
    methods.set(dispatchValue, methodFn);
  };

  return multimethod;
}

module.exports =  { 
  createMultiMethod
};