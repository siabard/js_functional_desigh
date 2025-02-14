
describe('Rental Statement Calculation', () => {
  const customer = makeCustomer('CUSTOMER');
  const normalPolicy = makeNormalPolicy();
  const newRelease1 = makeMovie('new release 1', 'new-release');
  const newRelease2 = makeMovie('new release 2', 'new-release');
  const childrens = makeMovie('childrens', 'childrens');
  const regular1 = makeMovie('regular 1', 'regular');
  const regular2 = makeMovie('regular 2', 'regular');
  const regular3 = makeMovie('regular 3', 'regular');

  describe('normal policy', () => {
    it('makes statement for a single new release', () => {
      const rentalOrder = makeRentalOrder(customer, [makeRental(newRelease1, 3)]);
      const statementData = makeStatementData(normalPolicy, rentalOrder);
      expect(statementData).toEqual({
        customerName: 'CUSTOMER',
        movies: [{ title: 'new release 1', price: 9.0 }],
        owed: 9.0,
        points: 2
      });
    });

    it('makes statement for two new releases', () => {
      const rentalOrder = makeRentalOrder(customer, [makeRental(newRelease1, 3), makeRental(newRelease2, 3)]);
      const statementData = makeStatementData(normalPolicy, rentalOrder);
      expect(statementData).toEqual({
        customerName: 'CUSTOMER',
        movies: [
          { title: 'new release 1', price: 9.0 },
          { title: 'new release 2', price: 9.0 }
        ],
        owed: 18.0,
        points: 4
      });
    });

    it('makes statement for one childrens movie', () => {
      const rentalOrder = makeRentalOrder(customer, [makeRental(childrens, 3)]);
      const statementData = makeStatementData(normalPolicy, rentalOrder);
      expect(statementData).toEqual({
        customerName: 'CUSTOMER',
        movies: [{ title: 'childrens', price: 1.5 }],
        owed: 1.5,
        points: 1
      });
    });

    it('makes statement for several regular movies', () => {
      const rentalOrder = makeRentalOrder(customer, [
        makeRental(regular1, 1),
        makeRental(regular2, 2),
        makeRental(regular3, 3)
      ]);
      const statementData = makeStatementData(normalPolicy, rentalOrder);
      expect(statementData).toEqual({
        customerName: 'CUSTOMER',
        movies: [
          { title: 'regular 1', price: 2.0 },
          { title: 'regular 2', price: 2.0 },
          { title: 'regular 3', price: 3.5 }
        ],
        owed: 7.5,
        points: 3
      });
    });
  });

  describe('Buy two get one free policy', () => {
    it('makes statement for several regular movies', () => {
      const rentalOrder = makeRentalOrder(customer, [
        makeRental(regular1, 1),
        makeRental(regular2, 1),
        makeRental(newRelease1, 1)
      ]);
      const statementData = makeStatementData(makeBuyTwoGetOneFreePolicy(), rentalOrder);
      expect(statementData).toEqual({
        customerName: 'CUSTOMER',
        movies: [
          { title: 'regular 1', price: 2.0 },
          { title: 'regular 2', price: 2.0 },
          { title: 'new release 1', price: 3.0 }
        ],
        owed: 5.0,
        points: 3
      });
    });
  });
});