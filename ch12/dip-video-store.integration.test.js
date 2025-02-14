

describe("Integration Tests", () => {
  let rentalOrder;

  beforeAll(() => {
    rentalOrder = makeRentalOrder(
      makeCustomer("Fred"),
      [
        makeRental(makeMovie("Plan 9 from Outer Space", "regular"), 1),
        makeRental(makeMovie("8 1/2", "regular"), 2),
        makeRental(makeMovie("Eraserhead", "regular"), 3)
      ]
    );
  });

  it("formats a text statement", () => {
    const statement = processOrder(
      makeNormalPolicy(),
      makeTextFormatter(),
      rentalOrder
    );

    expect(statement).toBe(
      "Rental Record for Fred\n" +
      "\tPlan 9 from Outer Space\t2\n" +
      "\t8 1/2\t4\n" +
      "\tEraserhead\t6\n" +
      "You owed 12\n" +
      "You earned 3 frequent renter points\n"
    );
  });
});
