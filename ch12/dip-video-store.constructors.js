const makeCustomer = (name) => ({ name });

const makeMovie = (title, type) => ({ title, type });

const makeRental = (movie, days) => ({ movie, days });

const makeRentalOrder = (customer, rentals) => ({ customer, rentals });

module.exports = {
  makeCustomer,
  makeMovie,
  makeRental,
  makeRentalOrder
}