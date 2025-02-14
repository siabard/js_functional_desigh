const { makeCustomer, makeMovie, makeRental, makeRentalOrder, makeStatementData } = require("./dip-statement-calculator"); 
const {formatRentalStatement} = require('./dip-statement-formatter');


describe('Integration Tests', () => {
  it('formats a statement for several regular movies', () => {
    const statementData = makeStatementData(
      makeRentalOrder(
        makeCustomer('Fred'),
        [
          makeRental(makeMovie('Plan 9 from Outer Space', 'regular'), 1),
          makeRental(makeMovie('8 1/2', 'regular'), 2),
          makeRental(makeMovie('Eraserhead', 'regular'), 3)
        ]
      )
    );

    const statement = formatRentalStatement(statementData);

    expect(statement).toBe(
      "Rental Record for Fred\n" +
      "\tPlan 9 from Outer Space\t2\n" +
      "\t8 1/2\t2\n" +
      "\tEraserhead\t3.5\n" +
      "You owed 7.5\n" +
      "You earned 3 frequent renter points\n"
    );
  });
});