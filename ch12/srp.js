const validateCustomer = ({ id, name, address, creditLimit, ...customer }) => {
  if (!id || !name || !address || !creditLimit) {
    return 'invalid';
  }
  
  // validation 을 담당하는 부분에 business 관련 로직이 끼어든다.
  // 아래 부분은 별도의 함수로 분리하는 것이 합당하다.
  const parsedCreditLimit = parseInt(creditLimit, 10);
  if (isNaN(parsedCreditLimit) || parsedCreditLimit > 50000) {
    return 'invalid';
  }
  
  return { ...customer, id, name, address, creditLimit: parsedCreditLimit };
};

const parseCustomer = (lines) => {
  const idMatch = lines[0].match(/^Customer-id: (\d{7})$/);
  const nameMatch = lines[1].match(/^Name: (.+)$/);
  const addressMatch = lines[2].match(/^Address: (.+)$/);
  const creditLimitMatch = lines[3].match(/^Credit Limit: (\d+)$/);

  const customer = {
    id: idMatch ? idMatch[1] : null,
    name: nameMatch ? nameMatch[1] : null,
    address: addressMatch ? addressMatch[1] : null,
    creditLimit: creditLimitMatch ? creditLimitMatch[1] : null
  };
  
  return validateCustomer(customer);
};


module.exports = {
  validateCustomer, parseCustomer
};