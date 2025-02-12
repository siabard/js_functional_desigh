
function copy(device) {
  let c = device.getchar();
  while (c !== ':eof') {
    device.putchar(c);
    c = device.getchar();
  }
}

module.exports = { copy };