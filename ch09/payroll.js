const { createMultiMethod } = require("./multimethod");

function payroll(today, db) {
  const employees = getEmployees(db);
  const employees_to_pay = getEmployeesToBePaidToday(today, employees);
  const amounts = getPaycheckAmounts(employees_to_pay);
  const ids = getIds(employees_to_pay);
  const dispositions = getDispositions(employees_to_pay);

  return sendPaychecks(ids, amounts, dispositions);
}


function getPayClass(employee) {
  return employee.payClass[0];
}

function getSchedule(employee) {
  return employee.schedule;
}

function getSalary(employee) {
  return employee.payClass[1];
}

function getDisposition(paycheckDirective) {
  return paycheckDirective.disposition[0];
}

const isTodayPayday = createMultiMethod(getSchedule);

function isFriday(today) {
  return today.getDay() === 5;
}

function getWeekOfYear(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + 1) / 7);
}

function isEvenWeekFriday(today) {
  
  const weekNumber = getWeekOfYear(today);
  return weekNumber % 2 === 0 && today.getDay() === 5;
}

isTodayPayday.addMethod("monthly", (employee, today) => {
  return today.getDate() === 30;
});

isTodayPayday.addMethod("weekly", (employee, today) => {
  return isFriday(today);
});

isTodayPayday.addMethod("biweekly", (employee, today) => {
  console.log(today);
  console.log(today.getDay());
  console.log(isEvenWeekFriday(today));
  return isEvenWeekFriday(today);
});

const calcPay = createMultiMethod(getPayClass);

calcPay.addMethod("salaried", (employee) => employee.payClass[1]);

calcPay.addMethod("hourly", (employee) => {
  const db = employee.db;
  const myTimeCards = db.timeCards[employee.id] || [];
  const hourlyRate = employee.payClass[1];
  const totalHours = myTimeCards.reduce((sum, entry) => sum + entry[1], 0);
  return totalHours * hourlyRate;
});

calcPay.addMethod("commissioned", (employee) => {
  const db = employee.db;
  const mySalesReceipts = db.salesReceipts[employee.id] || [];
  const basePay = employee.payClass[1];
  const commissionRate = employee.payClass[2];
  const totalSales = mySalesReceipts.reduce((sum, entry) => sum + entry[1], 0);
  console.log( mySalesReceipts, basePay, commissionRate );
  return basePay + totalSales * commissionRate;
});

const dispose = createMultiMethod(getDisposition);

dispose.addMethod("mail", (paycheckDirective) => {
  return {
    type: paycheckDirective.disposition[0],
    id: paycheckDirective.id,
    name: paycheckDirective.disposition[1],
    address: paycheckDirective.disposition[2],
    amount: paycheckDirective.amount,
  };
});

dispose.addMethod("deposit", (paycheckDirective) => {
  return {
    type: paycheckDirective.disposition[0],
    id: paycheckDirective.id,
    routing: paycheckDirective.disposition[1],
    account: paycheckDirective.disposition[2],
    amount: paycheckDirective.amount,
  };
});

dispose.addMethod("paymaster", (paycheckDirective) => {
  return {
    type: paycheckDirective.disposition[0],
    id: paycheckDirective.id,
    paymaster: paycheckDirective.disposition[1],
    amount: paycheckDirective.amount,
  };
});



function getEmployeesToBePaidToday(today, employees) {
  return employees.filter(employee => isTodayPayday(employee, today));
}

function buildEmployee(db, employee) {
  return { ...employee, db };
}

function getEmployees(db) {
  return db.employees.map(employee => buildEmployee(db, employee));
}

function createPaycheckDirectives(ids, payments, dispositions) {
  return ids.map((id, index) => ({ id, amount: payments[index], disposition: dispositions[index] }));
}

function sendPaychecks(ids, payments, dispositions) {
  return createPaycheckDirectives(ids, payments, dispositions).map(dispose);
}

function getPaycheckAmounts(employees) {
  return employees.map(calcPay);
}

function getDispositions(employees) {
  return employees.map(employee => employee.disposition);
}

function getIds(employees) {
  return employees.map(employee => employee.id);
}

module.exports = {
  payroll,
};