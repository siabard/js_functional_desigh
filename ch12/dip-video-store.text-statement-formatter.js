const {Formatter} = require('./dip-video-store.statement-formatter');

class TextFormatter extends Formatter {
  constructor() {
    super('text');
  }

  format(statementData) {
    const { customerName, movies, owed, points } = statementData;
    let movieDetails = movies.map(movie => {
      return `\t${movie.title}\t${movie.price.toFixed(1)}\n`;
    }).join('');
    
    return `Rental Record for ${customerName}\n${movieDetails}You owed ${owed.toFixed(1)}\nYou earned ${points} frequent renter points\n`;
  }
}

module.exports = { TextFormatter };