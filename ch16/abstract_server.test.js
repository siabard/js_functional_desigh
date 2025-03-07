const { engageSwitch4, turnOnLight, turnOffLight, createMultiMethod} = require("./abstract_server");

jest.mock('./abstract_server', () => ({
  ...jest.requireActual('./abstract_server'),
  turnOnLight: jest.fn(),
  turnOffLight: jest.fn(),
}));

describe("abstract server", () => {
  test("turn on and off", () => {
    engageSwitch4();
    expect(turnOffLight).toHaveBeenCalled();
    expect(turnOnLight).toHaveBeenCalled();
  });
    
});
