/*
version 1.
const pay = (employee, payDate) => {
  const { isPayday, calcPay, sendPaycheck } = employee;

  if (isPayday(payDate)) {
    const paycheck = calcPay();
    return sendPaycheck(paycheck);
  }

  return undefined;
};

*/

const pay = (employee, payDate) => {
  const { isPayday, calcPay, sendPaycheck } = employee;

  if (isPayday(payDate) === true) {
    const paycheck = calcPay();
    return sendPaycheck(paycheck);
  }

  return undefined;
};

module.exports = { pay };