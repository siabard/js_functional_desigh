const {
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
} = require("./calling");

describe("Telco emulation", () => {
  test("should make and receive call", async () => {
    const caller = makeUserAgent("Bob");
    const callee = makeUserAgent("Alice");
    const telco = makeTelcoAgent("telco");

    log.length = 0; // 로그 초기화

    await caller.send("call", [telco, caller, callee]);

    // 상태 변이가 비동기로 처리되므로, 충분한 시간이 지난 후 상태 확인
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(log); // 로그 출력 (디버깅용)

    expect(caller.state).toBe("idle");
    expect(callee.state).toBe("idle");
    expect(telco.state).toBe("idle");
  });

  test("should race", async () => {
    const caller = makeUserAgent("Bob");
    const callee = makeUserAgent("Alice");
    const telco1 = makeTelcoAgent("telco1");
    const telco2 = makeTelcoAgent("telco2");

    log.length = 0; // 로그 초기화

    await Promise.all([
      caller.send("call", [telco1, caller, callee]),
      callee.send("call", [telco2, callee, caller]),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(log); // 로그 출력 (디버깅용)

    expect(caller.state).toBe("idle");
    expect(callee.state).toBe("idle");
    expect(telco1.state).toBe("idle");
    expect(telco2.state).toBe("idle");
  });
});
