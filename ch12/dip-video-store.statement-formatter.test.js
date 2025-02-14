

describe('Rental Statement Format', () => {
  const statementData = {
    customerName: "CUSTOMER",
    movies: [{ title: "MOVIE", price: 9.9 }],
    owed: 100.0,
    points: 99
  };

  it('Formats a text rental statement', () => {
    const formattedStatement = formatRentalStatement(
      makeTextFormatter(),
      statementData
    );

    expect(formattedStatement).toBe(
      "Rental Record for CUSTOMER\n" +
      "\tMOVIE\t9.9\n" +
      "You owed 100.0\n" +
      "You earned 99 frequent renter points\n"
    );
  });

  it('Formats an html rental statement', () => {
    const formattedStatement = formatRentalStatement(
      makeHtmlFormatter(),
      statementData
    );

    expect(formattedStatement).toBe(
      "<h1>Rental Record for CUSTOMER</h1>" +
      "<table>" +
      "<tr><td>MOVIE</td><td>9.9</td></tr>" +
      "</table>" +
      "You owed 100.0<br>" +
      "You earned <b>99</b> frequent renter points"
    );
  });
});