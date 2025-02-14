function formatRentalStatement({ customerName, movies, owed, points }) {
  const formatMovies = () => {
    return movies.map(movie => `\t${movie.title}\t${movie.price}`).join("\n");
  };

  const rentalRecord = () => {
    return `Rental Record for ${customerName}\n${formatMovies()}\nYou owed ${owed}\nYou earned ${points} frequent renter points\n`;
  };

  return rentalRecord();
}

module.exports = {formatRentalStatement};
