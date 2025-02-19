const userSM = {
  idle: {
    call: ["calling", callerOffHook],
    ring: ["waitingForConnection", calleeOffHook],
    disconnect: ["idle", null],
  },
  calling: {
    dialtone: ["dialing", dial],
  },
  dialing: {
    ringback: ["waitingForConnection", null],
  },
  waitingForConnection: {
    connected: ["talking", talk],
  },
  talking: {
    disconnect: ["idle", disconnect],
  },
};

const telcoSM = {
  idle: {
    callerOffHook: ["waitingForDial", dialtone],
    hangup: ["idle", null],
  },
  waitingForDial: {
    dial: ["waitingForAnswer", ring],
  },
  waitingForAnswer: {
    calleeOffHook: ["waitingForHangup", connect],
  },
  waitingForHangup: {
    hangup: ["idle", disconnect],
  },
};

const log = [];

function transition(machineAgent, event, eventData) {
  log.push(`${machineAgent.name} <- ${event}`);

  const { state, machine } = machineAgent;
  const result = machine[state]?.[event];

  if (!result) {
    log.push("TILT!");
    return machineAgent;
  }

  if (result[1]) {
    result[1](machineAgent, eventData);
  }

  return { ...machineAgent, state: result[0] };
}

class Agent {
  constructor(name, machine) {
    this.state = "idle";
    this.name = name;
    this.machine = machine;
    this.queue = Promise.resolve();
  }

  async send(event, eventData) {
    this.queue = this.queue.then(() => {
      const newState = transition(this, event, eventData);
      this.state = newState.state;
    });
    return this.queue;
  }
}

function makeUserAgent(name) {
  return new Agent(name, userSM);
}

function makeTelcoAgent(name) {
  return new Agent(name, telcoSM);
}

/* 
const caller = makeUserAgent("Caller");
const callee = makeUserAgent("Callee");
const telco = makeTelcoAgent("Telco");

caller.send("call", [telco, caller, callee]);

*/

function callerOffHook(smAgent, [telco, caller, callee]) {
  log.push(`${caller.name} goes off hook.`);
  telco.send("callerOffHook", [telco, caller, callee]);
}

function dial(smAgent, [telco, caller, callee]) {
  log.push(`${caller.name} dials`);
  telco.send("dial", [telco, caller, callee]);
}

function calleeOffHook(smAgent, [telco, caller, callee]) {
  log.push(`${callee.name} goes off hook`);
  telco.send("calleeOffHook", [telco, caller, callee]);
}

function talk(smAgent, [telco, caller, callee]) {
  log.push(`${smAgent.name} talks.`);
  setTimeout(() => {
    log.push(`${smAgent.name} hangs up.`);
    telco.send("hangup", [telco, caller, callee]);
  }, 10);
}

function dialtone(smAgent, [telco, caller, callee]) {
  log.push(`dialtone to ${caller.name}`);
  caller.send("dialtone", [telco, caller, callee]);
}

function ring(smAgent, [telco, caller, callee]) {
  log.push(`telco rings ${callee.name}`);
  callee.send("ring", [telco, caller, callee]);
  caller.send("ringback", [telco, caller, callee]);
}

function connect(smAgent, [telco, caller, callee]) {
  log.push("telco connects");
  caller.send("connected", [telco, caller, callee]);
  callee.send("connected", [telco, caller, callee]);
}

function disconnect(smAgent, [telco, caller, callee]) {
  log.push("disconnect");
  callee.send("disconnect", [telco, caller, callee]);
  caller.send("disconnect", [telco, caller, callee]);
}

module.exports = {
  userSM,
  telcoSM,
  transition,
  Agent,
  makeUserAgent,
  makeTelcoAgent,
  callerOffHook,
  dial,
  calleeOffHook,
  talk,
  dialtone,
  ring,
  connect,
  disconnect,
  log,
};
