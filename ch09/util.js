function parseDate(dateString) {
  const date = new Date(dateString + " UTC");
  return new Date(date.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
}

module.exports = {
  parseDate
}