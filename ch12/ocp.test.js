const { copy } = require('./ocp');

// atom 을 흉내내기위해 closure 를 사용했다.
function createStringReader(input) {
  let index = 0;
  return function () {
    if (index >= input.length) return null;
    return input[index++];
  };
}

// atom 을 흉내내기위해 closure 를 사용했다.
function createStringWriter() {
  let output = "";
  function writer(c) {
    output += c;
    return writer;
  }
  writer.getOutput = function () {
    return output;
  };
  return writer;
}

// Jest 테스트 코드
test("copy function works correctly", () => {
  const strIn = "abcdef";
  const reader = createStringReader(strIn);
  const writer = createStringWriter();
  copy(reader, writer);

  expect(writer.getOutput()).toBe("abcdef");
});
