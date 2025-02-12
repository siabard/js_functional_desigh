function copy(device) {
  const c = device.getchar();
  if (c === null) return;
  device.putchar(c);
  copy(device);
}


module.exports = {copy};