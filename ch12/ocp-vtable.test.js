const {copy} = require('./ocp-vtable');

function createStringDevice(input) {
  let index = 0;
  let output = "";

  return {
    getchar: function () {
      return index < input.length ? input[index++] : null;
    },
    putchar: function (c) {
      output += c;
    },
    getOutput: function () {
      return output;
    },
  };
}

// Jest 테스트 코드
test("copy function works correctly", () => {
  const strIn = "abcdef";
  const device = createStringDevice(strIn);
  copy(device);

  expect(device.getOutput()).toBe("abcdef");
});
