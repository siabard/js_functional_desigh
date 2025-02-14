const { Formatter } = require('./dip-video-store.statement-formatter');

class HtmlFormatter extends Formatter {
  constructor() {
    super('html');
  }

  format(statementData) {
    const { customerName, movies, owed, points } = statementData;
    let movieDetails = movies.map(movie => {
      return `<tr><td>${movie.title}</td><td>${movie.price.toFixed(1)}</td></tr>`;
    }).join('');
    
    return `<h1>Rental Record for ${customerName}</h1><table>${movieDetails}</table>You owed ${owed.toFixed(1)}<br>You earned <b>${points}</b> frequent renter points`;
  }
}

module.exports = { HtmlFormatter };