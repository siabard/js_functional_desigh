const { pay } = require("./lsp");

const testIsPayday = (employeeData, payDate) => true;

const testCalcPay = (employeeData) => employeeData.pay;

const testSendPaycheck = (employeeData, paycheck) =>
  `Send ${paycheck} to: ${employeeData.name} at: ${employeeData.address}`;

const makeTestEmployee = (name, address, pay) => {
  const employeeData = { name, address, pay };

  return {
    employeeData,
    isPayday: (payDate) => testIsPayday(employeeData, payDate),
    calcPay: () => testCalcPay(employeeData),
    sendPaycheck: (paycheck) => testSendPaycheck(employeeData, paycheck),
  };
};

const makeLaterEmployee = (name, address, pay) => {
  const employee = makeTestEmployee(name, address, pay);

  return {
    ...employee,
    isPayday: (payDate) => "tomorrow", // 항상 "tomorrow"를 반환하도록 설정
  };
};

describe("Payroll", () => {
  test("pays a salaried employee", () => {
    expect(pay(makeTestEmployee("name", "address", 100), "now")).toBe(
      "Send 100 to: name at: address"
    );
  });

  // 이 테스트는 항상 실패한다.
  test("does not pay an employee whose payday is not today", () => {
    expect(
      pay(makeLaterEmployee("name", "address", 100), "now")
    ).toBeUndefined();
  });
});
