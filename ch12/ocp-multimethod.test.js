const { copy } = require('./ocp-multimethod');

// multimethod 는 자바스크립트에서 그대로 class 로 선언하면 된다.

class TestDevice {
  constructor(input) {
    this.deviceType = 'test-device';
    this.input = input;
    this.output = '';
  }

  getchar() {
    const c = this.input[0];
    if (c === undefined) {
      return ':eof';
    } else {
      this.input = this.input.slice(1);
      return c;
    }
  }

  putchar(c) {
    this.output += c;
  }
}

test('can read and write using multi-method', () => {
  const device = new TestDevice("abcdef");
  copy(device);
  expect(device.output).toBe("abcdef");
});