const {payroll} = require('./payroll');
const {parseDate} = require('./util');



describe("Payroll system", () => {
  test("pays one salaried employee at end of month by mail", () => {
    const employees = [
      {
        id: "emp1",
        schedule: "monthly",
        payClass: ["salaried", 5000],
        disposition: ["mail", "name", "home"],
      },
    ];
    
    const db = { employees };
    const today = parseDate("Nov 30 2021");
    
    expect(payroll(today, db)).toEqual([
      {
        type: "mail",
        id: "emp1",
        name: "name",
        address: "home",
        amount: 5000,
      },
    ]);
  });

  test("pays one hourly employee on Friday by Direct Deposit", () => {
    const employees = [
      {
        id: "empid",
        schedule: "weekly",
        payClass: ["hourly", 15],
        disposition: ["deposit", "routing", "account"],
      },
    ];
    
    const timeCards = { empid: [["Nov 12 2022", 80 / 10]] };
    const db = { employees, timeCards };
    const friday = parseDate("Nov 18 2022");
    
    expect(payroll(friday, db)).toEqual([
      {
        type: "deposit",
        id: "empid",
        routing: "routing",
        account: "account",
        amount: 120,
      },
    ]);
  });

  test("pays one commissioned employee on an even Friday by Paymaster", () => {
    const employees = [
      {
        id: "empid",
        schedule: "biweekly",
        payClass: ["commissioned", 100, 5 / 100],
        disposition: ["paymaster", "paymaster"],
      },
    ];
    
    const salesReceipts = { empid: [["Nov 12 2022", 15000]] };
    const db = { employees, salesReceipts };
    const friday = parseDate("Nov 18 2022");
    
    expect(payroll(friday, db)).toEqual([
      {
        type: "paymaster",
        id: "empid",
        paymaster: "paymaster",
        amount: 850,
      },
    ]);
  });

});
