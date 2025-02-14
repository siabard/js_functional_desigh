const makeCustomer = (name) => ({ name });

const makeMovie = (title, type) => ({ title, type });

const makeRental = (movie, days) => ({ movie, days });

const makeRentalOrder = (customer, rentals) => ({ customer, rentals });

const determineAmount = ({ movie: { type }, days }) => ({
  regular: days > 2 ? 2.0 + (days - 2) * 1.5 : 2.0,
  "new-release": days * 3.0,
  childrens: days > 3 ? 1.5 + (days - 3) * 1.5 : 1.5,
}[type] || 0);

const determinePoints = ({ movie: { type }, days }) =>
  type === "new-release" && days > 1 ? 2 : 1;

const makeStatementData = ({ customer: { name }, rentals }) => {
  const movies = rentals.map((rental) => ({
    title: rental.movie.title,
    price: determineAmount(rental),
  }));

  const owed = rentals.reduce((sum, rental) => sum + determineAmount(rental), 0);
  const points = rentals.reduce((sum, rental) => sum + determinePoints(rental), 0);

  return { customerName: name, movies, owed, points };
};

module.exports = {
  makeCustomer,
  makeMovie,
  makeRental,
  makeRentalOrder,
  determineAmount,
  determinePoints,
  makeStatementData,
};
