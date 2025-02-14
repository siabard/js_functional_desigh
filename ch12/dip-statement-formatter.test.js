const {formatRentalStatement} = require('./dip-statement-formatter');

describe('Rental Statement Format', () => {
  it('Formats a rental statement correctly', () => {
    const statement = formatRentalStatement({
      customerName: "CUSTOMER",
      movies: [{ title: "MOVIE", price: 9.9 }],
      owed: 100.0,
      points: 99
    });

    expect(statement).toBe(
      "Rental Record for CUSTOMER\n\tMOVIE\t9.9\nYou owed 100\nYou earned 99 frequent renter points\n"
    );
  });
});