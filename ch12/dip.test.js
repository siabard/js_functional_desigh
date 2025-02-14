const { makeCustomer, makeMovie, makeRental, makeRentalOrder, makeStatement } = require("./dip"); 

describe("Video Store", () => {
  let customer;

  beforeEach(() => {
    customer = makeCustomer("Fred");
  });

  test("makes statement for a single new release", () => {
    expect(
      makeStatement(
        makeRentalOrder(customer, [
          makeRental(makeMovie("The Cell", "new-release"), 3),
        ])
      )
    ).toBe(
      "Rental Record for Fred\n" +
        "\tThe Cell\t9.0\n" +
        "You owed 9.0\n" +
        "You earned 2 frequent renter points\n"
    );
  });

  test("makes statement for two new releases", () => {
    expect(
      makeStatement(
        makeRentalOrder(customer, [
          makeRental(makeMovie("The Cell", "new-release"), 3),
          makeRental(makeMovie("The Tigger Movie", "new-release"), 3),
        ])
      )
    ).toBe(
      "Rental Record for Fred\n" +
        "\tThe Cell\t9.0\n" +
        "\tThe Tigger Movie\t9.0\n" +
        "You owed 18.0\n" +
        "You earned 4 frequent renter points\n"
    );
  });

  test("makes statement for one childrens movie", () => {
    expect(
      makeStatement(
        makeRentalOrder(customer, [
          makeRental(makeMovie("The Tigger Movie", "childrens"), 3),
        ])
      )
    ).toBe(
      "Rental Record for Fred\n" +
        "\tThe Tigger Movie\t1.5\n" +
        "You owed 1.5\n" +
        "You earned 1 frequent renter points\n"
    );
  });

  test("makes statement for several regular movies", () => {
    expect(
      makeStatement(
        makeRentalOrder(customer, [
          makeRental(makeMovie("Plan 9 from Outer Space", "regular"), 1),
          makeRental(makeMovie("8 1/2", "regular"), 2),
          makeRental(makeMovie("Eraserhead", "regular"), 3),
        ])
      )
    ).toBe(
      "Rental Record for Fred\n" +
        "\tPlan 9 from Outer Space\t2.0\n" +
        "\t8 1/2\t2.0\n" +
        "\tEraserhead\t3.5\n" +
        "You owed 7.5\n" +
        "You earned 3 frequent renter points\n"
    );
  });
});
