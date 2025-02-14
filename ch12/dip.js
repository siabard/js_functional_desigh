const makeCustomer = (name) => ({ name });

const makeMovie = (title, type) => ({ title, type });

const makeRental = (movie, days) => ({ movie, days });

const makeRentalOrder = (customer, rentals) => ({ customer, rentals });

const determineAmount = (rental) => {
  const { movie, days } = rental;

  switch (movie.type) {
    case "regular":
      return days > 2 ? 2.0 + (days - 2) * 1.5 : 2.0;
    case "new-release":
      return days * 3.0;
    case "childrens":
      return days > 3 ? 1.5 + (days - 3) * 1.5 : 1.5;
    default:
      return 0;
  }
};

const determinePoints = (rental) => {
  const { movie, days } = rental;
  return movie.type === "new-release" && days > 1 ? 2 : 1;
};

const makeDetail = (rental) => {
  const title = rental.movie.title;
  const price = determineAmount(rental);
  return `\t${title}\t${price.toFixed(1)}`;
};

const makeDetails = (rentals) => rentals.map(makeDetail).join("\n");

const makeFooter = (rentals) => {
  const owed = rentals.map(determineAmount).reduce((a, b) => a + b, 0);
  const points = rentals.map(determinePoints).reduce((a, b) => a + b, 0);
  
  return `\nYou owed ${owed.toFixed(1)}\nYou earned ${points} frequent renter points\n`;
};

const makeStatement = (rentalOrder) => {
  const { name } = rentalOrder.customer;
  const { rentals } = rentalOrder;
  
  const header = `Rental Record for ${name}\n`;
  const details = makeDetails(rentals);
  const footer = makeFooter(rentals);
  
  return `${header}${details}${footer}`;
};

module.exports = { makeCustomer, makeMovie, makeRental, makeRentalOrder, makeStatement };