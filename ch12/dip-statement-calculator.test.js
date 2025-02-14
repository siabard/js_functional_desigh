const { makeCustomer, makeMovie, makeRental, makeRentalOrder, makeStatementData } = require("./dip-statement-calculator"); 


describe("Rental Statement Calculation", () => {
  let customer;

  beforeEach(() => {
    customer = makeCustomer("Fred");
  });

  test("makes statement for a single new release", () => {
    expect(makeStatementData(
      makeRentalOrder(customer, [
        makeRental(makeMovie("The Cell", "new-release"), 3)
      ])
    )).toEqual({
      customerName: "Fred",
      movies: [{ title: "The Cell", price: 9.0 }],
      owed: 9.0,
      points: 2
    });
  });

  test("makes statement for two new releases", () => {
    expect(makeStatementData(
      makeRentalOrder(customer, [
        makeRental(makeMovie("The Cell", "new-release"), 3),
        makeRental(makeMovie("The Tigger Movie", "new-release"), 3)
      ])
    )).toEqual({
      customerName: "Fred",
      movies: [
        { title: "The Cell", price: 9.0 },
        { title: "The Tigger Movie", price: 9.0 }
      ],
      owed: 18.0,
      points: 4
    });
  });

  test("makes statement for one children's movie", () => {
    expect(makeStatementData(
      makeRentalOrder(customer, [
        makeRental(makeMovie("The Tigger Movie", "childrens"), 3)
      ])
    )).toEqual({
      customerName: "Fred",
      movies: [{ title: "The Tigger Movie", price: 1.5 }],
      owed: 1.5,
      points: 1
    });
  });

  test("makes statement for several regular movies", () => {
    expect(makeStatementData(
      makeRentalOrder(customer, [
        makeRental(makeMovie("Plan 9 from Outer Space", "regular"), 1),
        makeRental(makeMovie("8 1/2", "regular"), 2),
        makeRental(makeMovie("Eraserhead", "regular"), 3)
      ])
    )).toEqual({
      customerName: "Fred",
      movies: [
        { title: "Plan 9 from Outer Space", price: 2.0 },
        { title: "8 1/2", price: 2.0 },
        { title: "Eraserhead", price: 3.5 }
      ],
      owed: 7.5,
      points: 3
    });
  });
});