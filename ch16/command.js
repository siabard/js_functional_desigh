const { createMultiMethod } = require('./multimethod');

const someApp = (command) => {
  command();
};

someApp(() => console.log('execute 1'));

const someAppWithArg = (command) => {
  return (args) => {
    command(args);
  };
};

const partialCommand = (name) => console.log(`Hello ${name}`);
someAppWithArg(partialCommand)('world');

// undoable

const getType = (command) => {
  return command.ctype;
}

const execute = createMultiMethod(getType);
const undo = createMultiMethod(getType);

const addRoom = () => {
  return 'room added';
}

const deleteRoom = (room) => {
  // working delete room
  console.log('room deleted');
}

const makeAddRommCommand = (command) => {
  return {"ctype" : "add-room-command"};
};

execute.addMethod("add-room-command", (command) => {
  return {
    ...makeAddRommCommand(),
    "the-added-room": command
  };
})

undo.addMethod("add-room-command", (command) => {
  return {
    "the-added-room": command
  };
});