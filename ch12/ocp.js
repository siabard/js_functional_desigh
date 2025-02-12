function copy(read, write) {
  const c = read();
  if (c === null) return;
  copy(read, write(c));
}

module.exports = { copy };