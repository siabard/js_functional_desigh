

const processOrder = (policy, formatter) => {
  // Return a function that takes the order and processes it
  return function(order) {
    const statementData = makeStatementData(policy, order); // Assuming this function exists
    return formatRentalStatement(formatter, statementData);  // Assuming this function exists
  };
}
