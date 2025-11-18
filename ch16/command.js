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

let canvas = [];

const addRoom = () => {
   // 임의의 방을 만들고 canvas 에 방을 등록한다
   const roomNumber = Math.floor(Math.random() * 100);
   const newRoom = {'roomNumber': roomNumber};
    
   canvas.push(newRoom);
   return roomNumber;
}

const deleteRoom = (room) => {
  // canvas 에서 방을 삭제한다.
  canvas = canvas.filter(cv => cv.roomNumber != room.roomNumber);
}

const makeAddRoomCommand = () => {
    return {"ctype" : "add-room-command"};
};

execute.addMethod("add-room-command", (command) => {
  return {...command, 'roomNumber' : addRoom()};
  
})

undo.addMethod("add-room-command", (command) => {
  deleteRoom(command);
});

let undo_list = [];

// 방을 연속으로 만든다.

undo_list.push(execute(makeAddRoomCommand()));
undo_list.push(execute(makeAddRoomCommand()));
undo_list.push(execute(makeAddRoomCommand()));

console.log("Canvas => ", canvas);

// 등록된 작업 목록

console.log("Undo List => ", undo_list);

// 가장 최근 작업을 취소한다.

undo( undo_list.pop());

// Canvas 현황 

console.log("Canvas => ", canvas);
